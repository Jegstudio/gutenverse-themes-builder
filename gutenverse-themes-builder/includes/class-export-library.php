<?php
/**
 * Export Library Class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder;

use Gutenverse_Themes_Builder\Database\Database;
use Gutenverse_Themes_Builder\Export\Misc;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use WP_Query;
use ZipArchive;

/**
 * Export Library Class
 *
 * @package gutenverse-themes-builder
 */
class Export_Library {

	/**
	 * Zipped file result
	 *
	 * @var $fileresult
	 */
	public $fileresult;

	/**
	 * List of Config
	 *
	 * @var array
	 */
	private $config;

	/**
	 * Init constructor.
	 */
	public function __construct() {
		$this->start();
	}

	/**
	 * Start Export Library
	 */
	public function start() {
		$theme_id    = get_option( 'gtb_active_theme_id' );
		$info_db     = Database::instance()->theme_info;
		$theme_data  = $info_db->get_theme_data( $theme_id );
		$data        = $theme_data[0];
		$uploads_dir = trailingslashit( wp_upload_dir()['basedir'] ) . $data['slug'] . '-library';
		wp_mkdir_p( $uploads_dir );
		$this->extractor_saved_template( $uploads_dir, $theme_id );
		$this->extractor_patterns( $uploads_dir, $theme_id );
		$this->extractor_send_file( $uploads_dir, $data );
	}

	/**
	 * Create File from block pattern.
	 *
	 * @param string $uploads_dir string.
	 * @param int    $theme_id int.
	 */
	public function extractor_patterns( $uploads_dir, $theme_id ) {
		$args = array(
			'post_type'      => 'gutenverse-pattern',
			'posts_per_page' => -1,
			'meta_query'     => array(
				array(
					'key'     => '_pattern_theme_id',
					'value'   => $theme_id,
					'compare' => '=',
				),
			),
		);

		$posts = get_posts( $args );
		foreach ( $posts as $post ) {
			$content        = $this->get_pattern_content( $post->post_content, $theme_id );
			$content        = str_replace( "'", "\'", $content );
			$filename       = sanitize_title( $post->post_name ) . '.json';
			$global_data    = $this->extractor_extract_global_variables( $content );
			$content_global = $this->replace_global_variables( $content, 'slug' );
			$json           = $this->extractor_extract_image_to_array( $content_global, $global_data );
			$target_dir     = $uploads_dir . '/sections/global-content';
			if ( ! is_dir( $target_dir ) ) {
				wp_mkdir_p( $target_dir );
			}
			$this->extractor_write_file( "$target_dir/$filename", wp_json_encode( $json ) );

			$content_normal = $this->replace_global_variables( $content, 'real_value' );
			$json2          = $this->extractor_extract_image_to_array( $content_normal );
			$target_dir     = $uploads_dir . '/sections/normal-content';
			if ( ! is_dir( $target_dir ) ) {
				wp_mkdir_p( $target_dir );
			}
			$this->extractor_write_file( "$target_dir/$filename", wp_json_encode( $json2 ) );
		}
	}
	/**
	 * Create File from template.
	 *
	 * @param string $uploads_dir string.
	 * @param int    $theme_id int.
	 */
	public function extractor_saved_template( $uploads_dir, $theme_id ) {
		$templates_db      = Database::instance()->theme_templates;
		$templates_data    = $templates_db->get_data( $theme_id );
		$html_content      = array();
		$templates_content = get_block_templates( array(), 'wp_template' );
		$parts_content     = get_block_templates( array(), 'wp_template_part' ); // phpcs:ignore
		$headers           = array();
		$footers           = array();

		foreach ( $templates_content as $template ) {
			$html_content[ $template->slug ] = $template->content;
		}

		foreach ( $parts_content as $part ) {
			$html_content[ $part->slug ] = $part->content;
		}

		foreach ( $templates_data as $template ) {
			$template_name = strtolower( str_replace( ' ', '-', $template['name'] ) );
			$slug_key      = strtolower( $template['category'] . '-' . $template_name );

			if ( 'header' === $template['template_type'] ) {
				$content = $html_content[ $slug_key ];
				$content = $this->get_pattern_content( $content, $theme_id );
				$header  = array(
					'from' => $template['category'] . '-' . $template_name,
					'to'   => $content,
				);

				array_push( $headers, $header );
			}

			if ( 'footer' === $template['template_type'] ) {
				$content = $html_content[ $slug_key ];
				$content = $this->get_pattern_content( $content, $theme_id );
				$footer  = array(
					'from' => $template['category'] . '-' . $template_name,
					'to'   => $content,
				);

				array_push( $footers, $footer );
			}
		}

		foreach ( $templates_data as $template ) {
			if ( ! gutenverse_themes_builder_check_theme_mode( $template['category'], $theme_id ) ) {
				continue;
			}

			$template_name = strtolower( str_replace( ' ', '-', $template['name'] ) );

			$slug_key = strtolower( $template['category'] . '-' . $template_name );

			if ( ! empty( $html_content[ $slug_key ] ) ) {
				$content = $this->get_pattern_content( $html_content[ $slug_key ], $theme_id );
				$content = str_replace( "'", "\'", $content );
				foreach ( $headers as $header ) {
					$search  = '/<!--\s*wp:template-part\s*{"slug":"' . preg_quote( $header['from'], '/' ) . '","theme":"' . preg_quote( get_stylesheet(), '/' ) . '"(?:,"area":"(uncategorized|header)")?\s*} \/-->/';
					$replace = $header['to'];
					$content = preg_replace( $search, $replace, $content );
				}

				foreach ( $footers as $footer ) {
					$search  = '/<!--\s*wp:template-part\s*{"slug":"' . preg_quote( $footer['from'], '/' ) . '","theme":"' . preg_quote( get_stylesheet(), '/' ) . '"(?:,"area":"(uncategorized|footer)")?\s*} \/-->/';
					$replace = $footer['to'];
					$content = preg_replace( $search, $replace, $content );
				}
				$filename = sanitize_title( $template_name ) . '.json';

				$content_normal = $this->replace_global_variables( $content, 'real_value' );
				$json2          = $this->extractor_extract_image_to_array( $content_normal );
				$target_dir     = $uploads_dir . '/templates';
				if ( ! is_dir( $target_dir ) ) {
					wp_mkdir_p( $target_dir );
				}
				$this->extractor_write_file( "$target_dir/$filename", wp_json_encode( $json2 ) );
			}
		}
	}

