import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getValueResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getValueUnitPoint, getAttrZIndex, getValueRange } from '../helper';

const pairs = {
    sg_progress_title: 'title',
    sg_progress_style: 'style',
};

export const createProgressBarBlock = (attrs) => {
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
        space: getValueResponsive(attrs, 'space', getValueUnitPoint),
        percentage: getValueRange(attrs, 'sg_progress_percentage'),
        duration: getValueRange(attrs, 'sg_progress_duration')
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/progress-bar',
        attributes
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
//     "style": {
//       "type": "string",
//       "default": "default"
//     },
//     "title": {
//       "type": "string",
//       "default": "Progress Bar"
//     },
//     "arrowIcon": {
//       "type": "string",
//       "default": "fas fa-arrow-right"
//     },
//     "percentage": {
//       "type": "integer",
//       "default": 75
//     },
//     "duration": {
//       "type": "integer",
//       "default": 3500
//     },
//     "colorMode": {
//       "type": "string",
//       "default": "default",
//       "copyStyle": true
//     },
//     "barGradient": {
//       "type": "array",
//       "copyStyle": true
//     },
//     "trackGradient": {
//       "type": "array",
//       "copyStyle": true
//     },
//     "barColor": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "trackColor": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "trackHeight": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "barRadius": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "trackRadius": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "barPadding": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "barMargin": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "titleColor": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "barBoxShadow": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "titleTypography": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "titleTextShadow": {
//       "type": "object",
//       "default": {},
//       "copyStyle": true
//     },
//     "percentColor": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "percentTypography": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "percentTextShadow": {
//       "type": "object",
//       "default": {},
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
//     "percentBgColor": {
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