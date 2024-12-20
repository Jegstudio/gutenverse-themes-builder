<?php
/**
 * Export Templates Class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder;

use Gutenverse_Themes_Builder\Database\Database;
use InvalidArgumentException;
use WP_Theme_Json_Resolver;
use ZipArchive;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;

/**
 * Export Templates Class
 *
 * @package gutenverse-themes-builder
 */
class Export_Templates {

	/**
	 * Zipped file result
	 *
	 * @var $fileresult
	 */
	public $fileresult;

	/**
	 * Core Patterns
	 *
	 * @var array
	 */
	private $core_patterns;

	/**
	 * Gutenverse Patterns
	 *
	 * @var array
	 */
	private $gutenverse_patterns;


	/**
	 * Template Core Patterns
	 *
	 * @var array
	 */
	private $template_core_patterns;

	/**
	 * Template Gutenverse Patterns
	 *
	 * @var array
	 */
	private $template_gutenverse_patterns;

	/**
	 * Template Pro Patterns
	 *
	 * @var array
	 */
	private $template_pro_patterns;

	/**
	 * Page Pro Patterns
	 *
	 * @var array
	 */
	private $page_pro_patterns;

	/**
	 * Page Core Patterns
	 *
	 * @var array
	 */
	private $page_core_patterns;

	/**
	 * Page Gutenverse Patterns
	 *
	 * @var array
	 */
	private $page_gutenverse_patterns;

	/**
	 * Pro Patterns
	 *
	 * @var array
	 */
	private $pro_patterns;

	/**
	 * List of Images
	 *
	 * @var array
	 */
	private $image_list;

	/**
	 * Init constructor.
	 */
	public function __construct() {
		$this->image_list = array();

		$this->start();
	}

	/**
	 * Export Theme
	 */
	public function start() {
		$theme_id   = get_option( 'gtb_active_theme_id' );
		$info_db    = Database::instance()->theme_info;
		$theme_data = $info_db->get_theme_data( $theme_id );
		$data       = $theme_data[0];
		$theme_dir  = rtrim( gutenverse_themes_builder_theme_built_path(), '/' ) . '-demos/';

		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		global $wp_filesystem;

		if ( is_dir( $theme_dir ) ) {
			$wp_filesystem->rmdir( $theme_dir, true );
		}

		wp_mkdir_p( $theme_dir );
		$this->create_templates( $wp_filesystem, $theme_id, $data['slug'] );
		$this->create_pages( $wp_filesystem, $theme_id, $data );
		$this->extractor_send_file( $data );
	}

	/**
	 * Create Pages
	 *
	 * @param object $system .
	 * @param string $theme_id .
	 * @param array  $data .
	 */
	public function create_pages( $system, $theme_id, $data ) {
		$pages = new \WP_Query(
			array(
				'post_type'      => 'page',
				'posts_per_page' => -1,
				'meta_query' => array( //phpcs:ignore
					array(
						'key'     => '_gtb_page_theme_id',
						'value'   => $theme_id,
						'compare' => '===',
					),
				),
			)
		);

		$custom_dir = rtrim( gutenverse_themes_builder_theme_built_path(), '/' ) . '-demos/gutenverse-pages';
		if ( ! is_dir( $custom_dir ) ) {
			wp_mkdir_p( $custom_dir );
		}

		foreach ( $pages->posts as $page ) {
			$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/page-demo-json.txt' );

			$template = get_post_meta( $page->ID, '_wp_page_template', true );
			$parts    = explode( '-', $template );
			array_shift( $parts );
			$template_slug = implode( '-', $parts );

			$placeholder = ! empty( $template_slug ) ? str_replace( '{{template}}', $template_slug, $placeholder ) : str_replace( '{{template}}', 'page', $placeholder );

			/** Add Page Title */
			$placeholder = ! empty( $page->post_title ) ? str_replace( '{{page_title}}', $page->post_title, $placeholder ) : $placeholder;

			/**Add Is Homepage */
			$is_homepage = get_post_meta( $page->ID, '_gtb_page_is_homepage', true );
			if ( $is_homepage ) {
				$is_homepage = 'true';
			} else {
				$is_homepage = 'false';
			}
			$placeholder = str_replace( '{{is_homepage}}', $is_homepage, $placeholder );

			/**Add Content */
			$content     = $this->build_patterns( $page->post_content, $theme_id, $system, $data['slug'], true, 'page' );
			$content     = str_replace( "'", "\'", $content );
			$content     = $this->fix_core_navigation( $content );
			$placeholder = str_replace( '{{content}}', json_encode( $content ), $placeholder );

			/**Create the file*/
			$filename = strtolower( str_replace( ' ', '_', $page->post_title ) );
			$system->put_contents(
				rtrim( gutenverse_themes_builder_theme_built_path(), '/' ) . '-demos/gutenverse-pages/' . $filename . '.json',
				$placeholder,
				FS_CHMOD_FILE
			);
		}
	}

