import { __ } from '@wordpress/i18n';
import { menuPanel } from '../../../../editor/blocks/mega-menu-item/panels/panel-menu';
import { panelPanel } from '../../../../editor/blocks/mega-menu-item/panels/panel-panel';
import { itemListStylePanel } from '../../../../editor/blocks/mega-menu-item/panels/panel-item-list-style';
import { TabStyle } from 'gutenverse-core/controls';
import { itemPanel } from '../../../../editor/blocks/mega-menu-item/panels/panel-item-panel';

export const megaMenuItemPanel = (props, result) => {
    result[
        result.findIndex(el => el.id === 'menu')
    ] = {
        pro: true,
        title: __('Menu', 'gutenverse-pro'),
        panelArray: menuPanel
    };

    result[
        result.findIndex(el => el.id === 'panel')
    ] = {
        pro: true,
        title: __('Panel', 'gutenverse-pro'),
        panelArray: panelPanel
    };

    result[
        result.findIndex(el => el.id === 'panelstyle')
    ] = {
        pro: true,
        title: __('Item Panel', 'gutenverse-pro'),
        panelArray: itemPanel,
        initialOpen: false,
        tabRole: TabStyle
    };

    result[
        result.findIndex(el => el.id === 'liststyle')
    ] = {
        pro: true,
        title: __('Menu List Style', 'gutenverse-pro'),
        panelArray: itemListStylePanel,
        initialOpen: false,
        tabRole: TabStyle
    };

    return result;
};