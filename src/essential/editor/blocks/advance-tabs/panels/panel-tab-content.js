import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderResponsiveControl, BoxShadowControl, DimensionControl } from 'gutenverse-core/controls';
import { ColorControl } from 'gutenverse-core/controls';
import { TypographyControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderResponsive, handleBoxShadow, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const contentStyle = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'tabContentBackground',
            label: __('Content Background', 'gutenverse-pro'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.guten-advance-tabs.${elementId} .advance-tab-body`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'tabContentColor',
            label: __('Content Text Color', 'gutenverse-pro'),
            component: ColorControl,
            style: [
                {
                    selector: `.guten-advance-tabs.${elementId} .advance-tab-body`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'tabContentTypography',
            label: __('Content Typography', 'gutenverse-pro'),
            component: TypographyControl,
            style: [
                {
                    selector: `.guten-advance-tabs.${elementId} .advance-tab-body, 
                        .guten-advance-tabs.${elementId} .advance-tab-body p, 
                        .guten-advance-tabs.${elementId} .advance-tab-body a`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'tabContentPadding',
            label: __('Content Padding', 'gutenverse-pro'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .advance-tab-body`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'tabContentMargin',
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
                    selector: `.${elementId} .advance-tab-body `,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'tabContentBorder',
            label: __('Border', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .advance-tab-body `,
                    render: value => handleBorderResponsive(value)
                },
            ]
        },
        {
            id: 'tabContentBoxShadow',
            label: __('Box Wrapper', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.guten-advance-tabs.${elementId} .advance-tab-body `,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
            ]
        },
    ];
};
