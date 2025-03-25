<?php
/**
 * Export Theme Class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gutenverse_Themes_Builder\Database\Database;
use Gutenverse_Themes_Builder\Export\Export_Assets;
use Gutenverse_Themes_Builder\Export\Export_Autoload;
use Gutenverse_Themes_Builder\Export\Export_Function;
use Gutenverse_Themes_Builder\Export\Export_Helper;
use Gutenverse_Themes_Builder\Export\Export_Init;
use Gutenverse_Themes_Builder\Export\Export_ReadMe;
use Gutenverse_Themes_Builder\Export\Export_Style_Css;
use Gutenverse_Themes_Builder\Export\Export_Theme_Json;
use Gutenverse_Themes_Builder\Export\Export_Themeforest_Data;
use Gutenverse_Themes_Builder\Export\Export_Upgrader;
use Gutenverse_Themes_Builder\Export\Misc;
use ZipArchive;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;

/**
 * Export Theme Class
 *
 * @package gutenverse-themes-builder
 */
class Export_Theme {

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
	 * Page Pro Patterns
	 *
	 * @var array
	 */
	private $page_pro_patterns;

	/**
	 * List of Images
	 *
	 * @var array
	 */
	private $image_list;

	/**
	 * List of Menus
	 *
	 * @var array
	 */
	private $menu_list = array();

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
		$theme_dir  = gutenverse_themes_builder_theme_built_path();

		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		global $wp_filesystem;

		if ( is_dir( $theme_dir ) ) {
			$wp_filesystem->rmdir( $theme_dir, true );
		}

		wp_mkdir_p( $theme_dir );
		Export_ReadMe::create_readme( $wp_filesystem, $data );
		Export_Style_Css::create_style_css( $wp_filesystem, $data );
		Export_Theme_Json::create_theme_json( $wp_filesystem, $data );
		Export_Function::create_function_php( $wp_filesystem, $data );
		Export_Autoload::create_autoload_php( $wp_filesystem, $data );
		Export_Init::create_init_php( $wp_filesystem, $data, $theme_id );
		Export_Upgrader::create_upgrader_php( $wp_filesystem, $data );
		Export_Assets::create_assets( $wp_filesystem, $data );
		Export_Themeforest_Data::create_themeforest_data( $wp_filesystem, $data );
		Export_Helper::create_helper( $wp_filesystem, $data );
		$this->create_templates( $wp_filesystem, $theme_id, $data['slug'] );
		$this->create_pages( $wp_filesystem, $theme_id, $data );
		$this->register_patterns( $wp_filesystem, $data );
		$this->export_all_images( $wp_filesystem );
		$this->create_thumbnail( $wp_filesystem, $data );
		$this->create_menus( $wp_filesystem );
		$this->extractor_send_file( $data );

