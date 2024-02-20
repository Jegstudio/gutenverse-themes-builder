import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getBorder, getMargin, getPadding } from '../helper';

const pairs = {
    title: 'content',
    title_color: 'color',
    typography_typography: 'typography'
};

export const createHeadingBlock = (attrs, inner) => {
    const attributes = {
        ...getBorder(attrs),
        margin: getMargin(attrs),
        padding: getPadding(attrs),
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/heading',
        attributes,
        inner
    );
};

// createBlock('gutenverse/heading', {
//     "elementId": {
//         "type": "string"
//     },
//     "mouseMoveEffect": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "textAlign": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "textShadow": {
//         "type": "object",
//         "default": {},
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
//     "textChilds": {
//         "type": "array",
//         "default": []
//     },
//     "mask": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "textClip": {
//         "type": "object",
//         "default": {},
//         "copyStyle": true
//     },
//     "anchor": {
//       "type": "string"
//     },
//     content: attr?.title,
//     margin: getMargin(attr),
//     color: attr?.title_color,
//     typography: attr?.typography_typography
// }, inner);