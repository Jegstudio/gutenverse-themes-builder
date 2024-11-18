
import { __ } from '@wordpress/i18n';
import { TabStyle } from 'gutenverse-core/controls';
import { contentPanel } from '../../../../editor/blocks/advance-tabs/panels/panel-content';
import { iconMobileStylePanel } from '../../../../editor/blocks/advance-tabs/panels/panel-icon-mobile-style';
import { iconStylePanel } from '../../../../editor/blocks/advance-tabs/panels/panel-icon-style';
import { itemsPanel } from '../../../../editor/blocks/advance-tabs/panels/panel-items';
import { contentStyle } from '../../../../editor/blocks/advance-tabs/panels/panel-tab-content';
import { tabMobile } from '../../../../editor/blocks/advance-tabs/panels/panel-tab-mobile';
import { tabMobileOptions } from '../../../../editor/blocks/advance-tabs/panels/panel-tab-mobile-options';
import { tabTitleStyle } from '../../../../editor/blocks/advance-tabs/panels/panel-tab-title';
import { tabTitleWrapperStyle } from '../../../../editor/blocks/advance-tabs/panels/panel-tab-title-wrapper';
import { tabTitlesWrapperStyle } from '../../../../editor/blocks/advance-tabs/panels/panel-tab-titles-wrapper';

export const panelData = (props, def, result) => {
    result[
        result.findIndex(el => el.id === 'content')
    ] = {
        id: 'content',
        pro: true,
        title: __('Content', 'gutenverse-pro'),
        panelArray: contentPanel
    };

    result[
        result.findIndex(el => el.id === 'heading-items')
    ] = {
        id: 'heading-items',
        pro: true,
        title: __('Tab Heading Items', 'gutenverse-pro'),
        panelArray: itemsPanel
    };
    result[
        result.findIndex(el => el.id === 'heading-icon-style')
    ] = {
        id: 'heading-icon-style',
        pro: true,
        title: __('Tab Icon Style', 'gutenverse-pro'),
        panelArray: iconStylePanel,
        tabRole: TabStyle
    };
    result[
        result.findIndex(el => el.id === 'contentStyle')
    ] = {
        id: 'contentStyle',
        pro: true,
        title: __('Tab Content Style', 'gutenverse-pro'),
        panelArray: contentStyle,
        tabRole: TabStyle
    };
    result[
        result.findIndex(el => el.id === 'tabTitleStyle')
    ] = {
        id: 'tabTitleStyle',
        pro: true,
        title: __('Tab Title Style', 'gutenverse-pro'),
        panelArray: tabTitleStyle,
        tabRole: TabStyle
    };
    result[
        result.findIndex(el => el.id === 'tabTitleWrapperStyle')
    ] = {
        id: 'tabTitleWrapperStyle',
        pro: true,
        title: __('Tab Title Wrapper Style', 'gutenverse-pro'),
        panelArray: tabTitleWrapperStyle,
        tabRole: TabStyle
    };
    result[
        result.findIndex(el => el.id === 'tabTitlesWrapperStyle')
    ] = {
        id: 'tabTitlesWrapperStyle',
        pro: true,
        title: __('Tab Titles Wrapper Style', 'gutenverse-pro'),
        panelArray: tabTitlesWrapperStyle,
        tabRole: TabStyle
    };
    result[
        result.findIndex(el => el.id === 'tabMobile')
    ] = {
        id: 'tabMobile',
        pro: true,
        title: __('Tab Mobile Style', 'gutenverse-pro'),
        panelArray: tabMobile,
        tabRole: TabStyle
    };
    result[
        result.findIndex(el => el.id === 'tabIconMobile')
    ] = {
        id: 'tabIconMobile',
        pro: true,
        title: __('Tab Icon Mobile Style', 'gutenverse-pro'),
        panelArray: iconMobileStylePanel,
        tabRole: TabStyle
    };
    result[
        result.findIndex(el => el.id === 'tabIconMobileOptions')
    ] = {
        id: 'tabIconMobileOptions',
        pro: true,
        title: __('Tab Mobile Options Style', 'gutenverse-pro'),
        panelArray: tabMobileOptions,
        tabRole: TabStyle
    };

    return result;
};