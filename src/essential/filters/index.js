import { addFilter } from '@wordpress/hooks';
import apiFetch from '@wordpress/api-fetch';
import { stickyData as stickySection } from '../../../gutenverse-server/src/pro/filters/part/sticky-section-option';
import { withAnimationSticky } from '../../../gutenverse-extend/src/pro/hoc/with-animation-sticky';
import { stickyData as stickyColumn } from '../../../gutenverse-server/src/pro/filters/part/sticky-column-option';
import { stickyData as stickyFormBuilder } from '../../../gutenverse-server/src/pro/filters/part/sticky-form-builder-option';
import { panelChildStyle as highlightPanel } from '../../../gutenverse-server/src/pro/filters/part/child-style-control';
import { transformData as transformOptions } from '../../../gutenverse-server/src/pro/filters/part/transform-option';
import { popupOptions } from './parts/panel/popupOptions';
import { panelData as megaMenuPanel } from '../../../gutenverse-server/src/pro/filters/part/panels/mega-menu/panel-list';
import { panelData as megaMenuItemPanel } from '../../../gutenverse-server/src/pro/filters/part/panels/mega-menu-item/panel-list';
import { panelData as advanceTabsPanel } from '../../../gutenverse-server/src/pro/filters/part/panels/advance-tabs/panel-list';
import { textClipOptions } from '../../../gutenverse-server/src/pro/filters/part/text-clip-option';
import { backgroundEffectHoc } from '../../../gutenverse-server/src/pro/filters/part/hoc/background-effect';
import { backgroundEffectData as backgroundEffectOption } from '../../../gutenverse-server/src/pro/filters/part/background-effect-option';
import { withBackgroundEffectScript } from '../../../gutenverse-extend/src/pro/hoc/with-background-effect-script';

class GutenversePROLiteFilter {
    constructor() {
        const {
            plugins, license, domainURL, api
        } = window['GutenverseConfig'];
        const checkActive = plugins['gutenverse-pro'] ? plugins['gutenverse-pro'].active : false;
        if( ! checkActive || ! license ){
            this.addGutenverseFilter();
        }else{
            apiFetch({
                path: 'gutenverse-essence/v1/gutenverse-essence-proxy',
                method: 'POST',
                data: {
                    method : 'POST',
                    url : `${api}/wp-json/gutenverse-pro/v1/account/license-validation`,
                    body: {
                        'parameter' : btoa(`${license}&${domainURL}`)
                    }
                }
            }).then((res) => {
            }).catch(() => {
                this.addGutenverseFilter();
            });
        }
    }

    addGutenverseFilter(){
        addFilter(
            'gutenverse.section.sticky',
            'gutenverse-essence/section.sticky',
            (results, props) => stickySection(results, props),
            9
        );
        addFilter(
            'gutenverse.column.sticky',
            'gutenverse-essence/column.sticky',
            (results, props) => stickyColumn(results, props),
            9
        );
        addFilter(
            'gutenverse.form-builder.sticky',
            'gutenverse-essence/form-builder.sticky',
            (results, props) => stickyFormBuilder(results, props),
            9
        );
        addFilter(
            'gutenverse.hoc.sticky-animation',
            'gutenverse-essence/hoc/sticky-animation',
            (results, props) => withAnimationSticky(results, props),
            9
        );
        addFilter(
            'gutenverse.child-style-control',
            'gutenverse-essence/highlight-control',
            (results, props) => hightlightPanel(results, props),
            9
        );
        addFilter(
            'gutenverse.transform-options',
            'gutenverse-essence/transform-options',
            (results, props) => transformOptions(results, props),
            9
        );
        addFilter(
            'gutenverse.popup-builder.options',
            'gutenverse-essence/popup-builder-options',
            (results, props) => popupOptions(props, results),
            9
        );
        addFilter(
            'gutenverse.mega-menu.panels',
            'gutenverse-essence/mega-menu-panels',
            (results, props) => megaMenuPanel(props, results),
            9
        );
        addFilter(
            'gutenverse.mega-menu-item.panels',
            'gutenverse-essence/mega-menu-item-panels',
            (results, props) => megaMenuItemPanel(props, results),
            9
        );
        addFilter(
            'gutenverse.text-clip',
            'gutenverse-essence/text-clip',
            (results, props) => textClipOptions(results, props),
            9
        );
        addFilter(
            'gutenverse.text-clip',
            'gutenverse-essence/text-clip',
            (results, props) => textClipOptions(results, props),
            9
        );
        addFilter(
            'gutenverse.background-effect-options',
            'gutenverse-essence/background-effect-options',
            (result, props) => backgroundEffectOption(result,props),
            9
        );
        addFilter(
            'gutenverse.hoc.background-effect',
            'gutenverse-essence/background-effect-hoc',
            (result, props) => backgroundEffectHoc(result, props),
            9
        );
        addFilter(
            'gutenverse.hoc.background-effect-script',
            'gutenverse-essence/background-effect-script',
            (result, props) => withBackgroundEffectScript(result, props),
            9
        );
    }

}
new GutenversePROLiteFilter();
export default GutenversePROLiteFilter;