<?php
/**
 * Gutenverse Themes Builder Mega Menu
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder\Style;

/**
 * Class Mega Menu
 *
 * @package gutenverse-themes-builder
 */
class Mega_Menu extends Style_Default {
	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'mega-menu';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'background'  => array(
					'normal' => ".{$this->element_id}",
					'hover'  => ".{$this->element_id}:hover",
				),
				'border'      => array(
					'normal' => ".{$this->element_id}",
					'hover'  => ".{$this->element_id}:hover",
				),
				'positioning' => ".{$this->element_id}",
				'animation'   => ".{$this->element_id}",
				'advance'     => ".{$this->element_id}",
				'mask'        => ".{$this->element_id}",
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['alignment'] ) && isset( $this->attrs['orientation'] ) && 'horizontal' === $this->attrs['orientation'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.horizontal .mega-menu-item-panel",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['alignmentVertical'] ) && isset( $this->attrs['orientation'] ) && 'vertical' === $this->attrs['orientation'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.vertical, .{$this->element_id}.vertical .mega-menu-heading",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignmentVertical'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemIndicatorMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .mega-menu-heading i",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['itemIndicatorMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemIndicatorPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .mega-menu-heading i",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemIndicatorPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .mega-menu-heading, .{$this->element_id} .mega-menu-heading span, .{$this->element_id} .mega-menu-heading a",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['itemTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .mega-menu-heading",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemTextNormalColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .mega-menu-heading span, .{$this->element_id} .mega-menu-heading a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemTextNormalColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemIndicatorNormalColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .mega-menu-heading i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemIndicatorNormalColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemTextNormalBg'] ) ) {
			$this->handle_background( ".{$this->element_id} .mega-menu-heading", $this->attrs['itemTextNormalBg'] );
		}

		if ( isset( $this->attrs['itemTextHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .mega-menu-heading:hover span, .{$this->element_id} .mega-menu-heading:hover a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemTextHoverColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemIndicatorHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .mega-menu-heading:hover i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemIndicatorHoverColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemTextHoverBg'] ) ) {
			$this->handle_background( ".{$this->element_id} .mega-menu-heading:hover, .{$this->element_id} .mega-menu-item.active .mega-menu-heading", $this->attrs['itemTextHoverBg'] );
		}
		if ( isset( $this->attrs['itemTextActiveColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .mega-menu-item.active .mega-menu-heading span, .{$this->element_id} .mega-menu-item.active .mega-menu-heading a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemTextActiveColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemIndicatorActiveColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .mega-menu-item.active .mega-menu-heading i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemIndicatorActiveColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemTextActiveBg'] ) ) {
			$this->handle_background( ".{$this->element_id} .mega-menu-item.active .mega-menu-heading", $this->attrs['itemTextActiveBg'] );
		}

		if ( isset( $this->attrs['verticalItemPosition'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu.vertical .mega-menu-body",
					'property'       => function ( $value, $device ) {
						$style = '';

						if ( ! isset( $this->attrs['breakpoint'] )
							|| ( 'mobile' === $this->attrs['breakpoint'] && 'mobile' !== strtolower( $device ) )
							|| ( 'tablet' === $this->attrs['breakpoint'] && 'tablet' !== strtolower( $device ) && 'mobile' !== strtolower( $device ) )
						) {
							if ( 'left' === $value ) {
								$style = 'left: unset; right: 100%;';
							} elseif ( 'right' === $value ) {
								$style = 'left: 100%; right: unset;';
							}
						} else {
							$style = 'top: 100%; left: 0; right: unset;';
						}

						return $style;
					},
					'value'          => $this->attrs['verticalItemPosition'],
					'ignore_empty'   => true,
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['wrapperBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .mega-menu-wrapper", $this->attrs['wrapperBackground'] );
		}

		if ( isset( $this->attrs['wrapperPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .mega-menu-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['wrapperPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['wrapperMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .mega-menu-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['wrapperMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['wrapperRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .mega-menu-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_border_radius( $value );
					},
					'value'          => $this->attrs['wrapperRadius'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['wrapperMobileBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.break-point-mobile .mega-menu-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['wrapperMobileBackground'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['wrapperMobileBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.break-point-tablet .mega-menu-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['wrapperMobileBackground'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['wrapperMobileHeaderPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .mega-menu-identity-panel",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['wrapperMobileHeaderPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerAlignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .mega-menu-hamburger-wrapper",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['hamburgerAlignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-hamburger",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['hamburgerWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-hamburger i",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['hamburgerSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-hamburger",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['hamburgerPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-hamburger",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['hamburgerMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerColorNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-hamburger",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['hamburgerColorNormal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerBgNormal'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-mega-menu .mega-menu-hamburger", $this->attrs['hamburgerBgNormal'] );
		}

		if ( isset( $this->attrs['hamburgerBorderNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-hamburger",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['hamburgerBorderNormal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-hamburger:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['hamburgerColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerBgHover'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-mega-menu .mega-menu-hamburger:hover", $this->attrs['hamburgerBgHover'] );
		}

		if ( isset( $this->attrs['hamburgerBorderHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-hamburger:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['hamburgerBorderHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-close",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['closeWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-close i",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['closeSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-close",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['closePadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-close",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['closeMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeColorNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-close",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['closeColorNormal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeBgNormal'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-mega-menu .mega-menu-close", $this->attrs['closeBgNormal'] );
		}

		if ( isset( $this->attrs['closeBorderNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-close",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['closeBorderNormal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-close:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['closeColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeBgHover'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-mega-menu .mega-menu-close:hover", $this->attrs['closeBgHover'] );
		}

		if ( isset( $this->attrs['closeBorderHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-close:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['closeBorderHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['mobileMenuLogoWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-site-image > img, .{$this->element_id}.guten-mega-menu .mega-menu-site-image > mega-menu-nav-logo > img",
					'property'       => function ( $value ) {
						return "width: {$value}px;";
					},
					'value'          => $this->attrs['mobileMenuLogoWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['mobileMenuLogoHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-site-image > img, .{$this->element_id}.guten-mega-menu .mega-menu-site-image > mega-menu-nav-logo > img",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['mobileMenuLogoHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['mobileMenuLogoFit'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-site-image > img, .{$this->element_id}.guten-mega-menu .mega-menu-site-image > mega-menu-nav-logo > img",
					'property'       => function ( $value ) {
						return "object-fit: {$value};";
					},
					'value'          => $this->attrs['mobileMenuLogoFit'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['mobileMenuLogoMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-site-image > img, .{$this->element_id}.guten-mega-menu .mega-menu-site-image > mega-menu-nav-logo",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['mobileMenuLogoMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['mobileMenuLogoPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-mega-menu .mega-menu-site-image > img, .{$this->element_id}.guten-mega-menu .mega-menu-site-image > mega-menu-nav-logo",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['mobileMenuLogoPadding'],
					'device_control' => true,
				)
			);
		}
	}
}
