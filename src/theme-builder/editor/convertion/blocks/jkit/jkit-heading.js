import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes } from '../../helper';

export const createJkitHeadingBlock = (attrs) => {
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
            id: 'showSub',
            value: ({ attrs }) => !isEmpty(attrs?.sg_subtitle_heading) ? 'bottom' : 'none'
        },
        {
            id: 'showLine',
            value: ({ attrs }) => isEmpty(attrs?.sg_separator_enable) ? 'between' : 'none'
        },
        {
            id: 'titleTag',
            value: ({ attrs }) => attrs?.sg_title_html_tag
        },
        {
            id: 'text',
            value: ({ attrs }) => attrs?.sg_title_before
        },
        {
            id: 'focusText',
            value: ({ attrs }) => attrs?.sg_title_focused
        },
        {
            id: 'subText',
            value: ({ attrs }) => attrs?.sg_subtitle_heading
        },
        {
            id: 'mainColor',
            value: ({ attrs }) => attrs?.st_title_color_responsive
        },
        {
            id: 'mainTypography',
            value: ({ attrs }) => attrs?.st_title_typography_content_typography_typography
        },
        {
            id: 'focusColor',
            value: ({ attrs }) => attrs?.st_focused_color_responsive
        },
        {
            id: 'focusTypography',
            value: ({ attrs }) => attrs?.st_focused_typography_content_typography_typography
        }
    ];

    return createBlock(
        'gutenverse/advanced-heading',
        getBlockAttributes(list, attrs)
    );
};
