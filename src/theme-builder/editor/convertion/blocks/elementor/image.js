import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrBoxShadow, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes, getValueImage, getValueResponsive, getValueUnitPoint } from '../../helper';

export const createImageBlock = (attrs) => {
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
            id: 'imgBorder',
            prefix: 'image_',
            value: getAttrBorder
        },
        {
            id: 'imgBorderResponsive',
            prefix: 'image_',
            value: getAttrBorderResponsive
        },
        {
            id: 'imgSrc',
            value: ({ attrs }) => getValueImage(attrs, 'image')
        },
        {
            id: 'width',
            value: ({ attrs }) => getValueResponsive(attrs, 'width', getValueUnitPoint)
        }
    ];

    return createBlock(
        'gutenverse/image',
        getBlockAttributes(list, attrs)
    );
};
