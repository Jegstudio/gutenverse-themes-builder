import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex } from '../helper';
import { hexToRgb } from 'gutenverse-core/editor-helper';

const pairs = {
    st_content_title_typography_content_typography_typography: 'titleTypography',
    st_super_typography_content_typography_typography: 'superTypography',
    st_content_number_typography_content_typography_typography: 'numberTypography',
};

export const createFunFactBlock = (attrs, inner) => {
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
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/fun-fact',
        attributes,
        inner
    );
};


// "attributes": {
//     "elementId": {
//         "type": "string"
//     },
//     "mouseMoveEffect": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconType": {
//         "type": "string",
//         "default": "icon"
//     },
//     "icon": {
//         "type": "string",
//         "default": "fas fa-grip-horizontal"
//     },
//     "iconColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconBgColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconBorder": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconBorderResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "iconBorder",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "iconColorHover": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconBgColorHover": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconBorderHover": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconBorderHoverResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "iconBorderHover",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "iconSize": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconRotate": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconPadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "image": {
//         "type": "object"
//     },
//     "imageAlt": {
//         "type": "string"
//     },
//     "imageSize": {
//         "type": "integer",
//         "default": 150
//     },
//     "prefix": {
//         "type": "string",
//         "default": "$"
//     },
//     "number": {
//         "type": "string",
//         "default": "789"
//     },
//     "suffix": {
//         "type": "string",
//         "default": "M"
//     },
//     "title": {
//         "type": "string",
//         "default": "Fun Fact"
//     },
//     "titleTag": {
//         "type": "string",
//         "default": "span"
//     },
//     "showSupper": {
//         "type": "boolean",
//         "default": false
//     },
//     "supper": {
//         "type": "string",
//         "default": "+"
//     },
//     "superColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "superTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "superTop": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "superSpace": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "superAlign": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "alignButtons": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "duration": {
//         "type": "integer",
//         "default": 3500
//     },
//     "numberColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "numberTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "numberBottomSpace": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleBottomSpace": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "numberRightSpace": {
//         "type": "object"
//     },
//     "contentPadding": {
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
//     "hoverBottom": {
//         "type": "boolean",
//         "default": false,
//         "copyStyle": true
//     },
//     "hoverBottomColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "hoverBottomDirection": {
//         "type": "string",
//         "default": "left",
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
//     },
//     "lazyLoad":{
//         "type": "boolean",
//         "copyStyle": true
//     }
// },