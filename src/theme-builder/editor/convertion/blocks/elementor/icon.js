import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getValueResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getValueUnitPoint, getAttrZIndex, getValueIcon, getBlockAttributes, getValueRange, getAttrBoxShadow } from '../../helper';

export const createIconBlock = (attrs) => {
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
            id: 'iconSize',
            value: ({ attrs }) => getValueResponsive(attrs, 'size', getValueUnitPoint)
        },
        {
            id: 'iconPadding',
            value: ({ attrs }) => getValueResponsive(attrs, 'icon_padding', getValueRange)
        },
        {
            id: 'icon',
            value: ({ attrs }) => getValueIcon(attrs, 'selected_icon')
        },
        {
            id: 'iconColorOne',
            value: ({ attrs }) => attrs?.primary_color
        },
        {
            id: 'iconColorTwo',
            value: ({ attrs }) => attrs?.secondary_color
        },
        {
            id: 'iconShape',
            value: ({ attrs }) => attrs?.shape
        },
    ];

    return createBlock(
        'gutenverse/icon',
        getBlockAttributes(list, attrs)
    );
};
