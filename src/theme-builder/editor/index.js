import { createBlock } from '@wordpress/blocks';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { dispatch } from '@wordpress/data';
import { useEffect, useState, createPortal } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import isEmpty from 'lodash/isEmpty';
import { getEditSiteHeader } from 'gutenverse-core/editor-helper';
import { getAttributes } from './convertion/helper';
import { createHeadingBlock } from './convertion/blocks/elementor/heading';
import { createSectionBlock } from './convertion/blocks/elementor/section';
import { createColumnBlock } from './convertion/blocks/elementor/column';
import { createImageBlock } from './convertion/blocks/elementor/image';
import { createButtonBlock } from './convertion/blocks/elementor/button';
import { createIconBlock } from './convertion/blocks/elementor/icon';
import { createJkitFunFactBlock } from './convertion/blocks/jkit/jkit-fun-fact';
import { createIconBoxBlock } from './convertion/blocks/elementor/icon-box';
import { createIconListBlock } from './convertion/blocks/elementor/icon-list';
import { createJkitHeadingBlock } from './convertion/blocks/jkit/jkit-heading';
import { createSpacerBlock } from './convertion/blocks/elementor/spacer';
import { createTextEditorBlock } from './convertion/blocks/elementor/text-editor';
import { createTestimonialsBlock } from './convertion/blocks/testimonials';
import { createJkitTeamBlock } from './convertion/blocks/jkit/jkit-team';
import { createDividerBlock } from './convertion/blocks/elementor/divider';
import { createJkitImageBoxBlock } from './convertion/blocks/jkit/jkit-image-box';
import { createProgressBarBlock } from './convertion/blocks/progress-bar';
import { createGoogleMapsBlock } from './convertion/blocks/elementor/google-maps';
import { createAccordionsBlock } from './convertion/blocks/accordions';
import { createJkitNavMenuBlock } from './convertion/blocks/jkit/jkit-nav-menu';
import { createJkitIconBoxBlock } from './convertion/blocks/jkit/jkit-icon-box';

const wrapperElements = [
    'section',
    'column'
];

const convertWidget = (type, attrs, inner) => {
    switch (type) {
        // Done
        // normal
        case 'button':
            return createButtonBlock(attrs);
        case 'divider':
            return createDividerBlock(attrs);
        case 'google_maps':
            return createGoogleMapsBlock(attrs);
        case 'heading':
            return createHeadingBlock(attrs);
        case 'icon':
            return createIconBlock(attrs, inner);
        case 'icon-box':
            return createIconBoxBlock(attrs, inner);
        case 'icon-list':
            return createIconListBlock(attrs);
        case 'image':
            return createImageBlock(attrs);
        case 'spacer':
            return createSpacerBlock(attrs);
        case 'text-editor':
            return createTextEditorBlock(attrs);

        // jkit
        case 'jkit_fun_fact':
            return createJkitFunFactBlock(attrs);
        case 'jkit_heading':
            return createJkitHeadingBlock(attrs);
        case 'jkit_icon_box':
            return createJkitIconBoxBlock(attrs);
        case 'jkit_image_box':
            return createJkitImageBoxBlock(attrs);
        case 'jkit_nav_menu':
            return createJkitNavMenuBlock(attrs);
        case 'jkit_team':
            return createJkitTeamBlock(attrs);

        //In Progress
        case 'accordion':
            return createAccordionsBlock(attrs);
        // case 'jkit_video_button':
        //     return createButtonBlock(attrs);
        // case 'image-box':
        //     return createJkitImageBoxBlock(attrs);
        case 'progress-bar':
        case 'jkit_progress_bar':
            return createProgressBarBlock(attrs);
        case 'jkit_testimonials':
            return createTestimonialsBlock(attrs);

        // Todo
        case 'gallery':
        case 'jkit_gallery':
            return createBlock('gutenverse/gallery', {}, inner);
        case 'rating':
            return createBlock('gutenverse/rating', {}, inner);
        case 'social-icons':
            return createBlock('gutenverse/social-icons', {}, inner);
        case 'tabs':
        case 'jkit_tabs':
            return createBlock('gutenverse/tabs', {}, inner);
        case 'video':
            return createBlock('gutenverse/video', {}, inner);
        case 'jkit_client_logo':
            return createBlock('gutenverse/logo-slider', {}, inner);
        case 'jkit_dual_button':
            return createBlock('gutenverse/buttons', {}, inner);
        case 'jkit_social_share':
            return createBlock('gutenverse/social-share', {}, inner);
        case 'jkit_post_author':
            return createBlock('gutenverse/post-author', {}, inner);
        case 'jkit_post_block':
            return createBlock('gutenverse/post-block', {}, inner);
        case 'jkit_post_comment':
            return createBlock('gutenverse/post-comment', {}, inner);
        case 'jkit_post_content':
            return createBlock('gutenverse/post-content', {}, inner);
        case 'jkit_post_date':
            return createBlock('gutenverse/post-date', {}, inner);
        case 'jkit_post_excerpt':
            return createBlock('gutenverse/post-excerpt', {}, inner);
        case 'jkit_post_featured_image':
            return createBlock('gutenverse/post-featured-image', {}, inner);
        case 'jkit_post_list':
            return createBlock('gutenverse/post-list', {}, inner);
        case 'jkit_post_terms':
            return createBlock('gutenverse/post-terms', {}, inner);
        case 'jkit_post_title':
            return createBlock('gutenverse/post-title', {}, inner);
        default:
            return createBlock('core/paragraph', {}, inner);
    }
};

const convertWrapper = (type, attrs, inner) => {
    switch (type) {
        case 'section':
            return createSectionBlock(attrs, inner);
        case 'column':
            return createColumnBlock(attrs, inner);
        default:
            return createBlock('core/paragraph', {}, inner);
    }
};

const contentLoop = (elements) => {
    const blocks = elements.map(element => {
        let inner = [];

        if (!isEmpty(element?.isInner) || '' === element?.isInner || wrapperElements.includes(element?.elType)) {
            inner = contentLoop(element?.elements);
        }

        const attrs = getAttributes(element);

        switch (element?.elType) {
            case 'widget':
                return convertWidget(element?.widgetType, attrs, inner);
            default:
                return convertWrapper(element?.elType, attrs, inner);
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
