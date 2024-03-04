import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getValueResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getValueUnitPoint, getAttrZIndex, getValueIcon } from '../helper';

const pairs = {
    icon_color: 'iconColor',
    text_color: 'textColor',
    text_color_hover: 'textColorHover',
};

export const createIconListBlock = (attrs) => {
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
        iconPadding: getValueResponsive(attrs, 'icon_padding', () => attrs?.icon_padding?.size)
    };

    const iconList = attrs?.icon_list?.map(item => {
        return createBlock(
            'gutenverse/icon-list-item',
            {
                text: item?.text,
                icon: getValueIcon(item, 'selected_icon')
            }
        );
    });

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/icon-list',
        attributes,
        iconList
    );
};
