import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getBackground, getBorder, getMargin, getPadding } from '../helper';

const pairs = {};

export const createSectionBlock = (attrs, inner, id) => {
    const attributes = {
        ...getBackground(attrs),
        ...getBorder(attrs),
        ...getMargin(attrs, true),
        ...getPadding(attrs, true),
        layout: attrs?.layout === 'full_width' ? 'fullwidth' : 'boxed',
        gap: attrs?.gap,
        width: attrs?.content_width && {
            Desktop: attrs?.content_width?.size
        }
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/section',
        attributes,
        inner
    );
};
