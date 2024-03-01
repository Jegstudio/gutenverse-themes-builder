import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex } from '../helper';

const pairs = {
    text: 'content',
    typography_typography: 'typography',
    button_text_color: 'color'
};

export const createButtonBlock = (attrs, inner) => {
    const params = {
        attrs,
        prefix: '_'
    };
    const attributes = {
        ...getAttrBackground(params),
        ...getAttrMargin(params),
        ...getAttrPadding(params),
        ...getAttrPositioning(params),
        ...getAttrZIndex(params),
        ...getAttrBackground({
            attrs,
            name:  'buttonBackground',
        }),
        ...getAttrBorder({
            attrs,
            name: 'buttonBorder'
        }),
        ...getAttrBorderResponsive({
            attrs,
            name: 'buttonBorderResponsive'
        }),
        ...getAttrPadding({
            attrs,
            name: 'paddingButton',
            prefix: 'text_'
        })
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/button',
        attributes,
        inner
    );
};
