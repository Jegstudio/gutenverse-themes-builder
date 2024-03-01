import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getValueResponsive, getValueUnitPoint } from '../helper';

const pairs = {};

export const createImageBlock = (attrs) => {
    const params = {
        attrs,
        prefix: '_'
    };
    const attributes = {
        ...getAttrBackground(params),
        ...getAttrBorder(params),
        ...getAttrBorderResponsive(params),
        ...getAttrMargin(params),
        ...getAttrPadding(params),
        ...getAttrPositioning(params),
        ...getAttrZIndex(params),
        ...getAttrBorder({
            attrs,
            name: 'imgBorder',
            prefix: 'image_'
        }),
        ...getAttrBorderResponsive({
            attrs,
            name: 'imgBorderResponsive',
            prefix: 'image_'
        }),
        imgSrc: {
            media: {
                imageId: attrs?.image?.id,
                sizes: {
                    full: attrs?.image
                }
            }
        },
        width: getValueResponsive(attrs, 'width', getValueUnitPoint)
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/image',
        attributes
    );
};
