import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, borderPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, transformPanel, conditionPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';
import { itemsPanel } from './panel-items';
import { contentStyle } from './panel-tab-content';
import { iconStylePanel } from './panel-icon-style';
import { contentPanel } from './panel-content';
import { tabTitleStyle } from './panel-tab-title';
import { tabTitleWrapperStyle } from './panel-tab-title-wrapper';
import { tabTitlesWrapperStyle } from './panel-tab-titles-wrapper';
import { tabMobile } from './panel-tab-mobile';
import { iconMobileStylePanel } from './panel-icon-mobile-style';
import { tabMobileOptions } from './panel-tab-mobile-options';

export const panelList = () => {
    return applyFilters(
        'gutenverse.advance-tabs-panel',
        [
            {
                id: 'content',
                title: __('Content', 'gutenverse-pro'),
                initialOpen: true,
                pro: true,
                panelArray: contentPanel,
                tabRole: TabSetting
            },
            {
                id: 'heading-items',
                title: __('Heading Items', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: itemsPanel,
                tabRole: TabSetting
            },
            {
                id: 'tabTitlesWrapperStyle',
                title: __('Tab Titles Wrapper Style ', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: tabTitlesWrapperStyle,
                tabRole: TabStyle
            },
            {
                id: 'tabTitleWrapperStyle',
                title: __('Tab Title Wrapper Style ', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: tabTitleWrapperStyle,
                tabRole: TabStyle
            },
            {
                id: 'tabTitleStyle',
                title: __('Tab Title Style ', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: tabTitleStyle,
                tabRole: TabStyle
            },
            {
                id: 'heading-icon-style',
                title: __('Tab Icon Style', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: iconStylePanel,
                tabRole: TabStyle,
            },
            {
                id: 'contentStyle',
                title: __('Tab Content Style ', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: contentStyle,
                tabRole: TabStyle
            },
            {
                id: 'tabMobile',
                title: __('Tab Responsive Style ', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: tabMobile,
                tabRole: TabStyle
            },
            {
                id: 'tabIconMobile',
                title: __('Tab Icon Responsive Style ', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: iconMobileStylePanel,
                tabRole: TabStyle
            },
            {
                id: 'tabIconMobileOptions',
                title: __('Tab Responsive Options Style ', 'gutenverse-pro'),
                initialOpen: false,
                pro: true,
                panelArray: tabMobileOptions,
                tabRole: TabStyle
            },
            {
                title: __('Border', 'gutenverse-pro'),
                initialOpen: false,
                panelArray: (props) => borderPanel({
                    ...props,
                    styleId: 'tab-border'
                }),
                tabRole: TabStyle
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
                panelArray: responsivePanel,
                tabRole: TabSetting
            },
            {
                title: __('Positioning', 'gutenverse-pro'),
                initialOpen: false,
                panelArray: (props) => {
                    return positioningPanel({
                        ...props,
                        inFlex: props.orientation !== 'vertical',
                        options: [
                            {
                                value: 'default',
                                label: 'Default'
                            },
                            {
                                value: 'full',
                                label: 'Full Width (100%)'
                            },
                            {
                                value: 'custom',
                                label: 'Custom'
                            }
                        ]
                    });
                },
                tabRole: TabSetting
            },
            {
                title: __('Animation Effects', 'gutenverse-pro'),
                initialOpen: false,
                panelArray: (props) => animationPanel({
                    ...props,
                    styleId: 'tab-animation'
                }),
                tabRole: TabSetting
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
                    styleId: 'tab-advance',
                }),
                tabRole: TabSetting
            },
            {
                title: __('Condition', 'gutenverse'),
                panelArray: conditionPanel,
                initialOpen: false,
                pro: true
            },
        ]
    );
};