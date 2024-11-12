import React from 'react';
import { __ } from '@wordpress/i18n';
import { AlignLeft, AlignRight } from 'react-feather';
import { IconRadioControl, SizeControl, RangeControl, SwitchControl, BackgroundControl, ColorControl, DimensionControl, HeadingControl, BorderResponsiveControl } from 'gutenverse-core/controls';
import { handleBackground, handleBorderResponsive, handleColor, handleDimension, handleUnitPoint } from 'gutenverse-core/styling';

export const hamburgerStyle = (props) => {
    const {
        elementId,
        setSwitcher,
        switcher,
    } = props;

    return [
        {
            id: 'hamburgerAlignment',
            label: __('Hamburger Alignment', 'gutenverse-pro'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse-pro'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Right', 'gutenverse-pro'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
            ],
            style: [
                {
                    selector: `.${elementId} .mega-menu-hamburger-wrapper`,
                    render: value => `justify-content: ${value}`
                },
            ]
        },
        {
            id: 'hamburgerWidth',
            label: __('Width', 'gutenverse-pro'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1
                },
                '%': {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 0.1
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-hamburger`,
                    render: value => handleUnitPoint(value, 'width')
                }
            ]
        },
        {
            id: 'hamburgerSize',
            label: __('Icon Size', 'gutenverse-pro'),
            component: RangeControl,
            min: 5,
            max: 300,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-hamburger i`,
                    render: value => `font-size: ${value}px;`
                }
            ],
        },
        {
            id: 'hamburgerPadding',
            label: __('Padding', 'gutenverse-pro'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-hamburger`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'hamburgerMargin',
            label: __('Margin', 'gutenverse-pro'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-hamburger`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: '__hamburgerState',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __hamburgerState }) => setSwitcher({ ...switcher, hamburgerState: __hamburgerState })
        },
        {
            id: 'hamburgerColorNormal',
            show: switcher.hamburgerState === undefined || switcher.hamburgerState === 'normal',
            label: __('Icon Color', 'gutenverse-pro'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-hamburger`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'hamburgerBgNormal',
            show: switcher.hamburgerState === undefined || switcher.hamburgerState === 'normal',
            component: BackgroundControl,
            label: __('Normal Background', 'gutenverse-pro'),
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-hamburger`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'hamburgerBorderNormal',
            show: switcher.hamburgerState === undefined || switcher.hamburgerState === 'normal',
            label: __('Border Type', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-hamburger`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'hamburgerColorHover',
            show: switcher.hamburgerState === 'hover',
            label: __('Hover Icon Color', 'gutenverse-pro'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-hamburger:hover`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'hamburgerBgHover',
            show: switcher.hamburgerState === 'hover',
            component: BackgroundControl,
            label: __('Hover Background', 'gutenverse-pro'),
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-hamburger:hover`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'hamburgerBorderHover',
            show: switcher.hamburgerState === 'hover',
            label: __('Border Type', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-hamburger:hover`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'closeIconHeading',
            component: HeadingControl,
            label: __('Close Icon')
        },
        {
            id: 'closeWidth',
            label: __('Width', 'gutenverse-pro'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1
                },
                '%': {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 0.1
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-close`,
                    render: value => handleUnitPoint(value, 'width')
                }
            ]
        },
        {
            id: 'closeSize',
            label: __('Icon Size', 'gutenverse-pro'),
            component: RangeControl,
            min: 5,
            max: 300,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-close i`,
                    render: value => `font-size: ${value}px;`
                }
            ],
        },
        {
            id: 'closePadding',
            label: __('Padding', 'gutenverse-pro'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-close`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'closeMargin',
            label: __('Margin', 'gutenverse-pro'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-close`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: '__closeState',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __closeState }) => setSwitcher({ ...switcher, closeState: __closeState })
        },
        {
            id: 'closeColorNormal',
            show: switcher.closeState === undefined || switcher.closeState === 'normal',
            label: __('Icon Color', 'gutenverse-pro'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-close`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'closeBgNormal',
            show: switcher.closeState === undefined || switcher.closeState === 'normal',
            component: BackgroundControl,
            label: __('Normal Background', 'gutenverse-pro'),
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-close`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'closeBorderNormal',
            show: switcher.closeState === undefined || switcher.closeState === 'normal',
            label: __('Border Type', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-close`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'closeColorHover',
            show: switcher.closeState === 'hover',
            label: __('Hover Icon Color', 'gutenverse-pro'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-close:hover`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'closeBgHover',
            show: switcher.closeState === 'hover',
            component: BackgroundControl,
            label: __('Hover Background', 'gutenverse-pro'),
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-close:hover`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'closeBorderHover',
            show: switcher.closeState === 'hover',
            label: __('Border Type', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-close:hover`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
    ];
};