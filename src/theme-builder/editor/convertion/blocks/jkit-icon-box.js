import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrBoxShadow, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getValueDimension, getValueIcon, getValueNormal, getValueResponsive } from '../helper';

const pairs = {
    sg_icon_type: 'iconType',
    sg_icon_text: 'title',
    sg_setting_html_tag: 'titleTag',
    sg_icon_description: 'description',
    st_content_title_typography_content_typography_typography: 'titleTypography',
    st_content_description_typography_content_typography_typography: 'descTypography',
    sg_setting_content_alignment_responsive: 'iconPosition',
    st_content_title_color_responsive: 'titleColor',
    st_content_description_color_responsive: 'descColor'
};

export const createJkitIconBlock = (attrs) => {
    const params = {
        attrs,
        prefix: '_'
    };
    const attributes = {
        ...getAttrBackground({
            attrs,
            prefix: 'st_container_background_'
        }),
        ...getAttrBorder(params),
        ...getAttrBorderResponsive(params),
        ...getAttrBoxShadow({
            attrs,
            name: 'containerBoxShadow',
            prefix: 'st_container_boxshadow_box_shadow_'
        }),
        ...getAttrBoxShadow({
            attrs,
            name: 'containerBoxShadowHover',
            prefix: 'st_container_hover_boxshadow_box_shadow_'
        }),
        ...getAttrMargin(params),
        ...getAttrPadding(params),
        ...getAttrPositioning(params),
        ...getAttrZIndex(params),
        ...getAttrBorder({
            attrs,
            name: 'containerBorder',
            prefix: 'st_container_border_'
        }),
        ...getAttrBorderResponsive({
            attrs,
            name: 'containerBorderResponsive',
            prefix: 'st_container_border_'
        }),
        containerPadding: getValueResponsive(attrs, 'st_container_padding_responsive', getValueDimension),
        align: getValueResponsive(attrs, 'sg_setting_content_alignment_responsive', getValueNormal),
        titleMargin: getValueResponsive(attrs, 'st_content_title_margin_responsive', getValueDimension),
        titlePadding: getValueResponsive(attrs, 'st_content_title_padding_responsive', getValueDimension),
        icon: getValueIcon(attrs, 'sg_icon_header')
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/icon-box',
        attributes
    );
};
