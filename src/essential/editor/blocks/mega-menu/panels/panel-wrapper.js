import { __ } from '@wordpress/i18n';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { BackgroundControl, ColorControl, DimensionControl, HeadingControl } from 'gutenverse-core/controls';
import { handleBackground, handleColor, handleDimension } from 'gutenverse-core/styling';

export const wrapperPanel = (props) => {
    const {
        elementId,
    } = props;

    const deviceType = getDeviceType();

    return [
        {
            id: 'wrapperBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            style: [
                {
                    selector: `.${elementId} .mega-menu-wrapper, .${elementId}.break-point-tablet .mega-menu-wrapper, .${elementId}.break-point-mobile .mega-menu-wrapper`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'wrapperPadding',
            label: __('Padding', 'gutenverse-pro'),
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
                    selector: `.${elementId} .mega-menu-wrapper`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'wrapperMargin',
            label: __('Margin', 'gutenverse-pro'),
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
                    selector: `.${elementId} .mega-menu-wrapper`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'wrapperRadius',
            label: __('Border Radius', 'gutenverse-pro'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                '%': {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .mega-menu-wrapper`,
                    render: value => handleDimension(value, 'border-radius', false)
                }
            ]
        },
        {
            id: 'wrapperMobileHeading',
            component: HeadingControl,
            label: __('Mobile Wrapper', 'gutenverse-pro'),
            show: deviceType === 'Tablet' || deviceType === 'Mobile',
        },
        {
            id: 'wrapperMobileBackground',
            label: __('Mobile Background', 'gutenverse-pro'),
            show: deviceType === 'Tablet' || deviceType === 'Mobile',
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.break-point-mobile .mega-menu-wrapper`,
                    render: value => handleColor(value, 'background')
                },
                {
                    selector: `.${elementId}.break-point-tablet .mega-menu-wrapper`,
                    render: value => handleColor(value, 'background')
                }
            ],
        },
        {
            id: 'wrapperMobileHeaderPadding',
            label: __('Header Padding', 'gutenverse-pro'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            show: deviceType === 'Tablet' || deviceType === 'Mobile',
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
                    selector: `.${elementId} .mega-menu-identity-panel`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
    ];
};