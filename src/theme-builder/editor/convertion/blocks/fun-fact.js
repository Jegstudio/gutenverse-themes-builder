import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getBackground, getBorder, getMargin, getPadding } from '../helper';

const pairs = {};

export const createFunFactBlock = (attrs, inner) => {
    const attributes = {
        ...getBackground(attrs),
        ...getBorder(attrs),
        ...getMargin(attrs),
        ...getPadding(attrs),
        iconType: attrs?.sg_icon_type,
        titleTag: attrs?.sg_setting_html_tag,
        prefix: attrs?.sg_content_number_prefix,
        number: attrs?.sg_content_number,
        suffix: attrs?.sg_content_number_suffix,
        title: attrs?.sg_content_title,
        showSupper: attrs?.sg_setting_enable_super === 'yes',
        supper: attrs?.sg_content_super
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/fun-fact',
        attributes,
        inner
    );
};
