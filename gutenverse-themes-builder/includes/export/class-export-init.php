<?php
/**
 * Export Init
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder\Export;

use Gutenverse_Themes_Builder\Database\Database;

/**
 * Class Export Init
 *
 * @package gutenverse-themes-builder
 */
class Export_Init {
	/**
	 * Create class-init.php File
	 *
	 * @param object $system .
	 * @param array  $data .
	 * @param string $theme_id .
	 */
	public static function create_init_php( $system, $data, $theme_id ) {
		$instance       = new self();
		$theme_data     = maybe_unserialize( $data['theme_data'] );
		$templates_db   = Database::instance()->theme_templates;
		$templates_data = $templates_db->get_data( $theme_id );
		$class_dir      = gutenverse_themes_builder_theme_built_path() . 'inc/class';
		if ( ! is_dir( $class_dir ) ) {
			wp_mkdir_p( $class_dir );
		}
		// Take which placeholder.
		if ( 'core-gutenverse' === $theme_data['theme_mode'] ) {
			$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/init-core-gutenverse.txt' );
		} else {
			$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/init-default.txt' );
		}

		$placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{title}}', $theme_data['title'], $placeholder );
		$placeholder = str_replace( '{{description}}', isset( $theme_data['description'] ) ? str_replace( "'", "\'", $theme_data['description'] ) : '', $placeholder );
		$placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder );
		$placeholder = str_replace( '{{constant}}', Misc::get_constant_name( $theme_data['slug'] ), $placeholder );

		$other             = maybe_unserialize( $data['other'] );
		$config            = array();
		$additional_filter = array();
		if ( ! empty( $other['dashboard'] ) && isset( $other['dashboard']['mode'] ) && 'themeforest' === $other['dashboard']['mode']['value'] ) {
			$config[]            = "'isThemeforest' => true,";
			$additional_filter[] = "add_filter( 'gutenverse_show_theme_list', '__return_false' );";
		}
		$placeholder = str_replace( '{{additional_config}}', join( "\n\t\t\t", $config ), $placeholder );
		$placeholder = str_replace( '{{additional_filter}}', join( "\n\t\t", $additional_filter ), $placeholder );

		// Build dashboard.
		$placeholder = $instance->build_dashboard( $placeholder, $theme_data, $system, $other );
		$required    = $instance->get_required_plugin( $other );
		$placeholder = str_replace( '{{plugins_required}}', join( ",\n\t\t\t\t", $required ), $placeholder );
		$add_class   = array();
		$assigns     = array();
		$data_page   = array();
		$theme_logo  = 'false';

		/**Create Notice */
		if ( ! empty( $other['dashboard'] ) && isset( $other['dashboard']['mode'] ) && 'themeforest' === $other['dashboard']['mode']['value'] ) {
			$add_class[] = 'new Themeforest_Data();';
			$theme_slug  = Misc::get_constant_name( $theme_data['slug'] );

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
			if ( $pages->have_posts() ) {
				foreach ( $pages->posts as $post ) {
					$image_id   = get_post_meta( $post->ID, '_gtb_page_image', true );
					$image_url  = wp_get_attachment_url( $image_id );
					$image_data = wp_remote_get( $image_url, array( 'sslverify' => true ) );
					$file_path  = get_post_meta( $image_id, '_wp_attached_file', true );
					$filename   = basename( $file_path );
					$thumbnail  = gutenverse_themes_builder_theme_built_path() . 'assets/img/' . $filename;
					$thumb_url  = "{$theme_slug}_URI . 'assets/img/" . $filename . "'";
					$post_demo  = get_post_meta( $post->ID, '_gtb_page_preview', true );
					$template   = get_post_meta( $post->ID, '_wp_page_template', true );
					$order      = get_post_meta( $post->ID, '_gtb_page_order', true );
					$parts      = explode( '-', $template );
					array_shift( $parts );
					$template_slug = implode( '-', $parts );
					if ( ! is_wp_error( $image_data ) ) {
						$system->put_contents(
							$thumbnail,
							$image_data['body'],
							FS_CHMOD_FILE
						);
						$data_page[] = (object) array(
							'title' => $post->post_title,
							'page'  => $post->post_title,
							'demo'  => $post_demo,
							'slug'  => $template_slug,
							'thumb' => $thumb_url,
							'order' => $order,
						);
					}
				}
				usort(
					$data_page,
					function ( $a, $b ) {
						if ( 'string' === gettype( $a->order ) ) {
							$a->order = (int) $a->order;
						}
						if ( 'string' === gettype( $b->order ) ) {
							$b->order = (int) $b->order;
						}
						return $a->order - $b->order;
					}
				);
				foreach ( $data_page as $dt ) {
					$assigns[] = "array(
						'title' => '{$dt->title}',
						'page'  => '{$dt->page}',
						'demo'  => '{$dt->demo}',
						'slug'  => '{$dt->slug}',
						'thumb' => {$dt->thumb},
					)";
				}
			}

			if ( isset( $other['dashboard']['themeforest_mode'] ) && $other['dashboard']['themeforest_mode'] ) {
				$add_class[] = 'new Essential();';
				$instance->add_essential( $theme_data, $system, $class_dir );
			}
		} else {
			$plugin_notice_placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/plugin-notice.txt' );
			$plugin_notice_placeholder = $instance->add_plugin_notice( $plugin_notice_placeholder, $theme_data, $required );
			$add_class[]               = 'new Plugin_Notice();';
			$system->put_contents(
				$class_dir . '/class-plugin-notice.php',
				$plugin_notice_placeholder,
				FS_CHMOD_FILE
			);
		}

		if ( isset( $other['notice'] ) && ! Misc::is_serialized_block_empty( $other['notice'] ) ) {
			$add_class[] = 'new Upgrader();';
		}

		$placeholder = str_replace( '{{theme_logo}}', $theme_logo, $placeholder );
		$placeholder = str_replace( '{{assign_templates}}', join( ",\n\t\t\t\t", $assigns ), $placeholder );
		$placeholder = str_replace( '{{additional_class}}', join( "\n\t\t\t\t", $add_class ), $placeholder );
		$placeholder = $instance->add_screenshot_page_list( $placeholder, $other, $theme_data, $system );
		$placeholder = $instance->load_gutenverse_templates( $placeholder, $templates_data, $theme_data );
		$placeholder = $instance->add_custom_template( $placeholder, $templates_data );
		$placeholder = $instance->generate_init_fonts( $placeholder );

		$system->put_contents(
			$class_dir . '/class-init.php',
			$placeholder,
			FS_CHMOD_FILE
		);
	}

	/**
	 * Build Dashborad
	 *
	 * @param string $placeholder .
	 * @param array  $theme_data .
	 * @param object $system .
	 * @param array  $other .
	 *
	 * @return string
	 */
	private function build_dashboard( $placeholder, $theme_data, $system, $other ) {
		if ( ! is_dir( gutenverse_themes_builder_theme_built_path() . 'assets/js' ) ) {
			wp_mkdir_p( gutenverse_themes_builder_theme_built_path() . 'assets/js' );
		}

		if ( ! is_dir( gutenverse_themes_builder_theme_built_path() . 'assets/css' ) ) {
			wp_mkdir_p( gutenverse_themes_builder_theme_built_path() . 'assets/css' );
		}

		if ( ! is_dir( gutenverse_themes_builder_theme_built_path() . 'assets/img' ) ) {
			wp_mkdir_p( gutenverse_themes_builder_theme_built_path() . 'assets/img' );
		}

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
				copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/img/icon-docs.png', gutenverse_themes_builder_theme_built_path() . 'assets/img/icon-docs.png' );
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
		copy( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/img/banner-install-gutenverse.png', gutenverse_themes_builder_theme_built_path() . 'assets/img/banner-install-gutenverse.png' );

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
		return $placeholder;
	}

	/**
	 * Get Required Plugin
	 *
	 * @param array $other .
	 * @param array $required .
	 *
	 * @return array
	 */
	private function get_required_plugin( $other, $required = array() ) {
		if ( ! empty( $other['plugins'] ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
			foreach ( $other['plugins'] as $plugin ) {
				$url = '';
				if ( 'wporg' === $plugin['type'] ) {
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
				} else {
					$result = wp_remote_request(
						GUTENVERSE_FRAMEWORK_LIBRARY_URL . 'wp-json/gutenverse-server/v4/plugin/detail',
						array(
							'method'  => 'POST',
							'body'    => json_encode(
								array(
									'slug' => $plugin['value'],
								)
							),
							'headers' => array(
								'Content-Type' => 'application/json',
							),
						),
					);

					$response = json_decode( $result['body'], true );
					if ( 'success' === $response['status'] ) {
						$data  = $response['data'];
						$icons = null;
						if ( isset( $data['icon'] ) ) {
							$icons = var_export(
								array(
									'1x' => strval( $data['icon'] ),
								),
								true
							);
						}
						$short_desc = $data['description'];
						$url        = $data['url'];
					}
				}
				$icons      = isset( $icons ) ? $icons : 'null';
				$required[] = "array(
					'slug'       		=> '{$plugin['value']}',
					'title'      		=> '{$plugin['label']}',
					'short_desc' 		=> '{$short_desc}',
					'active'    		=> in_array( '{$plugin['value']}', \$plugins, true ),
					'installed'  		=> \$this->is_installed( '{$plugin['value']}' ),
					'icons'      		=> {$icons},
					'download_url'      => '{$url}',
				)";
			}
		}
		return $required;
	}

	/**
	 * Add Plugin Notice
	 *
	 * @param string $plugin_notice_placeholder .
	 * @param array  $theme_data .
	 * @param array  $required .
	 * @return string
	 */
	private function add_plugin_notice( $plugin_notice_placeholder, $theme_data, $required ) {
		$plugin_notice_placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $plugin_notice_placeholder );
		$plugin_notice_placeholder = str_replace( '{{slug}}', $theme_data['slug'], $plugin_notice_placeholder );
		$plugin_notice_placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $plugin_notice_placeholder );
		$plugin_notice_placeholder = str_replace( '{{plugins_required}}', join( ",\n\t\t\t\t", $required ), $plugin_notice_placeholder );
		$plugin_notice_placeholder = str_replace( '{{constant}}', Misc::get_constant_name( $theme_data['slug'] ), $plugin_notice_placeholder );

		$style                     = ! empty( $other['pluginNoticeNormal'] ) ? '<style>
            .install-gutenverse-plugin-notice {
                position: relative;
                display: flex;
                margin: 10px 0 20px !important;
                padding: 0 !important;
                border-left: 4px solid #72aee6;
            }

            .install-gutenverse-plugin-notice .gutenverse-bottom {
                display: flex;
            }

            .install-gutenverse-plugin-notice .gutenverse-notice-text {
                padding: 30px 20px 20px;
                position: relative;
                z-index: 2;
            }

            .install-gutenverse-plugin-notice h3 {
                margin: 0 0 10px;
            }

            .install-gutenverse-plugin-notice p {
                font-size: 13px;
                font-weight: 400;
                margin: 0 100px 15px 0 !important;
            }

            .install-gutenverse-plugin-notice #gutenverse-install-plugin.loader:after{
                display: block;
                content: "";
                border: 5px solid white;
                border-radius: 50%;
                border-top: 5px solid rgba(255, 255, 255, 0);
                width: 8px;
                height: 8px;
                -webkit-animation: spin 2s linear infinite;
                animation: spin 2s linear infinite;
            }

            .install-gutenverse-plugin-notice .notice-dismiss {
                z-index: 999;
            }

            @-webkit-keyframes spin {
                0% {
                    -webkit-transform: rotate(0deg);
                }
                100% {
                    -webkit-transform: rotate(360deg);
                }
            }

            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        </style>' : '<style>
            .install-gutenverse-plugin-notice {
                border: 1px solid #E6E6EF;
                position: relative;
                overflow: hidden;
                padding: 0 !important;
                margin-bottom: 30px !important;
                background: url( <?php echo esc_url( ' . Misc::get_constant_name( $theme_data['slug'] ) . '_URI . \'/assets/img/background-banner.png\' ); ?> );
                background-size: cover;
                background-position: center;
            }

            .install-gutenverse-plugin-notice .gutenverse-notice-content {
                display: flex;
                align-items: center;
                position: relative;
            }

            .gutenverse-notice-text, .gutenverse-notice-image {
                width: 50%;
            }

            .gutenverse-notice-text {
                padding: 40px 0 40px 40px;
                position: relative;
                z-index: 2;
            }

            .install-gutenverse-plugin-notice img {
                max-height: 100%;
                display: flex;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
            }

            .install-gutenverse-plugin-notice:after {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 5px;
                display: block;
                background: linear-gradient(to bottom, #68E4F4, #4569FF, #F045FF);
            }

            .install-gutenverse-plugin-notice .notice-dismiss {
                top: 20px;
                right: 20px;
                padding: 0;
                background: white;
                border-radius: 6px;
            }

            .install-gutenverse-plugin-notice .notice-dismiss:before {
                content: "\f335";
                font-size: 17px;
                width: 25px;
                height: 25px;
                line-height: 25px;
                border: 1px solid #E6E6EF;
                border-radius: 3px;
            }

            .install-gutenverse-plugin-notice h3 {
                margin-top: 5px;
                margin-bottom: 15px;
                font-weight: 600;
                font-size: 25px;
                line-height: 1.4em;
            }

            .install-gutenverse-plugin-notice h3 span {
                font-weight: 700;
                background-clip: text !important;
                -webkit-text-fill-color: transparent;
                background: linear-gradient(80deg, rgba(208, 77, 255, 1) 0%,rgba(69, 105, 255, 1) 48.8%,rgba(104, 228, 244, 1) 100%);
            }

            .install-gutenverse-plugin-notice p {
                font-size: 13px;
                font-weight: 400;
                margin: 5px 100px 20px 0 !important;
            }

            .install-gutenverse-plugin-notice .gutenverse-bottom {
                display: flex;
                align-items: center;
                margin-top: 30px;
            }

            .install-gutenverse-plugin-notice a {
                text-decoration: none;
                margin-right: 20px;
            }

            .install-gutenverse-plugin-notice a.gutenverse-button {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", serif;
                text-decoration: none;
                cursor: pointer;
                font-size: 12px;
                line-height: 18px;
                border-radius: 5px;
                background: #3B57F7;
                color: #fff;
                padding: 10px 15px;
                font-weight: 500;
                background: linear-gradient(to left, #68E4F4, #4569FF, #F045FF);
                transition: transform 0.5s ease, color 0.5s ease;
            }

            .install-gutenverse-plugin-notice a.gutenverse-button:hover {
                color: hsla(0, 0%, 100%, .749);
                transform: scale(.94);
            }

            #gutenverse-install-plugin.loader:after {
                display: block;
                content: "";
                border: 5px solid white;
                border-radius: 50%;
                border-top: 5px solid rgba(255, 255, 255, 0);
                width: 10px;
                height: 10px;
                -webkit-animation: spin 2s linear infinite;
                animation: spin 2s linear infinite;
            }

            @-webkit-keyframes spin {
                0% {
                    -webkit-transform: rotate(0deg);
                }
                100% {
                    -webkit-transform: rotate(360deg);
                }
            }

            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }

            @media screen and (max-width: 1024px) {
                .gutenverse-notice-text {
                    width: 100%;
                }

                .gutenverse-notice-image {
                    display: none;
                }
            }
        </style>';
		$notice                    = ! empty( $other['pluginNoticeNormal'] ) ? '<div class="notice notice-info is-dismissible install-gutenverse-plugin-notice">
            <div class="gutenverse-notice-inner">
                <div class="gutenverse-notice-content">
                    <div class="gutenverse-notice-text">
                        <h3><?php esc_html_e( \'Take Your Website To New Height with\', \'' . $theme_data['slug'] . '\' ); ?> <span>Gutenverse!</span></h3> 
                        <p><?php esc_html_e( \'' . $theme_data['title'] . ' theme work best with Gutenverse plugin. By installing Gutenverse plugin you may access ' . $theme_data['title'] . ' templates built with Gutenverse and get access to more than 40 free blocks, hundred free Layout and Section.\', \'' . $theme_data['slug'] . '\' ); ?></p>
                        <div class="gutenverse-bottom">
                            <a class="button-primary" id="gutenverse-install-plugin" href="<?php echo esc_url( wp_nonce_url( self_admin_url( \'themes.php?page=' . $theme_data['slug'] . '-dashboard\' ), \'install-plugin_gutenverse\' ) ); ?>">
                                <?php echo esc_html( __( \'Install Required Plugins\', \'' . $theme_data['slug'] . '\' ) ); ?>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>' : '<div class="notice is-dismissible install-gutenverse-plugin-notice">
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
                        <img src="<?php echo esc_url( ' . Misc::get_constant_name( $theme_data['slug'] ) . '_URI . \'/assets/img/banner-install-gutenverse.png\' ); ?>"/>
                    </div>
                </div>
            </div>
        </div>';
		$script                    = "<script>
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
                    action: '" . $theme_data['slug'] . "_set_admin_notice_viewed',
                    nonce: '<?php echo esc_html( wp_create_nonce( '" . $theme_data['slug'] . "_admin_notice' ) ); ?>',
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
                    var plugins = <?php echo wp_json_encode( \$plugins_required ); ?>;
                    $(this).addClass('loader').text('');

                    sequenceInstall(plugins);
                    Promise.all(promises).then(() => {						
                        window.location.reload();
                        $(this).removeClass('loader').addClass('finished').text('All is Done!');
                    });
                }
            });
        } );
        </script>";
		$plugin_notice_placeholder = str_replace( '{{dashboard_style}}', $style, $plugin_notice_placeholder );
		$plugin_notice_placeholder = str_replace( '{{dashboard_script}}', $script, $plugin_notice_placeholder );
		$plugin_notice_placeholder = str_replace( '{{dashboard_notice}}', $notice, $plugin_notice_placeholder );
		return $plugin_notice_placeholder;
	}

	/**
	 * Add Essential Functionality
	 *
	 * @param array  $theme_data .
	 * @param object $system .
	 * @param string $class_dir .
	 */
	private function add_essential( $theme_data, $system, $class_dir ) {
		/**Add Init Essential */
		$essential_init_placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/essential/essential-class.txt' );
		$essential_init_placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $essential_init_placeholder );
		$essential_init_placeholder = str_replace( '{{slug}}', $theme_data['slug'], $essential_init_placeholder );
		$essential_init_placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $essential_init_placeholder );
		$system->put_contents(
			$class_dir . '/class-essential.php',
			$essential_init_placeholder,
			FS_CHMOD_FILE
		);

		/**Add Api Class Essential */
		$essential_api_placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/essential/api-class.txt' );
		$essential_api_placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $essential_api_placeholder );
		$essential_api_placeholder = str_replace( '{{slug}}', $theme_data['slug'], $essential_api_placeholder );
		$essential_api_placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $essential_api_placeholder );
		$system->put_contents(
			$class_dir . '/class-essential-api.php',
			$essential_api_placeholder,
			FS_CHMOD_FILE
		);

		/**Add Asset Class Essential */
		$essential_asset_placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/essential/asset-class.txt' );
		$essential_asset_placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $essential_asset_placeholder );
		$essential_asset_placeholder = str_replace( '{{slug}}', $theme_data['slug'], $essential_asset_placeholder );
		$essential_asset_placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $essential_asset_placeholder );
		$essential_asset_placeholder = str_replace( '{{constant}}', Misc::get_constant_name( $theme_data['slug'] ), $essential_asset_placeholder );

		$system->put_contents(
			$class_dir . '/class-essential-assets.php',
			$essential_asset_placeholder,
			FS_CHMOD_FILE
		);

		/**Add Block Class Essential */
		$essential_block_placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/essential/block-class.txt' );
		$essential_block_placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $essential_block_placeholder );
		$essential_block_placeholder = str_replace( '{{slug}}', $theme_data['slug'], $essential_block_placeholder );
		$essential_block_placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $essential_block_placeholder );
		$essential_block_placeholder = str_replace( '{{constant}}', Misc::get_constant_name( $theme_data['slug'] ), $essential_block_placeholder );

		$system->put_contents(
			$class_dir . '/class-essential-blocks.php',
			$essential_block_placeholder,
			FS_CHMOD_FILE
		);

		/**Add Style Generator Class Essential */
		$essential_style_generator_placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/essential/style-generator-class.txt' );
		$essential_style_generator_placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $essential_style_generator_placeholder );
		$essential_style_generator_placeholder = str_replace( '{{slug}}', $theme_data['slug'], $essential_style_generator_placeholder );
		$essential_style_generator_placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $essential_style_generator_placeholder );

		$system->put_contents(
			$class_dir . '/class-essential-style-generator.php',
			$essential_style_generator_placeholder,
			FS_CHMOD_FILE
		);

		/**Create directory to save block style class */
		$class_block_style_dir = gutenverse_themes_builder_theme_built_path() . 'inc/class/style';
		if ( ! is_dir( $class_block_style_dir ) ) {
			wp_mkdir_p( $class_block_style_dir );
		}

		/**Add Advance Tab Class Essential */
		$essential_advance_tab_placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/essential/block/advance-tab.txt' );
		$essential_advance_tab_placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $essential_advance_tab_placeholder );
		$essential_advance_tab_placeholder = str_replace( '{{slug}}', $theme_data['slug'], $essential_advance_tab_placeholder );
		$essential_advance_tab_placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $essential_advance_tab_placeholder );

		$system->put_contents(
			$class_block_style_dir . '/class-advance-tabs.php',
			$essential_advance_tab_placeholder,
			FS_CHMOD_FILE
		);

		/**Add Mega Menu Item Class Essential */
		$essential_mega_menu_item_placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/essential/block/mega-menu-item.txt' );
		$essential_mega_menu_item_placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $essential_mega_menu_item_placeholder );
		$essential_mega_menu_item_placeholder = str_replace( '{{slug}}', $theme_data['slug'], $essential_mega_menu_item_placeholder );
		$essential_mega_menu_item_placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $essential_mega_menu_item_placeholder );

		$system->put_contents(
			$class_block_style_dir . '/class-mega-menu-item.php',
			$essential_mega_menu_item_placeholder,
			FS_CHMOD_FILE
		);

		/**Add Mega Menu Class Essential */
		$essential_mega_menu_placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/essential/block/mega-menu.txt' );
		$essential_mega_menu_placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $essential_mega_menu_placeholder );
		$essential_mega_menu_placeholder = str_replace( '{{slug}}', $theme_data['slug'], $essential_mega_menu_placeholder );
		$essential_mega_menu_placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $essential_mega_menu_placeholder );

		$system->put_contents(
			$class_block_style_dir . '/class-mega-menu.php',
			$essential_mega_menu_placeholder,
			FS_CHMOD_FILE
		);

		/**Add Style Default Class Essential */
		$essential_style_default_placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/essential/block/style-default.txt' );
		$essential_style_default_placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $essential_style_default_placeholder );
		$essential_style_default_placeholder = str_replace( '{{slug}}', $theme_data['slug'], $essential_style_default_placeholder );
		$essential_style_default_placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $essential_style_default_placeholder );
		$essential_style_default_placeholder = str_replace( '{{constant}}', Misc::get_constant_name( $theme_data['slug'] ), $essential_style_default_placeholder );

		$system->put_contents(
			$class_block_style_dir . '/class-style-default.php',
			$essential_style_default_placeholder,
			FS_CHMOD_FILE
		);

		/**Copy Essential Js Dir */
		Misc::copy_dir( GUTENVERSE_THEMES_BUILDER_DIR . '/assets/js/essential', gutenverse_themes_builder_theme_built_path() . 'assets/js/essential', array( 'chunk-gsap-scroll-trigger.js.map', 'chunk-gsap.js.map', 'frontend.js.map', 'profrontend.js.map', 'filter.js.map' ) );
		/**Copy Essential Css Dir */
		Misc::copy_dir( GUTENVERSE_THEMES_BUILDER_DIR . '/assets/css/essential', gutenverse_themes_builder_theme_built_path() . 'assets/css/essential' );
		/**Copy Essential Dependencies Dir */
		Misc::copy_dir( GUTENVERSE_THEMES_BUILDER_DIR . '/lib/dependencies/essential', gutenverse_themes_builder_theme_built_path() . 'assets/dependencies/essential' );
		/**Copy Essential Blocks Dir */
		Misc::copy_dir( GUTENVERSE_THEMES_BUILDER_DIR . '/block', gutenverse_themes_builder_theme_built_path() . 'assets/block', array( 'pattern-wrapper' ) );
	}

	/**
	 * Add Pages List
	 *
	 * @param string $placeholder .
	 * @param array  $other .
	 * @param array  $theme_data .
	 * @param object $system .
	 * @return string
	 */
	private function add_screenshot_page_list( $placeholder, $other, $theme_data, $system ) {
		$uri   = Misc::get_constant_name( $theme_data['slug'] ) . '_URI';
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
		return $placeholder;
	}

	/**
	 * Generate Init Fonts
	 *
	 * @param string $placeholder .
	 * @return string
	 */
	private function generate_init_fonts( $placeholder ) {
		$global_fonts = get_option( 'gutenverse-global-variable-font-' . get_stylesheet(), false );
		$fonts        = '';

		if ( $global_fonts ) {
			foreach ( $global_fonts as $font ) {
				$fonts .= var_export( $font, true ) . ','; //phpcs:ignore
			}
		}

		$placeholder = str_replace( '{{theme_fonts}}', $fonts, $placeholder );
		return $placeholder;
	}

	/**
	 * Add Custom Template
	 *
	 * @param string $placeholder .
	 * @param array  $templates_data .
	 *
	 * @return string
	 */
	private function add_custom_template( $placeholder, $templates_data ) {
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
		return $placeholder;
	}

	/**
	 * Load Gutenverse Templates
	 *
	 * @param string $placeholder .
	 * @param array  $templates_data .
	 * @param array  $theme_data .
	 *
	 * @return string
	 */
	private function load_gutenverse_templates( $placeholder, $templates_data, $theme_data ) {
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
		return $placeholder;
	}
}
