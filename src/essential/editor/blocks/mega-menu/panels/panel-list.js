import { __ } from '@wordpress/i18n';
import { contentPanel } from './panel-content';
import { wrapperPanel } from './panel-wrapper';
import { itemStylePanel } from './panel-item-style';
import { hamburgerStyle } from './panel-hamburger-style';
import { mobileMenuPanel } from './panel-mobile-menu';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, TabSetting, TabStyle, transformPanel } from 'gutenverse-core/controls';


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

export const panelList = (result, ) => {
    return [
        {
            id: 'content',
            title: __('Content', 'gutenverse-pro'),
            initialOpen: false,
            pro: true,
            panelArray: (props) => contentPanel({
                ...props,
                setSubMenuPosition
            })
        },
        {
            id: 'mobileMenu',
            title: __('Mobile Menu', 'gutenverse-pro'),
            initialOpen: false,
            pro: true,
            panelArray: mobileMenuPanel
        },
        {
            id: 'wrapper',
            title: __('Wrapper', 'gutenverse-pro'),
            initialOpen: false,
            pro: true,
            panelArray: wrapperPanel
        },
        {
            id: 'item',
            title: __('Item', 'gutenverse-pro'),
            initialOpen: false,
            pro: true,
            panelArray: itemStylePanel
        },
        {
            id: 'hamburgerStyle',
            title: __('Hamburger Style', 'gutenverse-pro'),
            initialOpen: false,
            pro: true,
            panelArray: (props) => hamburgerStyle({
                ...props,
                setSubMenuPosition
            })
        },
        {
            title: __('Background', 'gutenverse-pro'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'mega-menu-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
            })
        },
        {
            title: __('Border', 'gutenverse-pro'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'mega-menu-border',
            })
        },
        {
            title: __('Masking', 'gutenverse-pro'),
            initialOpen: false,
            panelArray: maskPanel,
            tabRole: TabStyle
        },
        {
            title: __('Display', 'gutenverse-pro'),
            initialOpen: false,
            panelArray: responsivePanel
        },
        {
            title: __('Positioning', 'gutenverse-pro'),
            initialOpen: false,
            panelArray: positioningPanel
        },
        {
            title: __('Animation Effects', 'gutenverse-pro'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'mega-menu-animation'
            })
        },
        {
            title: __('Transform', 'gutenverse-pro'),
            initialOpen: false,
            panelArray: transformPanel,
            pro: true
        },
        {
            title: __('Mouse Move Effect', '--gctd--'),
            initialOpen: false,
            panelArray: mouseMoveEffectPanel,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Spacing', 'gutenverse-pro'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'mega-menu-advance',
            })
        },
        {
            title: __('Condition', 'gutenverse'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        },
    ];
};

