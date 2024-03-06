import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getValueResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getValueUnitPoint, getAttrZIndex, getValueIcon, getBlockAttributes } from '../../helper';

export const createIconListBlock = (attrs) => {
    const list = [
        {
            id: 'background',
            prefix: '_',
            value: getAttrBackground
        },
        {
            id: 'border',
            prefix: '_',
            value: getAttrBorder
        },
        {
            id: 'borderResponsive',
            prefix: '_',
            value: getAttrBorderResponsive
        },
        {
            id: 'margin',
            prefix: '_',
            value: getAttrMargin
        },
        {
            id: 'padding',
            prefix: '_',
            value: getAttrPadding
        },
        {
            id: 'zIndex',
            prefix: '_',
            value: getAttrZIndex
        },
        {
            id: 'positioning',
            prefix: '_',
            multi: true,
            value: getAttrPositioning
        },
        {
            id: 'iconSize',
            value: ({ attrs }) => getValueResponsive(attrs, 'size', getValueUnitPoint)
        },
        {
            id: 'iconPadding',
            value: ({ attrs }) => getValueResponsive(attrs, 'icon_padding', () => attrs?.icon_padding?.size)
        },
        {
            id: 'iconColor',
            value: ({ attrs }) => attrs?.icon_color
        },
        {
            id: 'textColor',
            value: ({ attrs }) => attrs?.text_color
        },
        {
            id: 'textColorHover',
            value: ({ attrs }) => attrs?.text_color_hover
        }
    ];

    const innerBlocks = attrs?.icon_list?.map(item => {
        return createBlock(
            'gutenverse/icon-list-item',
            {
                text: item?.text,
                icon: getValueIcon(item, 'selected_icon')
            }
        );
    });

    return createBlock(
        'gutenverse/icon-list',
        getBlockAttributes(list, attrs),
        innerBlocks
    );
};
