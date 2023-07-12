<?php
/**
 * Deploy Class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gtb
 */

namespace GTB;

use GTB\Database\Database;

/**
 * Class Deploy
 *
 * @package gtb
 */
class Deploy {
	/**
	 * Database instance
	 *
	 * @var Database
	 */
	private $database;

	/**
	 * Init constructor.
	 */
	public function __construct() {
		$this->database = Database::instance();
	}

	/**
	 * Deploy Database
	 */
	public function start() {
		$this->database->initialize_database();
	}
}
