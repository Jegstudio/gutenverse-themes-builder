<?php
/**
 * Gutenverse Themes Builder Mega Menu Item
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder\Style;

/**
 * Class Mega Menu Item
 *
 * @package gutenverse-themes-builder
 */
class Mega_Menu_Item extends Style_Default {
	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'mega-menu-item';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'animation' => ".{$this->element_id}",
				'mask'      => ".{$this->element_id}",
			)
		);
	}

	/**
	 * Get sub menu additional width by position
	 *
	 * @param string $pos .
	 * @param string $device .
	 */
	private function get_sub_menu_additional_width( $pos, $device ) {
		$devices = array();
		$values  = $this->attrs['itemPanelSpacing'];

		switch ( $device ) {
			case 'Desktop':
				$devices[] = 'Desktop';
				break;
			case 'Tablet':
				$devices[] = 'Tablet';
				$devices[] = 'Desktop';
				break;
			case 'Mobile':
				$devices[] = 'Mobile';
				$devices[] = 'Tablet';
				$devices[] = 'Desktop';
				break;
		}

		foreach ( $devices as $device ) {
			if ( isset( $values )
				&& is_array( $values )
				&& isset( $values[ $device ] )
				&& isset( $values[ $device ]['dimension'] )
				&& isset( $values[ $device ]['unit'] )
				&& isset( $values[ $device ]['dimension'][ $pos ] )
				&& '' !== $values[ $device ]['dimension'][ $pos ]
			) {
				return "{$values[ $device ]['dimension'][ $pos ]}{$values[ $device ]['unit']}";
			}
		}

		return '20px';
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['subMenuAlignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-mega-menu .mega-menu-item.{$this->element_id} .mega-menu-body",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['subMenuAlignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['panelWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-mega-menu .mega-menu-item.{$this->element_id} .sub-menu",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['panelWidth'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".guten-mega-menu .mega-menu-item.{$this->element_id} .mega-menu-item-body",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['panelWidth'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".guten-mega-menu .mega-menu-item.{$this->element_id} .mega-menu-item-body",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'min-width' );
					},
					'value'          => $this->attrs['panelWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemPanelSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.mega-menu-list .gutenverse-menu, .{$this->element_id}.mega-menu-item.mega-menu-mega-menu .mega-menu-item-body, .{$this->element_id}.mega-menu-list .gutenverse-menu .sub-menu",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemPanelSpacing'],
					'device_control' => true,
				)
			);

			if ( isset( $this->attrs['verticalItemPosition'] ) && isset( $this->attrs['itemPanelSpacing'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.mega-menu-list .gutenverse-menu .sub-menu",
						'property'       => function ( $value, $device ) {
							$styles      = array();
							$position    = $this->get_device_value( $device, $this->attrs['verticalItemPosition'] );
							$value       = $this->get_device_value( $device, $this->attrs['itemPanelSpacing'] );
							$orientation = $this->attrs['orientation'];

							if ( is_array( $value ) && ! gutenverse_truly_empty( $value['unit'] ) && ! gutenverse_truly_empty( $value['dimension'] ) ) {
								$dimension = $value['dimension'];
								$unit      = $value['unit'];

								if ( isset( $this->attrs['breakpoint'] ) && (
									( 'mobile' === $this->attrs['breakpoint'] && 'mobile' === strtolower( $device ) )
									|| ( 'tablet' === $this->attrs['breakpoint'] && ( 'mobile' === strtolower( $device ) || 'tablet' === strtolower( $device ) ) )
								) ) {
									$breakpoint_width = array( '100%' );

									array_push( $breakpoint_width, $this->get_sub_menu_additional_width( 'left', $device ) );
									array_push( $breakpoint_width, $this->get_sub_menu_additional_width( 'right', $device ) );

									$breakpoint_value = implode( ' + ', $breakpoint_width );

									array_push( $styles, 'top: 100%;' );
									array_push( $styles, "left: -{$this->get_sub_menu_additional_width( 'left', $device )};" );
									array_push( $styles, "width: calc({$breakpoint_value});" );
								} else {
									if ( $dimension['top'] ) {
										array_push( $styles, "top: -{$dimension['top']}{$unit};" );
									}

									if ( ( ( 'right' === $position || 'horizontal' === $orientation ) ) && $dimension['right'] ) {
										array_push( $styles, "left: calc(100% + {$dimension['right']}{$unit}); right: unset;" );
									}

									if ( ( ( 'left' === $position && 'vertical' === $orientation ) ) && $dimension['left'] ) {
										array_push( $styles, "right: calc(100% + {$dimension['left']}{$unit}); left: unset;" );
									}
								}
							}

							return implode( ' ', $styles );
						},
						'value'          => $this->attrs['itemPanelSpacing'],
						'ignore_empty'   => true,
						'device_control' => true,
					)
				);
			}
		}

		if ( isset( $this->attrs['itemPanelBg'] ) ) {
			$this->handle_background( ".{$this->element_id}.mega-menu-list .gutenverse-menu, .{$this->element_id}.mega-menu-item.mega-menu-mega-menu .mega-menu-item-body, .{$this->element_id}.mega-menu-list .gutenverse-menu .sub-menu", $this->attrs['itemPanelBg'] );
		}

		if ( isset( $this->attrs['itemPanelBorder_v2'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.mega-menu-list .gutenverse-menu, .{$this->element_id}.mega-menu-item.mega-menu-mega-menu .mega-menu-item-body, .{$this->element_id}.mega-menu-list .gutenverse-menu .sub-menu",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['itemPanelBorder_v2'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemPanelShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.mega-menu-list .gutenverse-menu, .{$this->element_id}.mega-menu-item.mega-menu-mega-menu .mega-menu-item-body, .{$this->element_id}.mega-menu-list .gutenverse-menu .sub-menu",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['itemPanelShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemListTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id}.mega-menu-list .gutenverse-menu li, .{$this->element_id}.mega-menu-list .gutenverse-menu li > a",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['itemListTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemListSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.mega-menu-list .gutenverse-menu li",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemListSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemListIndicatorMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.mega-menu-list .gutenverse-menu li > a > i",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['itemListIndicatorMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemListIndicatorPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.mega-menu-list .gutenverse-menu li > a > i",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemListIndicatorPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemListTextNormalColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.mega-menu-list .gutenverse-menu li > a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemListTextNormalColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemListIndicatorNormalColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.mega-menu-list .gutenverse-menu li > a > i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemListIndicatorNormalColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemListTextNormalBg'] ) ) {
			$this->handle_background( ".{$this->element_id}.mega-menu-list .gutenverse-menu li", $this->attrs['itemListTextNormalBg'] );
		}

		if ( isset( $this->attrs['itemListTextHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.mega-menu-list .gutenverse-menu li:hover > a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemListTextHoverColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemListIndicatorHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.mega-menu-list .gutenverse-menu li:hover > a > i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemListIndicatorHoverColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemListTextHoverBg'] ) ) {
			$this->handle_background( ".{$this->element_id}.mega-menu-list .gutenverse-menu li:hover", $this->attrs['itemListTextHoverBg'] );
		}

		if ( isset( $this->attrs['itemListBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.mega-menu-list .gutenverse-menu li",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['itemListBorder'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['firstItemListBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.mega-menu-list .gutenverse-menu li:first-child",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['firstItemListBorder'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['lastItemListBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.mega-menu-list .gutenverse-menu li:last-child",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['lastItemListBorder'],
					'device_control' => true,
				)
			);
		}
	}
}
