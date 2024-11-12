import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, DimensionControl } from 'gutenverse-core/controls';
import { handleBackground, handleBorderResponsive, handleDimension } from 'gutenverse-core/styling';
import { allowRenderBoxShadow, handleBoxShadow } from 'gutenverse-core/styling';

export const itemPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'itemPanelSpacing',
            label: __('Item Panel Spacing', 'gutenverse-pro'),
            allowDeviceControl: true,
            component: DimensionControl,
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
            },
            style: [
                {
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu,
                               .${elementId}.mega-menu-item.mega-menu-mega-menu .mega-menu-item-body,
                               .${elementId}.mega-menu-list .gutenverse-menu .sub-menu`,
                    render: value => handleDimension(value, 'padding')
                },
            ]
        },
        {
            id: 'itemPanelBg',
            component: BackgroundControl,
            label: __('Item Panel Background', 'gutenverse-pro'),
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu,
                               .${elementId}.mega-menu-item.mega-menu-mega-menu .mega-menu-item-body,
                               .${elementId}.mega-menu-list .gutenverse-menu .sub-menu`,
                    hasChild: true,
                    render: value => handleBackground(value)
                },
            ]
        },
        {
            id: 'itemPanelBorder_v2',
            label: __('Item Panel Border', 'gutenverse-pro'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu,
                               .${elementId}.mega-menu-item.mega-menu-mega-menu .mega-menu-item-body,
                               .${elementId}.mega-menu-list .gutenverse-menu .sub-menu`,
                    render: value => handleBorderResponsive(value)
                },
            ]
        },
        {
            id: 'itemPanelShadow',
            label: __('Item Panel Box Shadow', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId}.mega-menu-list .gutenverse-menu,
                               .${elementId}.mega-menu-item.mega-menu-mega-menu .mega-menu-item-body,
                               .${elementId}.mega-menu-list .gutenverse-menu .sub-menu`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};