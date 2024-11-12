import { __ } from '@wordpress/i18n';
import { DimensionControl, SwitchControl, BoxShadowControl, BorderResponsiveControl, BackgroundControl, SizeControl, TypographyControl, ColorControl, IconRadioControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderResponsive, handleBoxShadow, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const tabMobileOptions = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'tabMobileOptionsWrapperPadding',
            label: __('Responsive Options Wrapper Padding', 'gutenverse-control'),
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
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-option `,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'tabMobileOptionsWrapperMargin',
            label: __('Responsive Options Wrapper Margin', 'gutenverse-control'),
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
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-option `,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'tabMobileOptionsWrapperWidth',
            label: __('Options Wrapper Width', 'gutenverse-pro'),
            component: SizeControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-option`,
                    render: value => `width:${value.point}${value.unit}`
                }
            ]
        },
        {
            id: 'tabMobileOptionsWrapperBackground',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-option `,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'tabMobileOptionsWrapperBorder',
            label: __('Responsive Options Wrapper Border', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-option `,
                    render: value => handleBorderResponsive(value)
                },
            ]
        },
        {
            id: 'tabMobileOptionsWrapperBoxShadow',
            label: __('Responsive Options Wrapper Box Shadow', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.guten-advance-tabs.${elementId} .advance-tab-heading-mobile .advance-tab-option `,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
            ]
        },
        {
            id: 'tabMobileOptionPadding',
            label: __('Responsive Option Padding', 'gutenverse-control'),
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
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'tabMobileOptionMargin',
            label: __('Responsive Option Margin', 'gutenverse-control'),
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
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: '__tabMobileOptionSwitcher',
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
            onChange: ({ __tabMobileOptionSwitcher }) => setSwitcher({ ...switcher, tabMobileOptionStatus: __tabMobileOptionSwitcher })
        },
        {
            id: 'tabMobileOptionBackground',
            component: BackgroundControl,
            show: !switcher.tabMobileOptionStatus || switcher.tabMobileOptionStatus === 'normal',
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'tabMobileOptionBorder',
            label: __('Responsive Option Border', 'gutenverse-pro'),
            show: !switcher.tabMobileOptionStatus || switcher.tabMobileOptionStatus === 'normal',
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item`,
                    render: value => handleBorderResponsive(value)
                },
            ]
        },
        {
            id: 'tabMobileOptionBoxShadow',
            label: __('Responsive Option Box Shadow', 'gutenverse-pro'),
            show: !switcher.tabMobileOptionStatus || switcher.tabMobileOptionStatus === 'normal',
            component: BoxShadowControl,
            style: [
                {
                    selector: `.guten-advance-tabs.${elementId} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
            ]
        },
        {
            id: 'tabMobileOptionBackgroundHover',
            component: BackgroundControl,
            show: switcher.tabMobileOptionStatus === 'hover',
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item:hover:not(.active)`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'tabMobileOptionBorderHover',
            label: __('Responsive Option Border', 'gutenverse-pro'),
            show: switcher.tabMobileOptionStatus === 'hover',
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item:hover:not(.active)`,
                    render: value => handleBorderResponsive(value)
                },
            ]
        },
        {
            id: 'tabMobileOptionBoxShadowHover',
            label: __('Responsive Option Box Shadow', 'gutenverse-pro'),
            show: switcher.tabMobileOptionStatus === 'hover',
            component: BoxShadowControl,
            style: [
                {
                    selector: `.guten-advance-tabs.${elementId} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item:hover:not(.active)`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
            ]
        },
        {
            id: 'tabMobileOptionBackgroundActive',
            component: BackgroundControl,
            show: switcher.tabMobileOptionStatus === 'active',
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item.active`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'tabMobileOptionBorderActive',
            label: __('Responsive Option Border', 'gutenverse-pro'),
            show: switcher.tabMobileOptionStatus === 'active',
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item.active`,
                    render: value => handleBorderResponsive(value)
                },
            ]
        },
        {
            id: 'tabMobileOptionBoxShadowActive',
            label: __('Responsive Option Box Shadow', 'gutenverse-pro'),
            show: switcher.tabMobileOptionStatus === 'active',
            component: BoxShadowControl,
            style: [
                {
                    selector: `.guten-advance-tabs.${elementId} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item.active`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
            ]
        },
    ];
};