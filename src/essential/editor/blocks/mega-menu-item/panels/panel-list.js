import { __ } from '@wordpress/i18n';
import { menuPanel } from './panel-menu';
import { panelPanel } from './panel-panel';
import { itemListStylePanel } from './panel-item-list-style';
import { itemPanel } from './panel-item-panel';
import { animationPanel, TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            id: 'menu',
            title: __('Menu', 'gutenverse-pro'),
            initialOpen: false,
            pro: true,
            panelArray: menuPanel,
            tabRole: TabSetting
        },
        {
            id: 'panel',
            title: __('Panel', 'gutenverse-pro'),
            initialOpen: false,
            pro: true,
            panelArray: panelPanel,
            tabRole: TabSetting
        },
        {
            id: 'panelstyle',
            title: __('Panel Style', 'gutenverse-pro'),
            initialOpen: false,
            pro: true,
            panelArray: itemPanel,
            tabRole: TabStyle
        },
        {
            id: 'liststyle',
            title: __('List Style', 'gutenverse-pro'),
            initialOpen: false,
            pro: true,
            panelArray: itemListStylePanel,
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
    ]
};
