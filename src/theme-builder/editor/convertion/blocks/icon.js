import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getValueResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getValueUnitPoint, getAttrZIndex, getValueIcon } from '../helper';

const pairs = {
    primary_color: 'iconColorOne',
    secondary_color: 'iconColorTwo',
    shape: 'iconShape',
};

export const createIconBlock = (attrs) => {
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
        iconSize: getValueResponsive(attrs, 'size', getValueUnitPoint),
        iconPadding: getValueResponsive(attrs, 'icon_padding', () => attrs?.icon_padding?.size),
        icon: getValueIcon(attrs, 'selected_icon')
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/icon',
        attributes,
    );
};
