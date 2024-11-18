<?php
/**
 * Helper function
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gutenverse_Themes_Builder\Database\Database;

if ( ! function_exists( 'gutenverse_check_dashboard_mode' ) ) {
	/**
	 * Check dashboard mode
	 */
	function gutenverse_check_dashboard_mode() {
		$theme_id = get_option( 'gtb_active_theme_id' );
		$info_db  = Database::instance()->theme_info;
		$data     = $info_db->get_theme_data( $theme_id );
		if ( isset( $data[0]['other'] ) ) {
			$other = maybe_unserialize( $data[0]['other'] );
			if ( isset( $other['dashboard']['mode']['value'] ) && isset( $other['dashboard']['themeforest_mode'] ) ) {
				$dashboard_mode    = $other['dashboard']['mode']['value'];
				$is_export_feature = $other['dashboard']['themeforest_mode'];
				if ( 'themeforest' === $dashboard_mode && $is_export_feature ) {
					return true;
				}
			}
		}
		return false;
	}
}
if ( ! function_exists( 'gutenverse_generate_unique_string' ) ) {
	/**
	 * Generate Unique String
	 *
	 * @param integer $length .
	 * @param array   $data array of assosiative array .
	 * @param string  $key .
	 */
	function gutenverse_generate_unique_string( $length, $data, $key ) {
		do {
			$uuid        = wp_generate_uuid4();
			$short_uuid  = substr( $uuid, 0, $length );
			$filter_data = array_filter(
				$data,
				function ( $obj ) use ( $key, $short_uuid ) {
					return isset( $obj[ $key ] ) && $obj[ $key ] === $short_uuid;
				}
			);
			$check_uuid  = reset( $filter_data );
		} while ( $check_uuid );

		return $short_uuid;
	}
}
if ( ! function_exists( 'gutenverse_themes_builder_is_image_url' ) ) {
	/**
	 * Check if the url is an image url
	 *
	 * @param string $url .
	 */
	function gutenverse_themes_builder_is_image_url( $url ) {
		$image_extensions = array( 'webp', 'jpeg', 'jpg', 'png' );
		$path             = wp_parse_url( $url, PHP_URL_PATH );
		$extension        = pathinfo( $path, PATHINFO_EXTENSION );
		return in_array( strtolower( $extension ), $image_extensions );
	}
}
if ( ! function_exists( 'gutenverse_themes_builder_to_unicode_escape' ) ) {
	/**
	 * Escape to unicode
	 *
	 * @param string $str .
	 *
	 * @return string
	 */
	function gutenverse_themes_builder_to_unicode_escape( $str ) {
		$unicode_escape = '';
		$length         = mb_strlen( $str, 'UTF-8' );

		for ( $i = 0; $i < $length; $i++ ) {
			$char            = mb_substr( $str, $i, 1, 'UTF-8' );
			$unicode_escape .= sprintf( "\\u%04x", mb_ord( $char, 'UTF-8' ) );
		}

		return $unicode_escape;
	}
}
if ( ! function_exists( 'gutenverse_themes_builder_get_image_without_resolution' ) ) {
	/**
	 * Get Image Without Resolution
	 *
	 * @param string $image .
	 *
	 * @return array
	 */
	function gutenverse_themes_builder_get_image_without_resolution( $image ) {
		/** Capture image url that has resolution inside double quotes. */
		preg_match( '/http[^"]*(-\d+x\d+[^"]*(\.png|\.jpg|\.svg|\.jpeg|\.gif|\.webp))/', $image, $matches );

		$is_valid    = wp_remote_head( $image );
		$status_code = wp_remote_retrieve_response_code( $is_valid );
		if ( empty( $matches ) || 200 !== $status_code ) {
			return false;
		}
		$res = explode( 'x', explode( '-', $matches[1] )[1] );

		/** Get Image Name Without symbol */
		$image_arr  = explode( '/', str_replace( $matches[1], $matches[2], $matches[0] ) );
		$image_name = $image_arr[ count( $image_arr ) - 1 ];
		/** Check if the $image_name have . in their name other than extention and end with _ */
		/** Split the image name by the last dot to separate the extension */
		$parts = explode( '.', $image_name );

		/** Check if the filename ends with an underscore  */
		if ( 2 < count( $parts ) ) {
			/** The last part is the extension */
			$extension = array_pop( $parts );

			/** Recombine the remaining parts into the main part of the filename  */
			$filename    = implode( '.', $parts );
			$end_of_name = substr( $filename, -1 );
			switch ( $end_of_name ) {
				case '_':
				case '-':
				case '.':
				case '!':
				case ',':
				case '/':
					/** Remove the trailing underscore */
					$filename = rtrim( $filename, '_' );
					/** Reconstruct the full image name */
					$image_name = $filename . '.' . $extension;
					break;
				default:
					break;
			}
			if ( substr( $filename, -1 ) === '_' ) {
				/** Remove the trailing underscore */
				$filename = rtrim( $filename, '_' );
				/** Reconstruct the full image name */
				$image_name = $filename . '.' . $extension;
			}
		}

		$image_without_res = str_replace( $matches[1], $matches[2], $matches[0] );

		/**Check resolution again */
		preg_match( '/http[^"]*(-\d+x\d+[^"]*(\.png|\.jpg|\.svg|\.jpeg|\.gif|\.webp))/', $image_without_res, $matches_check );

		/**If image name still has the resolution, trim again */
		if ( ! empty( $matches ) ) {
			$check_image_name = gutenverse_themes_builder_get_image_without_resolution( $image_without_res );
			if ( $check_image_name ) {
				$image_name        = $check_image_name['image_name'];
				$image_without_res = $check_image_name['nores'];
			} else {
				$is_valid    = wp_remote_head( $image_without_res );
				$status_code = wp_remote_retrieve_response_code( $is_valid );
				if ( 200 !== $status_code ) {
					$image_without_res = $image;
				}
			}
		}
		return array(
			'original'   => $matches[0],
			'nores'      => $image_without_res,
			'image_name' => $image_name,
			'width'      => $res[0],
			'height'     => explode( '.', $res[1] )[0],
		);
	}
}
if ( ! function_exists( 'gutenverse_themes_builder_parts' ) ) {
	/**
	 * Template Parts categories.
	 */
	function gutenverse_themes_builder_parts() {
		return array(
			'header',
			'footer',
			'template_part',
		);
	}
}

