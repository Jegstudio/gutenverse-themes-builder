<?php
/**
 * Deploy Class
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
 * Class Deploy
 *
 * @package gutenverse-themes-builder
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
