import { __ } from '@wordpress/i18n';
import { DimensionControl, BoxShadowControl, BorderResponsiveControl, BackgroundControl, SelectControl, IconRadioControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderResponsive, handleBoxShadow, handleDimension } from 'gutenverse-core/styling';

export const tabTitlesWrapperStyle = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'tabTitlesWrapperPadding',
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
                    selector: `.${elementId} .advance-tab-heading`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'tabTitlesWrapperMargin',
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
                    selector: `.${elementId} .advance-tab-heading`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'tabTitlesWrapperWidth',
            label: __('Width Type', 'gutenverse-control'),
            component: SelectControl,
            allowDeviceControl: true,
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
                    selector: `.${elementId} .advance-tab-heading`,
                    render: value => `width: ${value}`
                }
            ]
        },
        {
            id: 'tabTitlesWrapperBackground',
            label: __('Background', 'gutenverse-pro'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'tabTitlesWrapperBorder',
            label: __('Border Wrapper Type', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .advance-tab-heading`,
                    render: value => handleBorderResponsive(value)
                },
            ]
        },
        {
            id: 'tabTitlesWrapperBoxShadow',
            label: __('Box Shadow Wrapper', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.guten-advance-tabs.${elementId} .advance-tab-heading `,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
            ]
        },
    ];
};