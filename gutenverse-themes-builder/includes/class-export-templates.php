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
	 * List of Menus
	 *
	 * @var array
	 */
	private $menu_list = array();

	/**
	 * List of Global Colors.
	 *
	 * @var array
	 */
	private $global_colors = array();

	/**
	 * List of Global Fonts.
	 *
	 * @var array
	 */
	private $global_fonts = array();

	/**
	 * Init constructor.
	 */
	public function __construct() {
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
			$content     = $this->extract_menus( $content, $system );
			$content     = $this->fix_core_navigation( $content );
			$placeholder = str_replace( '{{content}}', wp_json_encode( $content ), $placeholder );

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
					$content = $this->build_patterns( $content, $theme_id, $system, $theme_slug, $template_type );
					$content = $this->extract_menus( $content, $system );
					foreach ( $headers as $header ) {
						$search  = '/<!--\s*wp:template-part\s*{"slug":"' . preg_quote( $header['from'], '/' ) . '","theme":"' . preg_quote( get_stylesheet(), '/' ) . '"(?:,"area":"(uncategorized|header|template_part)")?\s*} \/-->/';
						$replace = '<!-- wp:template-part {"slug":"' . $header['to'] . '","area":"header"} /-->';
						$content = preg_replace( $search, $replace, $content );
					}
					foreach ( $footers as $footer ) {
						$search  = '/<!--\s*wp:template-part\s*{"slug":"' . preg_quote( $footer['from'], '/' ) . '","theme":"' . preg_quote( get_stylesheet(), '/' ) . '"(?:,"area":"(uncategorized|footer|template_part)")?\s*} \/-->/';
						$replace = '<!-- wp:template-part {"slug":"' . $footer['to'] . '","area":"footer"} /-->';
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
			// $canvas_target_dir = $this->get_target_dir( $theme_id, $template['category'] ) . 'templates';
			// if ( ! file_exists( $canvas_target_dir . '/blank-canvas.html' ) ) {
			// if ( 'core' === $template['category'] ) {
			// $system->put_contents(
			// $canvas_target_dir . '/blank-canvas.html',
			// '<!-- wp:post-content /-->',
			// FS_CHMOD_FILE
			// );
			// } else {
			// $system->put_contents(
			// $canvas_target_dir . '/blank-canvas.html',
			// '<!-- wp:gutenverse/post-content {"elementId":"guten-gwZ6H6"} -->
			// <div class="guten-element guten-post-content guten-gwZ6H6"></div>
			// <!-- /wp:gutenverse/post-content -->',
			// FS_CHMOD_FILE
			// );
			// }
			// }
			// if ( ! file_exists( $canvas_target_dir . '/template-basic.html' ) ) {
			// if ( 'core' === $template['category'] ) {
			// $system->put_contents(
			// $canvas_target_dir . '/template-basic.html',
			// '<!-- wp:template-part {"slug":"header"} /-->

			// <!-- wp:post-content /-->

			// <!-- wp:template-part {"slug":"footer"} /-->',
			// FS_CHMOD_FILE
			// );
			// } else {
			// $content = '<!-- wp:template-part {"slug":"--header_slug--","theme":"--theme_slug--","area":"uncategorized"} /-->

			// <!-- wp:gutenverse/post-content {"elementId":"guten-ReyA1K","margin":{"Desktop":{"unit":"px","dimension":{"top":""}}},"padding":{"Desktop":{}}} -->
			// <div class="guten-element guten-post-content guten-ReyA1K"></div>
			// <!-- /wp:gutenverse/post-content -->

			// <!-- wp:template-part {"slug":"--footer_slug--","theme":"--theme_slug--","area":"uncategorized"} /-->';

			// $content     = preg_replace( "'--theme_slug--'", $theme_slug, $content );
			// $header_slug = false;
			// $footer_slug = false;
			// foreach ( $headers as $header ) {
			// $header_slug = $header['to'];
			// }
			// foreach ( $footers as $footer ) {
			// $footer_slug = $footer['to'];
			// }
			// if ( $header_slug ) {
			// $content = preg_replace( "'--header_slug--'", $header_slug, $content );
			// } else {
			// $content = preg_replace( "'--header_slug--'", 'header', $content );
			// }
			// if ( $footer_slug ) {
			// $content = preg_replace( "'--footer_slug--'", $footer_slug, $content );
			// } else {
			// $content = preg_replace( "'--footer_slug--'", 'footer', $content );
			// }

			// $system->put_contents(
			// $canvas_target_dir . '/template-basic.html',
			// $content,
			// FS_CHMOD_FILE
			// );
			// }
			// }
		}
	}

	/**
	 * Build Patterns
	 *
	 * @param string $html_content .
	 * @param string $theme_id .
	 * @param object $system .
	 * @param string $theme_slug .
	 * @param string $template_type .
	 * @param string $place .
	 */
	private function build_patterns( $html_content, $theme_id, $system, $theme_slug, $template_type, $place = 'template' ) {
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
						$content          = $this->export_global_variables( $content['contents'] );
						$content          = $this->fix_core_navigation( $content );
						$content          = $this->extract_menus( $content, $system );
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

						/**Replace additional object with object sync */

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

						if ( 'parts' === $template_type ) {
							$pattern_after = '<!-- wp:pattern {"slug":"' . $theme_slug . '/' . $pattern_name . '"} /-->';
						}

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
		$zip_path = trailingslashit( wp_upload_dir()['basedir'] ) . $data['slug'] . '-demos.zip';

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

					$modified_content = $this->export_global_variables( $file_content );

					$zip->addFromString( $relative_path, $modified_content );
				} else {
					$zip->addFile( $file_path, $relative_path );
				}
			}
		}
		$zip->addFromString( 'global/color.json', wp_json_encode( $this->global_colors, JSON_UNESCAPED_SLASHES ) );
		$zip->addFromString( 'global/font.json', wp_json_encode( $this->global_fonts, JSON_UNESCAPED_SLASHES ) );
		$zip->addFromString( 'misc/menu.json', wp_json_encode( $this->menu_list, JSON_UNESCAPED_SLASHES ) );
		$zip->close();

		$this->fileresult = array(
			'filename' => $data['slug'] . '-demos.zip',
			'filepath' => $zip_path,
			'fileurl'  => wp_upload_dir()['baseurl'] . '/' . $data['slug'] . '-demos.zip',
		);
	}

	/**
	 * Replace global variable
	 *
	 * @param string $pattern .
	 */
	public function export_global_variables( $pattern ) {
		preg_match_all( '/{"type":"variable","id":"([^"]*)"(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}/', $pattern, $matches );

		if ( ! empty( $matches[1] ) ) {
			$color_arr = $this->get_theme_colors();
			$font_arr  = $this->get_theme_fonts();
			$pattern   = preg_replace_callback(
				'/({"type":"variable","id":"([^"]*)"(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})/',
				function ( $match ) use ( $color_arr, $font_arr ) {
					$json = json_decode( $match[1], true );

					if ( isset( $json['id'] ) && is_string( $json['id'] ) ) {
						if ( isset( $color_arr[ $json['id'] ] ) ) {
							$color_slug                         = $this->sluggify( $color_arr[ $json['id'] ]['name'] );
							$new_color                          = $color_arr[ $json['id'] ];
							$json['id']                         = $color_slug;
							$new_color['slug']                  = $color_slug;
							$this->global_colors[ $color_slug ] = $new_color;
						} elseif ( isset( $font_arr[ $json['id'] ] ) ) {
							$font_slug                        = $this->sluggify( $font_arr[ $json['id'] ]['name'] );
							$new_font                         = $font_arr[ $json['id'] ];
							$json['id']                       = $font_slug;
							$new_font['slug']                 = $font_slug;
							$this->global_fonts[ $font_slug ] = $new_font;

						}
					}

					return wp_json_encode( $json, JSON_UNESCAPED_SLASHES );
				},
				$pattern
			);
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
			$font_arr[ $value['id'] ] = $value;
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
			$new_arr = array(
				'black'                 => array(
					'name'  => 'Black',
					'slug'  => 'black',
					'color' => '#000000',
				),
				'cyan-bluish-gray'      => array(
					'name'  => 'Cyan Bluish Gray',
					'slug'  => 'cyan-bluish-gray',
					'color' => '#abb8c3',
				),
				'white'                 => array(
					'name'  => 'White',
					'slug'  => 'white',
					'color' => '#ffffff',
				),
				'pale-pink'             => array(
					'name'  => 'Pale Pink',
					'slug'  => 'pale-pink',
					'color' => '#f78da7',
				),
				'vivid-red'             => array(
					'name'  => 'Vivid Red',
					'slug'  => 'vivid-red',
					'color' => '#cf2e2e',
				),
				'luminous-vivid-orange' => array(
					'name'  => 'Luminous Vivid Orange',
					'slug'  => 'luminous-vivid-orange',
					'color' => '#ff6900',
				),
				'luminous-vivid-amber'  => array(
					'name'  => 'Luminous Vivid Amber',
					'slug'  => 'luminous-vivid-amber',
					'color' => '#fcb900',
				),
				'light-green-cyan'      => array(
					'name'  => 'Light Green Cyan',
					'slug'  => 'light-green-cyan',
					'color' => '#7bdcb5',
				),
				'vivid-green-cyan'      => array(
					'name'  => 'Vivid Green Cyan',
					'slug'  => 'vivid-green-cyan',
					'color' => '#00d084',
				),
				'pale-cyan-blue'        => array(
					'name'  => 'Pale Cyan Blue',
					'slug'  => 'pale-cyan-blue',
					'color' => '#8ed1fc',
				),
				'vivid-cyan-blue'       => array(
					'name'  => 'Vivid Cyan Blue',
					'slug'  => 'vivid-cyan-blue',
					'color' => '#0693e3',
				),
				'vivid-purple'          => array(
					'name'  => 'Vivid Purple',
					'slug'  => 'vivid-purple',
					'color' => '#9b51e0',
				),
			);

			foreach ( $colors as $color ) {
				$new_arr[ $color->slug ] = array(
					'name'  => ucfirst( str_replace( '-', ' ', $color->name ) ),
					'slug'  => $color->slug,
					'color' => $color->color,
				);
			}
			return $new_arr;
		}

		return null;
	}

	/**
	 * String to slug
	 *
	 * @param string $string .
	 * @param string $separator .
	 */
	public function sluggify( $string, $separator = '-' ) {
		$string = mb_strtolower( $string, 'UTF-8' );
		$string = preg_replace( '/[^a-z0-9]+/u', $separator, $string );
		$string = trim( $string, $separator );
		return $string;
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
	 *
	 * @return string
	 */
	public function replace_template_part( $content ) {
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

	/**
	 * Extract Menu
	 *
	 * @param string $content .
	 */
	public function extract_menus( $content ) {
		preg_match_all( '/"menuId":(\d+)/', $content, $matches );
		if ( ! empty( $matches[0] ) ) {
			foreach ( $matches[1] as $match ) {
				$menu_id    = $match;
				$menu_items = wp_get_nav_menu_items( $menu_id );
				$arr_menu   = array();
				foreach ( $menu_items as $item ) {
					$url         = $item->url;
					$object_slug = null;
					$parent_idx  = null;
					if ( 'page' === $item->object || 'post' === $item->object ) {
						$url         = '#';
						$post        = get_post( $item->object_id );
						$object_slug = str_replace( ' ', '-', strtolower( $post->post_title ) );
					}
					if ( 0 !== intval( $item->menu_item_parent ) ) {
						$parent_id = intval( $item->menu_item_parent );
						foreach ( $arr_menu as $key => $parent ) {
							if ( intval( $parent['id'] ) === $parent_id ) {
								$parent_idx = $key;
								break;
							}
						}
					}

					$arr_menu[] = array(
						'id'          => $item->ID,
						'title'       => $item->title,
						'url'         => $url,
						'parent'      => strval( $parent_idx ),
						'type'        => $item->object,
						'object_slug' => $object_slug,
						'have_child'  => false,
					);
					if ( null !== $parent_idx ) {
						$arr_menu[ $parent_idx ]['have_child'] = true;
					}
					$parent_idx = null;
				}
				$this->add_menus(
					array(
						'menu_id'   => $menu_id,
						'menu_data' => $arr_menu,
					)
				);
			}
		}
		return $content;
	}

	/**
	 * Add Menu
	 *
	 * @param string $menus .
	 */
	public function add_menus( $menus ) {
		$ids = array_column( $this->menu_list, 'menu_id' );
		if ( array_search( $menus['menu_id'], $ids, true ) === false ) {
			$this->menu_list[] = $menus;
		}
	}
}
