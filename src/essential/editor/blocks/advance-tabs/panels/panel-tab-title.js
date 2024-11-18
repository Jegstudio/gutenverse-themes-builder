import { __ } from '@wordpress/i18n';
import { DimensionControl, SwitchControl, BoxShadowControl, BorderResponsiveControl, ColorControl, BackgroundControl, SizeControl, IconRadioControl, TypographyControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderResponsive, handleBoxShadow, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';
import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';

export const tabTitleStyle = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'tabTitleAlign',
            label: __('Text Alignment', 'gutenverse-pro'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse-pro'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse-pro'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse-pro'),
                    value: 'right',
                    icon: <AlignRight />,
                },
            ],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content`,
                    render: value => `text-align: ${value};`
                }
            ]
        },
        {
            id: 'tabTitlePadding',
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
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'tabTitleMargin',
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
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'tabTitleWidth',
            label: __('Title Width', 'gutenverse-pro'),
            component: SizeControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content, .${elementId} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content span`,
                    render: value => {
                        return `width:${value.point}${value.unit}`;
                    }
                }
            ]
        },
        {
            id: 'tabTitleTypography',
            label: __('Title Typography', 'gutenverse-pro'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-heading-content`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: '__tabTitleSwitcher',
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
            onChange: ({ __tabTitleSwitcher }) => setSwitcher({ ...switcher, tabTitleStatus: __tabTitleSwitcher })
        },
        {
            id: 'tabTitleColorNormal',
            show: !switcher.tabTitleStatus || switcher.tabTitleStatus === 'normal',
            label: __('Title Color', 'gutenverse-pro'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'tabTitleColorHover',
            show: switcher.tabTitleStatus === 'hover',
            label: __('Title Color', 'gutenverse-pro'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item:hover:not(.active) .advance-tab-heading-content`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'tabTitleColorActive',
            show: switcher.tabTitleStatus === 'active',
            label: __('Title Color', 'gutenverse-pro'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item.active .advance-tab-heading-content`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'tabTitleBackgroundNormal',
            show: !switcher.tabTitleStatus || switcher.tabTitleStatus === 'normal',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'tabTitleBackgroundHover',
            show: switcher.tabTitleStatus === 'hover',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item:hover:not(.active) .advance-tab-heading-content`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'tabTitleBackgroundActive',
            show: switcher.tabTitleStatus === 'active',
            label: __('Title Background', 'gutenverse-pro'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item.active .advance-tab-heading-content`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'tabTitleBorderNormal',
            show: !switcher.tabTitleStatus || switcher.tabTitleStatus === 'normal',
            label: __('Border', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content`,
                    render: value => handleBorderResponsive(value)
                },
            ]
        },
        {
            id: 'tabTitleBorderHover',
            show: switcher.tabTitleStatus === 'hover',
            label: __('Border', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-advance-tabs.${elementId} .advance-tab-heading .advance-tab-heading-item:hover:not(.active) .advance-tab-heading-content`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'tabTitleBorderActive',
            show: switcher.tabTitleStatus === 'active',
            label: __('Border', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-advance-tabs.${elementId} .advance-tab-heading .advance-tab-heading-item.active .advance-tab-heading-content`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'tabTitleBoxShadowNormal',
            show: !switcher.tabTitleStatus || switcher.tabTitleStatus === 'normal',
            label: __('Box Shadow', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.guten-advance-tabs.${elementId} .advance-tab-heading .advance-tab-heading-item .advance-tab-heading-content`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
            ]
        },
        {
            id: 'tabTitleBoxShadowHover',
            show: switcher.tabTitleStatus === 'hover',
            label: __('Box Shadow', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item:hover:not(.active) .advance-tab-heading-content`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'tabTitleBoxShadowActive',
            show: switcher.tabTitleStatus === 'active',
            label: __('Box Shadow', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading .advance-tab-heading-item.active .advance-tab-heading-content`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};