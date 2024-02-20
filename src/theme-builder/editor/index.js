import { createBlock } from '@wordpress/blocks';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { dispatch } from '@wordpress/data';
import { useEffect, useState, createPortal } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import isEmpty from 'lodash/isEmpty';
import { getEditSiteHeader } from 'gutenverse-core/editor-helper';
import { getAttributes } from './convertion/helper';
import { createHeadingBlock } from './convertion/blocks/heading';

const contentLoop = (elements) => {
    let blocks = elements.map(element => {
        let inner = [];

        if (!isEmpty(element?.isInner) || '' === element?.isInner) {
            inner = contentLoop(element?.elements);
        }

        const attr = getAttributes(element);

        if ('widget' === element?.elType) {
            switch (element?.widgetType) {
                case 'heading':
                    return createHeadingBlock(attr, inner);
                case 'accordion':
                    return createBlock('gutenverse/accordion', {}, inner);
                case 'button':
                    return createBlock('gutenverse/accordion', {}, inner);
                case 'divider':
                    return createBlock('gutenverse/divider', {}, inner);
                case 'icon':
                    return createBlock('gutenverse/icon', {}, inner);
                case 'icon-list':
                    return createBlock('gutenverse/icon-list', {}, inner);
                case 'image':
                    return createBlock('gutenverse/image', {
                        imgSrc: {
                            media: {
                                imageId: attr?.image?.id,
                                sizes: {
                                    full: attr?.image
                                }
                            }
                        }
                    }, inner);
                case 'spacer':
                    return createBlock('gutenverse/spacer', {}, inner);
                case 'text-editor':
                    return createBlock('gutenverse/text-editor', {}, inner);
                case 'jkit_heading':
                    return createBlock('gutenverse/advanced-heading', {}, inner);
                default:
                    return createBlock('core/paragraph', {}, inner);
            }
        } else if ('section' === element?.elType) {
            return createBlock('gutenverse/section', {}, inner);
        } else if ('column' === element?.elType) {
            return createBlock('gutenverse/column', {
                width: {
                    Desktop: attr?._column_size
                }
            }, inner);
        } else {
            return createBlock('core/group', {}, inner);
        }
    });

    return blocks;
};

const ExtraComponent = () => {
    const [fileData, setFileData] = useState({});
    const [injectLocation, setInjectLocation] = useState(null);

    useEffect(() => {
        getEditSiteHeader().then(result => {
            setInjectLocation(result);
        });
    }, []);

    const convertElements = (jsonData) => {
        if (!isEmpty(jsonData?.content)) {
            const blocks = contentLoop(jsonData?.content);
            dispatch('core/block-editor').insertBlocks(blocks, 0);
        }
    };

    useEffect(() => {
        if (fileData?.id && fileData?.url) {
            fetch(fileData?.url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch file. Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(jsonData => {
                    convertElements(jsonData);
                })
                .catch(error => {
                    console.error('Error fetching file:', error); // eslint-disable-line no-console
                });
        }
    }, [fileData]);

    return injectLocation && createPortal(
        <MediaUploadCheck>
            <MediaUpload
                onSelect={(media) => setFileData({
                    id: media.id,
                    url: media.url
                })}
                value={null}
                render={({ open }) => {
                    return <div className="gutenverse-top-button">
                        <div className="gutenverse-library-button" id={'gutenverse-library-button'} onClick={open}>
                            {__('Import from Template Kit', '--gctd--')}
                        </div>
                    </div>;
                }} />
        </MediaUploadCheck>,
        injectLocation
    );
};

addFilter(
    'gutenverse.site.editor.content',
    'gutenverse/site/editor/content',
    (content) => {
        return <>
            {content}
            <ExtraComponent />
        </>;
    }
);