import { getBlockType, registerBlockType, getCategories } from '@wordpress/blocks';
import { isBlockActive } from 'gutenverse-core/helper';
import { updateBlockList } from 'gutenverse-core/editor-helper';

const registerBlocks = () => {
    const r = require.context('../../../gutenverse-extend/src/pro/editor/blocks', true, /index\.js$/);
    const essentialBlocks = ['gutenverse/mega-menu', 'gutenverse/mega-menu-item', 'gutenverse-pro/advance-tabs', 'gutenverse/advance-tab'];
    r.keys().forEach(key => {
        const { settings, metadata, name } = r(key);
        name && updateBlockList({ name, settings, metadata },true);

        if (window?.GutenverseConfig && name && !getBlockType(name) && isBlockActive(name) && essentialBlocks.includes(name) ) {
            // Only load blocks if the companion plugin active and category exist.
            getCategories()?.filter(category => {
                if (category?.slug && category?.slug === metadata?.category) {
                    registerBlockType(name, {
                        ...settings,
                        ...metadata
                    });
                }
            });
        }
    });

};

(() => {
    registerBlocks();
})();