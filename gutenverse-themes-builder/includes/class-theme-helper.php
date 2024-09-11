<?php
/**
 * Theme Helper class
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

/**
 * Class Theme Helper
 *
 * @package gutenverse-themes-builder
 */
class Theme_Helper {
	/**
	 * Theme Helper constructor.
	 */
	public function __construct() {
		$this->init_hooks();
	}

	/**
	 * Init hooks.
	 */
	private function init_hooks() {
		add_filter( 'gutenverse_template_path', array( $this, 'template_path' ), 20, 3 );
		add_filter( 'gutenverse_themes_template', array( $this, 'add_template' ), 20, 2 );
	}

	/**
	 * Add Template to Editor.
	 *
	 * @param array $template_files Path to Template File.
	 * @param array $template_type Template Type.
	 *
	 * @return array
	 */
	public function add_template( $template_files, $template_type ) {
		$theme_id  = get_option( 'gtb_active_theme_id' );
		$uploaddir = trailingslashit( wp_upload_dir()['basedir'] ) . 'gtb-' . $theme_id;

		$templates_db = Database::instance()->theme_templates;
		$templates    = $templates_db->get_data( $theme_id );

		if ( ! empty( $templates ) ) {
			foreach ( $templates as $template ) {
				if ( ! gutenverse_themes_builder_check_theme_mode( $template['category'], $theme_id ) ) {
					continue;
				}

				$is_parts      = in_array( $template['template_type'], gutenverse_themes_builder_parts(), true );
				$template_name = strtolower( str_replace( ' ', '-', $template['name'] ) );

				if ( 'wp_template' === $template_type && ! $is_parts ) {
					$template_files[] = array(
						'slug'  => strtolower( $template['category'] . '-' . $template_name ),
						'path'  => $uploaddir . '/' . $template['category'] . '/templates/' . $template_name . '.html',
						'theme' => get_template(),
						'type'  => 'wp_template',
					);
				}

				if ( 'wp_template_part' === $template_type && $is_parts ) {
					$template_files[] = array(
						'slug'  => strtolower( $template['category'] . '-' . $template_name ),
						'path'  => $uploaddir . '/' . $template['category'] . '/parts/' . $template_name . '.html',
						'theme' => get_template(),
						'type'  => 'wp_template_part',
						'area'  => $template['template_type'],
					);
				}
			}
		}

		return $template_files;
	}

	/**
	 * Use gutenverse template file instead.
	 *
	 * @param string $template_file Path to Template File.
	 * @param string $theme_slug Theme Slug.
	 * @param string $template_slug Template Slug.
	 *
	 * @return string
	 */
	public function template_path( $template_file, $theme_slug, $template_slug ) {
		$theme_id  = get_option( 'gtb_active_theme_id' );
		$uploaddir = trailingslashit( wp_upload_dir()['basedir'] ) . 'gtb-' . $theme_id;

		$templates_db = Database::instance()->theme_templates;
		$templates    = $templates_db->get_data( $theme_id );

		if ( ! empty( $templates ) ) {
			foreach ( $templates as $template ) {
				$template_name = strtolower( str_replace( ' ', '-', $template['name'] ) );
				$slug          = strtolower( $template['category'] . '-' . $template_name );
				$type          = in_array( $template['template_type'], gutenverse_themes_builder_parts(), true ) ? 'parts' : 'templates';

				if ( $template_slug === $slug ) {
					return $uploaddir . '/' . $template['category'] . '/' . $type . '/' . $template_name . '.html';
				}
			}
		}

		return $template_file;
	}
}
