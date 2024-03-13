import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrBoxShadow, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes, getValueIcon } from '../../helper';

export const createJkitAccordionsBlock = (attrs) => {
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
            id: 'titleTextColor',
            value: ({attrs}) => attrs?.st_title_close_color_responsive
        },
        {
            id: 'titleActiveColor',
            value: ({attrs}) => attrs?.st_title_open_color_responsive
        },
        {
            id: 'titleTypography',
            value: ({attrs}) => attrs?.st_title_typography_content_typography_typography
        },
        {
            id: 'contentTextColor',
            value: ({attrs}) => attrs?.st_description_color_responsive
        },
        {
            id: 'contentTypography',
            value: ({attrs}) => attrs?.st_description_typography_content_typography_typography
        },
        {
            id: 'iconClosed',
            value: ({attrs}) => getValueIcon(attrs, 'sg_icon_right')
        },
        {
            id: 'iconOpen',
            value: ({attrs}) => getValueIcon(attrs, 'sg_icon_right_active')
        }
    ];

    const innerBlocks = [];

    attrs?.sg_accordion_list?.map(list => {
        const contentBlocks = [
            createBlock(
                'core/paragraph',
                {
                    content: list?.sg_accordion_list_content,
                }
            )
        ];

        innerBlocks.push(
            createBlock(
                'gutenverse/accordion',
                {
                    title: list?.sg_accordion_list_title,
                    first: list?.sg_accordion_list_open === 'yes'
                },
                contentBlocks
            )
        );
    });

    return createBlock(
        'gutenverse/accordions',
        getBlockAttributes(list, attrs),
        innerBlocks
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
//     "iconOpen": {
//         "type": "string",
//         "default": "fas fa-minus",
//         "copyStyle": true
//     },
//     "iconClosed": {
//         "type": "string",
//         "default": "fas fa-plus",
//         "copyStyle": true
//     },
//     "iconPosition": {
//         "type": "string",
//         "default": "left",
//         "copyStyle": true
//     },
//     "iconColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconActiveColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconSpacing": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconSize": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleTag": {
//         "type": "string",
//         "default": "span"
//     },
//     "titleBackgroundColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleTextColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleActiveColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titlePadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "borderWidth": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "borderColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "contentBackgroundColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "contentTextColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "contentTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "contentPadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "accordionBorder": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "accordionBorderResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "accordionBorder",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "titleBorder": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleBorderResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "titleBorder",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "contentBorder": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "contentBorderResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "contentBorder",
//             "type": "border"
//         },
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
//     "advanceAnimation": {
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
//     "accordionBorderActive": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "accordionBorderActiveResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "accordionBorderActive",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "accordionMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "contentBackgroundColorActive": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "contentTextColorActive": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "contentBorderActive": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "contentBorderActiveResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "contentBorderActive",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "titleBackgroundActiveColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleBorderActive": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleBorderActiveResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "titleBorderActive",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "accordionBoxShadow": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "accordionBoxShadowActive": {
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
//     "iconMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconPadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconActiveSize": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconBackground": {
//         "type": "object",
//         "default": {},
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
//     "iconActiveBackground": {
//         "type": "object",
//         "default": {},
//         "copyStyle": true
//     },
//     "iconActiveBorder": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "iconActiveBorderResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "iconActiveBorder",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "iconActiveBoxShadow": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "condition": {
//         "type": "object",
//         "default": {}
//     }
// },