<?php
/**
 * Database Abstract Class
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
 * Class Database Abstract
 *
 * @package gutenverse-themes-builder
 */
abstract class Database_Abstract {
	/**
	 * WPDB Instance
	 *
	 * @var $wpdb
	 */
	protected $wpdb;

	/**
	 * DB_Abstract constructor.
	 */
	public function __construct() {
		global $wpdb;
		$this->wpdb = $wpdb;
	}

	/**
	 * Initialize Table
	 */
	public function initialize_table() {
		if ( $this->is_table_not_exist() ) {
			$sql = $this->create_table_script();

			require_once ABSPATH . 'wp-admin/includes/upgrade.php';
			dbDelta( $sql );

			$this->initialize_data();
		}
	}

	/**
	 * Check if table Exist
	 *
	 * @return bool
	 */
	public function is_table_not_exist() {
		$table = $this->get_table_name();

		// phpcs:disable
		return $this->wpdb->get_var( "SHOW TABLES LIKE '{$table}'" ) !== $table;
	}

	/**
	 * Get Table Name
	 *
	 * @return string
	 */
	public function get_table_name() {
		return $this->wpdb->prefix . $this->table_name();
	}

	/**
	 * Return table name (without prefix)
	 *
	 * @return mixed
	 */
	abstract public function table_name();

	/**
	 * Script for creating Table
	 */
	abstract protected function create_table_script();

	/**
	 * Initialize Data
	 */
	public function initialize_data() {
		$table    = $this->get_table_name();
		$initials = $this->initial_data();

		if ( $initials ) {
			foreach ( $initials as $data ) {
				$this->wpdb->insert( $table, $data );
			}
		}
	}

	/**
	 * Get total rows
	 *
	 * @return int
	 */
	public function get_total_rows() {
		$query = 'SELECT FOUND_ROWS() as count';

		return (int) $this->wpdb->get_results( $query, ARRAY_A )[0]['count'];
	}

	/**
	 * Insert into database
	 *
	 * @param $data
	 *
	 * @return false|int
	 */
	public function insert( $data ) {
		return $this->wpdb->insert( $this->get_table_name(), $data );
	}

	/**
	 * Update database
	 *
	 * @param $data
	 * @param $where
	 */
	public function update( $data, $where ) {
		$this->wpdb->update( $this->get_table_name(), $data, $where );
	}

	/**
	 * Delete Record
	 *
	 * @param $where
	 */
	public function delete( $where ) {
		$this->wpdb->delete( $this->get_table_name(), $where );
	}

	/**
	 * Get last insert id
	 *
	 * @return int
	 */
	public function get_last_insert_id() {
		return $this->wpdb->insert_id;
	}

	/**
	 * Initialize Data
	 *
	 * @return array
	 */
	abstract protected function initial_data();
}