	/**
	 * Create Template Files
	 *
	 * @param object $system .
	 * @param string $theme_id .
	 * @param string $theme_slug .
	 */
	public function create_templates( $system, $theme_id, $theme_slug ) {
		$templates_db      = Database::instance()->theme_templates;
		$templates_data    = $templates_db->get_data( $theme_id );
		$html_content      = array();
		$templates_content = get_block_templates( array(), 'wp_template' ); // phpcs:ignore
		$parts_content     = get_block_templates( array(), 'wp_template_part' ); // phpcs:ignore
		$headers           = array();
		$footers           = array();
		$template_parts    = array();

		foreach ( $templates_content as $template ) {
			$html_content[ $template->slug ] = $template->content;
		}

		foreach ( $parts_content as $part ) {
			$html_content[ $part->slug ] = $part->content;
		}

		foreach ( $templates_data as $template ) {
			$template_name = strtolower( str_replace( ' ', '-', $template['name'] ) );

			if ( 'header' === $template['template_type'] ) {
				$header = array(
					'from' => $template['category'] . '-' . $template_name,
					'to'   => $template_name,
				);

				array_push( $headers, $header );
			}

			if ( 'footer' === $template['template_type'] ) {
				$footer = array(
					'from' => $template['category'] . '-' . $template_name,
					'to'   => $template_name,
				);

				array_push( $footers, $footer );
			}
		}

		foreach ( $templates_data as $template ) {
			if ( ! gutenverse_themes_builder_check_theme_mode( $template['category'], $theme_id ) ) {
				continue;
			}

			$template_type = in_array( $template['template_type'], gutenverse_themes_builder_parts(), true ) ? 'parts' : 'templates';
			$template_name = strtolower( str_replace( ' ', '-', $template['name'] ) );
			$file_dir      = gutenverse_themes_builder_theme_folder_path() . '/' . $template['category'] . '/' . $template_type . '/' . $template_name . '.html';

			if ( file_exists( $file_dir ) ) {
				$target_dir  = rtrim( gutenverse_themes_builder_theme_built_path(), '/' ) . '-demos/' . $template_type;
				$target_file = $target_dir . '/' . $template_name . '.html';

				if ( ! is_dir( $target_dir ) ) {
					wp_mkdir_p( $target_dir );
				}

				copy( $file_dir, $target_file );

				$slug_key = strtolower( $template['category'] . '-' . $template_name );
				if ( ! empty( $html_content[ $slug_key ] ) ) {
					$content = $this->fix_core_navigation( $html_content[ $slug_key ] );
					$content = $this->build_patterns( $content, $theme_id, $system, $theme_slug );
					foreach ( $headers as $header ) {
						$search  = '/<!--\s*wp:template-part\s*{"slug":"' . preg_quote( $header['from'], '/' ) . '","theme":"' . preg_quote( get_stylesheet(), '/' ) . '"(?:,"area":"(uncategorized|header)")?\s*} \/-->/';
						$replace = '<!-- wp:template-part {"slug":"' . $header['to'] . '","theme":"' . $theme_slug . '","area":"header"} /-->';
						$content = preg_replace( $search, $replace, $content );
					}

					foreach ( $footers as $footer ) {
						$search  = '/<!--\s*wp:template-part\s*{"slug":"' . preg_quote( $footer['from'], '/' ) . '","theme":"' . preg_quote( get_stylesheet(), '/' ) . '"(?:,"area":"(uncategorized|footer)")?\s*} \/-->/';
						$replace = '<!-- wp:template-part {"slug":"' . $footer['to'] . '","theme":"' . $theme_slug . '","area":"footer"} /-->';
						$content = preg_replace( $search, $replace, $content );
					}

					$system->put_contents(
						$target_file,
						$content,
						FS_CHMOD_FILE
					);
				}
			}

			// add blank and basic tempaltes.
			$canvas_target_dir = $this->get_target_dir( $theme_id, $template['category'] ) . 'templates';
			if ( ! file_exists( $canvas_target_dir . '/blank-canvas.html' ) ) {
				if ( 'core' === $template['category'] ) {
					$system->put_contents(
						$canvas_target_dir . '/blank-canvas.html',
						'<!-- wp:post-content /-->',
						FS_CHMOD_FILE
					);
				} else {
					$system->put_contents(
						$canvas_target_dir . '/blank-canvas.html',
						'<!-- wp:gutenverse/post-content {"elementId":"guten-gwZ6H6"} -->
<div class="guten-element guten-post-content guten-gwZ6H6"></div>
<!-- /wp:gutenverse/post-content -->',
						FS_CHMOD_FILE
					);
				}
			}
			if ( ! file_exists( $canvas_target_dir . '/template-basic.html' ) ) {
				if ( 'core' === $template['category'] ) {
					$system->put_contents(
						$canvas_target_dir . '/template-basic.html',
						'<!-- wp:template-part {"slug":"header"} /-->

<!-- wp:post-content /-->

<!-- wp:template-part {"slug":"footer"} /-->',
						FS_CHMOD_FILE
					);
				} else {
					$content = '<!-- wp:template-part {"slug":"--header_slug--","theme":"--theme_slug--","area":"uncategorized"} /-->

<!-- wp:gutenverse/post-content {"elementId":"guten-ReyA1K","margin":{"Desktop":{"unit":"px","dimension":{"top":""}}},"padding":{"Desktop":{}}} -->
<div class="guten-element guten-post-content guten-ReyA1K"></div>
<!-- /wp:gutenverse/post-content -->

<!-- wp:template-part {"slug":"--footer_slug--","theme":"--theme_slug--","area":"uncategorized"} /-->';

					$content     = preg_replace( "'--theme_slug--'", $theme_slug, $content );
					$header_slug = false;
					$footer_slug = false;
					foreach ( $headers as $header ) {
						$header_slug = $header['to'];
					}
					foreach ( $footers as $footer ) {
						$footer_slug = $footer['to'];
					}
					if ( $header_slug ) {
						$content = preg_replace( "'--header_slug--'", $header_slug, $content );
					} else {
						$content = preg_replace( "'--header_slug--'", 'header', $content );
					}
					if ( $footer_slug ) {
						$content = preg_replace( "'--footer_slug--'", $footer_slug, $content );
					} else {
						$content = preg_replace( "'--footer_slug--'", 'footer', $content );
					}

					$system->put_contents(
						$canvas_target_dir . '/template-basic.html',
						$content,
						FS_CHMOD_FILE
					);
				}
			}
		}
	}