	/**
	 * Get Pattern Content
	 *
	 * @param string $html_content .
	 * @param int    $theme_id .
	 *
	 * @return string
	 */
	public function get_pattern_content( $html_content, $theme_id ) {
		$html_blocks = parse_blocks( $html_content );
		$blocks      = _flatten_blocks( $html_blocks );

		foreach ( $blocks as $block ) {
			if ( 'gutenverse-themes-builder/pattern-wrapper' === $block['blockName'] ) {
				$pattern_before = serialize_block( $block );
				$pattern_after  = '';
				if ( ! empty( $block['attrs']['pattern']['value'] ) ) {
					$pattern_name = $block['attrs']['pattern']['value'];

					$posts = get_posts(
						array(
							'post_type' => 'gutenverse-pattern',
							'name'      => $pattern_name,
						)
					);

					if ( ! empty( $posts ) ) {
						$pattern_theme_id = get_post_meta( $posts[0]->ID, '_pattern_theme_id', true );

						if ( $theme_id === $pattern_theme_id ) {
							$pattern_after = $posts[0]->post_content;
							$html_content  = str_replace( $pattern_before, $pattern_after, $html_content );
						}
					}
				}
			}
		}

		return $html_content;
	}

	/**
	 * Build Valid Import from pattern.
	 *
	 * @param string $pattern string.
	 * @param array  $global .
	 *
	 * @return array
	 */
	public function extractor_extract_image_to_array( $pattern, $global = null ) {
		preg_match_all( '/http.\S*.(?:\.png|\.jpg|\.svg|\.jpeg|\.gif|\.webp)/U', $pattern, $matches );
		$matches = $this->extractor_normalize_array( array_unique( $matches[0] ) );
		$images  = $this->extractor_filter_image( $matches );
		$pattern = $this->extractor_replace_image( $pattern, $matches, $images );
		$array   = array(
			'images'   => $images,
			'contents' => $pattern,
		);
		if ( $global ) {
			$array = array_merge( $array, $global );
		}

		return $array;
	}

