<?php
/**
 * Export Theme Class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gtb
 */

namespace GTB;

use GTB\Database\Database;
use WP_Theme_Json_Resolver;
use ZipArchive;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;

/**
 * Export Theme Class
 *
 * @package gtb
 */
class Export_Theme {

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
		$theme_dir  = gtb_theme_built_path();

		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		global $wp_filesystem;

		if ( is_dir( $theme_dir ) ) {
			$wp_filesystem->rmdir( $theme_dir, true );
		}

		wp_mkdir_p( $theme_dir );

		$this->create_readme( $wp_filesystem, $data );
		$this->create_style_css( $wp_filesystem, $data );
		$this->create_theme_json( $wp_filesystem, $data );
		$this->create_function_php( $wp_filesystem, $data );
		$this->create_autoload_php( $wp_filesystem, $data );
		$this->create_init_php( $wp_filesystem, $data, $theme_id );
		$this->create_assets( $wp_filesystem, $data );
		$this->create_templates( $wp_filesystem, $theme_id, $data['slug'] );
		$this->register_patterns( $wp_filesystem, $data );
		$this->export_all_images( $wp_filesystem );
		$this->create_thumbnail( $wp_filesystem, $data );
		$this->create_dashboard( $wp_filesystem, $data );
		$this->extractor_send_file( $data );
	}

	/**
	 * Create Readme File
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public function create_readme( $system, $data ) {
		$placeholder = $system->get_contents( GTB_DIR . '/includes/data/readme.txt' );

		$theme_data = maybe_unserialize( $data['theme_data'] );
		$other      = maybe_unserialize( $data['other'] );

		if ( ! empty( $other['readme'] ) ) {
			$placeholder = $other['readme'];
		}

		$placeholder = ! empty( $theme_data['title'] ) ? str_replace( '{{title}}', $theme_data['title'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['author_name'] ) ? str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['wp_min_version'] ) ? str_replace( '{{wp_min_version}}', $theme_data['wp_min_version'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['wp_tested_version'] ) ? str_replace( '{{wp_tested_version}}', $theme_data['wp_tested_version'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['php_version'] ) ? str_replace( '{{php_version}}', $theme_data['php_version'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['description'] ) ? str_replace( '{{description}}', $theme_data['description'], $placeholder ) : $placeholder;

		$system->put_contents(
			gtb_theme_built_path() . 'readme.txt',
			$placeholder,
			FS_CHMOD_FILE
		);
	}

	/**
	 * Create Style.css File
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public function create_style_css( $system, $data ) {
		$placeholder = $system->get_contents( GTB_DIR . '/includes/data/style.txt' );

		$theme_data = maybe_unserialize( $data['theme_data'] );
		$theme_tags = ! empty( $theme_data['tags'] ) ? join( ',', $theme_data['tags'] ) : '';

		$placeholder = ! empty( $theme_data['title'] ) ? str_replace( '{{title}}', $theme_data['title'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['description'] ) ? str_replace( '{{description}}', $theme_data['description'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['author_name'] ) ? str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['author_uri'] ) ? str_replace( '{{author_uri}}', $theme_data['author_uri'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['theme_uri'] ) ? str_replace( '{{theme_uri}}', $theme_data['theme_uri'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['theme_version'] ) ? str_replace( '{{theme_version}}', $theme_data['theme_version'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['wp_min_version'] ) ? str_replace( '{{wp_min_version}}', $theme_data['wp_min_version'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['wp_tested_version'] ) ? str_replace( '{{wp_tested_version}}', $theme_data['wp_tested_version'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['php_version'] ) ? str_replace( '{{php_version}}', $theme_data['php_version'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['slug'] ) ? str_replace( '{{slug}}', $theme_data['slug'], $placeholder ) : $placeholder;
		$placeholder = str_replace( '{{tags}}', $theme_tags, $placeholder );

		$system->put_contents(
			gtb_theme_built_path() . 'style.css',
			$placeholder,
			FS_CHMOD_FILE
		);
	}

	/**
	 * Create Asset Files
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public function create_assets( $system, $data ) {
		$active     = get_option( 'gtb_active_theme_id' );
		$assets_db  = Database::instance()->theme_assets;
		$assets     = $assets_db->get_all_assets( $active );
		$queue      = '';
		$theme_data = maybe_unserialize( $data['theme_data'] );
		$theme_slug = str_replace( ' ', '_', strtoupper( $theme_data['slug'] ) );

		foreach ( $assets as $asset ) {
			if ( 'content' === $asset['media_type'] ) {
				$content = $asset['content'];
				$inc_dir = gtb_theme_built_path() . 'assets/' . $asset['type'];

				if ( ! is_dir( $inc_dir ) ) {
					wp_mkdir_p( $inc_dir );
				}

				if ( 'css' === $asset['type'] ) {
					$content = '.editor-styles-wrapper .wp-block.no-margin { margin-top: 0; margin-bottom: 0; } ' . $content;
				}

				$system->put_contents(
					$inc_dir . '/' . $asset['handler'] . '.' . $asset['type'],
					$asset['content'],
					FS_CHMOD_FILE
				);
			}

			switch ( $asset['media_type'] ) {
				case 'media':
					$string = $this->create_enqueue_string( $asset['handler'], $asset['type'], $asset['content'], $theme_data );
					break;
				case 'content':
					$media  = "{$theme_slug}_URI . '/assets/{$asset['type']}/{$asset['handler']}.{$asset['type']}'";
					$string = $this->create_enqueue_string( $asset['handler'], $asset['type'], $media, $theme_data );
					break;
				case 'WordPress':
					$string = $this->create_enqueue_string( $asset['handler'], $asset['type'], null, $theme_data );
					break;
			}

			$queue .= "\t\t{$string}\n";
		}

		$placeholder = $system->get_contents( GTB_DIR . '/includes/data/asset-enqueue.txt' );
		$placeholder = str_replace( '{{theme_slug_cap}}', ucfirst( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{theme_slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{title_upper}}', str_replace( ' ', '_', strtoupper( $theme_data['slug'] ) ), $placeholder );
		$placeholder = str_replace( '{{style_script_enqueue}}', $queue, $placeholder );

		$system->put_contents(
			gtb_theme_built_path() . '/inc/class/class-asset-enqueue.php',
			$placeholder,
			FS_CHMOD_FILE
		);
	}

	/**
	 * Create Enqueue String
	 *
	 * @param string $handler script handler name.
	 * @param string $type script type.
	 * @param string $media media path.
	 * @param string $theme_data theme data.
	 */
	public function create_enqueue_string( $handler, $type, $media = null, $theme_data ) {
		$theme_version = str_replace( ' ', '_', strtoupper( $theme_data['slug'] ) ) . '_VERSION';

		if ( 'null' === $media ) {
			if ( 'css' === $type ) {
				return "wp_enqueue_style( '{$handler}' );";
			} else {
				return "wp_enqueue_script( '{$handler}' );";
			}
		} elseif ( 'css' === $type ) {
				return "wp_enqueue_style( '{$handler}', {$media}, array(), {$theme_version} );";
		} else {
			return "wp_enqueue_script( '{$handler}', {$media}, array(), {$theme_version}, true );";
		}
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
	 * Get Style settings
	 */
	private function get_style_settings() {
		$theme  = wp_get_theme();
		$data   = WP_Theme_Json_Resolver::get_user_data_from_wp_global_styles( $theme );
		$data   = json_decode( $data['post_content'] );
		$styles = array();

		if ( ! empty( $data->styles ) ) {
			$styles = $data->styles;
		}

		return $styles;
	}

	/**
	 * Create Theme Json File
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public function create_theme_json( $system, $data ) {
		$placeholder = $system->get_contents( GTB_DIR . '/includes/data/theme-json.txt' );

		/**
		 * Generate Color Settings.
		 */
		$colors     = $this->get_color_settings();
		$fix_colors = array();

		// change colors slug into lowercase to prevent errors.
		foreach ( $colors as $index => $color ) {
			$fix_colors[] = array(
				'slug'  => 'theme-' . $index,
				'name'  => $color->name,
				'color' => $color->color,
			);
		}

		$placeholder = str_replace( '{{theme_color_settings}}', wp_json_encode( $fix_colors ), $placeholder );

		$styles     = $this->get_style_settings();
		$fix_styles = array(
			'spacing' => array(
				'blockGap' => 0,
			),
		);

		foreach ( $styles as $index => $style ) {
			$fix_styles[ $index ] = $style;
		}

		$fix_styles = $this->fix_colors( wp_json_encode( $fix_styles ) );

		$placeholder = str_replace( '{{theme_color_styles}}', $fix_styles, $placeholder );

		/**
		 * Generate Font Settings.
		 */
		$fonts_db = Database::instance()->theme_fonts;
		$active   = get_option( 'gtb_active_theme_id' );
		$fonts    = $fonts_db->get_all_fonts( $active );
		$families = array();

		foreach ( $fonts as &$item ) {
			$item['style']   = maybe_unserialize( $item['style'] );
			$item['weights'] = maybe_unserialize( $item['weights'] );
		}

		if ( ! empty( $fonts ) ) {
			$folder = gtb_theme_folder_path() . 'assets/fonts/';
			$src    = gtb_theme_built_path() . 'assets/fonts/';

			if ( ! is_dir( $src ) ) {
				wp_mkdir_p( $src );
			}

			foreach ( $fonts as $font ) {
				$slug        = strtolower( str_replace( ' ', '-', $font['family'] ) );
				$types       = array();
				$font_folder = $folder . $slug;
				$src_path    = $src . $slug;

				if ( ! is_dir( $src_path ) ) {
					wp_mkdir_p( $src_path );
				}

				if ( is_array( $font['style'] ) ) {
					foreach ( $font['weights'] as $weight ) {
						$font_weight = '400' === $weight ? 'regular' : $weight;
						$files       = scandir( $font_folder );

						if ( in_array( 'normal', $font['style'], true ) ) {
							$regular = '';

							foreach ( $files as $file ) {
								if ( strpos( $file, "{$font_weight}." ) !== false ) {
									$regular = $file;
								}
							}

							copy( "{$font_folder}/{$regular}", "{$src_path}/{$regular}" );

							$types[] = '{
								"fontFamily": "' . $font['family'] . '",
								"fontStretch": "normal",
								"fontStyle": "normal",
								"fontWeight": "' . $weight . '",
								"src": [
									"file:./assets/fonts/' . $slug . '/' . $regular . '"
								]
							}';
						}

						if ( in_array( 'italic', $font['style'], true ) ) {
							$italic = '';

							foreach ( $files as $file ) {
								$convert = 'regular' === $font_weight ? '' : $font_weight;
								if ( strpos( $file, "{$convert}italic." ) !== false ) {
									$italic = $file;
								}
							}

							copy( "{$font_folder}/{$italic}", "{$src_path}/{$italic}" );

							$types[] = '{
								"fontFamily": "' . $font['family'] . '",
								"fontStretch": "normal",
								"fontStyle": "italic",
								"fontWeight": "' . $weight . '",
								"src": [
									"file:./assets/fonts/' . $slug . '/' . $italic . '"
								]
							}';
						}
					}
				}

				$families[] = '{
					"fontFace": [
						' . join( ',', $types ) . '
					],
					"fontFamily": "' . $font['family'] . '",
					"name": "' . $font['family'] . '",
					"slug": "' . $slug . '"
				}';

			}
		}

		$placeholder = str_replace( '{{font_families}}', join( ',', $families ), $placeholder );

		/**
		 * Get font sizes
		 */
		$sizes_db  = Database::instance()->theme_fontsizes;
		$active    = get_option( 'gtb_active_theme_id' );
		$size_data = $sizes_db->get_all_fonts( $active );
		$sizes     = array();

		if ( ! empty( $size_data ) ) {
			foreach ( $size_data as $font ) {
				$sizes[] = '{
					"size": "' . $font['size'] . '",
					"slug": "' . $font['slug'] . '"
				}';
			}
		}

		$placeholder = str_replace( '{{font_sizes}}', ",\n\t\t\t\t" . join( ",\n\t\t\t\t", $sizes ), $placeholder );

		/**
		 * Update Layout Size
		 */
		if ( ! empty( $data ) ) {
			$theme_data = maybe_unserialize( $data['theme_data'] );

			$layout = array(
				'contentSize' => $theme_data['core_content_width'],
				'wideSize'    => $theme_data['core_wide_width'],
			);
		}

		$placeholder = str_replace( '{{layout_sizes}}', wp_json_encode( $layout ), $placeholder );

		/**
		 * Put content into file
		 */
		$system->put_contents(
			gtb_theme_built_path() . 'theme.json',
			$placeholder,
			FS_CHMOD_FILE
		);
	}

	/**
	 * Create Functions.php File
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public function create_function_php( $system, $data ) {
		$placeholder = $system->get_contents( GTB_DIR . '/includes/data/functions.txt' );

		$theme_data = maybe_unserialize( $data['theme_data'] );

		$placeholder = str_replace( '{{slug_upper}}', str_replace( ' ', '_', strtoupper( $theme_data['slug'] ) ), $placeholder );
		$placeholder = str_replace( '{{slug_cap}}', ucfirst( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder );
		$placeholder = str_replace( '{{theme_version}}', $theme_data['theme_version'], $placeholder );

		$system->put_contents(
			gtb_theme_built_path() . 'functions.php',
			$placeholder,
			FS_CHMOD_FILE
		);
	}

	/**
	 * Create autoload.php File
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public function create_autoload_php( $system, $data ) {
		$placeholder = $system->get_contents( GTB_DIR . '/includes/data/autoload.txt' );

		$theme_data = maybe_unserialize( $data['theme_data'] );

		$placeholder = str_replace( '{{slug_upper}}', str_replace( ' ', '_', strtoupper( $theme_data['slug'] ) ), $placeholder );
		$placeholder = str_replace( '{{slug_cap}}', ucfirst( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder );

		$inc_dir = gtb_theme_built_path() . 'inc';

		if ( ! is_dir( $inc_dir ) ) {
			wp_mkdir_p( $inc_dir );
		}

		$system->put_contents(
			$inc_dir . '/autoload.php',
			$placeholder,
			FS_CHMOD_FILE
		);
	}

	/**
	 * Create class-init.php File
	 *
	 * @param object $system .
	 * @param array  $data .
	 * @param string $theme_id .
	 */
	public function create_init_php( $system, $data, $theme_id ) {
		$placeholder = $system->get_contents( GTB_DIR . '/includes/data/init.txt' );

		$theme_data     = maybe_unserialize( $data['theme_data'] );
		$templates_db   = Database::instance()->theme_templates;
		$templates_data = $templates_db->get_data( $theme_id );

		$placeholder = str_replace( '{{theme_slug_cap}}', ucfirst( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{title}}', $theme_data['title'], $placeholder );
		$placeholder = str_replace( '{{description}}', str_replace( "'", "\'", $theme_data['description'] ), $placeholder );
		$placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder );
		$placeholder = str_replace( '{{slug_upper}}', str_replace( ' ', '_', strtoupper( $theme_data['slug'] ) ), $placeholder );

		// Build dashboard.

		if ( ! is_dir( gtb_theme_built_path() . 'assets/js' ) ) {
			wp_mkdir_p( gtb_theme_built_path() . 'assets/js' );
		}

		if ( ! is_dir( gtb_theme_built_path() . 'assets/css' ) ) {
			wp_mkdir_p( gtb_theme_built_path() . 'assets/css' );
		}

		copy( GTB_DIR . '/includes/data/assets/js/theme-dashboard.js', gtb_theme_built_path() . 'assets/js/theme-dashboard.js' );
		copy( GTB_DIR . '/includes/data/assets/css/theme-dashboard.css', gtb_theme_built_path() . 'assets/css/theme-dashboard.css' );

		$other    = maybe_unserialize( $data['other'] );
		$required = array();

		if ( ! empty( $other['plugins'] ) ) {
			foreach ( $other['plugins'] as $plugin ) {
				$required[] = "array(
					'slug'      => '{$plugin['value']}',
					'title'     => '{$plugin['label']}',
					'installed' => in_array( '{$plugin['value']}', \$plugins, true ),
				)";
				// $required[] = "'{$plugin['value']}' => in_array( '{$plugin['value']}', \$plugins, true )";
			}
		}

		$variable = "\$active_plugins = get_option( 'active_plugins' );
				\$plugins = array();
				foreach( \$active_plugins as \$active ) {
					\$plugins[] = explode( '/', \$active)[0];
				}";

		$placeholder = str_replace( '{{plugins_variable}}', $variable, $placeholder );
		$placeholder = str_replace( '{{plugins_required}}', join( ",\n\t\t\t\t", $required ), $placeholder );

		$uri   = str_replace( ' ', '_', strtoupper( $theme_data['slug'] ) ) . '_URI';
		$pages = array();
		if ( ! empty( $other['screenshots'] ) && ! empty( $other['screenshots']['dashboard'] ) ) {
			if ( ! is_dir( gtb_theme_built_path() . 'assets/img' ) ) {
				wp_mkdir_p( gtb_theme_built_path() . 'assets/img' );
			}

			foreach ( $other['screenshots']['dashboard'] as $key => $dashboard ) {
				$image_data = wp_remote_get( $dashboard['url'], array( 'sslverify' => false ) );

				if ( ! is_wp_error( $image_data ) ) {
					$system->put_contents(
						gtb_theme_built_path() . 'assets/img/' . $dashboard['filename'],
						$image_data['body'],
						FS_CHMOD_FILE
					);
				}

				$pages[] = "'page-{$key}' => {$uri} . 'assets/img/{$dashboard['filename']}'";
			}
		}

		$placeholder = str_replace( '{{page_list}}', join( ",\n\t\t\t\t", $pages ), $placeholder );

		// Load Gutenverse templates.
		$template_names = array();
		$template_cases = array();

		foreach ( $templates_data as $template ) {
			if ( in_array( $template['category'], array( 'gutenverse', 'pro' ), true ) ) {
				$template_name = strtolower( str_replace( ' ', '-', $template['name'] ) );
				$template_type = in_array( $template['template_type'], gtb_parts(), true ) ? 'parts' : 'templates';

				if ( 'templates' === $template_type ) {
					$template_names[] = "'{$template_name}'";
				}

				$template_cases[] = 'case \'' . $template_name . '\':
				return $directory . \'/gutenverse-templates/' . $template_type . '/' . $template_name . '.html\';';
			}
		}

		$placeholder = str_replace( '{{template_names}}', join( ",\r\n\t\t\t\t", $template_names ), $placeholder );
		$placeholder = str_replace( '{{template_cases}}', join( "\r\n\t\t\t", $template_cases ), $placeholder );

		// Generate Init Fonts.
		$global_fonts = get_option( 'gutenverse-global-variable-font-gutenverse-basic', false );
		$fonts        = '';

		if ( $global_fonts ) {
			foreach ( $global_fonts as $font ) {
				$fonts .= var_export( $font, true ) . ','; //phpcs:ignore
			}
		}

		$placeholder = str_replace( '{{theme_fonts}}', $fonts, $placeholder );
		$class_dir   = gtb_theme_built_path() . 'inc/class';

		if ( ! is_dir( $class_dir ) ) {
			wp_mkdir_p( $class_dir );
		}

		$system->put_contents(
			$class_dir . '/class-init.php',
			$placeholder,
			FS_CHMOD_FILE
		);
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
				$headers[ $template['category'] ] = $template['category'] . '-' . $template_name;
			}

			if ( 'footer' === $template['template_type'] ) {
				$footers[ $template['category'] ] = $template['category'] . '-' . $template_name;
			}
		}

		foreach ( $templates_data as $template ) {
			if ( ! gtb_check_theme_mode( $template['category'], $theme_id ) ) {
				continue;
			}

			$template_type = in_array( $template['template_type'], gtb_parts(), true ) ? 'parts' : 'templates';
			$template_name = strtolower( str_replace( ' ', '-', $template['name'] ) );
			$file_dir      = gtb_theme_folder_path() . '/' . $template['category'] . '/' . $template_type . '/' . $template_name . '.html';

			if ( file_exists( $file_dir ) ) {
				$target_dir  = $this->get_target_dir( $theme_id, $template['category'] ) . $template_type;
				$target_file = $target_dir . '/' . $template_name . '.html';

				if ( ! is_dir( $target_dir ) ) {
					wp_mkdir_p( $target_dir );
				}

				copy( $file_dir, $target_file );

				$slug_key = strtolower( $template['category'] . '-' . $template_name );
				if ( ! empty( $html_content[ $slug_key ] ) ) {
					$content = $this->fix_colors( $html_content[ $slug_key ] );
					$content = $this->fix_core_navigation( $content );
					$content = $this->build_patterns( $content, $theme_id, $system, $theme_slug );

					foreach ( $headers as $header ) {
						$search  = '<!-- wp:template-part {"slug":"' . $header . '","theme":"gutenverse-basic",';
						$replace = '<!-- wp:template-part {"slug":"header","theme":"' . $theme_slug . '",';
						$content = str_replace( $search, $replace, $content );
					}

					foreach ( $footers as $footer ) {
						$search  = '<!-- wp:template-part {"slug":"' . $footer . '","theme":"gutenverse-basic",';
						$replace = '<!-- wp:template-part {"slug":"footer","theme":"' . $theme_slug . '",';
						$content = str_replace( $search, $replace, $content );
					}

					$system->put_contents(
						$target_file,
						$content,
						FS_CHMOD_FILE
					);
				}
			}
		}
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
		$theme_mode  = gtb_get_theme_mode( $theme_id );
		$custom_dir  = gtb_theme_built_path() . '/' . $category . '-templates/';
		$default_dir = gtb_theme_built_path();

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
	 * Fix colors names
	 *
	 * @param string $content template content .
	 */
	private function fix_colors( $content ) {
		$colors = $this->get_color_settings();

		// change colors slug into lowercase to prevent errors.
		foreach ( $colors as $index => $color ) {
			$new_slug = 'theme-' . $index;
			$content  = str_replace( $color->slug, $new_slug, $content );
			$content  = str_replace( _wp_to_kebab_case( $color->slug ), $new_slug, $content );
		}

		return $content;
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

				$attributes  = json_encode( $attributes );
				$content     = $navigation->post_content;
				$block_after = "<!-- wp:navigation {$attributes} -->{$content}<!-- /wp:navigation -->";

				$html_content = str_replace( $block_before, $block_after, $html_content );
			}
		}

		return $html_content;
	}

	/**
	 * Build Patterns
	 *
	 * @param string $html_content .
	 * @param string $theme_id .
	 * @param object $system .
	 * @param string $theme_slug .
	 */
	private function build_patterns( $html_content, $theme_id, $system, $theme_slug ) {
		$html_blocks = parse_blocks( $html_content );
		$blocks      = _flatten_blocks( $html_blocks );
		$pattern_dir = gtb_theme_built_path() . '/inc/patterns/';

		if ( ! is_dir( $pattern_dir ) ) {
			wp_mkdir_p( $pattern_dir );
		}

		foreach ( $blocks as $block ) {
			if ( 'gutenverse-themes-builder/pattern-wrapper' === $block['blockName'] ) {
				$pattern_before = serialize_block( $block );
				$pattern_after  = '';

				if ( ! empty( $block['attrs']['pattern']['value'] ) ) {
					$pattern_name  = $block['attrs']['pattern']['value'];
					$pattern_title = $block['attrs']['pattern']['label'];

					$posts = get_posts(
						array(
							'post_type' => 'gutenverse-pattern',
							'name'      => $pattern_name,
						)
					);

					if ( ! empty( $posts ) ) {
						$pattern_theme_id = get_post_meta( $posts[0]->ID, '_pattern_theme_id', true );
						$pattern_category = get_post_meta( $posts[0]->ID, '_pattern_category', true );
						$pattern_category = empty( $pattern_category ) ? 'basic' : $pattern_category;
					}

					if ( $theme_id === $pattern_theme_id ) {
						$placeholder = $system->get_contents( GTB_DIR . '/includes/data/pattern.txt' );
						$target_file = $pattern_dir . '/' . $pattern_name . '.php';
						$content     = str_replace( "'", "\'", $posts[0]->post_content );
						$content     = $this->extract_images( $content, $system, $theme_slug );
						$content     = $this->fix_colors( $content );
						$content     = $this->fix_core_navigation( $content );
						$placeholder = str_replace( '{{pattern_title}}', $pattern_title, $placeholder );
						$placeholder = str_replace( '{{theme_slug}}', $theme_slug, $placeholder );
						$placeholder = str_replace( '{{pattern_category}}', $theme_slug . '-' . $pattern_category, $placeholder );
						$placeholder = str_replace( '{{pattern_content}}', $content, $placeholder );

						$system->put_contents(
							$target_file,
							$placeholder,
							FS_CHMOD_FILE
						);

						$pattern_after = '<!-- wp:pattern {"slug":"' . $theme_slug . '/' . $pattern_name . '"} /-->';

						switch ( $pattern_category ) {
							case 'pro':
								$this->pro_patterns[] = "'{$pattern_name}'";
								break;
							case 'gutenverse':
								$this->gutenverse_patterns[] = "\$block_patterns[] = '{$pattern_name}'";
								break;
							default:
								$this->core_patterns[] = "'{$pattern_name}'";
								break;
						}
					}

					$html_content = str_replace( $pattern_before, $pattern_after, $html_content );
				}
			}
		}

		return $html_content;
	}

	/**
	 * Filter image.
	 *
	 * @param string $image .
	 *
	 * @return array
	 */
	private function image_with_resolution( $image ) {
		// Capture image url that has resolution inside double quotes.
		preg_match( '/http[^"]*(-\d+x\d+[^"]*(\.png|\.jpg|\.svg|\.jpeg|\.gif|\.webp))/', $image, $matches );

		if ( empty( $matches ) ) {
			return false;
		}

		return array(
			'original' => $matches[0],
			'nores'    => str_replace( $matches[1], $matches[2], $matches[0] ),
		);
	}

	/**
	 * Extract Images
	 *
	 * @param string $content .
	 * @param object $system .
	 * @param string $slug .
	 */
	private function extract_images( $content, $system, $slug ) {
		// Capture image url inside double quotes.
		preg_match_all( '/http[^"]*(?:\.png|\.jpg|\.svg|\.jpeg|\.gif|\.webp)/U', $content, $matches );

		if ( ! empty( $matches[0] ) ) {
			foreach ( $matches[0] as $image ) {
				$this->add_image( $image );

				$image_arr  = explode( '/', $image );
				$image_name = $image_arr[ count( $image_arr ) - 1 ];
				$image_uri  = strtoupper( $slug ) . '_URI';
				$image_code = "' . esc_url( $image_uri ) . 'assets/img/$image_name";

				$content = str_replace( $image, $image_code, $content );
			}
		}

		return $content;
	}

	/**
	 * Add image to list
	 *
	 * @param string $image image url string .
	 */
	private function add_image( $image ) {
		$this->image_list[] = $image;
	}

	/**
	 * Register Patterns
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	private function register_patterns( $system, $data ) {
		$placeholder = $system->get_contents( GTB_DIR . '/includes/data/pattern-class.txt' );

		$theme_data = maybe_unserialize( $data['theme_data'] );

		$placeholder = str_replace( '{{theme_slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{theme_slug_cap}}', ucfirst( $theme_data['slug'] ), $placeholder );

		$core_pattern_list       = '';
		$gutenverse_pattern_list = '';

		if ( ! empty( $this->core_patterns ) ) {
			$core_pattern_list = join( ",\r\t\t\t", $this->core_patterns );
			$core_pattern_list = "$core_pattern_list,";
		}

		$placeholder = str_replace( '{{core_patterns}}', $core_pattern_list, $placeholder );

		if ( ! empty( $this->gutenverse_patterns ) ) {
			$gutenverse_pattern_list = join( ";\r\t\t\t", $this->gutenverse_patterns );
			$gutenverse_pattern_list = "$gutenverse_pattern_list;";
		}

		$placeholder = str_replace( '{{gutenverse_patterns}}', $gutenverse_pattern_list, $placeholder );

		$system->put_contents(
			gtb_theme_built_path() . '/inc/class/class-block-patterns.php',
			$placeholder,
			FS_CHMOD_FILE
		);
	}

	/**
	 * Export all images inside the template
	 *
	 * @param object $system .
	 */
	private function export_all_images( $system ) {
		$image_list = array_unique( $this->image_list );
		$img_dir    = gtb_theme_built_path() . '/assets/img';

		if ( ! is_dir( $img_dir ) ) {
			wp_mkdir_p( $img_dir );
		}

		foreach ( $image_list as $image ) {
			$image_res    = $this->image_with_resolution( $image );
			$image_target = $image;

			if ( in_array( $image_res['nores'], $image_list, true ) ) {
				$image_target = $image_res['nores'];
			}

			$image_arr   = explode( '/', $image_target );
			$image_name  = $image_arr[ count( $image_arr ) - 1 ];
			$destination = $img_dir . '/' . $image_name;

			if ( ! file_exists( $destination ) ) {
				$image_data = wp_remote_get( $image_target, array( 'sslverify' => false ) );

				if ( ! is_wp_error( $image_data ) ) {
					$system->put_contents(
						$destination,
						$image_data['body'],
						FS_CHMOD_FILE
					);
				}
			}
		}
	}

	/**
	 * Create Thumbnail
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	private function create_thumbnail( $system, $data ) {
		$other = maybe_unserialize( $data['other'] );

		if ( empty( $other['screenshots'] ) ) {
			return;
		}

		$image      = $other['screenshots']['thumbnail']['url'];
		$image_data = wp_remote_get( $image, array( 'sslverify' => false ) );

		if ( ! is_wp_error( $image_data ) ) {
			$system->put_contents(
				gtb_theme_built_path() . '/screenshot.jpg',
				$image_data['body'],
				FS_CHMOD_FILE
			);
		}
	}

	/**
	 * Create Dashboard
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	private function create_dashboard( $system, $data ) {
	}

	/**
	 * Send File to User.
	 *
	 * @param array $data .
	 */
	public function extractor_send_file( $data ) {
		$zip_path = trailingslashit( wp_upload_dir()['basedir'] ) . $data['slug'] . '.zip';

		$zip = new ZipArchive();
		$zip->open( $zip_path, ZipArchive::CREATE | ZipArchive::OVERWRITE );

		// Create recursive directory iterator.
		$files = new RecursiveIteratorIterator(
			new RecursiveDirectoryIterator( gtb_theme_built_path() ),
			RecursiveIteratorIterator::LEAVES_ONLY
		);

		foreach ( $files as $name => $file ) {
			if ( ! $file->isDir() ) {
				$file_path     = $file->getRealPath();
				$relative_path = substr( $file_path, strlen( trailingslashit( wp_upload_dir()['basedir'] ) ) );
				$zip->addFile( $file_path, $relative_path );
			}
		}

		$zip->close();

		$this->fileresult = array(
			'filename' => $data['slug'] . '.zip',
			'filepath' => $zip_path,
			'fileurl'  => wp_upload_dir()['baseurl'] . '/' . $data['slug'] . '.zip',
		);
	}
}