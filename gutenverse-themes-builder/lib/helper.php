<?php
/**
 * Helper function
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

use Gutenverse_Themes_Builder\Database\Database;

if ( ! function_exists( 'is_image_url' ) ) {
	/**
	 * Check if the url is an image url
	 */
	function is_image_url( $url ) {
		$image_extensions = array( 'webp', 'jpeg', 'jpg', 'png' );
		$path             = wp_parse_url( $url, PHP_URL_PATH );
		$extension        = pathinfo( $path, PATHINFO_EXTENSION );
		return in_array( strtolower( $extension ), $image_extensions );
	}
}
if ( ! function_exists( 'gtb_to_unicode_escape' ) ) {
	/**
	 * escape to unicode
	 *
	 * @param string str .
	 *
	 * @return string
	 */
	function gtb_to_unicode_escape( $str ) {
		$unicode_escape = '';
		$length         = mb_strlen( $str, 'UTF-8' );

		for ( $i = 0; $i < $length; $i++ ) {
			$char            = mb_substr( $str, $i, 1, 'UTF-8' );
			$unicode_escape .= sprintf( "\\u%04x", mb_ord( $char, 'UTF-8' ) );
		}

		return $unicode_escape;
	}
}
if ( ! function_exists( 'get_image_without_resolution' ) ) {
	/**
	 * Get Image Without Resolution
	 *
	 * @param string $image .
	 *
	 * @return array
	 */
	function get_image_without_resolution( $image ) {
		// Capture image url that has resolution inside double quotes.
		preg_match( '/http[^"]*(-\d+x\d+[^"]*(\.png|\.jpg|\.svg|\.jpeg|\.gif|\.webp))/', $image, $matches );

		if ( empty( $matches ) ) {
			return false;
		}
		$res = explode( 'x', explode( '-', $matches[1] )[1] );
		return array(
			'original' => $matches[0],
			'nores'    => str_replace( $matches[1], $matches[2], $matches[0] ),
			'width'    => $res[0],
			'height'   => explode( '.', $res[1] )[0],
		);
	}
}
if ( ! function_exists( 'gtb_parts' ) ) {
	/**
	 * Template Parts categories.
	 */
	function gtb_parts() {
		return array(
			'header',
			'footer',
			'template_part',
		);
	}
}

if ( ! function_exists( 'gtb_check_theme' ) ) {
	/**
	 * Check if current theme is correct.
	 */
	function gtb_check_theme() {
		return 'gutenverse-basic' === get_option( 'stylesheet' );
	}
}

if ( ! function_exists( 'gtb_theme_folder_path' ) ) {
	/**
	 * Get Theme Folder path.
	 *
	 * @param string  $theme_id .
	 * @param boolean $url .
	 *
	 * @return string
	 */
	function gtb_theme_folder_path( $theme_id = null, $url = false ) {
		if ( null === $theme_id ) {
			$theme_id = get_option( 'gtb_active_theme_id' );
		}

		if ( $url ) {
			return trailingslashit( wp_upload_dir()['baseurl'] . '/gtb-' . $theme_id );
		}

		return trailingslashit( wp_upload_dir()['basedir'] . '/gtb-' . $theme_id );
	}
}

if ( ! function_exists( 'gtb_theme_built_path' ) ) {
	/**
	 * Get Theme Built path.
	 *
	 * @param string  $theme_id .
	 * @param boolean $url .
	 *
	 * @return string
	 */
	function gtb_theme_built_path( $theme_id = null, $url = false ) {
		if ( null === $theme_id ) {
			$theme_id = get_option( 'gtb_active_theme_id' );
		}

		$info_db = Database::instance()->theme_info;
		$result  = $info_db->get_theme_data( $theme_id );
		$theme   = $result[0];

		if ( $url ) {
			return trailingslashit( wp_upload_dir()['baseurl'] . '/' . $theme['slug'] );
		}

		return trailingslashit( wp_upload_dir()['basedir'] . '/' . $theme['slug'] );
	}
}

if ( ! function_exists( 'gtb_get_theme_mode' ) ) {
	/**
	 * Get Theme Mode
	 *
	 * @param string $theme_id .
	 *
	 * @return string|null
	 */
	function gtb_get_theme_mode( $theme_id = null ) {
		$theme_id = $theme_id ? $theme_id : get_option( 'gtb_active_theme_id' );
		$info_db  = Database::instance()->theme_info;
		$data     = $info_db->get_theme_data( $theme_id );

		if ( ! empty( $data ) ) {
			return $data[0]['theme_mode'];
		}

		return null;
	}
}


if ( ! function_exists( 'gtb_check_theme_mode' ) ) {
	/**
	 * Check theme mode
	 *
	 * @param string $category .
	 * @param string $theme_id .
	 *
	 * @return array
	 */
	function gtb_check_theme_mode( $category, $theme_id = null ) {
		$theme_id   = $theme_id ? $theme_id : get_option( 'gtb_active_theme_id' );
		$theme_mode = gtb_get_theme_mode( $theme_id );

		switch ( $theme_mode ) {
			case 'core-gutenverse':
				return in_array( $category, array( 'core', 'gutenverse' ), true );
			case 'gutenverse-pro':
				return in_array( $category, array( 'gutenverse', 'pro' ), true );
			case 'core-only':
				return 'core' === $category;
			case 'gutenverse-only':
				return 'gutenverse' === $category;
			case 'pro-only':
				return 'pro' === $category;
			default:
				return false;
		}

		return false;
	}
}
