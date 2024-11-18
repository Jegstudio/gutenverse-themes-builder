import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { handleBackground, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const itemStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'itemTypography',
            label: __('Item Typography', 'gutenverse-pro'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .mega-menu-heading, .${elementId} .mega-menu-heading span, .${elementId} .mega-menu-heading a`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'itemSpacing',
            label: __('Item Spacing', 'gutenverse-pro'),
            allowDeviceControl: true,
            component: DimensionControl,
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
            },
            style: [
                {
                    selector: `.${elementId} .mega-menu-heading`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'itemIndicatorMargin',
            label: __('Indicator Margin', 'gutenverse-pro'),
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
                    selector: `.${elementId} .mega-menu-heading i`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'itemIndicatorPadding',
            label: __('Indicator Padding', 'gutenverse-pro'),
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
                    selector: `.${elementId} .mega-menu-heading i`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: '__itemState',
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
                {
                    value: 'active',
                    label: 'Active'
                },
            ],
            onChange: ({ __itemState }) => setSwitcher({ ...switcher, itemState: __itemState })
        },
        {
            id: 'itemTextNormalColor',
            show: switcher.itemState === undefined || switcher.itemState === 'normal',
            label: __('Item Text Normal Color', 'gutenverse-pro'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .mega-menu-heading span, .${elementId} .mega-menu-heading a`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'itemIndicatorNormalColor',
            show: switcher.itemState === undefined || switcher.itemState === 'normal',
            label: __('Indicator Normal Color', 'gutenverse-pro'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .mega-menu-heading i`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'itemTextNormalBg',
            show: switcher.itemState === undefined || switcher.itemState === 'normal',
            component: BackgroundControl,
            label: __('Item Text Normal Background', 'gutenverse-pro'),
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .mega-menu-heading`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'itemTextHoverColor',
            show: switcher.itemState === 'hover',
            label: __('Item Text Hover Color', 'gutenverse-pro'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `
                        .${elementId} .mega-menu-heading:hover span,
                        .${elementId} .mega-menu-heading:hover a
                    `,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'itemIndicatorHoverColor',
            show: switcher.itemState === 'hover',
            label: __('Indicator Hover Color', 'gutenverse-pro'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `
                        .${elementId} .mega-menu-heading:hover i
                    `,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'itemTextHoverBg',
            show: switcher.itemState === 'hover',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `
                        .${elementId} .mega-menu-heading:hover
                    `,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'itemTextActiveColor',
            show: switcher.itemState === 'active',
            label: __('Item Text Active Color', 'gutenverse-pro'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `
                        .${elementId} .mega-menu-item.active .mega-menu-heading span,
                        .${elementId} .mega-menu-item.active .mega-menu-heading a
                    `,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'itemIndicatorActiveColor',
            show: switcher.itemState === 'active',
            label: __('Indicator Active Color', 'gutenverse-pro'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `
                        .${elementId} .mega-menu-item.active .mega-menu-heading i
                    `,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'itemTextActiveBg',
            show: switcher.itemState === 'active',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `
                        .${elementId} .mega-menu-item.active .mega-menu-heading
                    `,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
    ];
};