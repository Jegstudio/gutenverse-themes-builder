import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrBoxShadow, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes, getValueDimension, getValueIcon, getValueNormal, getValueResponsive } from '../../helper';

export const createJkitIconBoxBlock = (attrs) => {
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
            id: 'containerBackground',
            prefix: 'st_container_background_',
            value: getAttrBackground
        },
        {
            id: 'containerBackgroundHover',
            prefix: 'st_container_hover_background_',
            value: getAttrBackground
        },
        {
            id: 'containerBoxShadow',
            prefix: 'st_container_boxshadow_box_shadow_',
            value: getAttrBoxShadow
        },
        {
            id: 'containerBoxShadowHover',
            prefix: 'st_container_hover_boxshadow_box_shadow_',
            value: getAttrBoxShadow
        },
        {
            id: 'containerBorder',
            prefix: 'st_container_border_',
            value: getAttrBorder
        },
        {
            id: 'containerBorderResponsive',
            prefix: 'st_container_border_',
            value: getAttrBorderResponsive
        },
        {
            id: 'containerBorderHover',
            prefix: 'st_container_hover_border_',
            value: getAttrBorder
        },
        {
            id: 'containerBorderResponsiveHover',
            prefix: 'st_container_hover_border_',
            value: getAttrBorderResponsive
        },
        {
            id: 'containerPadding',
            value: ({ attrs }) => getValueResponsive(attrs, 'st_container_padding_responsive', getValueDimension)
        },
        {
            id: 'align',
            value: ({ attrs }) => getValueResponsive(attrs, 'sg_setting_content_alignment_responsive', getValueNormal)
        },
        {
            id: 'titleMargin',
            value: ({ attrs }) => getValueResponsive(attrs, 'st_content_title_margin_responsive', getValueDimension)
        },
        {
            id: 'titlePadding',
            value: ({ attrs }) => getValueResponsive(attrs, 'st_content_title_padding_responsive', getValueDimension),
        },
        {
            id: 'icon',
            value: ({ attrs }) => getValueIcon(attrs, 'sg_icon_header')
        },
        {
            id: 'iconType',
            value: ({ attrs }) => attrs?.sg_icon_type
        },
        {
            id: 'title',
            value: ({ attrs }) => attrs?.sg_icon_text
        },
        {
            id: 'titleTag',
            value: ({ attrs }) => attrs?.sg_setting_html_tag
        },
        {
            id: 'description',
            value: ({ attrs }) => attrs?.sg_icon_description
        },
        {
            id: 'titleTypography',
            value: ({ attrs }) => attrs?.st_content_title_typography_content_typography_typography
        },
        {
            id: 'descTypography',
            value: ({ attrs }) => attrs?.st_content_description_typography_content_typography_typography
        },
        {
            id: 'iconPosition',
            value: ({ attrs }) => attrs?.sg_setting_content_alignment_responsive
        },
        {
            id: 'titleColor',
            value: ({ attrs }) => attrs?.st_content_title_color_responsive
        },
        {
            id: 'descColor',
            value: ({ attrs }) => attrs?.st_content_description_color_responsive
        },
    ];

    return createBlock(
        'gutenverse/icon-box',
        getBlockAttributes(list, attrs)
    );
};
