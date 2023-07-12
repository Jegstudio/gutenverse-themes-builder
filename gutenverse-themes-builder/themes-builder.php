<?php
/**
 * Plugin Name: Gutenverse Themes Builder
 * Description: Build advance themes that fit for wp.org and any other marketplace.
 * Plugin URI: https://gutenverse.com/
 * Author: Jegstudio
 * Version: 1.0.0
 * Author URI: https://jegtheme.com/
 * License: GPLv3
 * Text Domain: gutenverse-themes-builder
 *
 * @package gtb
 */

defined( 'GTB' ) || define( 'GTB', 'gutenverse-themes-builder' );
defined( 'GTB_VERSION' ) || define( 'GTB_VERSION', '1.0.0' );
defined( 'GTB_NOTICE_VERSION' ) || define( 'GTB_NOTICE_VERSION', '1.0.0' );
defined( 'GTB_NAME' ) || define( 'GTB_NAME', 'Gutenverse Themes Builder' );
defined( 'GTB_URL' ) || define( 'GTB_URL', plugins_url( GTB ) );
defined( 'GTB_FILE' ) || define( 'GTB_FILE', __FILE__ );
defined( 'GTB_DIR' ) || define( 'GTB_DIR', plugin_dir_path( __FILE__ ) );
defined( 'GTB_CLASS_DIR' ) || define( 'GTB_CLASS_DIR', GTB_DIR . 'includes/' );
defined( 'GTB_LANG_DIR' ) || define( 'GTB_LANG_DIR', GTB_DIR . 'languages' );
defined( 'GTB_PATH' ) || define( 'GTB_PATH', plugin_basename( __FILE__ ) );
defined( 'GUTENVERSE_FRAMEWORK_URL' ) || define( 'GUTENVERSE_FRAMEWORK_URL', plugins_url( GTB ) . '/lib/framework' );

require_once GTB_DIR . 'lib/autoload.php';
$instance = \GTB\Gtb::instance();
