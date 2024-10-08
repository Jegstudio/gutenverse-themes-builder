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

/**
 * Class Theme Helper
 *
 * @package gutenverse-themes-builder
 */
class Theme_Pattern {
	/**
	 * Post type
	 *
	 * @var string
	 */
	const POST_TYPE = 'gutenverse-pattern';

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
		add_action( 'init', array( $this, 'post_type' ), 9 );
		add_filter( 'manage_edit-gutenverse-pattern_columns', array( $this, 'add_custom_columns_title' ) );
		add_action( 'manage_gutenverse-pattern_posts_custom_column', array( $this, 'add_custom_column_data' ), 10, 2 );
		add_action( 'quick_edit_custom_box', array( $this, 'custom_edit_box' ), 10, 3 );
		add_action( 'save_post', array( $this, 'update_custom_quickedit_box' ) );
		add_action( 'pre_get_posts', array( $this, 'filter_backend' ) );
	}

	/**
	 * Filter Backend.
	 *
	 * @param \WP_Query $query .
	 */
	public function filter_backend( $query ) {
		if ( is_admin() ) {
			if ( isset( $query->query_vars['post_type'] ) && self::POST_TYPE === $query->query_vars['post_type'] ) {
				$theme_id                          = get_option( 'gtb_active_theme_id', null );
				$query->query_vars['meta_query'][] = array(
					'key'     => '_pattern_theme_id',
					'value'   => $theme_id,
					'compare' => '===',
				);
			}
		}
	}

	/**
	 * Update Quick Edit.
	 */
	public function update_custom_quickedit_box() {
		$id = isset( $_POST['post_ID'] ) ? intval( wp_unslash( $_POST['post_ID'] ) ) : false;
		$pattern = isset( $_POST['pattern_type'] ) ? sanitize_text_field( wp_unslash( $_POST['pattern_type'] ) ) : false;

		if ( $id && $pattern ) {
			update_post_meta( $id, '_pattern_category', $pattern );
		}
	}


	/**
	 * Custom edit box.
	 *
	 * @param string $column_name Column Name.
	 * @param int    $post_type Post ID.
	 * @param int    $taxonomy Post ID.
	 */
	public function custom_edit_box( $column_name, $post_type, $taxonomy ) {
		global $post;

		if ( self::POST_TYPE === $post_type ) {
			if ( 'pattern_type' === $column_name ) {
				$selected = get_post_meta( $post->ID, '_pattern_category', true );
				?>
				<fieldset class="inline-edit-col-right" id="#edit-">
					<div class="inline-edit-col">
						<label>
							<span class="title"><?php esc_html_e( 'Type', 'gutenverse-themes-builder' ); ?></span>
							<select name="pattern_type">
								<option <?php echo $selected === 'basic' ? 'selected=selected' : ''; ?> value="basic">Core</option>
								<option <?php echo $selected === 'gutenverse' ? 'selected=selected' : ''; ?> value="gutenverse">Gutenverse</option>
								<option <?php echo $selected === 'pro' ? 'selected=selected' : ''; ?> value="pro">Gutenverse Pro</option>
							</select>
						</label>
					</div>
				</fieldset>
				<?php
			}
		}
	}

	/**
	 * Add Column Title.
	 *
	 * @return array
	 */
	public function add_custom_columns_title() {
		$columns                 = array();
		$columns['cb']           = '';
		$columns['title']        = esc_html__( 'Title', 'gutenverse-themes-builder' );
		$columns['pattern_type'] = esc_html__( 'Pattern Type', 'gutenverse-themes-builder' );
		$columns['date']         = esc_html__( 'Date', 'gutenverse-themes-builder' );

		return $columns;
	}

	/**
	 * Add Custom Column Data.
	 *
	 * @param string $column_name Column Name.
	 * @param int    $post_id Post ID.
	 */
	public function add_custom_column_data( $column_name, $post_id ) {
		switch ( $column_name ) {
			case 'pattern_type':
				$category = get_post_meta( $post_id, '_pattern_category', true );

				switch ( $category ) {
					case 'basic':
						esc_html_e( 'Core', 'gutenverse-themes-builder' );
						break;
					case 'pro':
						esc_html_e( 'Gutenverse Pro', 'gutenverse-themes-builder' );
						break;
					case 'gutenverse':
						esc_html_e( 'Gutenverse', 'gutenverse-themes-builder' );
						break;
				}
				break;
			default:
				break;
		}
	}


	/**
	 * Register Post Type
	 */
	public function post_type() {
		register_post_type(
			self::POST_TYPE,
			array(
				'labels'       =>
					array(
						'name'          => esc_html__( 'Theme Pattern', 'gutenverse-themes-builder' ),
						'singular_name' => esc_html__( 'Theme Pattern', 'gutenverse-themes-builder' ),
					),
				'show_in_rest' => true,
				'public'       => true,
				'show_in_menu' => false,
				'rewrite'      => array(
					'slug' => self::POST_TYPE,
				),
			)
		);
	}
}
