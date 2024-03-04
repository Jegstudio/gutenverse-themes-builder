import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getValueIcon } from '../helper';

const pairs = {
    title_text: 'title',
    description_text: 'description',
    title_typography_typography: 'titleTypography',
    description_typography_typography: 'descTypography',
    title_color: 'titleColor',
    description_color: 'descColor',
    position: 'iconPosition'
};

export const createIconBoxBlock = (attrs, inner) => {
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
        icon: getValueIcon(attrs, 'selected_icon')
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/icon-box',
        attributes,
        inner
    );
};
