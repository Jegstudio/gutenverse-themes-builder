import { __ } from '@wordpress/i18n';
import { DimensionControl, SwitchControl, BoxShadowControl, BorderResponsiveControl, ColorControl, BackgroundControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderResponsive, handleBoxShadow, handleColor, handleDimension } from 'gutenverse-core/styling';

export const iconMobileStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'itemIconMobilePadding',
            label: __('Padding', 'gutenverse-control'),
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
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .item-icon i, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .item-image img`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'itemIconMobileMargin',
            label: __('Margin', 'gutenverse-control'),
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
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .item-icon i, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .item-image img`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: '__iconHover',
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
                }
            ],
            onChange: ({ __iconHover }) => setSwitcher({ ...switcher, icon: __iconHover })
        },
        {
            id: 'itemIconMobileColor',
            show: !switcher.icon || switcher.icon === 'normal',
            label: __('Icon Color', 'gutenverse-pro'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .item-icon i, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .item-image img`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'itemIconMobileColorHover',
            show: switcher.icon === 'hover',
            label: __('Icon Color', 'gutenverse-pro'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover .advance-tab-heading-content .item-icon i, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover
                    .advance-tab-heading-content .item-image img`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'itemIconMobileColorActive',
            show: switcher.icon === 'active',
            label: __('Icon Color', 'gutenverse-pro'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.active .advance-tab-heading-content .item-icon i, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.active
                    .advance-tab-heading-content .item-image img`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'itemIconMobileBackground',
            show: !switcher.icon || switcher.icon === 'normal',
            options: ['default', 'gradient'],
            component: BackgroundControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-heading-content .item-icon i, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile
                    .advance-tab-heading-content .item-image img`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'itemIconMobileBackgroundHover',
            show: switcher.icon === 'hover',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover:not(.active) .advance-tab-heading-content .item-icon i, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover:not(.active)
                    .advance-tab-heading-content .item-image img`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'itemIconMobileBackgroundActive',
            show: switcher.icon === 'active',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item.active .advance-tab-heading-content .item-icon i, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item.active
                    .advance-tab-heading-content .item-image img`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'itemIconMobileBorder',
            show: !switcher.icon || switcher.icon === 'normal',
            label: __('Border', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-heading-content .item-icon i, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile
                    .advance-tab-heading-content .item-image img`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'itemIconMobileBorderHover',
            show: switcher.icon === 'hover',
            label: __('Border', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover:not(.active) .advance-tab-heading-content .item-icon i, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover:not(.active)
                    .advance-tab-heading-content .item-image img`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'itemIconMobileBorderActive',
            show: switcher.icon === 'active',
            label: __('Border', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item.active .advance-tab-heading-content .item-icon i, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item.active
                    .advance-tab-heading-content .item-image img`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'itemIconMobileBoxShadow',
            show: !switcher.icon || switcher.icon === 'normal',
            label: __('Box Shadow', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-heading-content .item-icon i, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile
                    .advance-tab-heading-content .item-image img`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'itemIconMobileBoxShadowHover',
            show: switcher.icon === 'hover',
            label: __('Box Shadow', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover:not(.active) .advance-tab-heading-content .item-icon i, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item:hover:not(.active)
                    .advance-tab-heading-content .item-image img`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'itemIconMobileBoxShadowActive',
            show: switcher.icon === 'active',
            label: __('Box Shadow', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item.active .advance-tab-heading-content .item-icon i, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile.advance-tab-option-item.active
                    .advance-tab-heading-content .item-image img`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
    ];
};