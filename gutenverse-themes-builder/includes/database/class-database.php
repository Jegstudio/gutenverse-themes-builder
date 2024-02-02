<?php
/**
 * Database Class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gtb
 */

namespace GTB\Database;

/**
 * Class Database
 *
 * @package gtb
 */
class Database {
	/**
	 * Instance of Database.
	 *
	 * @var Database
	 */
	private static $instance;

	/**
	 * Theme Info.
	 *
	 * @var Themes_Info_Db
	 */
	public $theme_info;

	/**
	 * Theme Assets.
	 *
	 * @var Themes_Asset_Db
	 */
	public $theme_assets;

	/**
	 * Theme Fontsizes.
	 *
	 * @var Themes_Fontsize_Db
	 */
	public $theme_fontsizes;

	/**
	 * Theme Fonts.
	 *
	 * @var Themes_Font_Db
	 */
	public $theme_fonts;

	/**
	 * Theme Globals.
	 *
	 * @var Themes_Global_Db
	 */
	public $theme_globals;

	/**
	 * Theme Templates.
	 *
	 * @var Themes_Template_Db
	 */
	public $theme_templates;

	/**
	 * Database constructor.
	 */
	private function __construct() {
		$this->theme_info      = new Themes_Info_Db();
		$this->theme_assets    = new Themes_Asset_Db();
		$this->theme_fonts     = new Themes_Font_Db();
		$this->theme_fontsizes = new Themes_Fontsize_Db();
		$this->theme_globals   = new Themes_Global_Db();
		$this->theme_templates = new Themes_Template_Db();
	}

	/**
	 * Singleton page for Init Class
	 *
	 * @return Database
	 */
	public static function instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	/**
	 * Initialize Database
	 */
	public function initialize_database() {
		$this->theme_info->initialize_table();
		$this->theme_assets->initialize_table();
		$this->theme_fonts->initialize_table();
		$this->theme_fontsizes->initialize_table();
		$this->theme_globals->initialize_table();
		$this->theme_templates->initialize_table();
	}
}
