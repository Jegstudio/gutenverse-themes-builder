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
 * Class Themes_Info_Db
 *
 * @package gutenverse-themes-builder
 */
class Themes_Info_Db extends Database_Abstract {
	/**
	 * Return table name (without prefix)
	 *
	 * @return mixed|string
	 */
	public function table_name() {
		return 'gtb_themes_info';
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
			theme_id		CHAR(20) NOT NULL,
			slug			VARCHAR(200) NOT NULL,
			theme_mode		VARCHAR(200) NOT NULL,
		    theme_data		LONGTEXT,
            theme_json		LONGTEXT,
			other			LONGTEXT,
			global_id		INT,
			PRIMARY KEY		(theme_id)
		) $charset;";
		return $sql;
	}

	/**
	 * Initialize Data
	 */
	public function alter_table() {
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
	 * Get all data.
	 *
	 * @return array|object|null
	 */
	public function get_all_data() {
		$table = $this->get_table_name();
		$query = $this->wpdb->prepare( "SELECT * FROM {$table} ORDER BY slug ASC" ); // phpcs:ignore

		return $this->wpdb->get_results( $query, ARRAY_A ); // phpcs:ignore
	}

	/**
	 * Get pagination data.
	 *
	 * @param integer $offset .
	 * @param integer $per_page .
	 * @return array|object|null
	 */
	public function get_pagination_data( $offset, $per_page ) {
		$table       = $this->get_table_name();
		$query       = $this->wpdb->prepare( "SELECT * FROM {$table} LIMIT {$offset}, {$per_page}" ); // phpcs:ignore
		$data        = $this->wpdb->get_results( $query, ARRAY_A );
		$query_count = $this->wpdb->prepare( "SELECT COUNT(*) as total FROM {$table}" );
		$count       = $this->wpdb->get_results( $query_count, ARRAY_A )[0]['total'];

		return array(
			'list'       => $data,
			'total_data' => $count,
		); // phpcs:ignore
	}

	/**
	 * Get single data.
	 *
	 * @param int $id : theme id.
	 *
	 * @return array|object|null
	 */
	public function get_theme_data( $id ) {
		$table = $this->get_table_name();
		$query = $this->wpdb->prepare( "SELECT * FROM {$table} WHERE theme_id = %s", $id );// phpcs:ignore

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

		$theme_id = array(
			'theme_id' => $id,
		);

		return $this->wpdb->update( $table, $data, $theme_id );
	}

	/**
	 * Deleting a data data.
	 *
	 * @param array $id : required data id.
	 *
	 * @return false|int
	 */
	public function delete_data( $id ) {
		$table  = $this->get_table_name();
		$table2 = Database::instance()->theme_templates->get_table_name();
		$query  = $this->wpdb->prepare( "DELETE $table FROM $table WHERE $table.theme_id = '%s'", $id );// phpcs:ignore
		$query2  = $this->wpdb->prepare( "DELETE $table2 FROM $table2 WHERE $table2.theme_id = '%s'", $id );// phpcs:ignore

		return $this->wpdb->get_results( $query, ARRAY_A ) && $this->wpdb->get_results( $query2, ARRAY_A ); // phpcs:ignore
	}
}