	/**
	 * Normalize Array Key
	 *
	 * @param array $arrays array.
	 */
	public function extractor_normalize_array( $arrays ) {
		$data = array();

		foreach ( $arrays as $item ) {
			$data[] = $item;
		}

		return $data;
	}

	/**
	 * Only include unresized image.
	 *
	 * @param array $images list of image.
	 *
	 * @return array
	 */
	public function extractor_filter_image( $images ) {
		$container = array();

		foreach ( $images as $image ) {
			preg_match( '/\d+x\d+\.(?:png|jpg|svg|jpeg|gif|webp)$/i', $image, $matches );

			if ( empty( $matches ) ) {
				$container[] = $image;
			}
		}

		return $container;
	}

	/**
	 * Replace image with pattern.
	 *
	 * @param string $pattern pattern.
	 * @param array  $images array.
	 * @param array  $image_index image index.
	 *
	 * @return string
	 */
	public function extractor_replace_image( $pattern, $images, $image_index ) {
		foreach ( $images as $image ) {
			$index       = $this->extractor_get_image_index( $image, $image_index );
			$replacement = "{{{image:${index}:url}}}";
			$pattern     = str_replace( $image, $replacement, $pattern );
		}

		return $pattern;
	}

	/**
	 * Replace index of resized image into normal image.
	 *
	 * @param string $needle pattern.
	 * @param array  $haystack array.
	 *
	 * @return string
	 */
	public function extractor_get_image_index( $needle, $haystack ) {
		$test     = preg_replace( '/-\d+x\d+/', '', $needle );
		$haystack = array_flip( $haystack );

		return isset( $haystack[ $test ] ) ? $haystack[ $test ] : 0;
	}

	/**
	 * Write content into disk.
	 *
	 * @param string $path string.
	 * @param string $content string.
	 */
	public function extractor_write_file( $path, $content ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		global $wp_filesystem;
		$wp_filesystem->put_contents(
			$path,
			$content,
			FS_CHMOD_FILE
		);
	}

	/**
	 * Replace global variable
	 *
	 * @param string $pattern .
	 * @param string $replace_as .
	 */
	private function replace_global_variables( $pattern, $replace_as ) {
		// First match that only have two content: type and id.
		preg_match_all( '/{"type":"variable","id":"([^"]*)"(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}/', $pattern, $matches );

		if ( ! empty( $matches ) ) {

			$color_arr = $this->get_theme_colors();
			$font_arr  = $this->get_theme_fonts();

			foreach ( $matches[1] as $variable ) {
				$variable_pattern = '/{"type":"variable","id":"' . $variable . '"(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}/';
				if ( 'slug' === $replace_as ) {
					// Replace colors.
					if ( isset( $color_arr[ $variable ] ) ) {
						$color_replace = '/{"type":"variable","id":"' . $color_arr[ $variable ]['slug'] . '}';
						$pattern       = preg_replace( $variable_pattern, $color_replace, $pattern );
					}
				} else {
					// Replace colors.
					if ( isset( $color_arr[ $variable ] ) ) {
						$color_replace = $color_arr[ $variable ]['rgb'];
						$pattern       = preg_replace( $variable_pattern, $color_replace, $pattern );
					}
					// Replace fonts.
					if ( isset( $font_arr[ $variable ] ) ) {
						$font_replace = $font_arr[ $variable ]['font'];
						$pattern      = preg_replace( $variable_pattern, $font_replace, $pattern );
					}
				}
			}
		}
		return $pattern;
	}

