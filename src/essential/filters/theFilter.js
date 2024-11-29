import { addFilter } from '@wordpress/hooks';
import { stickySection } from './parts/panel/stickySection';
import { withAnimationSticky } from './parts/hoc/withAnimationSticky';
import { stickyColumn } from './parts/panel/stickyColumn';
import { stickyFormBuilder } from './parts/panel/stickyFormBuilder';
import { hightlightPanel } from './parts/panel/highlightPanel';
import { transformOptions } from './parts/panel/transformOptions';
import { popupOptions } from './parts/panel/popupOptions';
import { megaMenuPanel } from './parts/blocks/mega-menu/panel-list';
import { megaMenuItemPanel } from './parts/blocks/mega-menu-item/panel-list';
import { textClipOptions } from './parts/panel/textClipOptions';
import { backgroundEffectHoc } from './parts/hoc/withBackgroundEffect';
import { backgroundEffectOption } from './parts/panel/backgroundEffectOptions';
import { withBackgroundEffectScript } from './parts/hoc/withBackgroundEffectScript';
import { advanceTabPanel } from './parts/blocks/advance-tab/panel-list';

export const addGutenverseFilter = () => {
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
        'gutenverse.advance-tabs-panel',
        'gutenverse-essence/advance-tabs-panel',
        (results, props) => advanceTabPanel(props, results),
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