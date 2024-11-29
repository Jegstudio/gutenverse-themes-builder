import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, LockedProPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, TabSetting, TabStyle, transformPanel } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';

export const panelList = (result, ) => {
    return applyFilters(
        'gutenverse.mega-menu.panels',
        [
            {
                id: 'content',
                title: __('Content', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: () => {
                    return [{
                        component: LockedProPanel,
                    }];
                }
            },
            {
                id: 'mobileMenu',
                title: __('Mobile Menu', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: () => {
                    return [{
                        component: LockedProPanel,
                    }];
                }
            },
            {
                id: 'wrapper',
                title: __('Wrapper', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: () => {
                    return [{
                        component: LockedProPanel,
                    }];
                }
            },
            {
                id: 'item',
                title: __('Item', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: () => {
                    return [{
                        component: LockedProPanel,
                    }];
                }
            },
            {
                id: 'hamburgerStyle',
                title: __('Hamburger Style', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: () => {
                    return [{
                        component: LockedProPanel,
                    }];
                }
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
        ],
        []
    );
};

