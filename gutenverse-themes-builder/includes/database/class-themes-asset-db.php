<?php
/**
 * Database Class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gtb
 */

namespace GTB\Database;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Themes_Asset_Db
 *
 * @package gtb
 */
class Themes_Asset_Db extends Database_Abstract {
	/**
	 * Return table name (without prefix)
	 *
	 * @return mixed|string
	 */
	public function table_name() {
		return 'gtb_themes_asset';
	}

	/**
	 * Script for creating Table
	 *
	 * @return string
	 */
	public function create_table_script() {
		$charset = $this->wpdb->get_charset_collate();
		$table   = $this->get_table_name();

		$sql = "CREATE TABLE $table (
			id				INT NOT NULL AUTO_INCREMENT,
			handler			VARCHAR(100) NOT NULL,
		    theme_id		CHAR(20) NOT NULL,
			enqueue			CHAR(20) NOT NULL,
            type			VARCHAR(20) NOT NULL,
			preset			VARCHAR(20),
			media_type		LONGTEXT,
			content			LONGTEXT,
			PRIMARY KEY 	(id)
		) $charset;";

		return $sql;
	}

	/**
	 * Initialize Data
	 *
	 * @return array
	 */
	public function initial_data() {
		return array();
	}

	/**
	 * Get All Assets.
	 *
	 * @param string $theme_id Theme Id.
	 *
	 * @return array|object|null
	 */
	public function get_all_assets( $theme_id ) {
		$table = $this->get_table_name();
		$query = $this->wpdb->prepare( "SELECT * FROM $table WHERE theme_id =  %s", $theme_id ); // phpcs:ignore

		return $this->wpdb->get_results( $query, ARRAY_A ); // phpcs:ignore
	}

	/**
	 * Get single data.
	 *
	 * @param int $id : data id.
	 *
	 * @return array|object|null
	 */
	public function get_data( $id ) {
		$table = $this->get_table_name();
		$query = $this->wpdb->prepare( "SELECT * FROM $table WHERE id =  %d", $id ); // phpcs:ignore

		return $this->wpdb->get_results( $query, ARRAY_A ); // phpcs:ignore
	}

	/**
	 * Create new data data.
	 *
	 * @param array $data : data data.
	 *
	 * @return false|int
	 */
	public function create_data( $data ) {
		$table = $this->get_table_name();

		return $this->wpdb->insert( $table, $data );
	}

	/**
	 * Updating data data.
	 *
	 * @param array $data : data data.
	 * @param array $id : required data id.
	 *
	 * @return false|int
	 */
	public function update_data( $data, $id ) {
		$table = $this->get_table_name();

		return $this->wpdb->update( $table, $data, $id );
	}

	/**
	 * Deleting a data data.
	 *
	 * @param array $id : required data id.
	 *
	 * @return false|int
	 */
	public function delete_data( $id ) {
		$table = $this->get_table_name();

		return $this->wpdb->delete( $table, $id );
	}
}
