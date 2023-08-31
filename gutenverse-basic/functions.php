<?php
/**
 * Gutenverse Basic functions and definitions
 *
 * @author Jegstudio
 * @package gutenverse-basic
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

defined( 'GUTENVERSE_BASIC_VERSION' ) || define( 'GUTENVERSE_BASIC_VERSION', '1.0.0' );
defined( 'GUTENVERSE_BASIC_DIR' ) || define( 'GUTENVERSE_BASIC_DIR', trailingslashit( get_template_directory() ) );
defined( 'GUTENVERSE_BASIC_URI' ) || define( 'GUTENVERSE_BASIC_URI', trailingslashit( get_template_directory_uri() ) );
