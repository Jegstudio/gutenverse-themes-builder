import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex } from '../helper';

const pairs = {
    sg_title_html_tag: 'titleTag',
    sg_title_before: 'text',
    sg_title_focused: 'focusText',
    sg_subtitle_heading: 'subText',
    st_title_color_responsive: 'mainColor',
    st_title_typography_content_typography_typography: 'mainTypography',
    st_focused_color_responsive: 'focusColor',
    st_focused_typography_content_typography_typography: 'focusTypography',
};

export const createAdvancedHeadingBlock = (attrs) => {
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
        showSub: !isEmpty(attrs?.sg_subtitle_heading) ? 'bottom' : 'none',
        showLine: isEmpty(attrs?.sg_separator_enable) ? 'between' : 'none'
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/advanced-heading',
        attributes
    );
};
