import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getValueResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getValueUnitPoint, getAttrZIndex, getBlockAttributes } from '../../helper';

export const createDividerBlock = (attrs) => {
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
            value: ({ attrs }) => !isEmpty(attrs?.text) ? 'text' : 'none'
        },
        {
            id: 'width',
            value: ({ attrs }) => getValueResponsive(attrs, 'weight', getValueUnitPoint)
        },
        {
            id: 'gap',
            value: ({ attrs }) => getValueResponsive(attrs, 'gap', getValueUnitPoint)
        },
        {
            id: 'type',
            value: ({ attrs }) => attrs?.style
        },
        {
            id: 'text',
            value: ({ attrs }) => attrs?.text
        },
        {
            id: 'dividerColor',
            value: ({ attrs }) => attrs?.color
        },
    ];

    return createBlock(
        'gutenverse/divider',
        getBlockAttributes(list, attrs)
    );
};
