import { __ } from '@wordpress/i18n';
import { DimensionControl, SwitchControl, BoxShadowControl, BorderResponsiveControl, BackgroundControl, SizeControl, SelectControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderResponsive, handleBoxShadow, handleDimension } from 'gutenverse-core/styling';

export const tabTitleWrapperStyle = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        tabTitleWrapperWidthType
    } = props;

    return [
        {
            id: 'tabTitleWrapperPadding',
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
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'tabTitleWrapperMargin',
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
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'tabTitleWrapperWidthType',
            label: __('Width Type', 'gutenverse-pro'),
            component: SelectControl,
            options: [
                {
                    value: '100%',
                    label: 'Normal'
                },
                {
                    value: 'fit-content',
                    label: 'Fit Content'
                },
            ],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item`,
                    render: value => `width: ${value}`
                }
            ]
        },
        {
            id: 'tabTitleWrapperWidth',
            label: __('Width', 'gutenverse-pro'),
            show: tabTitleWrapperWidthType === '100%',
            component: SizeControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item`,
                    allowRender: () => tabTitleWrapperWidthType === '100%',
                    render: value => `width:${value.point}${value.unit};`
                }
            ]
        },
        {
            id: '__tabTitleWrapperSwitcher',
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
            onChange: ({ __tabTitleWrapperSwitcher }) => setSwitcher({ ...switcher, tabTitleWrapperStatus: __tabTitleWrapperSwitcher })
        },
        {
            id: 'tabTitleWrapperBackgroundNormal',
            show: !switcher.tabTitleWrapperStatus || switcher.tabTitleWrapperStatus === 'normal',
            label: __('Background', 'gutenverse-pro'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'tabTitleWrapperBackgroundHover',
            show: switcher.tabTitleWrapperStatus === 'hover',
            label: __('Background', 'gutenverse-pro'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item:hover:not(.active):before `,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'tabTitleWrapperBackgroundActive',
            show: switcher.tabTitleWrapperStatus === 'active',
            label: __('Background', 'gutenverse-pro'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item.active `,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'tabTitleWrapperBorderNormal',
            show: !switcher.tabTitleWrapperStatus || switcher.tabTitleWrapperStatus === 'normal',
            label: __('Border Wrapper Type', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item`,
                    render: value => handleBorderResponsive(value)
                },
            ]
        },
        {
            id: 'tabTitleWrapperBorderHover',
            show: switcher.tabTitleWrapperStatus === 'hover',
            label: __('Border Wrapper Type', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-advance-tabs.${elementId} .advance-tab-heading .advance-tab-heading-item:hover:not(.active)`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'tabTitleWrapperBorderActive',
            show: switcher.tabTitleWrapperStatus === 'active',
            label: __('Border Wrapper Type', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-advance-tabs.${elementId} .advance-tab-heading .advance-tab-heading-item.active`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'tabTitleWrapperBoxShadowNormal',
            show: !switcher.tabTitleWrapperStatus || switcher.tabTitleWrapperStatus === 'normal',
            label: __('Box Shadow Wrapper', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.guten-advance-tabs.${elementId} .advance-tab-heading .advance-tab-heading-item`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
            ]
        },
        {
            id: 'tabTitleWrapperBoxShadowHover',
            show: switcher.tabTitleWrapperStatus === 'hover',
            label: __('Box Shadow Wrapper', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item:hover:not(.active)`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'tabTitleWrapperBoxShadowActive',
            show: switcher.tabTitleWrapperStatus === 'active',
            label: __('Box Shadow', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item.active`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};