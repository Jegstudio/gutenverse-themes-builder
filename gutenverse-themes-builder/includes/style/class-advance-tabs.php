<?php
/**
 * Gutenverse Themes Builder Advance Tab
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder\Style;

/**
 * Class Advance Tabs
 *
 * @package gutenverse-themes-builder
 */
class Advance_Tabs extends Style_Default {
	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'advance-tabs';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'background'  => null,
				'border'      => null,
				'positioning' => null,
				'animation'   => null,
				'advance'     => null,
				'mask'        => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['childs'] ) ) {
			$tabs = $this->attrs['childs'];
			foreach ( $tabs as $tab ) {
				if ( isset( $tab['iconSize'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item[data-id='{$tab['tabId']}'] .item-icon i, .advance-tab-heading-mobile .item-icon i",
							'property'       => function ( $value ) {
								return $this->handle_unit_point( $value, 'font-size' );
							},
							'value'          => $tab['iconSize'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $tab['imageWidth'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item[data-id='{$tab['tabId']}'] .item-image img, .advance-tab-heading-mobile .item-image img",
							'property'       => function ( $value ) {
								return $this->handle_unit_point( $value, 'width' );
							},
							'value'          => $tab['imageWidth'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $tab['imageHeight'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item[data-id='{$tab['tabId']}'] .item-image img, .advance-tab-heading-mobile .item-image img",
							'property'       => function ( $value ) {
								return $this->handle_unit_point( $value, 'height' );
							},
							'value'          => $tab['imageHeight'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $tab['imageOpacity'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item[data-id='{$tab['tabId']}'] .item-image img, .advance-tab-heading-mobile .item-image img",
							'property'       => function ( $value ) {
								return "opacity: {$value};";
							},
							'value'          => $tab['imageOpacity'],
							'device_control' => false,
						)
					);
				}
			}
		}

		if ( isset( $this->attrs['orientation'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-element",
					'property'       => function ( $value ) {
						if ( 'horizontal' === $value ) {
							return 'display: block;';
						} elseif ( 'vertical' === $value ) {
							return 'display: flex;';
						}
					},
					'value'          => $this->attrs['orientation'],
					'device_control' => false,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-element .advance-tab-heading-wrapper",
					'property'       => function ( $value ) {
						if ( 'horizontal' === $value ) {
							return 'display: flex;';
						} elseif ( 'vertical' === $value ) {
							return 'display: block;';
						}
					},
					'value'          => $this->attrs['orientation'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabHorizontalHeader'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading-wrapper",
					'property'       => function ( $value ) {
						return "justify-content : {$value};";
					},
					'value'          => $this->attrs['tabHorizontalHeader'],
					'device_control' => false,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading",
					'property'       => function ( $value ) {
						return "justify-content : {$value};";
					},
					'value'          => $this->attrs['tabHorizontalHeader'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemIconPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item .item-icon i, .{$this->element_id} .advance-tab-heading .advance-tab-heading-item .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemIconPadding'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['itemIconMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item .item-icon i, .{$this->element_id} .advance-tab-heading .advance-tab-heading-item .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['itemIconMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item .item-icon i, .{$this->element_id} .advance-tab-heading .advance-tab-heading-item .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemIconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemIconColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item:hover:not(.active) .item-icon i, .{$this->element_id} .advance-tab-heading:not(.active) .advance-tab-heading-item .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemIconColorHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['itemIconColorActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item.active .item-icon i, .{$this->element_id} .advance-tab-heading.active .advance-tab-heading-item .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemIconColorActive'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemIconBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item .item-icon i, .{$this->element_id} .advance-tab-heading .advance-tab-heading-item .item-image img", $this->attrs['itemIconBackground'] );
		}
		if ( isset( $this->attrs['itemIconBackgroundHover'] ) ) {
			$this->handle_background( ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item:hover:not(.active) .item-icon i, .{$this->element_id} .advance-tab-heading:hover:not(.active) .advance-tab-heading-item .item-image img", $this->attrs['itemIconBackgroundHover'] );
		}
		if ( isset( $this->attrs['itemIconBackgroundActive'] ) ) {
			$this->handle_background( ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item.active .item-icon i, .{$this->element_id} .advance-tab-heading.active .advance-tab-heading-item .item-image img", $this->attrs['itemIconBackgroundActive'] );
		}

		if ( isset( $this->attrs['itemIconBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item .item-icon i, .{$this->element_id} .advance-tab-heading .advance-tab-heading-item .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['itemIconBorder'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemIconBorderHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item:not(.active) .item-icon i, .{$this->element_id} .advance-tab-heading:hover:not(.active) .advance-tab-heading-item .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['itemIconBorderHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemIconBorderActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item.active .item-icon i, .{$this->element_id} .advance-tab-heading.active .advance-tab-heading-item .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['itemIconBorderActive'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemIconBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item .item-icon i, .{$this->element_id} .advance-tab-heading .advance-tab-heading-item .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['itemIconBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemIconBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item:hover:not(.active) .item-icon i, .{$this->element_id} .advance-tab-heading:hover:not(.active) .advance-tab-heading-item .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['itemIconBoxShadowHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['itemIconBoxShadowActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item.active .item-icon i, .{$this->element_id} .advance-tab-heading.active .advance-tab-heading-item .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['itemIconBoxShadowActive'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['tabTitleAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabTitlePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['tabTitlePadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['tabTitleMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content, .{$this->element_id} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content span",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['tabTitleWidth'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleColorNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['tabTitleColorNormal'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content, .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-heading-content",
					'value'    => $this->attrs['tabTitleTypography'],
				)
			);
		}
		if ( isset( $this->attrs['tabTitleColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item:hover:not(.active) .advance-tab-heading-content",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['tabTitleColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleColorActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item.active .advance-tab-heading-content ",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['tabTitleColorActive'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleBackgroundNormal'] ) ) {
			$this->handle_background( ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content ", $this->attrs['tabTitleBackgroundNormal'] );
		}

		if ( isset( $this->attrs['tabTitleBackgroundHover'] ) ) {
			$this->handle_background( ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item:hover:not(.active) .advance-tab-heading-content", $this->attrs['tabTitleBackgroundHover'] );
		}

		if ( isset( $this->attrs['tabTitleBackgroundActive'] ) ) {
			$this->handle_background( ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item.active .advance-tab-heading-content", $this->attrs['tabTitleBackgroundActive'] );
		}

		if ( isset( $this->attrs['tabTitleBorderNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content ",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['tabTitleBorderNormal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleBorderHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item:hover:not(.active) .advance-tab-heading-content",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['tabTitleBorderHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleBorderActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item.active .advance-tab-heading-content",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['tabTitleBorderActive'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleBoxShadowNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['tabTitleBoxShadowNormal'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item:hover:not(.active) .advance-tab-heading-content",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['tabTitleBoxShadowHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleBoxShadowActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item.active .advance-tab-heading-content",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['tabTitleBoxShadowActive'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleWrapperPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item, .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile ",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['tabTitleWrapperPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleWrapperMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item ",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['tabTitleWrapperMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleWrapperWidthType'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item ",
					'property'       => function ( $value ) {
						return "width: {$value};";
					},
					'value'          => $this->attrs['tabTitleWrapperWidthType'],
					'device_control' => false,
				)
			);

			if ( 'normal' === $this->attrs['tabTitleWrapperWidthType'] ) {
				if ( isset( $this->attrs['tabTitleWrapperWidth'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item ",
							'property'       => function ( $value ) {
								return $this->handle_unit_point( $value, 'width' );
							},
							'value'          => $this->attrs['tabTitleWrapperWidth'],
							'device_control' => false,
						)
					);
				}
			}
		}

		if ( isset( $this->attrs['tabTitleWrapperBackgroundNormal'] ) ) {
			$this->handle_background( ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item", $this->attrs['tabTitleWrapperBackgroundNormal'] );
		}

		if ( isset( $this->attrs['tabTitleWrapperBackgroundHover'] ) ) {
			$this->handle_background( ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item:hover:not(.active):before", $this->attrs['tabTitleWrapperBackgroundHover'] );
		}

		if ( isset( $this->attrs['tabTitleWrapperBackgroundActive'] ) ) {
			$this->handle_background( ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item.active ", $this->attrs['tabTitleWrapperBackgroundActive'] );
		}

		if ( isset( $this->attrs['tabTitleWrapperBorderNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['tabTitleWrapperBorderNormal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleWrapperBorderHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item:hover:not(.active) ",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['tabTitleWrapperBorderHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleWrapperBorderActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item.active ",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['tabTitleWrapperBorderActive'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleWrapperBoxShadowNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['tabTitleWrapperBoxShadowNormal'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleWrapperBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item:hover:not(.active)",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['tabTitleWrapperBoxShadowHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabTitleWrapperBoxShadowActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading .advance-tab-heading-item.active ",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['tabTitleWrapperBoxShadowActive'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabTitlesWrapperPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['tabTitlesWrapperPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabTitlesWrapperMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['tabTitlesWrapperMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabTitlesWrapperWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading",
					'property'       => function ( $value ) {
						return "width: {$value};";
					},
					'value'          => $this->attrs['tabTitlesWrapperWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabTitlesWrapperBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .advance-tab-heading ", $this->attrs['tabTitlesWrapperBackground'] );
		}

		if ( isset( $this->attrs['tabTitlesWrapperBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['tabTitlesWrapperBorder'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabTitlesWrapperBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['tabTitlesWrapperBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabContentBackground'] ) ) {
			$this->handle_background( ".guten-advance-tabs.{$this->element_id} .advance-tab-body ", $this->attrs['tabContentBackground'] );
		}

		if ( isset( $this->attrs['tabContentColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-advance-tabs.{$this->element_id} .advance-tab-body",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['tabContentColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabContentTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".guten-advance-tabs.{$this->element_id} .advance-tab-body, .guten-advance-tabs.{$this->element_id} .advance-tab-body p, .guten-advance-tabs.{$this->element_id} .advance-tab-body a",
					'value'    => $this->attrs['tabContentTypography'],
				)
			);
		}

		if ( isset( $this->attrs['tabContentPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-body  ",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['tabContentPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabContentMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-body ",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['tabContentMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabContentBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-body",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['tabContentBorder'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabContentBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-body",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['tabContentBoxShadow'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['itemIconMobilePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .item-icon i, .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemIconMobilePadding'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['itemIconMobileMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .item-icon i, .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['itemIconMobileMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemIconMobileColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .item-icon i, .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemIconMobileColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemIconMobileColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover:not(.active)
                    .advance-tab-heading-content .item-icon i, .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover:not(.active)
                    .advance-tab-heading-content .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemIconMobileColorHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['itemIconMobileColorActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item.active
                    .advance-tab-heading-content .item-icon i, .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item.active
                    .advance-tab-heading-content .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemIconMobileColorActive'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemIconMobileBackground'] ) ) {
			$this->handle_background( " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-heading-content .item-icon i, .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-heading-content .item-image img", $this->attrs['itemIconMobileBackground'] );
		}
		if ( isset( $this->attrs['itemIconMobileBackgroundHover'] ) ) {
			$this->handle_background( " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover:not(.active) .advance-tab-heading-content .item-icon i, .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover:not(.active) .advance-tab-heading-content .item-image img", $this->attrs['itemIconMobileBackgroundHover'] );
		}
		if ( isset( $this->attrs['itemIconMobileBackgroundActive'] ) ) {
			$this->handle_background( " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item.active .advance-tab-heading-content .item-icon i, .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item.active .advance-tab-heading-content .item-image img", $this->attrs['itemIconMobileBackgroundActive'] );
		}

		if ( isset( $this->attrs['itemIconMobileBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-heading-content .item-icon i, .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-heading-content .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['itemIconMobileBorder'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemIconMobileBorderHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover:not(.active)
                    .advance-tab-heading-content .item-icon i, .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover:not(.active)
                    .advance-tab-heading-content .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['itemIconMobileBorderHover'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['itemIconMobileBorderActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item.active
                    .advance-tab-heading-content .item-icon i, .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item.active
                    .advance-tab-heading-content .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['itemIconMobileBorderActive'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemIconMobileBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-heading-content .item-icon i, .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-heading-content .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['itemIconMobileBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemIconMobileBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover:not(.active)
                    .advance-tab-heading-content .item-icon i, .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover:not(.active)
                    .advance-tab-heading-content .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['itemIconMobileBoxShadowHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['itemIconMobileBoxShadowActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item.active
                    .advance-tab-heading-content .item-icon i, .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item.active
                    .advance-tab-heading-content .item-image img",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['itemIconMobileBoxShadowActive'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['tabMobileOptionsWrapperPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-option ",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['tabMobileOptionsWrapperPadding'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['tabMobileOptionsWrapperMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-option ",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['tabMobileOptionsWrapperMargin'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['tabMobileOptionsWrapperWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-option ",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['tabMobileOptionsWrapperWidth'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabMobileOptionsWrapperBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-option ", $this->attrs['tabMobileOptionsWrapperBackground'] );
		}

		if ( isset( $this->attrs['tabMobileOptionsWrapperBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-option",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['tabMobileOptionsWrapperBorder'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['tabMobileOptionsWrapperBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-option ",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['tabMobileOptionsWrapperBoxShadow'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['tabMobileOptionPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['tabMobileOptionPadding'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['tabMobileOptionMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['tabMobileOptionMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['tabMobileOptionBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item", $this->attrs['tabMobileOptionBackground'] );
		}

		if ( isset( $this->attrs['tabMobileOptionBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['tabMobileOptionBorder'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['tabMobileOptionBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['tabMobileOptionBoxShadow'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['tabMobileOptionBackgroundHover'] ) ) {
			$this->handle_background( ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item:hover:not(.active)", $this->attrs['tabMobileOptionBackgroundHover'] );
		}

		if ( isset( $this->attrs['tabMobileOptionBorderHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item:hover:not(.active)",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['tabMobileOptionBorderHover'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['tabMobileOptionBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item:hover:not(.active)",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['tabMobileOptionBoxShadowHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['tabMobileOptionBackgroundActive'] ) ) {
			$this->handle_background( ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item.active", $this->attrs['tabMobileOptionBackgroundActive'] );
		}

		if ( isset( $this->attrs['tabMobileOptionBorderActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item.active",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['tabMobileOptionBorderActive'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['tabMobileOptionBoxShadowActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item.active",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['tabMobileOptionBoxShadowActive'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['tabHeadingMobilePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile ",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['tabHeadingMobilePadding'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['tabHeadingMobileWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile ",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['tabHeadingMobileWidth'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabHeadingMobileBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .advance-tab-heading-mobile ", $this->attrs['tabHeadingMobileBackground'] );
		}

		if ( isset( $this->attrs['tabHeadingMobileBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading-mobile ",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['tabHeadingMobileBorder'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['tabHeadingMobileBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['tabHeadingMobileBoxShadow'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['tabHeadingItemMobilePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['tabHeadingItemMobilePadding'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['tabHeadingItemMobileMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['tabHeadingItemMobileMargin'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['tabHeadingItemMobileWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['tabHeadingItemMobileWidth'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabHeadingItemMobileBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile", $this->attrs['tabHeadingItemMobileBackground'] );
		}

		if ( isset( $this->attrs['tabHeadingItemMobileBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['tabHeadingItemMobileBorder'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['tabHeadingItemMobileBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['tabHeadingItemMobileBoxShadow'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['tabMobileContentColorNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-heading-content",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['tabMobileContentColorNormal'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['tabMobileContentColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover:not(.active) .advance-tab-heading-content",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['tabMobileContentColorHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['tabMobileContentColorActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item.active .advance-tab-heading-content",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['tabMobileContentColorActive'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['tabMobileContentWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => " .{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-heading-content",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['tabMobileContentWidth'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['tabMobileContentAlignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-title",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['tabMobileContentAlignment'],
					'device_control' => true,
				)
			);
		}
	}
}
