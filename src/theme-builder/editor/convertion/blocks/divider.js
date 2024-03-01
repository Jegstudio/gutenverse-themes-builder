import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getValueResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getValueUnitPoint, getAttrZIndex } from '../helper';

const pairs = {
    style: 'type',
    text: 'text',
    color: 'dividerColor'
};

export const createDividerBlock = (attrs) => {
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
        content: !isEmpty(attrs?.text) ? 'text' : 'none',
        width: getValueResponsive(attrs, 'weight', getValueUnitPoint),
        gap: getValueResponsive(attrs, 'gap', getValueUnitPoint)
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/divider',
        attributes
    );
};
