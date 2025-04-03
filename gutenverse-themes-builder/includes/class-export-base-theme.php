<?php
/**
 * Export Base Theme Class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder;

use Gutenverse_Themes_Builder\Database\Database;
use InvalidArgumentException;
use WP_Theme_Json_Resolver;
use ZipArchive;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;

/**
 * Export Base Theme Class
 *
 * @package gutenverse-themes-builder
 */
class Export_Base_Theme {

	/**
	 * Zipped file result
	 *
	 * @var $fileresult
	 */
	public $fileresult;

	/**
	 * List of Config
	 *
	 * @var array
	 */
	private $config;

	/**
	 * Init constructor.
	 *
	 * @param bool $include_global_import .
	 */
	public function __construct( $include_global_import = false ) {
		$theme_id   = get_option( 'gtb_active_theme_id' );
		$info_db    = Database::instance()->theme_info;
		$theme_data = $info_db->get_theme_data( $theme_id );
		if ( isset( $theme_data[0] ) ) {
			$data       = $theme_data[0];
			$theme_data = maybe_unserialize( $data['theme_data'] );
			$other      = maybe_unserialize( $data['other'] );

			$this->config = array_merge(
				$theme_data,
				array(
					'constant'    => strtoupper( str_replace( '-', '_', sanitize_title( $theme_data['slug'] ) ) ),
					'namespace'   => implode( '_', array_map( 'ucfirst', explode( '-', sanitize_title( $theme_data['slug'] ) ) ) ),
					'screenshots' => ! empty( $other['screenshots'] ) ? $other['screenshots'] : '',
				)
			);

			if ( ! empty( $this->config['slug'] ) ) {
				$this->start( $include_global_import );
			}
		}
	}

	/**
	 * Export Theme
	 *
	 * @param bool $include_global_import .
	 */
	public function start( $include_global_import ) {
		$zip_path         = rtrim( trailingslashit( wp_upload_dir()['basedir'] . '/' . $this->config['slug'] ), '/' ) . '.zip';
		$target_directory = GUTENVERSE_THEMES_BUILDER_DIR . 'includes/data/base';

		$zip = new ZipArchive();
		if ( $zip->open( $zip_path, ZipArchive::CREATE | ZipArchive::OVERWRITE ) === true ) {
			$files = new RecursiveIteratorIterator(
				new RecursiveDirectoryIterator( $target_directory ),
				RecursiveIteratorIterator::LEAVES_ONLY
			);

			$additional_hooks = array();
			if ( $include_global_import ) {
				$additional_hooks[] = "add_filter( 'gutenverse_themes_support_section_global_style', '__return_true' );";
			}

			foreach ( $files as $name => $file ) {
				if ( ! $file->isDir() ) {
					$file_path     = $file->getRealPath();
					$relative_path = substr( $file_path, strlen( $target_directory ) + 1 );

					if ( substr( $relative_path, -4 ) === '.txt' ) {
						$original_extension = pathinfo( substr( $relative_path, 0, -4 ), PATHINFO_EXTENSION );
						$file_content       = file_get_contents( $file_path );
						$theme_tags         = ! empty( $this->config['tags'] ) ? join( ',', $this->config['tags'] ) : '';
						$replacements       = array(
							'{{title}}'             => $this->config['title'] ?? '',
							'{{description}}'       => $this->config['description'] ?? '',
							'{{author_name}}'       => $this->config['author_name'] ?? '',
							'{{author_uri}}'        => $this->config['author_uri'] ?? '',
							'{{theme_uri}}'         => $this->config['theme_uri'] ?? '',
							'{{theme_version}}'     => $this->config['theme_version'] ?? '',
							'{{wp_min_version}}'    => $this->config['wp_min_version'] ?? '',
							'{{wp_tested_version}}' => $this->config['wp_tested_version'] ?? '',
							'{{php_version}}'       => $this->config['php_version'] ?? '',
							'{{constant}}'          => $this->config['constant'] ?? '',
							'{{namespace}}'         => $this->config['namespace'] ?? '',
							'{{slug}}'              => $this->config['slug'] ?? '',
							'{{tags}}'              => $theme_tags,
							'{{additional_hooks}}'  => join( "\n\t\t", $additional_hooks ),
						);

						foreach ( $replacements as $placeholder => $replacement ) {
							$file_content = str_replace( $placeholder, $replacement, $file_content );
						}

						if ( $original_extension ) {
							$relative_path = substr( $relative_path, 0, -4 );
						}

						$zip->addFromString( $relative_path, $file_content );
					} else {
						$zip->addFile( $file_path, $relative_path );
					}
				}
			}

			if ( ! empty( $this->config['screenshots'] ) ) {
				$image      = $this->config['screenshots']['thumbnail']['url'];
				$image_data = wp_remote_get( $image, array( 'sslverify' => true ) );

				if ( ! is_wp_error( $image_data ) && isset( $image_data['body'] ) ) {
					$image_content = $image_data['body'];
					$zip->addFromString( 'screenshot.' . pathinfo( $image, PATHINFO_EXTENSION ), $image_content );
				}
			}

			$zip->close();
		} else {
			throw new \Exception( 'Unable to create zip file at ' . $zip_path );
		}

		$this->fileresult = array(
			'filename' => $this->config['slug'] . '.zip',
			'filepath' => $zip_path,
			'fileurl'  => wp_upload_dir()['baseurl'] . '/' . $this->config['slug'] . '.zip',
		);
	}
}
