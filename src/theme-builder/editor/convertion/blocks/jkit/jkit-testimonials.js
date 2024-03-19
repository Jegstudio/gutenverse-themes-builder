import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrBoxShadow, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes, getValueRange, getValueResponsive } from '../../helper';


export const createJkitTestimonialsBlock = (attrs) => {
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
            id: 'boxShadow',
            prefix: '_',
            value: getAttrBoxShadow
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
            id: 'contentType',
            value: ({ attrs }) => parseInt(attrs?.sg_layout_testimonial_choose?.replace('style-', ''))
        },
        {
            id: 'testimonialData',
            value: ({ attrs }) => attrs?.sg_testimonials_list?.map(data => {
                return {
                    name: data?.sg_testimonials_list_client_name,
                    designation: data?.sg_testimonials_list_designation,
                    description: data?.sg_testimonials_list_review,
                    src: {
                        id: data?.sg_testimonials_list_client_avatar?.id,
                        image: data?.sg_testimonials_list_client_avatar?.url
                    },
                    rating: 5,
                };
            })
        },
        {
            id: 'containerBackground',
            prefix: 'st_layout_background_',
            value: getAttrBackground
        },
        {
            id: 'showRating',
            value: ({ attrs }) => attrs?.sg_setting_rating === 'yes'
        },
        {
            id: 'itemShowed',
            value: ({ attrs }) => getValueResponsive(attrs, 'sg_setting_slide_show_responsive', getValueRange)
        },
        {
            id: 'nameTypography',
            value: ({ attrs }) => attrs?.st_client_name_normal_typography_content_typography_typography
        },
        {
            id: 'designationTypography',
            value: ({ attrs }) => attrs?.st_client_designation_normal_typography_content_typography_typography
        },
        {
            id: 'descriptionTypography',
            value: ({ attrs }) => attrs?.st_description_typography_content_typography_typography
        },
        {
            id: 'nameNormalColor',
            value: ({ attrs }) => attrs?.st_client_name_normal_color_responsive
        },
        {
            id: 'designationNormalColor',
            value: ({ attrs }) => attrs?.st_client_designation_normal_color_responsive
        },
        {
            id: 'descriptionNormalColor',
            value: ({ attrs }) => attrs?.st_description_color_responsive
        },
        {
            id: 'nameHoverColor',
            value: ({ attrs }) => attrs?.st_client_name_hover_color_responsive
        },
        {
            id: 'designationHoverColor',
            value: ({ attrs }) => attrs?.st_client_designation_hover_color_responsive
        },
        {
            id: 'descriptionHoverColor',
            value: ({ attrs }) => attrs?.st_description_color_responsive
        },
    ];

    return createBlock(
        'gutenverse/testimonials',
        getBlockAttributes(list, attrs)
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
//     "contentType": {
//         "type": "integer",
//         "default": 1
//     },
//     "contentPosition": {
//         "type": "string",
//         "copyStyle": true
//     },
//     "starPosition": {
//         "type": "string",
//         "copyStyle": true
//     },
//     "spacing": {
//         "type": "object",
//         "default": {},
//         "copyStyle": true
//     },
//     "itemShowed": {
//         "type": "object",
//         "default": {}
//     },
//     "autoplay": {
//         "type": "boolean",
//         "default": false
//     },
//     "autoplayTimeout": {
//         "type": "integer",
//         "default": 2400
//     },
//     "loop": {
//         "type": "boolean",
//         "default": false
//     },
//     "showNav": {
//         "type": "boolean",
//         "default": false
//     },
//     "showArrow": {
//         "type": "boolean",
//         "default": false
//     },
//     "showQuote": {
//         "type": "boolean",
//         "default": false
//     },
//     "showRating": {
//         "type": "boolean",
//         "default": false
//     },
//     "iconQuote": {
//         "type": "string",
//         "default": "fas fa-quote-left"
//     },
//     "iconRatingFull": {
//         "type": "string",
//         "default": "fas fa-star"
//     },
//     "iconRatingHalf": {
//         "type": "string",
//         "default": "fas fa-star-half"
//     },
//     "testimonialData": {
//         "type": "array",
//         "default": [
//             {
//                 "name": "John Doe",
//                 "description": "Lorem Ipsum",
//                 "comment": "Lorem Ipsum Donor Mannor"
//             },
//             {
//                 "name": "John Doe",
//                 "description": "Lorem Ipsum",
//                 "comment": "Lorem Ipsum Donor Mannor"
//             },
//             {
//                 "name": "John Doe",
//                 "description": "Lorem Ipsum",
//                 "comment": "Lorem Ipsum Donor Mannor"
//             },
//             {
//                 "name": "John Doe",
//                 "description": "Lorem Ipsum",
//                 "comment": "Lorem Ipsum Donor Mannor"
//             }
//         ]
//     },
//     "dotsSpacingHorizontal": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "dotsSpacingVertical": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "dotsWidth": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "dotsHeight": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "dotsRadius": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "dotsColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "dotsActiveWidth": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "dotsActiveHeight": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "dotsActiveRadius": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "dotsActiveColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "arrowFontSize": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "arrowColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "arrowBgColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "arrowPadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "arrowMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "arrowOpacity": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "arrowHoverColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "arrowHoverBgColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "arrowHoverPadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "arrowHoverMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "arrowHoverOpacity": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "arrowBorder": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "arrowBorderResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "arrowBorder",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "arrowBoxShadow": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "arrowBorderHover": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "arrowBorderHoverResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "arrowBorderHover",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "arrowBoxShadowHover": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "alignText": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "containerMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "containerPadding": {
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
//     "nameTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "designationTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "designationSpacing": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "descriptionTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "descriptionMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "quoteSize": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "nameNormalColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "nameHoverColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "designationNormalColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "designationHoverColor": {
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
//     "quoteNormalColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "quoteHoverColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "imageBackground": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "imageBorder": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "imageBorderResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "imageBorder",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "imageMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "imagePadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "bottomSpace": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "imageWidth": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "imageHeight": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "quoteOverride": {
//         "type": "boolean",
//         "default": false,
//         "copyStyle": true
//     },
//     "quotePositionTop": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "quotePositionLeft": {
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
//     "transform": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "mask": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "ratingAlignment": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "ratingColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "ratingColorHover": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "ratingIconSize": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "ratingIconGap": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "ratingMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "condition": {
//         "type": "object",
//         "default": {}
//     }
// },