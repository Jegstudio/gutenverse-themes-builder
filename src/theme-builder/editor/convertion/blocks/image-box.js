import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getValueDimension, getValueNormal, getValueResponsive } from '../helper';

const pairs = {
    sg_body_title: 'title',
    sg_body_description: 'description',
    sg_body_title_tag: 'titleTag',
    st_body_title_typography_content_typography_typography: 'titleTypography',
    st_body_description_typography_content_typography_typography: 'descriptionTypography',
    st_body_title_normal_color_responsive: 'titleNormalColor',
    st_body_description_normal_color_responsive: 'descriptionNormalColor',
    st_body_title_hover_color_responsive: 'titleHoverColor',
    st_body_description_hover_color_responsive: 'descriptionHoverColor',
};

export const createImageBoxBlock = (attrs) => {
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
        ...getAttrBackground({
            attrs,
            name: 'bodyBackground',
            prefix: 'st_body_type_'
        }),
        image: {
            media: {
                imageId: attrs?.sg_image_choose?.id,
                sizes: {
                    full: attrs?.sg_image_choose
                }
            }
        },
        bodyAlignment: getValueResponsive(attrs, 'sg_body_alignment_responsive', getValueNormal),
        imageBorderRadius: getValueDimension(attrs, 'st_image_border_radius_responsive'),
    };

    const buttonContent = [
        createBlock(
            'gutenverse/button',
            {
                content: attrs?.sg_button_label,
                alignButton: getValueResponsive(attrs, 'sg_body_alignment_responsive', getValueNormal)
            }
        )
    ];

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/image-box',
        attributes,
        buttonContent
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
//         "default": "Image Box Heading"
//     },
//     "description": {
//         "type": "string",
//     },
//     "image": {
//         "type": "object"
//     },
//     "imageAlt": {
//         "type": "string"
//     },
//     "contentStyle": {
//         "type": "string",
//         "default": "default",
//         "copyStyle": true
//     },
//     "equalHeight": {
//         "type": "string",
//         "copyStyle": true
//     },
//     "titleTag": {
//         "type": "string",
//         "default": "h3"
//     },
//     "titleIcon": {
//         "type": "string"
//     },
//     "titleIconPosition": {
//         "type": "string",
//         "default": "before"
//     },
//     "bodyAlignment": {
//         "type": "object",
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
//     "imagePadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "imageMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "imageBorderRadius": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "imageBoxShadow": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "imageHeight": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "imageFit": {
//         "type": "string",
//         "copyStyle": true
//     },
//     "imageOpacity": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "imageHoverOpacity": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "imageHoverScale": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "bodyBackground": {
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
//     "containerPadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "containerMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "containerBoxShadow": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleIconSize": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleIconSpacing": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleNormalColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleNormalIconColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleHoverColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleHoverIconColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "descriptionMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "descriptionTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "descriptionNormalColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "descriptionHoverColor": {
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
//     "floatMarginTop": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "floatWidth": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "floatHeight": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "floatHeightHover": {
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
//     "imagePosition": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "lazyLoad": {
//         "type" : "boolean",
//         "copyStyle": true
//     },
//     "ariaLabel": {
//         "type" : "string",
//         "copyStyle": true
//     }
// },