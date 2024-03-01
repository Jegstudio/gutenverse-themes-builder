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

// "attributes": {
//     "elementId": {
//         "type": "string"
//     },
//     "mouseMoveEffect": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "alignText": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleTag": {
//         "type": "string",
//         "default": "h2"
//     },
//     "subTag": {
//         "type": "string",
//         "default": "span"
//     },
//     "text": {
//         "type": "string",
//         "default": "Heading "
//     },
//     "focusText": {
//         "type": "string",
//         "default": "Focused"
//     },
//     "subText": {
//         "type": "string",
//         "default": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
//     },
//     "showSub": {
//         "type": "string",
//         "default": "bottom",
//         "copyStyle": true
//     },
//     "showLine": {
//         "type": "string",
//         "default": "before",
//         "copyStyle": true
//     },
//     "lineWidth": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "lineHeight": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "lineStyle": {
//         "type": "string",
//         "default": "default",
//         "copyStyle": true
//     },
//     "lineMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "mainColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "mainTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "mainBackground": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "mainMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "mainPadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "focusColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "focusTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "focusBackground": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "focusMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "focusPadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "subColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "subTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "subBackground": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "subMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "subPadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "mainTextClip": {
//         "type": "object",
//         "default": {},
//         "copyStyle": true
//     },
//     "focusTextClip": {
//         "type": "object",
//         "default": {},
//         "copyStyle": true
//     },
//     "lineColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "background": {
//         "type": "object",
//         "default": {},
//         "copyStyle": true
//     },
//     "backgroundHover": {
//         "type": "object",
//         "default": {},
//         "copyStyle": true
//     },
//     "border": {
//         "type": "object",
//         "default": {},
//         "copyStyle": true
//     },
//     "borderResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "border",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "boxShadow": {
//         "type": "object",
//         "default": {
//             "position": "outline"
//         },
//         "copyStyle": true
//     },
//     "borderHover": {
//         "type": "object",
//         "default": {},
//         "copyStyle": true
//     },
//     "borderHoverResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "borderHover",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "boxShadowHover": {
//         "type": "object",
//         "default": {
//             "position": "outline"
//         },
//         "copyStyle": true
//     },
//     "margin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "padding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "zIndex": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "animation": {
//         "type": "object",
//         "default": {},
//         "copyStyle": true
//     },
//     "hideDesktop": {
//         "type": "boolean",
//         "copyStyle": true
//     },
//     "hideTablet": {
//         "type": "boolean",
//         "copyStyle": true
//     },
//     "hideMobile": {
//         "type": "boolean",
//         "copyStyle": true
//     },
//     "positioningType": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "positioningWidth": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "positioningAlign": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "positioningLocation": {
//         "type": "string",
//         "copyStyle": true
//     },
//     "positioningLeft": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "positioningRight": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "positioningTop": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "positioningBottom": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "advanceAnimation": {
//         "type": "object",
//         "default": {},
//         "copyStyle": true
//     },
//     "transform": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "mask": {
//         "type": "object",
//         "copyStyle": true
//     }
// },