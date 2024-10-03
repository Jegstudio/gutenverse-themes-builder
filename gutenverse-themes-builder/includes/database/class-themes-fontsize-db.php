<?php
/**
 * Database Class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder\Database;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Themes_Fontsize_Db
 *
 * @package gutenverse-themes-builder
 */
class Themes_Fontsize_Db extends Database_Abstract {
	/**
	 * Return table name (without prefix)
	 *
	 * @return mixed|string
	 */
	public function table_name() {
		return 'gtb_themes_fontsize';
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
		    theme_id		CHAR(20) NOT NULL,
            slug			VARCHAR(200) NOT NULL,
			size			VARCHAR(200) NOT NULL,
			title			VARCHAR(200) NOT NULL,
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
	 */
	public function get_all_fonts( $theme_id ) {
		$table = $this->get_table_name();
		$query = $this->wpdb->prepare( "SELECT * FROM $table WHERE theme_id =  %s", $theme_id ); // phpcs:ignore

		return $this->wpdb->get_results( $query, ARRAY_A ); // phpcs:ignore
	}

	/**
	 * Get Data in Pagination.
	 *
	 * @param string  $theme_id Theme Id.
	 * @param integer $offset .
	 * @param integer $per_page .
	 *
	 * @return array|object|null
	 */
	public function get_pagination_data( $theme_id, $offset, $per_page ) {
		$table       = $this->get_table_name();
		$query       = $this->wpdb->prepare( "SELECT * FROM $table WHERE theme_id =  %s LIMIT %d, %d", $theme_id, $offset, $per_page ); // phpcs:ignore
		$data        = $this->wpdb->get_results( $query, ARRAY_A );
		$query_count = $this->wpdb->prepare( "SELECT COUNT(*) as total FROM {$table} WHERE theme_id = %s", $theme_id );
		$count       = $this->wpdb->get_results( $query_count, ARRAY_A )[0]['total'];

		return array(
			'list'       => $data,
			'total_data' => $count,
		);
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
