import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getValueDimension, getValueResponsive } from '../helper';
import { hexToRgb } from 'gutenverse-core/editor-helper';

const pairs = {
    st_content_title_typography_content_typography_typography: 'titleTypography',
    st_super_typography_content_typography_typography: 'superTypography',
    st_content_number_typography_content_typography_typography: 'numberTypography',
};

export const createFunFactBlock = (attrs) => {
    const params = {
        attrs,
        prefix: '_'
    };
    const attributes = {
        ...getAttrBackground({
            attrs,
            prefix: 'st_background_type_'
        }),
        ...getAttrBorder(params),
        ...getAttrBorderResponsive(params),
        ...getAttrMargin(params),
        ...getAttrPadding(params),
        ...getAttrPositioning(params),
        ...getAttrZIndex(params),
        iconType: attrs?.sg_icon_type,
        titleTag: attrs?.sg_setting_html_tag,
        prefix: attrs?.sg_content_number_prefix,
        number: attrs?.sg_content_number,
        suffix: attrs?.sg_content_number_suffix,
        title: attrs?.sg_content_title,
        showSupper: attrs?.sg_setting_enable_super === 'yes',
        supper: attrs?.sg_content_super,
        superColor: attrs?.st_super_color_responsive?.type === 'variable' ? attrs?.st_super_color_responsive : hexToRgb(attrs?.st_super_color_responsive),
        numberColor: {
            Desktop: attrs?.st_content_number_color_responsive?.type === 'variable' ? attrs?.st_content_number_color_responsive : hexToRgb(attrs?.st_content_number_color_responsive),
        },
        titleColor: {
            Desktop: attrs?.st_content_title_color_responsive?.type === 'variable' ? attrs?.st_content_title_color_responsive : hexToRgb(attrs?.st_content_title_color_responsive),
        },
        iconPadding: getValueResponsive(attrs, 'st_icon_padding_responsive', getValueDimension),
        iconMargin: getValueResponsive(attrs, 'st_icon_margin_responsive', getValueDimension),
        contentPadding: getValueResponsive(attrs, 'st_background_padding_responsive', getValueDimension),
        superAlign: getValueResponsive(attrs, 'st_super_vertical_position_responsive', () => {
            return attrs?.st_super_vertical_position_responsive === 'baseline' ? 'middle' : 'top';
        }),
        superTop: getValueResponsive(attrs, 'st_super_top_responsive', () => {
            return attrs?.st_super_top_responsive?.size;
        }),
        superSpace: getValueResponsive(attrs, 'st_super_left_responsive', () => {
            return attrs?.st_super_left_responsive?.size;
        }),
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/fun-fact',
        attributes
    );
};
