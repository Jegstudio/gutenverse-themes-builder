import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getBackground, getBorder, getMargin, getPadding } from '../helper';

const pairs = {};

export const createImageBlock = (attrs, inner) => {
    const attributes = {
        ...getBackground(attrs),
        ...getBorder(attrs),
        ...getMargin(attrs),
        ...getPadding(attrs),
        imgSrc: {
            media: {
                imageId: attrs?.image?.id,
                sizes: {
                    full: attrs?.image
                }
            }
        }
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/image',
        attributes,
        inner
    );
};