	/**
	 * Extract global variables.
	 *
	 * @param string $content .
	 *
	 * @return array
	 */
	private function extractor_extract_global_variables( $content ) {
		preg_match_all( '/{"type":"variable","id":"([^"]*)"(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}/', $content, $matches );
		if ( ! empty( $matches ) ) {
			$color_arr = $this->get_theme_colors();
			$font_arr  = $this->get_theme_fonts();

			$global_color = array();
			$global_font  = array();

			foreach ( $matches[1] as $match ) {
				if ( $color_arr[ $match ] ) {
					$color_item     = array(
						'slug'  => $color_arr[ $match ]['slug'],
						'name'  => $color_arr[ $match ]['name'],
						'color' => $color_arr[ $match ]['color'],
					);
					$global_color[] = $color_item;
				}

				if ( $font_arr[ $match ] ) {
					$font_item     = array(
						'slug' => $font_arr[ $match ]['slug'],
						'name' => $font_arr[ $match ]['name'],
						'font' => $font_arr[ $match ]['font'],
					);
					$global_font[] = $font_item;
				}
			}

			$json['global'] = array(
				'color' => $global_color,
				'font'  => $global_font,
			);
		}

		return $json;
	}

	/**
	 * Get theme colors
	 */
	private function get_theme_colors() {
		$color_settings = Misc::get_color_settings();
		$theme_dir      = get_template_directory() . '/theme.json';
		$config         = array();

		if ( $theme_dir ) {
			$decoded_file = wp_json_file_decode( $theme_dir, array( 'associative' => true ) );
			if ( is_array( $decoded_file ) ) {
				$config = $decoded_file;
			}
		}

		$new_arr = array();

		// Manually add default colors for now.
		$new_arr['black'] = array(
			'slug'  => 'black',
			'name'  => 'Black',
			'color' => '#000000',
			'rgb'   => $this->hex2rgb( '#000000' ),
		);

		$new_arr['cyan-bluish-gray'] = array(
			'slug'  => 'cyan-bluish-gray',
			'name'  => 'Cyan Bluish Gray',
			'color' => '#abb8c3',
			'rgb'   => $this->hex2rgb( '#abb8c3' ),
		);

		$new_arr['white'] = array(
			'slug'  => 'white',
			'name'  => 'White',
			'color' => '#ffffff',
			'rgb'   => $this->hex2rgb( '#ffffff' ),
		);

		$new_arr['pale-pink'] = array(
			'slug'  => 'pale-pink',
			'name'  => 'Pale Pink',
			'color' => '#f78da7',
			'rgb'   => $this->hex2rgb( '#f78da7' ),
		);

		$new_arr['vivid-red'] = array(
			'slug'  => 'vivid-red',
			'name'  => 'Vivid Red',
			'color' => '#cf2e2e',
			'rgb'   => $this->hex2rgb( '#cf2e2e' ),
		);

		$new_arr['luminous-vivid-orange'] = array(
			'slug'  => 'luminous-vivid-orange',
			'name'  => 'Luminous Vivid Orange',
			'color' => '#ff6900',
			'rgb'   => $this->hex2rgb( '#ff6900' ),
		);

		$new_arr['light-green-cyan'] = array(
			'slug'  => 'light-green-cyan',
			'name'  => 'Light Green Cyan',
			'color' => '#7bdcb5',
			'rgb'   => $this->hex2rgb( '#7bdcb5' ),
		);

		$new_arr['vivid-green-cyan'] = array(
			'slug'  => 'vivid-green-cyan',
			'name'  => 'Vivid Green Cyan',
			'color' => '#00d084',
			'rgb'   => $this->hex2rgb( '#00d084' ),
		);

		$new_arr['pale-cyan-blue'] = array(
			'slug'  => 'pale-cyan-blue',
			'name'  => 'Pale Cyan Blue',
			'color' => '#8ed1fc',
			'rgb'   => $this->hex2rgb( '#8ed1fc' ),
		);

		$new_arr['vivid-cyan-blue'] = array(
			'slug'  => 'vivid-cyan-blue',
			'name'  => 'Vivid Cyan Blue',
			'color' => '#0693e3',
			'rgb'   => $this->hex2rgb( '#0693e3' ),
		);

		$new_arr['vivid-purple'] = array(
			'slug'  => 'vivid-purple',
			'name'  => 'Vivid Purple',
			'color' => '#9b51e0',
			'rgb'   => $this->hex2rgb( '#9b51e0' ),
		);

		foreach ( $config['settings']['color']['palette'] as $color ) {
			$new_arr[ $color['slug'] ] = array(
				'slug'  => $color['slug'],
				'name'  => $color['name'],
				'color' => $color['color'],
				'rgb'   => $this->hex2rgb( $color['color'] ),
			);
		}

		/** Add global color gutenverse */
		if ( count( $color_settings ) > 0 ) {
			foreach ( $color_settings as $key => $value ) {
				$slug = $value->slug ?? Misc::sluggify( $value->name );
				if ( ! isset( $new_arr[ $slug ] ) ) {
					$new_arr[ $value->slug ] = array(
						'slug'  => $slug,
						'name'  => $value->name,
						'color' => $value->color,
						'rgb'   => $this->hex2rgb( $value->color ),
					);
				}
			}
		}
		return $new_arr;
	}

