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
 * Class Themes_Global_Db
 *
 * @package gtb
 */
class Themes_Global_Db extends Database_Abstract {
	/**
	 * Return table name (without prefix)
	 *
	 * @return mixed|string
	 */
	public function table_name() {
		return 'gtb_themes_global';
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
			title			VARCHAR(200) NOT NULL,
			file			TEXT,
            fonts			TEXT,
			colors			TEXT,
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
	 * @return array|object|null
	 */
	public function get_all_globals() {
		$table = $this->get_table_name();
		$query = $this->wpdb->prepare( "SELECT * FROM $table" ); // phpcs:ignore

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
	 * Get Inserted Id
	 *
	 * @return int
	 */
	public function get_inserted_id() {
		return $this->wpdb->insert_id;
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