	/**
	 * Build Patterns
	 *
	 * @param string  $html_content .
	 * @param string  $theme_id .
	 * @param object  $system .
	 * @param string  $theme_slug .
	 * @param boolean $only_get_content .
	 * @param string  $place .
	 */
	private function build_patterns( $html_content, $theme_id, $system, $theme_slug, $only_get_content = false, $place = 'template' ) {
		$html_blocks = parse_blocks( $html_content );
		$blocks      = _flatten_blocks( $html_blocks );

		$pattern_dir = rtrim( gutenverse_themes_builder_theme_built_path(), '/' ) . '-demos/patterns/';
		if ( ! is_dir( $pattern_dir ) ) {
			wp_mkdir_p( $pattern_dir );
		}

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
					}

					if ( $theme_id === $pattern_theme_id ) {
						$content          = str_replace( "'", "\'", $posts[0]->post_content );
						$content          = $this->extractor_extract_image_to_array( $content );
						$images           = $content['images'];
						$content          = $this->replace_global_variables( $content['contents'] );
						$content          = $this->fix_core_navigation( $content );
						$pattern_name     = $posts[0]->post_name;
						$pattern_title    = $posts[0]->post_title;
						$pattern_category = get_post_meta( $posts[0]->ID, '_pattern_category', true );
						$pattern_category = empty( $pattern_category ) ? 'basic' : $pattern_category;

						/** Create pattern php files */
						$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/pattern.txt' );
						$target_file = $pattern_dir . '/' . $pattern_name . '.php';
						$content     = $this->replace_template_part( $content, $theme_slug );
						$placeholder = str_replace( '{{pattern_title}}', $pattern_title, $placeholder );
						$placeholder = str_replace( '{{theme_slug}}', $theme_slug, $placeholder );
						$placeholder = str_replace( '{{pattern_category}}', $theme_slug . '-' . $pattern_category, $placeholder );
						$placeholder = str_replace( '{{pattern_content}}', $content, $placeholder );

						/**replace additional object with object sync */

						$additional  = "'pattern_slug' => '" . $theme_slug . '/' . $pattern_name . "',
						'images' => array(" . $this->format_image_array( $images ) . ')';
						$placeholder = str_replace( '{{additional_object}}', $additional, $placeholder );

						/**Add pattern to class_block_pattern array to register pattern */
						switch ( $pattern_category ) {
							case 'pro':
								if ( 'template' === $place ) {
									$this->template_pro_patterns[] = "\$block_patterns[] = '{$pattern_name}'";
								} elseif ( 'page' === $place ) {
									$this->page_pro_patterns[] = '"' . $pattern_name . '"';
								}
								break;
							case 'gutenverse':
								if ( 'template' === $place ) {
									$this->template_gutenverse_patterns[] = "\$block_patterns[] = '{$pattern_name}'";
								} elseif ( 'page' === $place ) {
									$this->page_gutenverse_patterns[] = '"' . $pattern_name . '"';
								}
								break;
							default:
								if ( 'template' === $place ) {
									$this->template_core_patterns[] = "'{$pattern_name}'";
								} elseif ( 'page' === $place ) {
									$this->page_core_patterns[] = '"' . $pattern_name . '"';
								}
								break;
						}

						$system->put_contents(
							$target_file,
							$placeholder,
							FS_CHMOD_FILE
						);

						$pattern_after = '<!-- wp:block {"ref":{{' . $theme_slug . '/' . $pattern_name . '}}} /-->';
					}

					$html_content = str_replace( $pattern_before, $pattern_after, $html_content );
				}
			}
		}

		return $html_content;
	}

	/**
	 * Format images array for use in PHP array string.
	 *
	 * @param array $images Array of images.
	 * @return string
	 */
	private function format_image_array( $images ) {
		$formatted_array = array();

		foreach ( $images as $key => $value ) {
			$formatted_array[] = "'$key' => '$value'";
		}

		// Join the array elements into a string.
		return implode( ', ', $formatted_array );
	}


	/**
	 * Send File to User.
	 *
	 * @param array $data .
	 */
	public function extractor_send_file( $data ) {
		$zip_path = trailingslashit( wp_upload_dir()['basedir'] ) . $data['slug'] . '-demos' . '.zip';

		$zip = new ZipArchive();
		$zip->open( $zip_path, ZipArchive::CREATE | ZipArchive::OVERWRITE );

		$target_directory = rtrim( gutenverse_themes_builder_theme_built_path(), '/' ) . '-demos/';
		$files            = new RecursiveIteratorIterator(
			new RecursiveDirectoryIterator( $target_directory ),
			RecursiveIteratorIterator::LEAVES_ONLY
		);

		foreach ( $files as $name => $file ) {
			if ( ! $file->isDir() ) {
				$file_path     = $file->getRealPath();
				$relative_path = substr( $file_path, strlen( $target_directory ) );

				if ( pathinfo( $file_path, PATHINFO_EXTENSION ) === 'html' ) {

					$file_content = file_get_contents( $file_path );

					$modified_content = $this->replace_global_variables( $file_content );

					$zip->addFromString( $relative_path, $modified_content );
				} else {
					$zip->addFile( $file_path, $relative_path );
				}
			}
		}

		$zip->close();

		$this->fileresult = array(
			'filename' => $data['slug'] . '-demos' . '.zip',
			'filepath' => $zip_path,
			'fileurl'  => wp_upload_dir()['baseurl'] . '/' . $data['slug'] . '-demos' . '.zip',
		);
	}

	/**
	 * Replace global variable
	 *
	 * @param string $pattern .
	 */
	public function replace_global_variables( $pattern ) {
		// First match that only have two content: type and id.
		preg_match_all( '/{"type":"variable","id":"([^"]*)"(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}/', $pattern, $matches );
		if ( ! empty( $matches ) ) {
			$color_arr = $this->get_theme_colors();
			$font_arr  = $this->get_theme_fonts();
			foreach ( $matches[1] as $variable ) {
				$variable_pattern = '/{"type":"variable","id":"' . $variable . '"(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}/';
				// Replace colors.
				if ( isset( $color_arr[ $variable ] ) ) {
					$color_replace = $color_arr[ $variable ];
					$pattern       = preg_replace( $variable_pattern, $color_replace, $pattern );
				}

				// Replace fonts.
				if ( isset( $font_arr[ $variable ] ) ) {
					$font_replace = $font_arr[ $variable ];
					$pattern      = preg_replace( $variable_pattern, $font_replace, $pattern );
				}
			}
		}
		return $pattern;
	}

	/**
	 * Get Theme Fonts
	 *
	 * @return array
	 */
	public function get_theme_fonts() {
		$fonts    = get_option( 'gutenverse-global-variable-font-' . get_stylesheet(), array() );
		$font_arr = array();

		foreach ( $fonts as $value ) {
			$font_arr[ $value['id'] ] = wp_json_encode( $value['font'] );
		}

		return $font_arr;
	}

	/**
	 * Get theme colors
	 */
	public function get_theme_colors() {
		$colors = $this->get_color_settings();
		if ( ! empty( $colors ) ) {
			$new_arr = array();

			// Manually add default colors for now.
			$new_arr['black']                 = $this->hex2rgb( '#000000' );
			$new_arr['cyan-bluish-gray']      = $this->hex2rgb( '#abb8c3' );
			$new_arr['white']                 = $this->hex2rgb( '#ffffff' );
			$new_arr['pale-pink']             = $this->hex2rgb( '#f78da7' );
			$new_arr['vivid-red']             = $this->hex2rgb( '#cf2e2e' );
			$new_arr['luminous-vivid-orange'] = $this->hex2rgb( '#ff6900' );
			$new_arr['luminous-vivid-amber']  = $this->hex2rgb( '#fcb900' );
			$new_arr['light-green-cyan']      = $this->hex2rgb( '#7bdcb5' );
			$new_arr['vivid-green-cyan']      = $this->hex2rgb( '#00d084' );
			$new_arr['pale-cyan-blue']        = $this->hex2rgb( '#8ed1fc' );
			$new_arr['vivid-cyan-blue']       = $this->hex2rgb( '#0693e3' );
			$new_arr['vivid-purple']          = $this->hex2rgb( '#9b51e0' );

			foreach ( $colors as $color ) {
				$new_arr[ $color->slug ] = $this->hex2rgb( $color->color );
			}
			return $new_arr;
		}

		return null;
	}

	/**
	 * Hex to RGB
	 *
	 * @param string $hex .
	 */
	public function hex2rgb( $hex ) {
		$hex = str_replace( '#', '', $hex );

		$r = hexdec( substr( $hex, 0, 2 ) );
		$g = hexdec( substr( $hex, 2, 2 ) );
		$b = hexdec( substr( $hex, 4, 2 ) );
		$a = 1;

		if ( strlen( $hex ) === 8 ) {
			$a = hexdec( substr( $hex, 6, 2 ) ) / 255;
		}

		return '{"r":' . $r . ',"g":' . $g . ',"b":' . $b . ',"a":' . $a . '}';
	}

	/**
	 * Build Valid Import from pattern.
	 *
	 * @param string $pattern string.
	 *
	 * @return array
	 */
	public function extractor_extract_image_to_array( $pattern ) {
		preg_match_all( '/https?:\/\/[^"\s]+(?:\.png|\.jpg|\.svg|\.jpeg|\.gif|\.webp)/', $pattern, $matches );
		$matches = $this->extractor_normalize_array( array_unique( $matches[0] ) );
		$images  = $this->extractor_filter_image( $matches );

		$pattern = $this->extractor_replace_image( $pattern, $matches, $images );

		$array = array(
			'images'   => $images,
			'contents' => $pattern,
		);

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
	 * Export Core Navigation blocks
	 *
	 * @param string $html_content .
	 */
	private function fix_core_navigation( $html_content ) {
		$html_blocks = parse_blocks( $html_content );
		$blocks      = _flatten_blocks( $html_blocks );

		foreach ( $blocks as $block ) {
			if ( 'core/navigation' === $block['blockName'] && ! empty( $block['attrs']['ref'] ) ) {
				$block_before = serialize_block( $block );
				$navigation   = get_post( $block['attrs']['ref'] );
				$attributes   = $block['attrs'];

				unset( $attributes['ref'] );

				$attributes  = wp_json_encode( $attributes );
				$content     = $navigation->post_content;
				$block_after = "<!-- wp:navigation {$attributes} -->{$content}<!-- /wp:navigation -->";

				$html_content = str_replace( $block_before, $block_after, $html_content );
			}
		}

		return $html_content;
	}

	/**
	 * Get Colors settings
	 */
	private function get_color_settings() {
		$theme  = wp_get_theme();
		$data   = WP_Theme_Json_Resolver::get_user_data_from_wp_global_styles( $theme );
		$data   = json_decode( $data['post_content'] );
		$colors = array();

		if ( ! empty( $data->settings->color->palette->custom ) ) {
			$colors = $data->settings->color->palette->custom;
		}

		return $colors;
	}

	/**
	 * Replace Template Part
	 *
	 * @param string $content .
	 * @param string $theme_slug .
	 *
	 * @return string
	 */
	public function replace_template_part( $content, $theme_slug ) {
		preg_match_all( '/<!-- wp:template-part {[^}]+} \\/-->/', $content, $matches );
		if ( isset( $matches[0] ) && ! empty( $matches[0] ) ) {
			foreach ( $matches as $match ) {
				preg_match( '/"slug":"([^"]+)"/', $match[0], $slug );
				if ( isset( $slug[0] ) ) {
					$arr_slug = explode( '-', $slug[1] );
					if ( isset( $arr_slug[1] ) ) {
						$part_name = $arr_slug[1];
						if ( 'core' === $arr_slug[0] || 'gutenverse' === $arr_slug[0] || 'pro' === $arr_slug[0] ) {
							if ( 'header' === $part_name ) {
								$replace = '<!-- wp:template-part {"slug":"' . $part_name . '","area":"header"} /-->';
							} elseif ( 'footer' === $part_name ) {
								$replace = '<!-- wp:template-part {"slug":"' . $part_name . '","area":"footer"} /-->';
							}
							$content = preg_replace( $match[0], $replace, $content );
						}
					}
				}
			}
		}
		return $content;
	}

	/**
	 * Check templates location
	 *
	 * @param string $theme_id .
	 * @param string $category .
	 *
	 * @return string
	 */
	private function get_target_dir( $theme_id, $category ) {
		$theme_mode  = gutenverse_themes_builder_get_theme_mode( $theme_id );
		$custom_dir  = gutenverse_themes_builder_theme_built_path() . '/' . $category . '-files/';
		$default_dir = gutenverse_themes_builder_theme_built_path();

		switch ( $theme_mode ) {
			case 'core-gutenverse':
				return 'gutenverse' === $category ? $custom_dir : $default_dir;
			case 'gutenverse-pro':
				return 'pro' === $category ? $custom_dir : $default_dir;
			case 'core-only':
			case 'gutenverse-only':
			case 'pro-only':
			default:
				return $default_dir;
		}
	}
}
