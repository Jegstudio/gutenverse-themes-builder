import {
    useState,
    useEffect
} from 'react';
import { __ } from '@wordpress/i18n';
import ContentWrapper from './content-wrapper';
import {
    BlockEditorProvider,
    BlockList,
    WritingFlow,
    ObserveTyping,
    BlockEditorKeyboardShortcuts,
    BlockToolbar,
    ButtonBlockAppender,
    BlockNavigationDropdown,
    RichText
} from '@wordpress/block-editor';
import { createBlock, serialize, parse } from '@wordpress/blocks';
import {
    Popover,
    SlotFillProvider,
    DropZoneProvider
} from '@wordpress/components';
import '@wordpress/format-library';
import { __experimentalGetCoreBlocks, registerCoreBlocks } from '@wordpress/block-library';
import { getThemeData, updateOtherData } from '../../../data/api-fetch';

const SUPPORT_BLOCKS = [
    'core/paragraph',
    'core/list',
    'core/list-item',
    'core/missing',
    'core/image',
    'core/code',
];

const supportBlocks = __experimentalGetCoreBlocks().filter(block => {
    return SUPPORT_BLOCKS.includes(block.name);
});

registerCoreBlocks(supportBlocks);

const ManageNotice = () => {
    const [loading, setLoading] = useState(false);
    const [blocks, setBlocks] = useState([createBlock('core/paragraph')]);

    useEffect(() => {
        getThemeData(null, response => {
            if (response?.other?.notice) {
                setBlocks(parse(response?.other?.notice));
            }
        });
    }, []);

    const saveNotice = () => {
        setLoading(true);
        setTimeout(updateOtherData({
            key: 'notice',
            data: serialize(blocks)
        }, () => {
            setLoading(false);
        }), 1000)
        
    };

    return <>
        <ContentWrapper
            title={__('Notice Editor', 'gutenverse-themes-builder')}
            description={__('Edit your current active theme notice content here. This will be built as notification for your theme.', 'gutenverse-themes-builder')}
        >
            <div className="notice-wrapper">
                <div className="notice-input">
                    <div className="editor__body">
                        <SlotFillProvider>
                            <DropZoneProvider>
                                <BlockEditorProvider
                                    value={blocks}
                                    onInput={state => {
                                        setBlocks(state)
                                    }}
                                    onChange={state => {
                                        if (state[state.length - 1]?.name !== 'core/paragraph') {
                                            // Append new paragraph if non-paragraph block is added or deleted.
                                            setBlocks([
                                                ...state,
                                                createBlock('core/paragraph')
                                            ]);
                                        } else {
                                            setBlocks(state)
                                        }
                                    }}>
                                    <div className="editor__toolbar">
                                        <div className="navigation_block">
                                            <BlockNavigationDropdown />
                                        </div>
                                        <BlockToolbar />
                                        <ButtonBlockAppender />
                                    </div>
                                    <div className="editor-styles-wrapper">
                                        <BlockEditorKeyboardShortcuts />
                                        <WritingFlow>
                                            <ObserveTyping>
                                                <BlockList
                                                    renderAppender={() => { }}
                                                />
                                            </ObserveTyping>
                                        </WritingFlow>
                                    </div>
                                    <Popover.Slot />
                                </BlockEditorProvider>
                            </DropZoneProvider>
                        </SlotFillProvider>
                    </div>
                </div>
            </div>
            <div className="data-footer">
                <div className="buttons end">
                    {
                        loading ? <div className="button button-loading padding-12-28" disabled>{__('Loading...', 'gutenverse-themes-builder')}</div> : <button className="button create padding-12-28" onClick={saveNotice}>{__('Save Notice', 'gutenverse-themes-builder')}</button>
                    }
                </div>
            </div>
        </ContentWrapper>
        
    </>;
};

export default ManageNotice;