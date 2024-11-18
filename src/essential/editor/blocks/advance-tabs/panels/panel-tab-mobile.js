import { __ } from '@wordpress/i18n';
import { DimensionControl, SwitchControl, BoxShadowControl, BorderResponsiveControl, BackgroundControl, SizeControl, TypographyControl, ColorControl, IconRadioControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderResponsive, handleBoxShadow, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';
import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';

export const tabMobile = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'tabHeadingMobilePadding',
            label: __('Heading Responsive Wrapper Padding', 'gutenverse-control'),
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'tabHeadingMobileWidth',
            label: __('Heading Responsive Wrapper Width', 'gutenverse-pro'),
            component: SizeControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile`,
                    render: value => `width:${value.point}${value.unit}`
                }
            ]
        },
        {
            id: 'tabHeadingMobileBackground',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'tabHeadingMobileBorder',
            label: __('Heading Responsive Wrapper Border', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile`,
                    render: value => handleBorderResponsive(value)
                },
            ]
        },
        {
            id: 'tabHeadingMobileBoxShadow',
            label: __('Heading Responsive Wrapper Box Shadow', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.guten-advance-tabs.${elementId} .advance-tab-heading-mobile`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
            ]
        },
        {
            id: 'tabHeadingItemMobileWidth',
            label: __('Heading Responsive Width', 'gutenverse-pro'),
            component: SizeControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile`,
                    render: value => `width:${value.point}${value.unit}`
                }
            ]
        },
        {
            id: 'tabHeadingItemMobilePadding',
            label: __('Heading Responsive Padding', 'gutenverse-control'),
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'tabHeadingItemMobileMargin',
            label: __('Heading Responsive Margin', 'gutenverse-control'),
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'tabMobileContentWidth',
            label: __('Heading Content Width', 'gutenverse-pro'),
            component: SizeControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-heading-content`,
                    render: value => `width:${value.point}${value.unit}`
                }
            ]
        },
        {
            id: 'tabMobileContentAlignment',
            label: __('Text Alignment', 'gutenverse-pro'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse-pro'),
                    value: 'start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse-pro'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse-pro'),
                    value: 'end',
                    icon: <AlignRight />,
                },
            ],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-title`,
                    render: value => `justify-content: ${value};`
                }
            ]
        },
        {
            id: '__tabMobileContentSwitcher',
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
            onChange: ({ __tabMobileContentSwitcher }) => setSwitcher({ ...switcher, tabMobileContentStatus: __tabMobileContentSwitcher })
        },
        {
            id: 'tabMobileContentColorNormal',
            show: !switcher.tabMobileContentStatus || switcher.tabMobileContentStatus === 'normal',
            label: __('Responsive Content Color', 'gutenverse-pro'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-heading-content`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'tabMobileContentColorHover',
            show: switcher.tabMobileContentStatus === 'hover',
            label: __('Responsive Content Color', 'gutenverse-pro'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover:not(.active) .advance-tab-heading-content`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'tabMobileContentColorActive',
            show: switcher.tabMobileContentStatus === 'active',
            label: __('Responsive Content Color', 'gutenverse-pro'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item.active .advance-tab-heading-content`,
                    render: value => handleColor(value, 'color')
                }
            ]
        }
    ];
};