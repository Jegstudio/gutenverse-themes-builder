import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex } from '../helper';

const pairs = {
    text: 'content',
    typography_typography: 'typography',
    button_text_color: 'color'
};

export const createButtonBlock = (attrs, inner) => {
    const params = {
        attrs,
        prefix: '_'
    };
    const attributes = {
        ...getAttrBackground(params),
        ...getAttrBorder({attrs}),
        ...getAttrBorderResponsive(params),
        ...getAttrMargin(params),
        ...getAttrPadding(params),
        ...getAttrPositioning(params),
        ...getAttrZIndex(params),
        ...getAttrBackground({
            attrs,
            name:  'buttonBackground',
            
        }),
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/button',
        attributes,
        inner
    );
};



// "elementId": {
//     "type": "string"
// },
// "mouseMoveEffect": {
//     "type": "object",
//     "copyStyle": true
// },
// "role": {
//     "type": "string",
//     "default": "link"
// },
// "content": {
//     "type": "string"
// },
// "dynamicContent": {
//     "type": "object",
//     "default": {}
// },
// "url": {
//     "type": "string"
// },
// "dynamicUrl": {
//     "type": "object",
//     "default": {}
// },
// "linkTarget": {
//     "type": "string",
//     "source": "attribute",
//     "selector": "a",
//     "attribute": "target"
// },
// "rel": {
//     "type": "string",
//     "source": "attribute",
//     "selector": "a",
//     "attribute": "rel"
// },
// "buttonType": {
//     "type": "string",
//     "default": "default",
//     "copyStyle": true
// },
// "buttonSize": {
//     "type": "string",
//     "default": "sm",
//     "copyStyle": true
// },
// "buttonWidth": {
//     "type": "object",
//     "copyStyle": true
// },
// "buttonHeight": {
//     "type": "object"
// },
// "alignButton": {
//     "type": "object",
//     "copyStyle": true
// },
// "paddingButton": {
//     "type": "object",
//     "copyStyle": true
// },
// "buttonBackground": {
//     "type": "object",
//     "copyStyle": true
// },
// "buttonBackgroundHover": {
//     "type": "object",
//     "copyStyle": true
// },
// "buttonBorder": {
//     "type": "object",
//     "copyStyle": true
// },
// "buttonBorderResponsive": {
//     "type": "object",
//     "migrate": {
//         "attr": "buttonBorder",
//         "type": "border"
//     },
//     "copyStyle": true
// },
// "buttonBoxShadow": {
//     "type": "object",
//     "copyStyle": true
// },
// "buttonBorderHover": {
//     "type": "object",
//     "copyStyle": true
// },
// "buttonBorderHoverResponsive": {
//     "type": "object",
//     "migrate": {
//         "attr": "buttonBorderHover",
//         "type": "border"
//     },
//     "copyStyle": true
// },
// "buttonBoxShadowHover": {
//     "type": "object",
//     "copyStyle": true
// },
// "showIcon": {
//     "type": "boolean",
//     "default": false,
//     "copyStyle": true
// },
// "icon": {
//     "type": "string",
//     "default": "fab fa-wordpress",
//     "copyStyle": true
// },
// "iconPosition": {
//     "type": "string",
//     "default": "before",
//     "copyStyle": true
// },
// "iconSpacing": {
//     "type": "object",
//     "copyStyle": true
// },
// "iconSize": {
//     "type": "object",
//     "copyStyle": true
// },
// "background": {
//     "type": "object",
//     "default": {},
//     "copyStyle": true
// },
// "backgroundHover": {
//     "type": "object",
//     "default": {},
//     "copyStyle": true
// },
// "border": {
//     "type": "object",
//     "copyStyle": true
// },
// "borderResponsive": {
//     "type": "object",
//     "migrate": {
//         "attr": "border",
//         "type": "border"
//     },
//     "copyStyle": true
// },
// "boxShadow": {
//     "type": "object",
//     "copyStyle": true
// },
// "borderHover": {
//     "type": "object",
//     "copyStyle": true
// },
// "borderHoverResponsive": {
//     "type": "object",
//     "migrate": {
//         "attr": "borderHover",
//         "type": "border"
//     },
//     "copyStyle": true
// },
// "boxShadowHover": {
//     "type": "object",
//     "copyStyle": true
// },
// "margin": {
//     "type": "object",
//     "copyStyle": true
// },
// "padding": {
//     "type": "object",
//     "copyStyle": true
// },
// "zIndex": {
//     "type": "object",
//     "copyStyle": true
// },
// "animation": {
//     "type": "object",
//     "default": {},
//     "copyStyle": true
// },
// "advanceAnimation": {
//     "type": "object",
//     "default": {},
//     "copyStyle": true
// },
// "hideDesktop": {
//     "type": "boolean",
//     "copyStyle": true
// },
// "hideTablet": {
//     "type": "boolean",
//     "copyStyle": true
// },
// "hideMobile": {
//     "type": "boolean",
//     "copyStyle": true
// },
// "color": {
//     "type": "object",
//     "copyStyle": true
// },
// "iconColor": {
//     "type": "object",
//     "copyStyle": true
// },
// "typography": {
//     "type": "object",
//     "copyStyle": true
// },
// "hoverIconColor": {
//     "type": "object",
//     "copyStyle": true
// },
// "hoverBgColor": {
//     "type": "object",
//     "copyStyle": true
// },
// "hoverTextColor": {
//     "type": "object",
//     "copyStyle": true
// },
// "hoverBorderColor": {
//     "type": "object",
//     "copyStyle": true
// },
// "positioningType": {
//     "type": "object",
//     "copyStyle": true
// },
// "positioningWidth": {
//     "type": "object",
//     "copyStyle": true
// },
// "positioningAlign": {
//     "type": "object",
//     "copyStyle": true
// },
// "positioningLocation": {
//     "type": "string",
//     "copyStyle": true
// },
// "positioningLeft": {
//     "type": "object",
//     "copyStyle": true
// },
// "positioningRight": {
//     "type": "object",
//     "copyStyle": true
// },
// "positioningTop": {
//     "type": "object",
//     "copyStyle": true
// },
// "positioningBottom": {
//     "type": "object",
//     "copyStyle": true
// },
// "transform": {
//     "type": "object",
//     "copyStyle": true
// },
// "mask": {
//     "type": "object",
//     "copyStyle": true
// },
// "ariaLabel": {
//     "type": "string",
//     "copyStyle": true
// }
// },