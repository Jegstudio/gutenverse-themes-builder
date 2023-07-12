import { getBlockType, registerBlockType } from '@wordpress/blocks';
import { isBlockActive, updateBlockList } from 'gutenverse-core/helper';

const registerBlocks = () => {
    const block = require.context('./pattern-wrapper', true, /index\.js$/);

    block.keys().forEach(key => {
        const { settings, metadata, name } = block(key);

        name && updateBlockList({ name, settings, metadata });

        if (window?.GutenverseConfig && name && !getBlockType(name) && isBlockActive(name)) {
            registerBlockType(name, {
                ...settings,
                ...metadata
            });
        }
    });
};

(() => {
    registerBlocks();
})();
