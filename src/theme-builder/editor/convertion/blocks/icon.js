import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getValueResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getValueUnitPoint, getAttrZIndex } from '../helper';

const pairs = {
    primary_color: 'iconColorOne',
    secondary_color: 'iconColorTwo',
    shape: 'iconShape',
};

export const createIconBlock = (attrs, inner) => {
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
        iconsSize: getValueResponsive(attrs, 'size', getValueUnitPoint)
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/icon',
        attributes,
        inner
    );
};

// "attributes": {
//     "elementId": {
//       "type": "string"
//     },
//     "mouseMoveEffect": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "icon": {
//       "type": "string",
//       "default": "fab fa-wordpress"
//     },
//     "iconAlign": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "ariaLabel": {
//       "type": "string",
//       "copyStyle": true
//     },
//     "iconColorOne": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "iconSize": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "iconPadding": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "iconRotate": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "iconColorTwo": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "iconColorHoverOne": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "iconColorHoverTwo": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "iconView": {
//       "type": "string",
//       "default": "stacked",
//       "copyStyle": true
//     },
//     "iconShape": {
//       "type": "string",
//       "default": "rounded",
//       "copyStyle": true
//     },
//     "iconBorderWidth": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "iconBorderRadius": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "url": {
//       "type": "string"
//     },
//     "linkTarget": {
//       "type": "string",
//       "source": "attribute",
//       "selector": "a",
//       "attribute": "target"
//     },
//     "rel": {
//       "type": "string",
//       "source": "attribute",
//       "selector": "a",
//       "attribute": "rel"
//     },
//     "animation": {
//       "type": "object",
//       "default": {},
//       "copyStyle": true
//     },
//     "hideDesktop": {
//       "type": "boolean",
//       "copyStyle": true
//     },
//     "hideTablet": {
//       "type": "boolean",
//       "copyStyle": true
//     },
//     "hideMobile": {
//       "type": "boolean",
//       "copyStyle": true
//     },
//     "background": {
//       "type": "object",
//       "default": {},
//       "copyStyle": true
//     },
//     "backgroundHover": {
//       "type": "object",
//       "default": {},
//       "copyStyle": true
//     },
//     "border": {
//       "type": "object",
//       "default": {},
//       "copyStyle": true
//     },
//     "borderResponsive": {
//       "type": "object",
//       "migrate": {
//         "attr": "border",
//         "type": "border"
//       },
//       "copyStyle": true
//     },
//     "boxShadow": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "borderHover": {
//       "type": "object",
//       "default": {},
//       "copyStyle": true
//     },
//     "borderHoverResponsive": {
//       "type": "object",
//       "migrate": {
//         "attr": "borderHover",
//         "type": "border"
//       },
//       "copyStyle": true
//     },
//     "boxShadowHover": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "margin": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "padding": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "zIndex": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "positioningType": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "positioningWidth": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "positioningAlign": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "positioningLocation": {
//       "type": "string",
//       "copyStyle": true
//     },
//     "positioningLeft": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "positioningRight": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "positioningTop": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "positioningBottom": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "advanceAnimation": {
//       "type": "object",
//       "default": {},
//       "copyStyle": true
//     },
//     "transform": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "mask": {
//       "type": "object",
//       "copyStyle": true
//     }
//   },