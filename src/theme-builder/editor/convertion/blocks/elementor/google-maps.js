import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes, getValueRange } from '../../helper';

export const createGoogleMapsBlock = (attrs) => {
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
            id: 'zoom',
            value: ({ attrs }) => getValueRange(attrs, 'zoom')
        },
        {
            id: 'height',
            value: ({ attrs }) => getValueRange(attrs, 'height')
        },
        {
            id: 'location',
            value: ({ attrs }) => attrs?.address
        }
    ];

    return createBlock(
        'gutenverse/google-maps',
        getBlockAttributes(list, attrs)
    );
};
