import { __ } from '@wordpress/i18n';
import { DimensionControl, SwitchControl, BoxShadowControl, BorderResponsiveControl, ColorControl, BackgroundControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderResponsive, handleBoxShadow, handleColor, handleDimension } from 'gutenverse-core/styling';

export const iconStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'itemIconPadding',
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
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item .item-icon i, .${elementId} .advance-tab-heading .advance-tab-heading-item .item-image img`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'itemIconMargin',
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
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item .item-icon i, .${elementId} .advance-tab-heading .advance-tab-heading-item .item-image img`,
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
                },
            ],
            onChange: ({ __iconHover }) => setSwitcher({ ...switcher, icon: __iconHover })
        },
        {
            id: 'itemIconColor',
            show: !switcher.icon || switcher.icon === 'normal',
            label: __('Icon Color', 'gutenverse-pro'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item .item-icon i, .${elementId} .advance-tab-heading .advance-tab-heading-item .item-image img`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'itemIconColorHover',
            show: switcher.icon === 'hover',
            label: __('Icon Color Hover', 'gutenverse-pro'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item:hover:not(.active) .item-icon i, .${elementId} .advance-tab-heading:hover:not(.active) .advance-tab-heading-item .item-image img`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'itemIconColorActive',
            show: switcher.icon === 'active',
            label: __('Icon Color Hover', 'gutenverse-pro'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item.active .item-icon i, .${elementId} .advance-tab-heading-item.active .advance-tab-heading-item .item-image img`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'itemIconBackground',
            show: !switcher.icon || switcher.icon === 'normal',
            options: ['default', 'gradient'],
            component: BackgroundControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item .item-icon i, .${elementId} .advance-tab-heading .advance-tab-heading-item .item-image img,
                    `,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'itemIconBackgroundHover',
            show: switcher.icon === 'hover',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item:hover:not(.active) .item-icon i, .${elementId} .advance-tab-heading:hover:not(.active) .advance-tab-heading-item .item-image img`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'itemIconBackgroundActive',
            show: switcher.icon === 'active',
            options: ['default', 'gradient'],
            component: BackgroundControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item.active .item-icon i, .${elementId} .advance-tab-heading.active .advance-tab-heading-item .item-image img`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'itemIconBorder',
            show: !switcher.icon || switcher.icon === 'normal',
            label: __('Border', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item .item-icon i, .${elementId} .advance-tab-heading .advance-tab-heading-item .item-image img`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'itemIconBorderHover',
            show: switcher.icon === 'hover',
            label: __('Border', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item:not(.active) .item-icon i, .${elementId} .advance-tab-heading:hover:not(.active) .advance-tab-heading-item .item-image img`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'itemIconBorderActive',
            show: switcher.icon === 'active',
            label: __('Border', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item.active .item-icon i, .${elementId} .advance-tab-heading.active .advance-tab-heading-item .item-image img`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'itemIconBoxShadow',
            show: !switcher.icon || switcher.icon === 'normal',
            label: __('Box Shadow', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item .item-icon i, .${elementId} .advance-tab-heading .advance-tab-heading-item .item-image img`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'itemIconBoxShadowHover',
            show: switcher.icon === 'hover',
            label: __('Box Shadow', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item:not(.active) .item-icon i, .${elementId} .advance-tab-heading:hover:not(.active) .advance-tab-heading-item .item-image img`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'itemIconBoxShadowActive',
            show: switcher.icon === 'active',
            label: __('Box Shadow', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item.active .item-icon i, .${elementId} .advance-tab-heading.active .advance-tab-heading-item .item-image img`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};