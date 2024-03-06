import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes } from '../../helper';

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
        }
    ];

    return createBlock(
        'gutenverse/column',
        getBlockAttributes(list, attrs),
        innerBlocks
    );
};
