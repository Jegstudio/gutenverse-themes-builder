import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes, getValueResponsive, getValueUnitPoint } from '../../helper';

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
            value: ({ attrs }) => ({
                media: {
                    imageId: attrs?.image?.id,
                    sizes: {
                        full: attrs?.image
                    }
                }
            })
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
