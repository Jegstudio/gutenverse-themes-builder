<?php
/**
 * Autoload Functionality
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

spl_autoload_register(
	function ( $class ) {
		$prefix   = 'Gutenverse_Themes_Builder\\';
		$base_dir = GUTENVERSE_THEMES_BUILDER_CLASS_DIR;
		$len      = strlen( $prefix );

		if ( strncmp( $prefix, $class, $len ) !== 0 ) {
			return;
		}

		$relative_class = substr( $class, $len );

		$class_path     = explode( '\\', $relative_class );
		$relative_class = array_pop( $class_path );
		$class_path     = strtolower( implode( '/', $class_path ) );

		$class_name = 'class-' . $relative_class . '.php';
		$class_name = str_replace( '_', '-', $class_name );
		$file       = rtrim( $base_dir, '/' ) . '/' . $class_path . '/' . strtolower( $class_name );

		if ( is_link( $file ) ) {
			$file = readlink( $file );
		}

		if ( is_file( $file ) ) {
			require $file;
		}
	}
);
