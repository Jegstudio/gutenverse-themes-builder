<?php
/**
 * Plugin Name: Gutenverse Themes Builder
 * Requires Plugins: gutenverse
 * Description: Build advance themes that fit for wp.org and any other marketplace.
 * Plugin URI: https://gutenverse.com/
 * Author: Jegstudio
 * Version: 1.0.2
 * Author URI: https://jegtheme.com/
 * License: GPLv3
 * Text Domain: gutenverse-themes-builder
 *
 * @package gutenverse-themes-builder
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

defined( 'GUTENVERSE_THEMES_BUILDER' ) || define( 'GUTENVERSE_THEMES_BUILDER', 'gutenverse-themes-builder' );
defined( 'GUTENVERSE_THEMES_BUILDER_VERSION' ) || define( 'GUTENVERSE_THEMES_BUILDER_VERSION', '1.0.2' );
defined( 'GUTENVERSE_THEMES_BUILDER_NOTICE_VERSION' ) || define( 'GUTENVERSE_THEMES_BUILDER_NOTICE_VERSION', '1.0.0' );
defined( 'GUTENVERSE_THEMES_BUILDER_NAME' ) || define( 'GUTENVERSE_THEMES_BUILDER_NAME', 'Gutenverse Themes Builder' );
defined( 'GUTENVERSE_THEMES_BUILDER_URL' ) || define( 'GUTENVERSE_THEMES_BUILDER_URL', plugins_url( GUTENVERSE_THEMES_BUILDER ) );
defined( 'GUTENVERSE_THEMES_BUILDER_FILE' ) || define( 'GUTENVERSE_THEMES_BUILDER_FILE', __FILE__ );
defined( 'GUTENVERSE_THEMES_BUILDER_DIR' ) || define( 'GUTENVERSE_THEMES_BUILDER_DIR', plugin_dir_path( __FILE__ ) );
defined( 'GUTENVERSE_THEMES_BUILDER_CLASS_DIR' ) || define( 'GUTENVERSE_THEMES_BUILDER_CLASS_DIR', GUTENVERSE_THEMES_BUILDER_DIR . 'includes/' );
defined( 'GUTENVERSE_THEMES_BUILDER_LANG_DIR' ) || define( 'GUTENVERSE_THEMES_BUILDER_LANG_DIR', GUTENVERSE_THEMES_BUILDER_DIR . 'languages' );
defined( 'GUTENVERSE_THEMES_BUILDER_PATH' ) || define( 'GUTENVERSE_THEMES_BUILDER_PATH', plugin_basename( __FILE__ ) );

require_once GUTENVERSE_THEMES_BUILDER_DIR . 'lib/autoload.php';
$instance = \Gutenverse_Themes_Builder\Init::instance();
