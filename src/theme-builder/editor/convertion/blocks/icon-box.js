import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getValueDimension, getValueNormal, getValueResponsive } from '../helper';
import { hexToRgb } from 'gutenverse-core/editor-helper';

const pairs = {
    sg_icon_type: 'iconType',
    sg_icon_text: 'title',
    sg_setting_html_tag: 'titleTag',
    sg_icon_description: 'description',
    st_content_title_typography_content_typography_typography: 'titleTypography',
    st_content_description_typography_content_typography_typography: 'descTypography',
};

export const createIconBoxBlock = (attrs, inner) => {
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
        titleColor: attrs?.st_content_title_color_responsive?.type === 'variable' ? attrs?.st_content_title_color_responsive : hexToRgb(attrs?.st_content_title_color_responsive),
        descColor: attrs?.st_content_description_color_responsive?.type === 'variable' ? attrs?.st_content_description_color_responsive : hexToRgb(attrs?.st_content_description_color_responsive),
        containerPadding: getValueResponsive(attrs, 'st_container_padding_responsive', getValueDimension),
        align: getValueResponsive(attrs, 'sg_setting_content_alignment_responsive', getValueNormal),
        titleMargin: getValueResponsive(attrs, 'st_content_title_margin_responsive', getValueDimension),
        titlePadding: getValueResponsive(attrs, 'st_content_title_padding_responsive', getValueDimension),
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
