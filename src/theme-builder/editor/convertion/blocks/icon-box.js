import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex } from '../helper';
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
        ...getAttrBackground(params),
        ...getAttrBorder(params),
        ...getAttrBorderResponsive(params),
        ...getAttrMargin(params),
        ...getAttrPadding(params),
        ...getAttrPositioning(params),
        ...getAttrZIndex(params),
        titleColor: attrs?.st_content_title_color_responsive?.type === 'variable' ? attrs?.st_content_title_color_responsive : hexToRgb(attrs?.st_content_title_color_responsive),
        descColor: attrs?.st_content_description_color_responsive?.type === 'variable' ? attrs?.st_content_description_color_responsive : hexToRgb(attrs?.st_content_description_color_responsive),
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

// "attributes": {
//     "elementId": {
//         "type": "string"
//     },
//     "mouseMoveEffect": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "url": {
//         "type": "string"
//     },
//     "separateButtonLink": {
//         "type": "boolean"
//     },
//     "linkTarget": {
//         "type": "string",
//         "source": "attribute",
//         "selector": "a",
//         "attribute": "target"
//     },
//     "rel": {
//         "type": "string",
//         "source": "attribute",
//         "selector": "a",
//         "attribute": "rel"
//     },
//     "title": {
//         "type": "string",
//         "default": "Icon Box"
//     },
//     "titleTag": {
//         "type": "string",
//         "default": "h2"
//     },
//     "description": {
//         "type": "string",
//         "default": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
//     },
//     "badgeShow": {
//         "type": "boolean",
//         "default": false,
//         "copyStyle": true
//     },
//     "badge": {
//         "type": "string",
//         "default": "BADGE",
//         "copyStyle": true
//     },
//     "badgePosition": {
//         "type": "string",
//         "default": "bottomcenter",
//         "copyStyle": true
//     },
//     "watermarkShow": {
//         "type": "boolean",
//         "default": false
//     },
//     "watermarkIcon": {
//         "type": "string",
//         "default": "far fa-map"
//     },
//     "iconType": {
//         "type": "string",
//         "default": "icon"
//     },
//     "icon": {
//         "type": "string",
//         "default": "far fa-user"
//     },
//     "iconSize": {
//         "type": "object",
//         "default": {
//             "Desktop": 40
//         },
//         "copyStyle": true
//     },
//     "iconBoxOverlay": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconBoxHoverOverlay": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconBoxOverlayDirection": {
//         "type": "string",
//         "copyStyle": true
//     },
//     "imageWidth": {
//         "type": "integer",
//         "default": 150,
//         "copyStyle": true
//     },
//     "imageHeight": {
//         "type": "integer",
//         "default": 150,
//         "copyStyle": true
//     },
//     "imageHeightResponsive": {
//         "type" : "object",
//         "default" : {"Desktop" : 150, "Tablet" : 150, "Mobile" : 150},
//         "copyStyle": true
//     },
//     "imageWidthResponsive": {
//         "type" : "object",
//         "default" : {"Desktop" : 150, "Tablet" : 150, "Mobile" : 150},
//         "copyStyle": true
//     },
//     "image": {
//         "type": "object"
//     },
//     "imageAlt": {
//         "type": "string"
//     },
//     "link": {
//         "type": "string"
//     },
//     "iconPosition": {
//         "type": "string",
//         "copyStyle": true
//     },
//     "iconPositionResponsive": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "align": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "containerPadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "containerPaddingHover": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "containerBackground": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "containerBackgroundHover": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "containerBorder": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "containerBorderResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "containerBorder",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "containerBoxShadow": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "containerBorderHover": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "containerBorderHoverResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "containerBorderHover",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "containerBoxShadowHover": {
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
//     "iconRotate": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconStyleMode": {
//         "type": "string",
//         "copyStyle": true
//     },
//     "iconColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconHoverColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconBgColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconHoverBgColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconBackground": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconBackgroundHover": {
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
//     "iconBoxShadow": {
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
//     "iconBoxShadowHover": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titlePadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleHoverColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "descMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "descColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "descHoverColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "descTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "watermarkColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "watermarkSize": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "badgeTextColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "badgePadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "badgeMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "badgeRadius": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "badgeBackground": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "badgeTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "badgeShadow": {
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
//     "lazyLoad": {
//         "type" : "boolean",
//         "copyStyle": true
//     }
// },