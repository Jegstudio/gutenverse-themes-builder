import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrBoxShadow, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes } from '../../helper';

export const createColumnBlock = (attrs, innerBlocks) => {
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
            id: 'boxShadow',
            value: getAttrBoxShadow
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
            id: 'width',
            value: ({ attrs }) => ({
                Desktop: attrs?._inline_size ? attrs?._inline_size : attrs?._column_size
            })
        },
        {
            id: 'horizontalAlign',
            value: ({ attrs }) => ({
                Desktop: attrs?.align
            })
        },
        {
            id: 'verticalAlign',
            value: ({ attrs }) => ({
                Desktop: attrs?.content_position
            })
        }
    ];

    return createBlock(
        'gutenverse/column',
        getBlockAttributes(list, attrs),
        innerBlocks
    );
};
