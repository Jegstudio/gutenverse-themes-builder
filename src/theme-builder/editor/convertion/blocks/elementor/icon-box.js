import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes, getValueIcon } from '../../helper';

export const createIconBoxBlock = (attrs) => {
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
            id: 'icon',
            value: ({ attrs }) => getValueIcon(attrs, 'selected_icon')
        },
        {
            id: 'title',
            value: ({ attrs }) => attrs?.title_text
        },
        {
            id: 'description',
            value: ({ attrs }) => attrs?.description_text
        },
        {
            id: 'titleTypography',
            value: ({ attrs }) => attrs?.title_typography_typography
        },
        {
            id: 'descTypography',
            value: ({ attrs }) => attrs?.description_typography_typography
        },
        {
            id: 'titleColor',
            value: ({ attrs }) => attrs?.title_color
        },
        {
            id: 'descColor',
            value: ({ attrs }) => attrs?.description_color
        },
        {
            id: 'iconPosition',
            value: ({ attrs }) => attrs?.position
        },
    ];

    return createBlock(
        'gutenverse/icon-box',
        getBlockAttributes(list, attrs)
    );
};
