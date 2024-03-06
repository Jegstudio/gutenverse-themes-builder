import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes } from '../../helper';

export const createSectionBlock = (attrs, innerBlocks) => {
    const list = [
        {
            id: 'background',
            value: getAttrBackground
        },
        {
            id: 'border',
            value: getAttrBorder
        },
        {
            id: 'borderResponsive',
            value: getAttrBorderResponsive
        },
        {
            id: 'margin',
            value: getAttrMargin
        },
        {
            id: 'padding',
            value: getAttrPadding
        },
        {
            id: 'zIndex',
            value: getAttrZIndex
        },
        {
            id: 'positioning',
            multi: true,
            value: getAttrPositioning
        },
        {
            id: 'gap',
            value: ({ attrs }) => attrs?.gap
        },
        {
            id: 'layout',
            value: ({ attrs }) => attrs?.layout === 'full_width' ? 'fullwidth' : 'boxed'
        },
        {
            id: 'width',
            value: ({ attrs }) => attrs?.content_width && {
                Desktop: attrs?.content_width?.size
            }
        }
    ];

    return createBlock(
        'gutenverse/section',
        getBlockAttributes(list, attrs),
        innerBlocks
    );
};
