import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrBoxShadow, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes, getValueDimension, getValueIcon, getValueResponsive } from '../../helper';
import { hexToRgb } from 'gutenverse-core/editor-helper';

export const createJkitFunFactBlock = (attrs) => {
    const list = [
        {
            id: 'background',
            prefix: 'st_background_type_',
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
            id: 'boxShadow',
            prefix: '_',
            value: getAttrBoxShadow
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
            id: 'iconType',
            value: ({ attrs }) => attrs?.sg_icon_type
        },
        {
            id: 'titleTag',
            value: ({ attrs }) => attrs?.sg_setting_html_tag
        },
        {
            id: 'prefix',
            value: ({ attrs }) => attrs?.sg_content_number_prefix
        },
        {
            id: 'number',
            value: ({ attrs }) => attrs?.sg_content_number
        },
        {
            id: 'suffix',
            value: ({ attrs }) => attrs?.sg_content_number_suffix
        },
        {
            id: 'title',
            value: ({ attrs }) => attrs?.sg_content_title
        },
        {
            id: 'showSupper',
            value: ({ attrs }) => attrs?.sg_setting_enable_super === 'yes'
        },
        {
            id: 'supper',
            value: ({ attrs }) => attrs?.sg_content_super
        },
        {
            id: 'superColor',
            value: ({ attrs }) => attrs?.st_super_color_responsive?.type === 'variable' ? attrs?.st_super_color_responsive : hexToRgb(attrs?.st_super_color_responsive)
        },
        {
            id: 'numberColor',
            value: ({ attrs }) => ({
                Desktop: attrs?.st_content_number_color_responsive?.type === 'variable' ? attrs?.st_content_number_color_responsive : hexToRgb(attrs?.st_content_number_color_responsive),
            })
        },
        {
            id: 'titleColor',
            value: ({ attrs }) => ({
                Desktop: attrs?.st_content_title_color_responsive?.type === 'variable' ? attrs?.st_content_title_color_responsive : hexToRgb(attrs?.st_content_title_color_responsive),
            })
        },
        {
            id: 'iconColor',
            value: ({ attrs }) => ({
                Desktop: attrs?.st_icon_color_responsive?.type === 'variable' ? attrs?.st_icon_color_responsive : hexToRgb(attrs?.st_icon_color_responsive),
            })
        },
        {
            id: 'iconPadding',
            value: ({ attrs }) => getValueResponsive(attrs, 'st_icon_padding_responsive', getValueDimension)
        },
        {
            id: 'iconMargin',
            value: ({ attrs }) => getValueResponsive(attrs, 'st_icon_margin_responsive', getValueDimension)
        },
        {
            id: 'contentPadding',
            value: ({ attrs }) => getValueResponsive(attrs, 'st_background_padding_responsive', getValueDimension)
        },
        {
            id: 'superAlign',
            value: ({ attrs }) => getValueResponsive(attrs, 'st_super_vertical_position_responsive', () => {
                return attrs?.st_super_vertical_position_responsive === 'baseline' ? 'middle' : 'top';
            })
        },
        {
            id: 'superTop',
            value: ({ attrs }) => getValueResponsive(attrs, 'st_super_top_responsive', () => {
                return attrs?.st_super_top_responsive?.size;
            })
        },
        {
            id: 'superSpace',
            value: ({ attrs }) => getValueResponsive(attrs, 'st_super_left_responsive', () => {
                return attrs?.st_super_left_responsive?.size;
            })
        },
        {
            id: 'icon',
            value: ({ attrs }) => getValueIcon(attrs, 'sg_icon_choose')
        },
        {
            id: 'titleTypography',
            value: ({ attrs }) => attrs?.st_content_title_typography_content_typography_typography
        },
        {
            id: 'superTypography',
            value: ({ attrs }) => attrs?.st_super_typography_content_typography_typography
        },
        {
            id: 'numberTypography',
            value: ({ attrs }) => attrs?.st_content_number_typography_content_typography_typography
        }
    ];

    return createBlock(
        'gutenverse/fun-fact',
        getBlockAttributes(list, attrs)
    );
};
