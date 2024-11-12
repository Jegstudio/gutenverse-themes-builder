import { __ } from '@wordpress/i18n';
import { handleDimension } from 'gutenverse-core/styling';
import { CheckboxControl, DimensionControl, IconControl, ImageSizeControl, RangeControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const mobileMenuPanel = (props) => {
    const {
        elementId,
        mobileMenuLink
    } = props;

    return [
        {
            id: 'mobileMenuLogo',
            label: __('Menu Logo', 'gutenverse-pro'),
            component: ImageSizeControl
        },
        {
            id: 'mobileMenuLogoAlt',
            label: __('Menu Logo Alt', 'gutenverse-pro'),
            component: TextControl
        },
        {
            id: 'mobileMenuLogoLazyMode',
            label: __('Set Lazy Load', 'gutenverse-pro'),
            component: CheckboxControl
        },
        {
            id: 'mobileMenuLogoWidth',
            label: __('Width', 'gutenverse-pro'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-nav-logo img`,
                    render: value => `width: ${value}px;`
                }
            ],
        },
        {
            id: 'mobileMenuLogoHeight',
            label: __('Height', 'gutenverse-pro'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-nav-logo img`,
                    render: value => `height: ${value}px;`
                }
            ],
        },
        {
            id: 'mobileMenuLogoFit',
            label: __('Logo Fit', 'gutenverse-pro'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Cover'),
                    value: 'cover'
                },
                {
                    label: __('Contain'),
                    value: 'contain'
                },
                {
                    label: __('Fill'),
                    value: 'fill'
                },
                {
                    label: __('Scale Down'),
                    value: 'scale-down'
                },
                {
                    label: __('None'),
                    value: 'none'
                },
            ],
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu .mega-menu-nav-logo img`,
                    render: value => `object-fit: ${value};`
                }
            ]
        },
        {
            id: 'mobileMenuLogoMargin',
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
                    selector: `.${elementId}.guten-mega-menu .mega-menu-nav-logo`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'mobileMenuLogoPadding',
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
                    selector: `.${elementId}.guten-mega-menu .mega-menu-nav-logo`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'mobileMenuURL',
            label: __('Mobile Menu URL', 'gutenverse-pro'),
            component: TextControl,
        },
        {
            id: 'mobileIcon',
            label: __('Mobile Icon', 'gutenverse-pro'),
            component: IconControl,
        },
        {
            id: 'mobileCloseIcon',
            label: __('Close Icon', 'gutenverse-pro'),
            component: IconControl,
        }
    ];
};