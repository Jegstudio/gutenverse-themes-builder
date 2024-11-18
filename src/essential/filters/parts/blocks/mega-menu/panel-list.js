
import { __ } from '@wordpress/i18n';
import { contentPanel } from '../../../../editor/blocks/mega-menu/panels/panel-content';
import { wrapperPanel } from '../../../../editor/blocks/mega-menu/panels/panel-wrapper';
import { itemStylePanel } from '../../../../editor/blocks/mega-menu/panels/panel-item-style';
import { hamburgerStyle } from '../../../../editor/blocks/mega-menu/panels/panel-hamburger-style';
import { mobileMenuPanel } from '../../../../editor/blocks/mega-menu/panels/panel-mobile-menu';


const setSubMenuPosition = ({
    position,
    spacing,
    orientation,
    breakpoint,
    itemPanelSpacing,
    device
}) => {
    const { dimension, unit } = spacing;
    const styles = [];
    const breakpointWidth = ['100%'];
    const additionalWidth = (pos) => {
        const devices = [];
        const values = itemPanelSpacing;

        switch (device) {
            case 'Desktop':
                devices.push('Desktop');
                break;
            case 'Tablet':
                devices.push('Tablet', 'Desktop');
                break;
            case 'Mobile':
                devices.push('Mobile', 'Tablet', 'Desktop');
                break;
        }

        for (const _device of devices) {
            if (values
                && values[_device]
                && values[_device]['dimension']
                && values[_device]['unit']
                && values[_device]['dimension'][pos]
                && values[_device]['dimension'][pos] !== undefined
                && values[_device]['dimension'][pos] !== ''
            ) {
                return `${values[_device]['dimension'][pos]}${values[_device]['unit']}`;
            }
        }

        return '20px';
    };

    if (dimension && unit) {
        if ((breakpoint === 'mobile' && device.toLowerCase() === 'mobile')
            || (breakpoint === 'tablet' && (device.toLowerCase() === 'mobile' || device.toLowerCase() === 'tablet'))) {
            breakpointWidth.push(additionalWidth('left'));
            breakpointWidth.push(additionalWidth('right'));

            styles.push('top: 100%;');
            styles.push(`left: -${additionalWidth('left')};`);
            styles.push(`width: calc(${breakpointWidth.join(' + ')});`);
        } else {
            if (dimension['top']) {
                styles.push(`top: -${dimension['top']}${unit};`);
            }

            if ((position === 'right' || orientation === 'horizontal') && dimension['right']) {
                styles.push(`left: calc(100% + ${dimension['right']}${unit}); right: unset;`);
            }

            if ((position === 'left' && orientation === 'vertical') && dimension['left']) {
                styles.push(`right: calc(100% + ${dimension['left']}${unit}); left: unset;`);
            }
        }
    }

    return styles.join(' ');
};

export const megaMenuPanel = (props, result) => {
    result[
        result.findIndex(el => el.id === 'content')
    ] = {
        pro: true,
        title: __('Content', 'gutenverse-pro'),
        panelArray: (props) => contentPanel({
            ...props,
            setSubMenuPosition
        }),
        initialOpen: false,
    };

    result[
        result.findIndex(el => el.id === 'mobileMenu')
    ] = {
        pro: true,
        title: __('Mobile Menu', 'gutenverse-pro'),
        panelArray: mobileMenuPanel,
        initialOpen: false,
    };

    result[
        result.findIndex(el => el.id === 'wrapper')
    ] = {
        pro: true,
        title: __('Wrapper', 'gutenverse-pro'),
        panelArray: wrapperPanel,
        initialOpen: false,
    };

    result[
        result.findIndex(el => el.id === 'item')
    ] = {
        pro: true,
        title: __('Item', 'gutenverse-pro'),
        panelArray: itemStylePanel,
        initialOpen: false,
    };

    result[
        result.findIndex(el => el.id === 'hamburgerStyle')
    ] = {
        pro: true,
        title: __('Hamburger Style', 'gutenverse-pro'),
        panelArray: (props) => hamburgerStyle({
            ...props,
            setSubMenuPosition
        }),
        initialOpen: false,
    };

    return result;
};
