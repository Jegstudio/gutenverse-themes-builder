import { addFilter } from '@wordpress/hooks';
import { stickySection } from './parts/panel/stickySection';
import { withAnimationSticky } from './parts/hoc/withAnimationSticky';
import { stickyColumn } from './parts/panel/stickyColumn';
import { stickyFormBuilder } from './parts/panel/stickyFormBuilder';
import apiFetch from '@wordpress/api-fetch';
import { hightlightPanel } from './parts/panel/highlightPanel';
import { transformOptions } from './parts/panel/transformOptions';
import { popupOptions } from './parts/panel/popupOptions';
import { megaMenuPanel } from './parts/blocks/mega-menu/panel-list';
import { megaMenuItemPanel } from './parts/blocks/mega-menu-item/panel-list';
import { textClipOptions } from './parts/panel/textClipOptions';
import { backgroundEffectHoc } from './parts/hoc/withBackgroundEffect';
import { backgroundEffectOption } from './parts/panel/backgroundEffectOptions';
import { withBackgroundEffectScript } from './parts/hoc/withBackgroundEffectScript';

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
                path: 'jeg-theme-essence/v1/jeg-theme-essence-proxy',
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
            'jeg-theme-essence/section.sticky',
            (results, props) => stickySection(results, props),
            9
        );
        addFilter(
            'gutenverse.column.sticky',
            'jeg-theme-essence/column.sticky',
            (results, props) => stickyColumn(results, props),
            9
        );
        addFilter(
            'gutenverse.form-builder.sticky',
            'jeg-theme-essence/form-builder.sticky',
            (results, props) => stickyFormBuilder(results, props),
            9
        );
        addFilter(
            'gutenverse.hoc.sticky-animation',
            'jeg-theme-essence/hoc/sticky-animation',
            (results, props) => withAnimationSticky(results, props),
            9
        );
        addFilter(
            'gutenverse.child-style-control',
            'jeg-theme-essence/highlight-control',
            (results, props) => hightlightPanel(results, props),
            9
        );
        addFilter(
            'gutenverse.transform-options',
            'jeg-theme-essence/transform-options',
            (results, props) => transformOptions(results, props),
            9
        );
        addFilter(
            'gutenverse.popup-builder.options',
            'jeg-theme-essence/popup-builder-options',
            (results, props) => popupOptions(props, results),
            9
        );
        addFilter(
            'gutenverse.mega-menu.panels',
            'jeg-theme-essence/mega-menu-panels',
            (results, props) => megaMenuPanel(props, results),
            9
        );
        addFilter(
            'gutenverse.mega-menu-item.panels',
            'jeg-theme-essence/mega-menu-item-panels',
            (results, props) => megaMenuItemPanel(props, results),
            9
        );
        addFilter(
            'gutenverse.text-clip',
            'jeg-theme-essence/text-clip',
            (results, props) => textClipOptions(results, props),
            9
        );
        addFilter(
            'gutenverse.text-clip',
            'jeg-theme-essence/text-clip',
            (results, props) => textClipOptions(results, props),
            9
        );
        addFilter(
            'gutenverse.background-effect-options',
            'jeg-theme-essence/background-effect-options',
            (result, props) => backgroundEffectOption(result,props),
            9
        );
        addFilter(
            'gutenverse.hoc.background-effect',
            'jeg-theme-essence/background-effect-hoc',
            (result, props) => backgroundEffectHoc(result, props),
            9
        );
        addFilter(
            'gutenverse.hoc.background-effect-script',
            'jeg-theme-essence/background-effect-script',
            (result, props) => withBackgroundEffectScript(result, props),
            9
        );
    }

}
new GutenversePROLiteFilter();
export default GutenversePROLiteFilter;