		// child theme .
		$other = maybe_unserialize( $data['other'] );
		if ( ! empty( $other['dashboard'] ) && isset( $other['dashboard']['mode'] ) && 'themeforest' === $other['dashboard']['mode']['value'] ) {
			$this->create_child_theme( $wp_filesystem, $data );
		}
	}

	/**
	 * Create Menus
	 *
	 * @param object $system .
	 */
	public function create_menus( $system ) {
		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/menu-json.txt' );
		$custom_dir  = gutenverse_themes_builder_theme_built_path() . '/assets/misc';
		if ( ! is_dir( $custom_dir ) ) {
			wp_mkdir_p( $custom_dir );
		}
		$content     = json_encode( $this->menu_list );
		$placeholder = ! empty( $this->menu_list ) ? str_replace( '{{menus}}', $content, $placeholder ) : '{}';
		$system->put_contents(
			gutenverse_themes_builder_theme_built_path() . '/assets/misc/menu.json',
			$placeholder,
			FS_CHMOD_FILE
		);
	}

	/**
	 * Create Pages
	 *
	 * @param object $system .
	 * @param string $theme_id .
	 * @param array  $data .
	 */
	public function create_pages( $system, $theme_id, $data ) {
		$pages      = new \WP_Query(
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
		$custom_dir = gutenverse_themes_builder_theme_built_path() . '/gutenverse-pages';
		if ( ! is_dir( $custom_dir ) ) {
			wp_mkdir_p( $custom_dir );
		}
		foreach ( $pages->posts as $page ) {
			/** Get the file mold */
			$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/page-json.txt' );

			/** Add Template slug to mold */
			$template = get_post_meta( $page->ID, '_wp_page_template', true );
			$parts    = explode( '-', $template );
			array_shift( $parts );
			$template_slug = implode( '-', $parts );

			$placeholder = ! empty( $template_slug ) ? str_replace( '{{template}}', $template_slug, $placeholder ) : $placeholder;

			/** Add Page Title */
			$placeholder = ! empty( $page->post_title ) ? str_replace( '{{page_title}}', $page->post_title, $placeholder ) : $placeholder;

			/**Add Preview Url */
			$preview     = get_post_meta( $page->ID, '_gtb_page_preview', true );
			$placeholder = ! empty( $preview ) ? str_replace( '{{preview_url}}', $preview, $placeholder ) : $placeholder;

			/**Add Image Path */
			$image_id    = get_post_meta( $page->ID, '_gtb_page_image', true );
			$file_path   = get_post_meta( $image_id, '_wp_attached_file', true );
			$image_path  = 'assets/img/' . basename( $file_path );
			$placeholder = ! empty( $file_path ) ? str_replace( '{{image_url}}', $image_path, $placeholder ) : $placeholder;

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
			$content     = $this->extract_images( $content, 'page', $data['slug'], true, $page->ID );
			$content     = Misc::fix_colors( $content );
			$content     = Misc::fix_core_navigation( $content );
			$placeholder = str_replace( '{{content}}', json_encode( $content ), $placeholder );

			/**Add Pattern */
			$core_pattern_list = '';
			if ( ! empty( $this->page_core_patterns ) ) {
				$core_pattern_list = join( ', ', $this->page_core_patterns );
			}
			$placeholder              = str_replace( '{{core_pattern}}', $core_pattern_list, $placeholder );
			$this->page_core_patterns = array();

			$gutenverse_pattern_list = '';
			if ( ! empty( $this->page_gutenverse_patterns ) ) {
				$gutenverse_pattern_list = join( ', ', $this->page_gutenverse_patterns );
			}
			$placeholder                    = str_replace( '{{gutenverse_pattern}}', $gutenverse_pattern_list, $placeholder );
			$this->page_gutenverse_patterns = array();

			$pro_pattern_list = '';
			if ( ! empty( $this->page_pro_patterns ) ) {
				$pro_pattern_list = join( ', ', $this->page_pro_patterns );
			}
			$placeholder             = str_replace( '{{pro_pattern}}', $pro_pattern_list, $placeholder );
			$this->page_pro_patterns = array();

			$page_images      = array_filter(
				$this->image_list,
				function ( $image ) use ( $page ) {
					return $image['id'] === $page->ID;
				}
			);
			$reindexed_images = array_values( $page_images );
			gutenverse_themes_builder_sort_data( $reindexed_images, 'image_id' );
			$placeholder = str_replace( '{{image_arr}}', ! empty( $page_images ) ? str_replace( '"', "'", json_encode( $reindexed_images ) ) : '', $placeholder );

			/**Create the file*/
			$filename = strtolower( str_replace( ' ', '_', $page->post_title ) );
			$system->put_contents(
				gutenverse_themes_builder_theme_built_path() . '/gutenverse-pages/' . $filename . '.json',
				$placeholder,
				FS_CHMOD_FILE
			);
		}
	}

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
				$target_dir  = $this->get_target_dir( $theme_id, $template['category'] ) . $template_type;
				$target_file = $target_dir . '/' . $template_name . '.html';

				if ( ! is_dir( $target_dir ) ) {
					wp_mkdir_p( $target_dir );
				}

				copy( $file_dir, $target_file );

				$slug_key = strtolower( $template['category'] . '-' . $template_name );
				if ( ! empty( $html_content[ $slug_key ] ) ) {
					$content = $this->build_patterns( $html_content[ $slug_key ], $theme_id, $system, $theme_slug, false, 'template' );
					$content = str_replace( "'", "\'", $content );
					$content = $this->extract_images( $content, 'template', $theme_slug, true );
					$content = $this->extract_menus( $content, $system );
					$content = Misc::fix_colors( $content );
					$content = Misc::fix_core_navigation( $content );
					foreach ( $headers as $header ) {
						$search  = '/<!--\s*wp:template-part\s*{"slug":"' . preg_quote( $header['from'], '/' ) . '","theme":"' . preg_quote( get_stylesheet(), '/' ) . '"(?:,"area":"(uncategorized|header)")?\s*} \/-->/';
						$replace = '<!-- wp:template-part {"slug":"' . $header['to'] . '","area":"header"} /-->';
						$content = preg_replace( $search, $replace, $content );
					}

					foreach ( $footers as $footer ) {
						$search  = '/<!--\s*wp:template-part\s*{"slug":"' . preg_quote( $footer['from'], '/' ) . '","theme":"' . preg_quote( get_stylesheet(), '/' ) . '"(?:,"area":"(uncategorized|footer)")?\s*} \/-->/';
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
						$pattern_sync     = get_post_meta( $posts[0]->ID, '_pattern_sync', true );

						if ( $theme_id === $pattern_theme_id ) {
							if ( $only_get_content && ! $pattern_sync ) {
								$pattern_after = $posts[0]->post_content;
							} else {
								$content       = str_replace( "'", "\'", $posts[0]->post_content );
								$content       = $this->extract_images( $content, $pattern_sync ? 'sync' : 'async', $theme_slug, false, $posts[0]->ID );
								$content       = $this->extract_menus( $content, $system );
								$content       = Misc::fix_colors( $content );
								$content       = Misc::fix_core_navigation( $content );
								$pattern_name  = $posts[0]->post_name;
								$pattern_title = $posts[0]->post_title;
								/** Create pattern php files */
								$placeholder      = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/pattern.txt' );
								$target_file      = $pattern_dir . '/' . $pattern_name . '.php';
								$content          = $this->replace_template_part( $content, $theme_slug );
								$placeholder      = str_replace( '{{pattern_title}}', $pattern_title, $placeholder );
								$placeholder      = str_replace( '{{theme_slug}}', $theme_slug, $placeholder );
								$pattern_category = get_post_meta( $posts[0]->ID, '_pattern_category', true );
								$pattern_category = empty( $pattern_category ) ? 'core' : $pattern_category;
								$placeholder      = str_replace( '{{pattern_category}}', $theme_slug . '-' . $pattern_category, $placeholder );
								$placeholder      = str_replace( '{{pattern_content}}', $content, $placeholder );
								$pattern_images   = array_filter(
									$this->image_list,
									function ( $image ) use ( $posts ) {
										return $image['id'] === $posts[0]->ID;
									}
								);
								$reindexed        = array_values( $pattern_images );
								$placeholder      = str_replace( '{{pattern_image}}', ! empty( $pattern_images ) ? json_encode( $reindexed ) : '', $placeholder );

								/**Replace additional object with object sync */
								if ( $pattern_sync ) {
									$additional = "'is_sync' => true,";
								} else {
									$additional = "'is_sync' => false,";
								}
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
								$pattern_after = '<!-- wp:pattern {"slug":"' . $theme_slug . '/' . $pattern_name . '"} /-->';
							}
						}

						$html_content = str_replace( $pattern_before, $pattern_after, $html_content );
					}
				}
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
								$replace = '<!-- wp:template-part {"slug":"' . $part_name . '","area":"header"} /-->';
							} elseif ( 'footer' === $part_name ) {
								$replace = '<!-- wp:template-part {"slug":"' . $part_name . '","area":"footer"} /-->';
							}
							$content = str_replace( $match[0], $replace, $content );
						}
					}
				}
			}
		}
		return $content;
	}

	/**
	 * Extract Images
	 *
	 * @param string  $content .
	 * @param string  $type .
	 * @param string  $slug .
	 * @param boolean $is_outside_pattern_wrapper .
	 * @param string  $parent_id .
	 */
	private function extract_images( $content, $type, $slug, $is_outside_pattern_wrapper = false, $parent_id = '' ) {
		// Capture image url inside double quotes.
		preg_match_all( '/http[^"]*(?:\.png|\.jpg|\.svg|\.jpeg|\.gif|\.webp|\.json)/U', $content, $matches );
		if ( ! empty( $matches[0] ) ) {
			foreach ( $matches[0] as $image ) {
				/**Check if image have resolution in their name and extract image name*/
				$image_without_resolution = gutenverse_themes_builder_get_image_without_resolution( $image );
				if ( $image_without_resolution ) {
					$image_name  = $image_without_resolution['image_name'];
					$placeholder = $image_without_resolution['nores'];
				} else {
					$image_arr   = explode( '/', $image );
					$image_name  = $image_arr[ count( $image_arr ) - 1 ];
					$placeholder = $image;
				}

				$valid_image_arr = explode( '/', $placeholder );
				$valid_name      = $valid_image_arr[ count( $valid_image_arr ) - 1 ];

				/**Check the type of the image for image page and sync have different purpose than template and async */
				switch ( $type ) {
					case 'page':
					case 'sync':
						/**Filter image list to check if the same image and type already registered inside the array */
						$filter_data = array_filter(
							$this->image_list,
							function ( $obj ) use ( $image_name, $parent_id ) {
								return isset( $obj['name'] ) && $obj['name'] === $image_name && ( 'page' === $obj['type'] || 'sync' === $obj['type'] ) && $parent_id === $obj['id'];
							}
						);

						$images_id_with_the_same_name = new \WP_Query(
							array(
								'post_type'   => 'attachment',
								'post_status' => 'inherit',
								'meta_query'  => array(
									array(
										'key'     => '_wp_attached_file',
										'value'   => $valid_name,
										'compare' => 'LIKE',
									),
								),
							)
						);

						$image_id = 'null';
						if ( $images_id_with_the_same_name->have_posts() ) {
							foreach ( $images_id_with_the_same_name->posts as $image_post ) {
								$att_image      = wp_get_attachment_url( $image_post->ID );
								$att_image_arr  = explode( '/', $att_image );
								$att_image_name = $att_image_arr[ count( $att_image_arr ) - 1 ];
								if ( $att_image_name === $valid_name ) {
									$image_id = $image_post->ID;
								}
							}
						}

						/**Get the first value that have the condition or get null if no data found */
						$filter_image = reset( $filter_data );

						/**Add image to array image*/
						if ( ! $filter_image ) {
							$this->add_image( $placeholder, $type, $image_name, $parent_id, $image_id );
						}

						/**Replace image with uuid image */
						$content = str_replace( $image, $placeholder, $content );
						break;
					case 'template':
					case 'async':
					default:
						/**Filter image list to check if the same image and type already registered inside the array */
						$filter_data  = array_filter(
							$this->image_list,
							function ( $obj ) use ( $image_name ) {
								return isset( $obj['name'] ) && $obj['name'] === $image_name && ( 'template' === $obj['type'] || 'async' === $obj['type'] );
							}
						);
						$filter_image = reset( $filter_data );

						/**Add image to image list then get uuid */
						if ( ! $filter_image ) {
							$this->add_image( $placeholder, $type, $image_name );
						}

						/**Preparing image replacement */
						// $image_uri  = Misc::get_constant_name( $slug ) . '_URI';
						$image_uri  = 'get_template_directory()';
						$image_code = "' . esc_url( $image_uri ) . 'assets/img/$image_name";
						if ( $is_outside_pattern_wrapper ) {
							$image_code = "{{home_url}}/assets/img/$image_name";
						}

						/**Replace image with new content */
						$content = str_replace( $image, $image_code, $content );
						break;
				}
			}
		}
		return $content;
	}

	/**
	 * Add image to list
	 *
	 * @param string $image image url string .
	 * @param string $type type of image (template, page, sync, or async) string .
	 * @param string $name .
	 * @param string $id id of image master (page/pattern).
	 * @param string $image_id id of the image.
	 */
	private function add_image( $image, $type, $name, $id = '', $image_id = 'null' ) {
		$this->image_list[] = array(
			'name'      => $name,
			'image_url' => $image,
			'type'      => $type,
			'id'        => $id,
			'image_id'  => $image_id,
		);
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

		$placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{theme_slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{title}}', $theme_data['title'], $placeholder );

		$core_pattern_list       = '';
		$gutenverse_pattern_list = '';
		$pro_pattern_list        = '';

		if ( ! empty( $this->template_core_patterns ) ) {
			$core_pattern_list = join( ",\r\t\t\t", $this->template_core_patterns );
			$core_pattern_list = "$core_pattern_list,";
		}

		$placeholder = str_replace( '{{core_patterns}}', $core_pattern_list, $placeholder );

		if ( ! empty( $this->template_gutenverse_patterns ) ) {
			$gutenverse_pattern_list = join( ";\r\t\t\t", $this->template_gutenverse_patterns );
			$gutenverse_pattern_list = "$gutenverse_pattern_list;";
		}

		$placeholder = str_replace( '{{gutenverse_patterns}}', $gutenverse_pattern_list, $placeholder );

		if ( ! empty( $this->template_pro_patterns ) ) {
			$pro_pattern_list = join( ";\r\t\t\t", $this->template_pro_patterns );
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
		$img_dir = gutenverse_themes_builder_theme_built_path() . '/assets/img';

		if ( ! is_dir( $img_dir ) ) {
			wp_mkdir_p( $img_dir );
		}

		$image_list = array_filter(
			$this->image_list,
			function ( $image ) {
				return 'template' === $image['type'] || 'async' === $image['type'];
			}
		);
		foreach ( $image_list as $image ) {
			$image_target = $image['image_url'];
			$destination  = $img_dir . '/' . $image['name'];
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
		if ( isset( $other['screenshots']['thumbnail'] ) ) {
			$image      = $other['screenshots']['thumbnail']['url'];
			$image_data = wp_remote_get( $image, array( 'sslverify' => true ) );
			if ( ! is_wp_error( $image_data ) ) {
				$system->put_contents(
					gutenverse_themes_builder_theme_built_path() . '/screenshot.jpg',
					$image_data['body'],
					FS_CHMOD_FILE
				);
			}
		}
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
			new RecursiveDirectoryIterator( gutenverse_themes_builder_theme_built_path() ),
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
