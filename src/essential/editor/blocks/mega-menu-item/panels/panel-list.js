import { __ } from '@wordpress/i18n';
import { animationPanel, LockedProPanel, TabSetting, TabStyle } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';

export const panelList = () => {
    return applyFilters(
        'gutenverse.mega-menu-item.panels',
        [
            {
                id: 'menu',
                title: __('Menu', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: (props) => {
                    return [{
                        component: LockedProPanel,
                    }];
                },
                tabRole: TabSetting
            },
            {
                id: 'panel',
                title: __('Panel', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: (props) => {
                    return [{
                        component: LockedProPanel,
                    }];
                },
                tabRole: TabSetting
            },
            {
                id: 'panelstyle',
                title: __('Panel Style', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: (props) => {
                    return [{
                        component: LockedProPanel,
                    }];
                },
                tabRole: TabStyle
            },
            {
                id: 'liststyle',
                title: __('List Style', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: (props) => {
                    return [{
                        component: LockedProPanel,
                    }];
                },
                tabRole: TabStyle
            },
            {
                title: __('Animation Effects', 'gutenverse-pro'),
                initialOpen: false,
                panelArray: (props) => animationPanel({
                    ...props,
                    styleId: 'mega-menu-animation'
                }),
                tabRole: TabSetting
            },
        ],
        null
    );
};