	/**
	 * Hex to RGB
	 *
	 * @param string $hex .
	 */
	private function hex2rgb( $hex ) {
		$hex = str_replace( '#', '', $hex );

		$r = hexdec( substr( $hex, 0, 2 ) );
		$g = hexdec( substr( $hex, 2, 2 ) );
		$b = hexdec( substr( $hex, 4, 2 ) );

		if ( strlen( $hex ) === 8 ) {
			$a = hexdec( substr( $hex, 6, 2 ) ) / 255;
		}

		return '{"r":' . $r . ',"g":' . $g . ',"b":' . $b . ',"a":' . $a . '}';
	}

	/**
	 * Get Theme Fonts
	 *
	 * @return array
	 */
	private function get_theme_fonts() {
		$fonts    = get_option( 'gutenverse-global-variable-font-' . get_stylesheet(), array() );
		$font_arr = array();
		foreach ( $fonts as $value ) {
			$font_slug                = $value['id'] ?? Misc::sluggify( $value['name'] );
			$font_arr[ $value['id'] ] = array(
				'slug' => $font_slug,
				'name' => $value['name'],
				'font' => wp_json_encode( $value['font'] ),
			);
		}
		return $font_arr;
	}

	/**
	 * Send File to User.
	 *
	 * @param string $uploads_dir .
	 * @param array  $data .
	 */
	public function extractor_send_file( $uploads_dir, $data ) {
		$zip_path = trailingslashit( wp_upload_dir()['basedir'] ) . $data['slug'] . '-library.zip';

		$zip = new ZipArchive();
		$zip->open( $zip_path, ZipArchive::CREATE | ZipArchive::OVERWRITE );

		$files = new RecursiveIteratorIterator(
			new RecursiveDirectoryIterator( $uploads_dir ),
			RecursiveIteratorIterator::LEAVES_ONLY
		);

		foreach ( $files as $name => $file ) {
			if ( ! $file->isDir() ) {
				$file_path     = $file->getRealPath();
				$relative_path = substr( $file_path, strlen( $uploads_dir ) + 1 );
				$zip->addFile( $file_path, $relative_path );
			}
		}

		$zip->close();

		$this->fileresult = array(
			'filename' => $data['slug'] . '-library.zip',
			'filepath' => $zip_path,
			'fileurl'  => wp_upload_dir()['baseurl'] . '/' . $data['slug'] . '-library.zip',
		);
	}
}