if ( ! function_exists( 'gutenverse_themes_builder_check_theme' ) ) {
	/**
	 * Check if current theme is correct.
	 */
	function gutenverse_themes_builder_check_theme() {
		return 'gutenverse-basic' === get_option( 'stylesheet' );
	}
}

if ( ! function_exists( 'gutenverse_themes_builder_theme_folder_path' ) ) {
	/**
	 * Get Theme Folder path.
	 *
	 * @param string  $theme_id .
	 * @param boolean $url .
	 *
	 * @return string
	 */
	function gutenverse_themes_builder_theme_folder_path( $theme_id = null, $url = false ) {
		if ( null === $theme_id ) {
			$theme_id = get_option( 'gtb_active_theme_id' );
		}

		if ( $url ) {
			return trailingslashit( wp_upload_dir()['baseurl'] . '/gtb-' . $theme_id );
		}

		return trailingslashit( wp_upload_dir()['basedir'] . '/gtb-' . $theme_id );
	}
}

if ( ! function_exists( 'gutenverse_themes_builder_theme_built_path' ) ) {
	/**
	 * Get Theme Built path.
	 *
	 * @param string  $theme_id .
	 * @param boolean $url .
	 * @param boolean $child .
	 *
	 * @return string
	 */
	function gutenverse_themes_builder_theme_built_path( $theme_id = null, $url = false, $child = false ) {
		if ( null === $theme_id ) {
			$theme_id = get_option( 'gtb_active_theme_id' );
		}

		$info_db = Database::instance()->theme_info;
		$result  = $info_db->get_theme_data( $theme_id );
		$theme   = $result[0];

		if ( $url ) {
			return trailingslashit( wp_upload_dir()['baseurl'] . '/' . $theme['slug'] . ( $child ? '-child' : '' ) );
		}

		return trailingslashit( wp_upload_dir()['basedir'] . '/' . $theme['slug'] . ( $child ? '-child' : '' ) );
	}
}

if ( ! function_exists( 'gutenverse_themes_builder_get_theme_mode' ) ) {
	/**
	 * Get Theme Mode
	 *
	 * @param string $theme_id .
	 *
	 * @return string|null
	 */
	function gutenverse_themes_builder_get_theme_mode( $theme_id = null ) {
		$theme_id = $theme_id ? $theme_id : get_option( 'gtb_active_theme_id' );
		$info_db  = Database::instance()->theme_info;
		$data     = $info_db->get_theme_data( $theme_id );

		if ( ! empty( $data ) ) {
			return $data[0]['theme_mode'];
		}

		return null;
	}
}


if ( ! function_exists( 'gutenverse_themes_builder_check_theme_mode' ) ) {
	/**
	 * Check theme mode
	 *
	 * @param string $category .
	 * @param string $theme_id .
	 *
	 * @return array
	 */
	function gutenverse_themes_builder_check_theme_mode( $category, $theme_id = null ) {
		$theme_id   = $theme_id ? $theme_id : get_option( 'gtb_active_theme_id' );
		$theme_mode = gutenverse_themes_builder_get_theme_mode( $theme_id );

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
