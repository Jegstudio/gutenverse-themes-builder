import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getBackground, getBorder, getMargin, getPadding } from '../helper';

const pairs = {};

export const createColumnBlock = (attrs, inner) => {
    const attributes = {
        ...getBackground(attrs),
        ...getBorder(attrs),
        ...getMargin(attrs, true),
        ...getPadding(attrs, true),
        width: {
            Desktop: attrs?._column_size
        }
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/column',
        attributes,
        inner
    );
};
