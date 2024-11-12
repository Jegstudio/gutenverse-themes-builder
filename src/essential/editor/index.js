import { getBlockType, registerBlockType, getCategories } from '@wordpress/blocks';
import { isBlockActive } from 'gutenverse-core/helper';
import { updateBlockList } from 'gutenverse-core/editor-helper';

const registerBlocks = () => {
    const r = require.context('./blocks', true, /index\.js$/);

    r.keys().forEach(key => {
        const { settings, metadata, name } = r(key);
        name && updateBlockList({ name, settings, metadata },true);

        if (window?.GutenverseConfig && name && !getBlockType(name) && isBlockActive(name)) {
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