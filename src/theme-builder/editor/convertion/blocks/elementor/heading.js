import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrBoxShadow, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes } from '../../helper';

export const createHeadingBlock = (attrs) => {
    const list = [
        {
            id: 'background',
            prefix: '_',
            value: getAttrBackground
        },
        {
            id: 'border',
            prefix: '_',
            value: getAttrBorder
        },
        {
            id: 'borderResponsive',
            prefix: '_',
            value: getAttrBorderResponsive
        },
        {
            id: 'boxShadow',
            prefix: '_',
            value: getAttrBoxShadow
        },
        {
            id: 'margin',
            prefix: '_',
            value: getAttrMargin
        },
        {
            id: 'padding',
            prefix: '_',
            value: getAttrPadding
        },
        {
            id: 'zIndex',
            prefix: '_',
            value: getAttrZIndex
        },
        {
            id: 'positioning',
            prefix: '_',
            multi: true,
            value: getAttrPositioning
        },
        {
            id: 'content',
            value: ({ attrs }) => attrs?.title
        },
        {
            id: 'color',
            value: ({ attrs }) => attrs?.title_color
        },
        {
            id: 'typography',
            value: ({ attrs }) => attrs?.typography_typography
        }
    ];

    return createBlock(
        'gutenverse/heading',
        getBlockAttributes(list, attrs)
    );
};
