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
		$this->extractor_send_file( $data );

		// $this->create_readme( $wp_filesystem, $data );
		// $this->create_style_css( $wp_filesystem, $data );
		// $this->create_theme_json( $wp_filesystem, $data );
		// $this->create_autoload_php( $wp_filesystem, $data );
		// $this->create_init_php( $wp_filesystem, $data, $theme_id );
		// $this->create_assets( $wp_filesystem, $data );
		// $this->create_themeforest_data( $wp_filesystem, $data );
		// $this->register_patterns( $wp_filesystem, $data );
		// $this->export_all_images( $wp_filesystem );

		// // child theme .
		// $other = maybe_unserialize( $data['other'] );
		// if ( ! empty( $other['dashboard'] ) && isset( $other['dashboard']['mode'] ) && 'themeforest' === $other['dashboard']['mode']['value'] ) {
		// $this->create_child_theme( $wp_filesystem, $data );
		// }
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
					$content = $this->fix_colors( $html_content[ $slug_key ] );
					$content = $this->fix_core_navigation( $content );
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
	 * @param string $html_content .
	 * @param string $theme_id .
	 * @param object $system .
	 * @param string $theme_slug .
	 */
	private function build_patterns( $html_content, $theme_id, $system, $theme_slug ) {
		$html_blocks = parse_blocks( $html_content );
		$blocks      = _flatten_blocks( $html_blocks );
		$pattern_dir = gutenverse_themes_builder_theme_built_path() . '/inc/patterns/';

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
						$pattern_category = get_post_meta( $posts[0]->ID, '_pattern_category', true );
						$pattern_category = empty( $pattern_category ) ? 'basic' : $pattern_category;
					}

					if ( $theme_id === $pattern_theme_id ) {
						$pattern_after = str_replace( "'", "\'", $posts[0]->post_content );
						// $pattern_after = $this->extract_images( $pattern_after, $system, $theme_slug );
						$pattern_after = $this->fix_colors( $pattern_after );
						$pattern_after = $this->fix_core_navigation( $pattern_after );
						$pattern_after = $this->replace_template_part( $pattern_after, $theme_slug );
					}

					$html_content = str_replace( $pattern_before, $pattern_after, $html_content );
				}
			}
		}

		return $html_content;
	}

	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------

	/**
	 * Create Child Theme
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public function create_child_theme( $system, $data ) {
		$child_theme_dir = gutenverse_themes_builder_theme_built_path( null, false, true );
		if ( is_dir( $child_theme_dir ) ) {
			$system->rmdir( $child_theme_dir, true );
		}
		wp_mkdir_p( $child_theme_dir );
		$theme_data = maybe_unserialize( $data['theme_data'] );
		$other      = maybe_unserialize( $data['other'] );
		// style.
		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/style-child.txt' );
		$theme_tags  = ! empty( $theme_data['tags'] ) ? join( ',', $theme_data['tags'] ) : '';
		$placeholder = ! empty( $theme_data['title'] ) ? str_replace( '{{title}}', $theme_data['title'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['description'] ) ? str_replace( '{{description}}', $theme_data['description'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['author_name'] ) ? str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['author_uri'] ) ? str_replace( '{{author_uri}}', $theme_data['author_uri'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['theme_uri'] ) ? str_replace( '{{theme_uri}}', $theme_data['theme_uri'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['slug'] ) ? str_replace( '{{slug}}', $theme_data['slug'], $placeholder ) : $placeholder;
		$placeholder = str_replace( '{{tags}}', $theme_tags, $placeholder );

		$system->put_contents(
			$child_theme_dir . 'style.css',
			$placeholder,
			FS_CHMOD_FILE
		);

		// functions.
		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/functions-child.txt' );
		$placeholder = ! empty( $theme_data['slug'] ) ? str_replace( '{{slug}}', $theme_data['slug'], $placeholder ) : $placeholder;

		$system->put_contents(
			$child_theme_dir . 'functions.php',
			$placeholder,
			FS_CHMOD_FILE
		);

		// screenshot.
		if ( ! empty( $other['screenshots'] ) ) {
			$image      = $other['screenshots']['thumbnail']['url'];
			$image_data = wp_remote_get( $image, array( 'sslverify' => true ) );

			if ( ! is_wp_error( $image_data ) ) {
				$system->put_contents(
					$child_theme_dir . '/screenshot.jpg',
					$image_data['body'],
					FS_CHMOD_FILE
				);
			}
		}

		// zip.
		$zip_path = trailingslashit( wp_upload_dir()['basedir'] ) . $data['slug'] . '-child.zip';

		$zip = new ZipArchive();
		$zip->open( $zip_path, ZipArchive::CREATE | ZipArchive::OVERWRITE );

		// Create recursive directory iterator.
		$files = new RecursiveIteratorIterator(
			new RecursiveDirectoryIterator( gutenverse_themes_builder_theme_built_path( null, false, true ) ),
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

		$this->fileresult['child'] = array(
			'filename' => $data['slug'] . '-child.zip',
			'filepath' => $zip_path,
			'fileurl'  => wp_upload_dir()['baseurl'] . '/' . $data['slug'] . '-child.zip',
		);
	}

	/**
	 * Create Readme File
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public function create_readme( $system, $data ) {
		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/readme.txt' );

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
			gutenverse_themes_builder_theme_built_path() . 'readme.txt',
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
		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/style.txt' );

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

		$colors          = $this->get_color_settings();
		$imported_colors = get_option( 'gutenverse-global-color-import-' . $theme_data['slug'] );
		if ( $imported_colors ) {
			$add_css = '';
			/** Loop through imported colors to find duplicate colors */
			foreach ( $imported_colors as $import ) {
				foreach ( $colors as $idx => $color ) {
					if ( strtolower( $color->color ) === strtolower( $import->color ) ) {
						$add_css .= '--wp--preset--color--' . strtolower( $import->slug ) . ': var(--wp--preset--color--theme-' . $idx . ');';
						$add_css .= '--wp--preset--color--theme-' . $idx . ': var(--wp--preset--color--' . strtolower( $import->slug ) . ');';
					}
				}
			}
		}
		$placeholder = ! empty( $add_css ) ? str_replace( '{{additional_css}}', $add_css, $placeholder ) : str_replace( '{{additional_css}}', '', $placeholder );
		$system->put_contents(
			gutenverse_themes_builder_theme_built_path() . 'style.css',
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
		$theme_slug = $this->get_constant_name( $theme_data['slug'] );

		foreach ( $assets as $asset ) {
			if ( 'content' === $asset['media_type'] ) {
				$content = $asset['content'];
				$inc_dir = gutenverse_themes_builder_theme_built_path() . 'assets/' . $asset['type'];

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

		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/asset-enqueue.txt' );
		$placeholder = str_replace( '{{title}}', $theme_data['title'], $placeholder );
		$placeholder = str_replace( '{{theme_slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{constant}}', $this->get_constant_name( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{style_script_enqueue}}', $queue, $placeholder );
		$placeholder = str_replace( '{{namespace}}', $this->get_namespace( $theme_data['slug'] ), $placeholder );

		$system->put_contents(
			gutenverse_themes_builder_theme_built_path() . '/inc/class/class-asset-enqueue.php',
			$placeholder,
			FS_CHMOD_FILE
		);
	}

	/**
	 * Create Backend Api
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public function create_themeforest_data( $system, $data ) {
		$theme_data = maybe_unserialize( $data['theme_data'] );
		$other      = maybe_unserialize( $data['other'] );

		if ( empty( $other['dashboard'] ) || ( isset( $other['dashboard']['mode'] ) && 'default' === $other['dashboard']['mode']['value'] ) || ( isset( $other['dashboard']['mode'] ) && 'lite' === $other['dashboard']['mode']['value'] ) ) {
			return;
		}

		if ( ! empty( $other['dashboard']['templates'] ) ) {
			foreach ( $other['dashboard']['templates'] as $template ) {
				$slug      = strtolower( str_replace( ' ', '-', $template['name'] ) );
				$assigns[] = "array(
					'title' => '{$template['name']}',
					'page'  => '{$template['page_name']}',
					'slug'  => '{$slug}',
					'thumb' => '{$template['thumbnail']['url']}',
				)";
			}
		}

		$this->copy_dir( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/dashboard-fonts', gutenverse_themes_builder_theme_built_path() . 'assets/dashboard-fonts' );

		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/themeforest-data.txt' );
		$placeholder = str_replace( '{{assign_templates}}', join( ",\n\t\t\t\t", $assigns ), $placeholder );
		$placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder );
		$placeholder = str_replace( '{{slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{namespace}}', $this->get_namespace( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{constant}}', $this->get_constant_name( $theme_data['slug'] ), $placeholder );

		$system->put_contents(
			gutenverse_themes_builder_theme_built_path() . '/inc/class/class-themeforest-data.php',
			$placeholder,
			FS_CHMOD_FILE
		);

		$system->put_contents(
			gutenverse_themes_builder_theme_built_path() . '/index.php',
			$system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/index.txt' ),
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
		$theme_version = $this->get_constant_name( $theme_data['slug'] ) . '_VERSION';
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
		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/theme-json.txt' );

		/**
		 * Generate Color Settings.
		 */
		$colors     = $this->get_color_settings();
		$fix_colors = array();

		// change colors slug into lowercase to prevent errors.
		$idx = 0;
		foreach ( $colors as $color ) {
			$slug         = 'theme-' . $idx;
			$fix_colors[] = array(
				'slug'  => $slug,
				'name'  => $color->name,
				'color' => $color->color,
			);
			++$idx;
		}
		$theme_id        = get_option( 'gtb_active_theme_id' );
		$theme_db        = Database::instance()->theme_info;
		$theme_info      = $theme_db->get_theme_data( $theme_id );
		$theme_slug      = $theme_info[0]['slug'];
		$imported_colors = get_option( 'gutenverse-global-color-import-' . $theme_slug );
		if ( $imported_colors ) {
			/** Create an associative array to store the color of colors */
			$color_index = array();
			foreach ( $colors as $color ) {
				$color_index[ $color->color ] = true;
			}
			$import_filtered = array_filter(
				$imported_colors,
				function ( $import ) use ( $color_index ) {
					return ! isset( $color_index[ strtolower( $import->color ) ] );
				}
			);
			/** Loop through imported colors to find duplicate colors */
			foreach ( $import_filtered as $color ) {
				$fix_colors[] = array(
					'slug'  => $color->slug,
					'name'  => $color->name,
					'color' => $color->color,
				);
			}
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
			$folder = gutenverse_themes_builder_theme_folder_path() . 'assets/fonts/';
			$src    = gutenverse_themes_builder_theme_built_path() . 'assets/fonts/';

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

		$placeholder = ! empty( $sizes ) ? str_replace( '{{font_sizes}}', ",\n\t\t\t\t" . join( ",\n\t\t\t\t", $sizes ), $placeholder ) : str_replace( '{{font_sizes}}', '', $placeholder );

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
			gutenverse_themes_builder_theme_built_path() . 'theme.json',
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
		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/autoload.txt' );

		$theme_data = maybe_unserialize( $data['theme_data'] );

		$placeholder = str_replace( '{{constant}}', $this->get_constant_name( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{namespace}}', $this->get_namespace( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder );

		$inc_dir = gutenverse_themes_builder_theme_built_path() . 'inc';

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
		$theme_data     = maybe_unserialize( $data['theme_data'] );
		$templates_db   = Database::instance()->theme_templates;
		$templates_data = $templates_db->get_data( $theme_id );

		// Take which placeholder.
		if ( 'core-gutenverse' === $theme_data['theme_mode'] ) {
			$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/init-core-gutenverse.txt' );
		} else {
			$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/init-default.txt' );
		}

		$placeholder = str_replace( '{{namespace}}', $this->get_namespace( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{title}}', $theme_data['title'], $placeholder );
		$placeholder = str_replace( '{{description}}', str_replace( "'", "\'", $theme_data['description'] ), $placeholder );
		$placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder );
		$placeholder = str_replace( '{{constant}}', $this->get_constant_name( $theme_data['slug'] ), $placeholder );

		// Build dashboard.

		if ( ! is_dir( gutenverse_themes_builder_theme_built_path() . 'assets/js' ) ) {
			wp_mkdir_p( gutenverse_themes_builder_theme_built_path() . 'assets/js' );
		}

		if ( ! is_dir( gutenverse_themes_builder_theme_built_path() . 'assets/css' ) ) {
			wp_mkdir_p( gutenverse_themes_builder_theme_built_path() . 'assets/css' );
		}

		if ( ! is_dir( gutenverse_themes_builder_theme_built_path() . 'assets/img' ) ) {
			wp_mkdir_p( gutenverse_themes_builder_theme_built_path() . 'assets/img' );
		}

		$other = maybe_unserialize( $data['other'] );

		if ( ! empty( $other['dashboard'] ) ) {
			if ( isset( $other['dashboard']['mode'] ) && 'themeforest' === $other['dashboard']['mode']['value'] ) {
				$dashboard_script = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/js/themeforest/theme-dashboard.js' );
				$dashboard_script = str_replace( '--gtb-theme-namespace--', $theme_data['slug'], $dashboard_script );
				$system->put_contents(
					gutenverse_themes_builder_theme_built_path() . 'assets/js/theme-dashboard.js',
					$dashboard_script,
					FS_CHMOD_FILE
				);
				copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/css/themeforest/theme-dashboard.css', gutenverse_themes_builder_theme_built_path() . 'assets/css/theme-dashboard.css' );
				copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/img/bg-dashboard-tf.png', gutenverse_themes_builder_theme_built_path() . 'assets/img/bg-dashboard-tf.png' );
				copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/img/bg-upgrade-pro.png', gutenverse_themes_builder_theme_built_path() . 'assets/img/bg-upgrade-pro.png' );
				copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/img/bg-upgrade-wizard.png', gutenverse_themes_builder_theme_built_path() . 'assets/img/bg-upgrade-wizard.png' );
				copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/img/upgrade-content.png', gutenverse_themes_builder_theme_built_path() . 'assets/img/upgrade-content.png' );
				copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/img/final.png', gutenverse_themes_builder_theme_built_path() . 'assets/img/final.png' );
				copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/img/icon-demo.png', gutenverse_themes_builder_theme_built_path() . 'assets/img/icon-demo.png' );
				copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/img/icon-plugin.png', gutenverse_themes_builder_theme_built_path() . 'assets/img/icon-plugin.png' );
				copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/img/icon-support.png', gutenverse_themes_builder_theme_built_path() . 'assets/img/icon-support.png' );
				copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/img/image-dancer.png', gutenverse_themes_builder_theme_built_path() . 'assets/img/image-dancer.png' );
				copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/img/mockup-upgrade-pro.png', gutenverse_themes_builder_theme_built_path() . 'assets/img/mockup-upgrade-pro.png' );
			} elseif ( isset( $other['dashboard']['mode'] ) && 'lite' === $other['dashboard']['mode']['value'] ) {
				copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/js/lite/theme-dashboard.js', gutenverse_themes_builder_theme_built_path() . 'assets/js/theme-dashboard.js' );
				copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/css/lite/theme-dashboard.css', gutenverse_themes_builder_theme_built_path() . 'assets/css/theme-dashboard.css' );
			} else {
				copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/js/default/theme-dashboard.js', gutenverse_themes_builder_theme_built_path() . 'assets/js/theme-dashboard.js' );
				copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/css/default/theme-dashboard.css', gutenverse_themes_builder_theme_built_path() . 'assets/css/theme-dashboard.css' );
			}
		} else {
			copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/js/default/theme-dashboard.js', gutenverse_themes_builder_theme_built_path() . 'assets/js/theme-dashboard.js' );
			copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/css/default/theme-dashboard.css', gutenverse_themes_builder_theme_built_path() . 'assets/css/theme-dashboard.css' );
		}
		copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/img/background-banner.png', gutenverse_themes_builder_theme_built_path() . 'assets/img/background-banner.png' );
		copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/img/banner-install-gutenverse-2.png', gutenverse_themes_builder_theme_built_path() . 'assets/img/banner-install-gutenverse-2.png' );

		$dashboard_data_string = '';
		if ( isset( $other['dashboard']['mode'] ) && 'lite' === $other['dashboard']['mode']['value'] ) {
			$dasboard_data               = array();
			$dasboard_data['comparison'] = array();
			if ( isset( $other['dashboard']['comparison'] ) && is_array( $other['dashboard']['comparison'] ) ) {
				foreach ( $other['dashboard']['comparison'] as $key => $value ) {
					$dasboard_data['comparison'][ $key ] = $value;
				}
			}

			$dashboard_data_string = '';
			foreach ( $dasboard_data as $key => $value ) {
				$dashboard_data_string .= "'$key' => " . var_export( $value, true ) . ",\n";
			}

			$dashboard_data_string = rtrim( $dashboard_data_string, ",\n" );
		}

		$placeholder = str_replace( '{{dashboard_data}}', $dashboard_data_string, $placeholder );

		$required = array();

		if ( ! empty( $other['plugins'] ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
			foreach ( $other['plugins'] as $plugin ) {
				$result      = plugins_api(
					'plugin_information',
					array(
						'slug'   => $plugin['value'],
						'locale' => 'en_US',
						'fields' => array(
							'icons' => true,
						),
					)
				);
				$icons       = var_export( $result->icons, true );
				$description = $result->sections['description'];
				$short_desc  = '';
				if ( preg_match( '/<p[^>]*>(.*?)<\/p>/', $description, $matches ) ) {
					$short_desc = wp_strip_all_tags( $matches[1] );
				}

				$required[] = "array(
					'slug'       => '{$plugin['value']}',
					'title'      => '{$plugin['label']}',
					'short_desc' => '{$short_desc}',
					'active'     => in_array( '{$plugin['value']}', \$plugins, true ),
					'installed'  => \$this->is_installed( '{$plugin['value']}' ),
					'icons'      => {$icons},
				)";
			}
		}

		$placeholder = str_replace( '{{plugins_required}}', join( ",\n\t\t\t\t", $required ), $placeholder );

		$theme_data = maybe_unserialize( $data['theme_data'] );
		$other      = maybe_unserialize( $data['other'] );
		$add_class  = array();
		$assigns    = array();
		$theme_logo = 'false';
		$notice     = '<div class="notice is-dismissible install-gutenverse-plugin-notice">
			<div class="gutenverse-notice-inner">
				<div class="gutenverse-notice-content">
					<div class="gutenverse-notice-text">
						<h3><?php esc_html_e( \'Take Your Website To New Height with\', \'' . $theme_data['slug'] . '\' ); ?> <span>Gutenverse!</span></h3> 
						<p><?php esc_html_e( \'' . $theme_data['title'] . ' theme work best with Gutenverse plugin. By installing Gutenverse plugin you may access ' . $theme_data['title'] . ' templates built with Gutenverse and get access to more than 40 free blocks, hundred free Layout and Section.\', \'' . $theme_data['slug'] . '\' ); ?></p>
						<div class="gutenverse-bottom">
							<a class="gutenverse-button" id="gutenverse-install-plugin" href="<?php echo esc_url( wp_nonce_url( self_admin_url( \'themes.php?page=' . $theme_data['slug'] . '-dashboard\' ), \'install-plugin_gutenverse\' ) ); ?>">
								<?php echo esc_html( __( \'Install Required Plugins\', \'' . $theme_data['slug'] . '\' ) ); ?>
							</a>
						</div>
					</div>
					<div class="gutenverse-notice-image">
						<img src="<?php echo esc_url( ' . $this->get_constant_name( $theme_data['slug'] ) . '_URI . \'/assets/img/banner-install-gutenverse-2.png\' ); ?>"/>
					</div>
				</div>
			</div>
		</div>';
		$script     = "<script>
		var promises = [];
		var actions = <?php echo wp_json_encode( \$actions ); ?>;

		function sequenceInstall (plugins, index = 0) {
			if (plugins[index]) {
				var plugin = plugins[index];

				switch (actions[plugin?.slug]) {
					case 'active':
						break;
					case 'inactive':
						var path = plugin?.slug + '/' + plugin?.slug;
						promises.push(
							wp.apiFetch({
								path: 'wp/v2/plugins/plugin?plugin=' + path,									
								method: 'POST',
								data: {
									status: 'active'
								}
							}).then(() => {
								sequenceInstall(plugins, index + 1);
							}).catch((error) => {
							})
						);
						break;
					default:
						promises.push(
							wp.apiFetch({
								path: 'wp/v2/plugins',
								method: 'POST',
								data: {
									slug: plugin?.slug,
									status: 'active'
								}
							}).then(() => {
								sequenceInstall(plugins, index + 1);
							}).catch((error) => {
							})
						);
						break;
				}
			}

			return;
		};

		jQuery( function( $ ) {
			$( 'div.notice.install-gutenverse-plugin-notice' ).on( 'click', 'button.notice-dismiss', function( event ) {
				event.preventDefault();
				$.post( ajaxurl, {
					action: '{{slug}}_set_admin_notice_viewed',
					nonce: '<?php echo esc_html( wp_create_nonce( '{{slug}}_admin_notice' ) ); ?>',
				} );
			} );

			$('#gutenverse-install-plugin').on('click', function(e) {
				var hasFinishClass = $(this).hasClass('finished');
				var hasLoaderClass = $(this).hasClass('loader');

				if(!hasFinishClass) {
					e.preventDefault();
				}

				if(!hasLoaderClass && !hasFinishClass) {
					promises = [];
					var plugins = <?php echo wp_json_encode( \$plugins ); ?>;
					$(this).addClass('loader').text('');

					sequenceInstall(plugins);
					Promise.all(promises).then(() => {						
						window.location.reload();
						$(this).removeClass('loader').addClass('finished').text('Visit Theme Dashboard');
					});
				}
			});
		} );
		</script>";

		if ( ! empty( $other['dashboard'] ) && isset( $other['dashboard']['mode'] ) && 'themeforest' === $other['dashboard']['mode']['value'] ) {
			$add_class[] = 'new Themeforest_Data();';
			$theme_data  = maybe_unserialize( $data['theme_data'] );
			$theme_slug  = $this->get_constant_name( $theme_data['slug'] );

			if ( isset( $other['dashboard']['logo'] ) ) {
				$image_data = wp_remote_get( $other['dashboard']['logo']['url'], array( 'sslverify' => true ) );
				$thumbnail  = gutenverse_themes_builder_theme_built_path() . 'assets/img/' . $other['dashboard']['logo']['filename'];
				$theme_logo = "{$theme_slug}_URI . 'assets/img/" . $other['dashboard']['logo']['filename'] . "'";
			}

			if ( ! is_wp_error( $image_data ) ) {
				$system->put_contents(
					$thumbnail,
					$image_data['body'],
					FS_CHMOD_FILE
				);
			}

			if ( ! empty( $other['dashboard']['templates'] ) ) {
				foreach ( $other['dashboard']['templates'] as $template ) {
					$image_data = wp_remote_get( $template['thumbnail']['url'], array( 'sslverify' => true ) );
					$thumbnail  = gutenverse_themes_builder_theme_built_path() . 'assets/img/' . $template['thumbnail']['filename'];
					$thumb_url  = "{$theme_slug}_URI . 'assets/img/" . $template['thumbnail']['filename'] . "'";

					if ( ! is_wp_error( $image_data ) ) {
						$system->put_contents(
							$thumbnail,
							$image_data['body'],
							FS_CHMOD_FILE
						);
					}
					$slug      = strtolower( str_replace( ' ', '-', $template['name'] ) );
					$assigns[] = "array(
						'title' => '{$template['name']}',
						'page'  => '{$template['page_name']}',
						'demo'  => '{$template['page_demo']}',
						'slug'  => '{$slug}',
						'thumb' => {$thumb_url},
					)";
				}
			}

			$notice = '<div class="notice is-dismissible install-gutenverse-plugin-notice">
				<div class="gutenverse-notice-inner">
					<div class="gutenverse-notice-content">
						<div class="gutenverse-notice-text">
							<h3><?php esc_html_e( \'Complete Setup to Activate All \', \'' . $theme_data['slug'] . '\' ); ?> <span>' . $theme_data['title'] . ' Features!</span></h3> 
							<p><?php esc_html_e( \'Complete the setup process to unlock all features and customization options. Maximize the potential of your ' . $theme_data['title'] . ' theme and get the most out of your website design.\', \'' . $theme_data['slug'] . '\' ); ?></p>
							<div class="gutenverse-bottom">
								<a class="gutenverse-button" id="gutenverse-wizard-setup" href="<?php echo esc_url( self_admin_url( \'themes.php?page=' . $theme_data['slug'] . '-wizard\' ) ); ?>">
									<?php echo esc_html( __( \'Complete Wizard Setup\', \'' . $theme_data['slug'] . '\' ) ); ?>
								</a>
							</div>
						</div>
						<div class="gutenverse-notice-image">
							<img src="<?php echo esc_url( ' . $this->get_constant_name( $theme_data['slug'] ) . '_URI . \'/assets/img/banner-install-gutenverse-2.png\' ); ?>"/>
						</div>
					</div>
				</div>
			</div>';
			$script = '';
		}

		$placeholder = str_replace( '{{dashboard_script}}', $script, $placeholder );
		$placeholder = str_replace( '{{dashboard_notice}}', $notice, $placeholder );
		$placeholder = str_replace( '{{theme_logo}}', $theme_logo, $placeholder );
		$placeholder = str_replace( '{{assign_templates}}', join( ",\n\t\t\t\t", $assigns ), $placeholder );
		$placeholder = str_replace( '{{additional_class}}', join( ",\n\t\t\t\t", $add_class ), $placeholder );

		$uri   = $this->get_constant_name( $theme_data['slug'] ) . '_URI';
		$pages = array();
		if ( ! empty( $other['screenshots'] ) && ! empty( $other['screenshots']['dashboard'] ) ) {
			if ( ! is_dir( gutenverse_themes_builder_theme_built_path() . 'assets/img' ) ) {
				wp_mkdir_p( gutenverse_themes_builder_theme_built_path() . 'assets/img' );
			}

			foreach ( $other['screenshots']['dashboard'] as $key => $dashboard ) {
				$image_data = wp_remote_get( $dashboard['url'], array( 'sslverify' => true ) );

				if ( ! is_wp_error( $image_data ) ) {
					$system->put_contents(
						gutenverse_themes_builder_theme_built_path() . 'assets/img/' . $dashboard['filename'],
						$image_data['body'],
						FS_CHMOD_FILE
					);
				}

				$pages[] = "'page-{$key}' => {$uri} . 'assets/img/{$dashboard['filename']}'";
			}
		}

		$placeholder = str_replace( '{{page_list}}', join( ",\n\t\t\t\t", $pages ), $placeholder );

		// Load Gutenverse templates.
		if ( 'core-gutenverse' === $theme_data['theme_mode'] ) {
			$template_names = array();
			$template_cases = array();

			foreach ( $templates_data as $template ) {
				if ( in_array( $template['category'], array( 'gutenverse', 'pro' ), true ) ) {
					$template_name = strtolower( str_replace( ' ', '-', $template['name'] ) );
					$template_type = in_array( $template['template_type'], gutenverse_themes_builder_parts(), true ) ? 'parts' : 'templates';

					if ( 'templates' === $template_type ) {
						$template_names[] = "'{$template_name}'";
					}

					$template_cases[] = 'case \'' . $template_name . '\':
					return $this->change_stylesheet_directory() . \'' . $template_type . '/' . $template_name . '.html\';';
				}
			}

			$placeholder = str_replace( '{{template_names}}', join( ",\n\t\t\t\t", $template_names ), $placeholder );
			$placeholder = str_replace( '{{template_cases}}', join( "\n\t\t\t", $template_cases ), $placeholder );
		}
		// Add Custom Templates. {{custom_template_list}}.
		$custom_template = '';
		foreach ( $templates_data as $template ) {
			if ( in_array( $template['category'], array( 'gutenverse', 'pro' ), true ) ) {
				if ( 'custom_template' === $template['template_type'] ) {
					$template_name    = strtolower( str_replace( ' ', '-', $template['name'] ) );
					$custom_template .= var_export( $template_name, true ) . ','; //phpcs:ignore
				}
			}
		}
		$placeholder = str_replace( '{{custom_template_list}}', $custom_template, $placeholder );

		// Generate Init Fonts.
		$global_fonts = get_option( 'gutenverse-global-variable-font-' . get_stylesheet(), false );
		$fonts        = '';

		if ( $global_fonts ) {
			foreach ( $global_fonts as $font ) {
				$fonts .= var_export( $font, true ) . ','; //phpcs:ignore
			}
		}

		$placeholder = str_replace( '{{theme_fonts}}', $fonts, $placeholder );
		$class_dir   = gutenverse_themes_builder_theme_built_path() . 'inc/class';

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
	 * Fix colors names
	 *
	 * @param string $content template content .
	 */
	private function fix_colors( $content ) {
		$colors          = $this->get_color_settings();
		$theme_id        = get_option( 'gtb_active_theme_id' );
		$theme_db        = Database::instance()->theme_info;
		$theme_info      = $theme_db->get_theme_data( $theme_id );
		$theme_slug      = $theme_info[0]['slug'];
		$imported_colors = get_option( 'gutenverse-global-color-import-' . $theme_slug );
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

				$attributes  = wp_json_encode( $attributes );
				$content     = $navigation->post_content;
				$block_after = "<!-- wp:navigation {$attributes} -->{$content}<!-- /wp:navigation -->";

				$html_content = str_replace( $block_before, $block_after, $html_content );
			}
		}

		return $html_content;
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
								$replace = '<!-- wp:template-part {"slug":"' . $part_name . '","theme":"' . $theme_slug . '","area":"header"} /-->';
							} elseif ( 'footer' === $part_name ) {
								$replace = '<!-- wp:template-part {"slug":"' . $part_name . '","theme":"' . $theme_slug . '","area":"footer"} /-->';
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
		preg_match_all( '/http[^"]*(?:\.png|\.jpg|\.svg|\.jpeg|\.gif|\.webp|\.json)/U', $content, $matches );
		if ( ! empty( $matches[0] ) ) {
			foreach ( $matches[0] as $image ) {
				$this->add_image( $image );
				$image_uri                = $this->get_constant_name( $slug ) . '_URI';
				$image_without_resolution = gutenverse_themes_builder_get_image_without_resolution( $image );
				if ( $image_without_resolution ) {
					$image_arr = explode( '/', $image_without_resolution['nores'] );
				} else {
					$image_arr = explode( '/', $image );
				}
				$image_name = $image_arr[ count( $image_arr ) - 1 ];
				/**Check if the $image_name have . in their name other than extention and end with _ */
				/** Split the image name by the last dot to separate the extension */
				$parts = explode( '.', $image_name );

				/** Check if the filename ends with an underscore  */
				if ( 2 < count( $parts ) ) {
					/** The last part is the extension */
					$extension = array_pop( $parts );

					/** Recombine the remaining parts into the main part of the filename  */
					$filename = implode( '.', $parts );
					if ( substr( $filename, -1 ) === '_' ) {
						/** Remove the trailing underscore */
						$filename = rtrim( $filename, '_' );
						/** Reconstruct the full image name */
						$image_name = $filename . '.' . $extension;
					}
				}
				$image_code = "' . esc_url( $image_uri ) . 'assets/img/$image_name";
				$content    = str_replace( $image, $image_code, $content );
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
		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/pattern-class.txt' );

		$theme_data = maybe_unserialize( $data['theme_data'] );

		$placeholder = str_replace( '{{namespace}}', $this->get_namespace( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{theme_slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{title}}', $theme_data['title'], $placeholder );

		$core_pattern_list       = '';
		$gutenverse_pattern_list = '';
		$pro_pattern_list        = '';

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

		if ( ! empty( $this->pro_patterns ) ) {
			$pro_pattern_list = join( ";\r\t\t\t", $this->pro_patterns );
			$pro_pattern_list = "$pro_pattern_list;";
		}

		$placeholder = str_replace( '{{pro_patterns}}', $pro_pattern_list, $placeholder );

		$system->put_contents(
			gutenverse_themes_builder_theme_built_path() . '/inc/class/class-block-patterns.php',
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
		$img_dir    = gutenverse_themes_builder_theme_built_path() . '/assets/img';

		if ( ! is_dir( $img_dir ) ) {
			wp_mkdir_p( $img_dir );
		}

		foreach ( $image_list as $image ) {
			$image_res    = $this->image_with_resolution( $image );
			$image_target = $image;

			if ( $image_res ) {
				$image_target = $image_res['nores'];
			}

			$image_arr  = explode( '/', $image_target );
			$image_name = $image_arr[ count( $image_arr ) - 1 ];

			/** Check if the $image_name have . in their name other than extention and end with _ */
			/** Split the image name by the last dot to separate the extension */
			$parts = explode( '.', $image_name );

			/** Check if the filename ends with an underscore  */
			if ( 2 < count( $parts ) ) {
				/** The last part is the extension */
				$extension = array_pop( $parts );

				/** Recombine the remaining parts into the main part of the filename  */
				$filename = implode( '.', $parts );
				if ( substr( $filename, -1 ) === '_' ) {
					/** Remove the trailing underscore */
					$filename = rtrim( $filename, '_' );
					/** Reconstruct the full image name */
					$image_name = $filename . '.' . $extension;
				}
			}

			$destination = $img_dir . '/' . $image_name;
			if ( ! file_exists( $destination ) ) {
				$image_data = wp_remote_get( $image_target, array( 'sslverify' => true ) );

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
	 * Send File to User.
	 *
	 * @param array $data .
	 */
	public function extractor_send_file( $data ) {
		$zip_path = trailingslashit( wp_upload_dir()['basedir'] ) . $data['slug'] . '-demos' . '.zip';

		$zip = new ZipArchive();
		$zip->open( $zip_path, ZipArchive::CREATE | ZipArchive::OVERWRITE );

		$target_directory = rtrim( gutenverse_themes_builder_theme_built_path(), '/' ) . '-demos/';
		error_log($target_directory);
		$files = new RecursiveIteratorIterator(
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
		$theme_dir = get_template_directory() . '/theme.json';
		$config    = array();

		if ( $theme_dir ) {
			$decoded_file = wp_json_file_decode( $theme_dir, array( 'associative' => true ) );
			if ( is_array( $decoded_file ) ) {
				$config = $decoded_file;
			}
		}

		if ( ! empty( $config['settings']['color']['palette'] ) ) {
			$new_arr = array();

			// Manually add default colors for now.
			$new_arr['black']                 = hex2rgb( '#000000' );
			$new_arr['cyan-bluish-gray']      = hex2rgb( '#abb8c3' );
			$new_arr['white']                 = hex2rgb( '#ffffff' );
			$new_arr['pale-pink']             = hex2rgb( '#f78da7' );
			$new_arr['vivid-red']             = hex2rgb( '#cf2e2e' );
			$new_arr['luminous-vivid-orange'] = hex2rgb( '#ff6900' );
			$new_arr['luminous-vivid-amber']  = hex2rgb( '#fcb900' );
			$new_arr['light-green-cyan']      = hex2rgb( '#7bdcb5' );
			$new_arr['vivid-green-cyan']      = hex2rgb( '#00d084' );
			$new_arr['pale-cyan-blue']        = hex2rgb( '#8ed1fc' );
			$new_arr['vivid-cyan-blue']       = hex2rgb( '#0693e3' );
			$new_arr['vivid-purple']          = hex2rgb( '#9b51e0' );

			foreach ( $config['settings']['color']['palette'] as $color ) {
				$new_arr[ $color['slug'] ] = hex2rgb( $color['color'] );
			}
			return $new_arr;
		}

		return null;
	}

	/**
	 * Get Namespace
	 *
	 * @param string $data .
	 *
	 * @return string
	 */
	public function get_namespace( $data ) {
		if ( ! is_string( $data ) ) {
			return 'Convert_Failed';
		}

		$namespace = preg_replace( '/[^a-zA-Z0-9\s]/', '_', $data );
		$parts     = explode( '_', $namespace );

		foreach ( $parts as &$part ) {
			$part = ucfirst( $part );
		}

		$namespace = implode( '_', $parts );

		return $namespace;
	}

	/**
	 * Get Constant Name
	 *
	 * @param string $data .
	 *
	 * @return string
	 */
	public function get_constant_name( $data ) {
		if ( ! is_string( $data ) ) {
			return 'CONVERT_FAILED';
		}

		$namespace = preg_replace( '/[^a-zA-Z0-9\s]/', '_', $data );
		$parts     = explode( '_', $namespace );

		foreach ( $parts as &$part ) {
			$part = strtoupper( $part );
		}

		$namespace = implode( '_', $parts );

		return $namespace;
	}

	/**
	 * Copy Dir
	 *
	 * @param string $source .
	 * @param string $destination .
	 */
	public function copy_dir( $source, $destination ) {
		if ( ! is_dir( $source ) ) {
			return;
		}

		if ( ! is_dir( $destination ) ) {
			wp_mkdir_p( $destination );
		}

		$items = scandir( $source );

		foreach ( $items as $item ) {
			if ( '.' === $item || '..' === $item ) {
				continue;
			}

			$src_path  = $source . DIRECTORY_SEPARATOR . $item;
			$dest_path = $destination . DIRECTORY_SEPARATOR . $item;

			if ( is_dir( $src_path ) ) {
				$this->copy_dir( $src_path, $dest_path );
			} else {
				copy( $src_path, $dest_path );
			}
		}
	}
}