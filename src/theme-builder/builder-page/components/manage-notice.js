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
    const [data, setData] = useState({});

    const selectItem = () => {
        const mediaFrame = wp?.media({
            title: 'Select or Upload Media',
            button: {
                text: 'Select as Banner'
            },
            library: {
                type: [ 'image/jpg', 'image/jpeg', 'image/png' ]
            },
            multiple: false
        });
        mediaFrame.on('select', () =>  {
            const attachment = mediaFrame.state().get('selection').first().toJSON();
            setData({
                ...data,
                banner : {
                    id: attachment?.id,
                    filename: attachment?.filename,
                    url: attachment?.url,
                }
            });
        });
        mediaFrame.open();
    };

    useEffect(() => {
        getThemeData(null, response => {
            if (response?.other?.notice?.updaterNotice) {
                setBlocks(parse(response?.other?.notice?.updaterNotice));
            }
            if (response?.other?.notice?.eventNotice) {
                setData(response?.other?.notice?.eventNotice)
            }
        });
    }, []);

    const saveNotice = () => {
        setLoading(true);
        setTimeout(updateOtherData({
            key: 'notice',
            data: { 
                updaterNotice : serialize(blocks),
                eventNotice : data
            }
        }), 1000)
        setLoading(false);
    };

    return <>
        <ContentWrapper
            title={__('Notice Editor', 'gutenverse-themes-builder')}
            description={__('Edit your current active theme notice content here. This will be built as notification for your theme.', 'gutenverse-themes-builder')}
        >
            <div className="notice-wrapper">
                <h2>{__('Event Notice', 'gutenverse-themes-builder')}</h2>
                <div className="event-notice-wrapper">
                    <div className='media-input-wrapper'>
                        <h3>{__('Event Banner', 'gutenverse-themes-builder')}</h3>
                        <div>
                            {data?.banner && <img className="image-preview" src={data?.banner.url} />}
                        </div><br/>
                        <button className='button' onClick={() => selectItem()}>{__('Choose Image', 'gutenverse-themes-builder')}</button>
                    </div>
                    <div className="input-wrapper">
                        <label >Theme URL</label>
                        <div className="input-inner">
                            <input type="text" placeholder="Theme URL" value={data.url} onChange={(e) => setData({ ...data, url: e.target.value})}/>
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <label >Expired</label>
                        <div className="input-inner">
                            <input type="date" placeholder="Expired Date" value={data.expired} onChange={(e) => setData({ ...data, expired: e.target.value})}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="notice-wrapper">
                <h2>{__('Upgrader Notice', 'gutenverse-themes-builder')}</h2>
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