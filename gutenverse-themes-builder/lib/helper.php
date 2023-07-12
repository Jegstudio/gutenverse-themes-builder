<?php
/**
 * Helper function
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gtb
 */

use GTB\Database\Database;

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
