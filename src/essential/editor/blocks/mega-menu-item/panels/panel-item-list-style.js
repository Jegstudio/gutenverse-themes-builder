import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, ColorControl, DimensionControl, HeadingControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { handleBackground, handleBorderResponsive, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const itemListStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'itemListTypography',
            label: __('Item List Typography', 'gutenverse-pro'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu li, .${elementId}.mega-menu-list .gutenverse-menu li > a`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'itemListSpacing',
            label: __('Item List Spacing', 'gutenverse-pro'),
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
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu li`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'itemListIndicatorMargin',
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
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu li > a > i`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'itemListIndicatorPadding',
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
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu li > a > i`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: '__itemListState',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({ __itemListState }) => setSwitcher({ ...switcher, itemListState: __itemListState })
        },
        {
            id: 'itemListTextNormalColor',
            show: switcher.itemListState === undefined || switcher.itemListState === 'normal',
            label: __('Text Normal Color', 'gutenverse-pro'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu li > a`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'itemListIndicatorNormalColor',
            show: switcher.itemListState === undefined || switcher.itemListState === 'normal',
            label: __('Indicator Normal Color', 'gutenverse-pro'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu li > a > i`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'itemListTextNormalBg',
            show: switcher.itemListState === undefined || switcher.itemListState === 'normal',
            component: BackgroundControl,
            label: __('Text Normal Background', 'gutenverse-pro'),
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu li`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'itemListTextHoverColor',
            show: switcher.itemListState === 'hover',
            label: __('Text Hover Color', 'gutenverse-pro'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu li:hover > a`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'itemListIndicatorHoverColor',
            show: switcher.itemListState === 'hover',
            label: __('Indicator Hover Color', 'gutenverse-pro'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu li:hover > a > i`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'itemListTextHoverBg',
            show: switcher.itemListState === 'hover',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu li:hover`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'itemListBorderHeading',
            component: HeadingControl,
            label: __('Item Border')
        },
        {
            id: 'itemListBorder',
            label: __('Border Type', 'gutenverse-pro'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu li`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'firstItemListBorderHeading',
            component: HeadingControl,
            label: __('First Child Border')
        },
        {
            id: 'firstItemListBorder',
            label: __('Border Type', 'gutenverse-pro'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu li:first-child`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'lastItemListBorderHeading',
            component: HeadingControl,
            label: __('Last Child Border')
        },
        {
            id: 'lastItemListBorder',
            label: __('Border Type', 'gutenverse-pro'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu li:last-child`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
    ];
};