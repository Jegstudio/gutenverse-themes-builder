import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrBoxShadow, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes, getValueRange, getValueResponsive } from '../../helper';

export const createJkitPostBlockBlock = (attrs) => {
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
            id: 'postblockType',
            value: ({attrs}) => attrs?.sg_content_postblock_type
        },
        {
            id: 'excerptEnabled',
            value: ({attrs}) => attrs?.sg_content_excerpt_enable === 'yes'
        },
        {
            id: 'excerptMore',
            value: ({attrs}) => attrs?.sg_content_excerpt_more
        },
        {
            id: 'readmoreEnabled',
            value: ({attrs}) => attrs?.sg_content_readmore_enable === 'yes'
        },
        {
            id: 'readmoreMore',
            value: ({attrs}) => attrs?.sg_content_readmore_more
        },
        {
            id: 'commentEnabled',
            value: ({attrs}) => attrs?.sg_content_comment_enable === 'yes'
        },
        {
            id: 'metaEnabled',
            value: ({attrs}) => attrs?.sg_content_meta_enable === 'yes'
        },
        {
            id: 'metaAuthorByText',
            value: ({attrs}) => attrs?.sg_content_meta_author_by_text
        },
        {
            id: 'metaDateFormat',
            value: ({attrs}) => attrs?.sg_content_meta_date_format_custom
        },
        {
            id: 'paginationLoadmoreText',
            value: ({attrs}) => attrs?.pagination_loadmore_text
        },
        {
            id: 'paginationLoadingText',
            value: ({attrs}) => attrs?.pagination_loading_text
        },
        {
            id: 'numberPost',
            value: ({attrs}) => getValueRange(attrs, 'number_post')
        },
        {
            id: 'column',
            value: ({attrs}) => getValueResponsive(attrs, 'sg_content_column_responsive', getValueRange)
        },
    ];

    return createBlock(
        'gutenverse/post-block',
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
//     "inheritQuery": {
//         "type": "boolean",
//         "default": true
//     },
//     "postType": {
//         "type": "string",
//         "default": "post"
//     },
//     "numberPost": {
//         "type": "string",
//         "default": 3
//     },
//     "postOffset": {
//         "type": "string",
//         "default": 0
//     },
//     "column": {
//         "type": "object",
//         "default": {}
//     },
//     "includePost": {
//         "type": "array",
//         "default": []
//     },
//     "excludePost": {
//         "type": "array",
//         "default": []
//     },
//     "includeCategory": {
//         "type": "array",
//         "default": []
//     },
//     "excludeCategory": {
//         "type": "array",
//         "default": []
//     },
//     "includeAuthor": {
//         "type": "array",
//         "default": []
//     },
//     "includeTag": {
//         "type": "array",
//         "default": []
//     },
//     "excludeTag": {
//         "type": "array",
//         "default": []
//     },
//     "sortBy": {
//         "type": "string"
//     },
//     "htmlTag": {
//         "type": "string",
//         "default": "h3"
//     },
//     "categoryEnabled": {
//         "type": "boolean",
//         "default": true
//     },
//     "categoryPosition": {
//         "type": "string",
//         "default": "center"
//     },
//     "excerptEnabled": {
//         "type": "boolean",
//         "default": true
//     },
//     "excerptLength": {
//         "type": "string",
//         "default": 20
//     },
//     "excerptMore": {
//         "type": "string",
//         "default": "..."
//     },
//     "readmoreEnabled": {
//         "type": "boolean",
//         "default": true
//     },
//     "readmoreIcon": {
//         "type": "string",
//         "default": "fas fa-arrow-right"
//     },
//     "readmoreIconPosition": {
//         "type": "string",
//         "default": "after"
//     },
//     "readmoreText": {
//         "type": "string",
//         "default": "Read More"
//     },
//     "commentEnabled": {
//         "type": "boolean",
//         "default": false
//     },
//     "commentIcon": {
//         "type": "string",
//         "default": "fas fa-comment"
//     },
//     "commentIconPosition": {
//         "type": "string",
//         "default": "before"
//     },
//     "metaEnabled": {
//         "type": "boolean",
//         "default": true
//     },
//     "metaAuthorEnabled": {
//         "type": "boolean",
//         "default": true
//     },
//     "metaAuthorByText": {
//         "type": "string",
//         "default": "by"
//     },
//     "metaAuthorIcon": {
//         "type": "string",
//         "default": "fas fa-user"
//     },
//     "metaAuthorIconPosition": {
//         "type": "string",
//         "default": "before"
//     },
//     "metaDateEnabled": {
//         "type": "boolean",
//         "default": true
//     },
//     "metaDateType": {
//         "type": "string",
//         "default": "published"
//     },
//     "metaDateFormat": {
//         "type": "string",
//         "default": "default"
//     },
//     "metaDateFormatCustom": {
//         "type": "string",
//         "default": ""
//     },
//     "metaDateIcon": {
//         "type": "string",
//         "default": "fas fa-clock"
//     },
//     "metaDateIconPosition": {
//         "type": "string",
//         "default": "before"
//     },
//     "postblockType": {
//         "type": "string",
//         "default": "type-1"
//     },
//     "breakpoint": {
//         "type": "string",
//         "default": "tablet"
//     },
//     "noContentText": {
//         "type": "string",
//         "default": "No Content"
//     },
//     "paginationMode": {
//         "type": "string",
//         "default": "disable"
//     },
//     "paginationLoadmoreText": {
//         "type": "string",
//         "default": "Load More"
//     },
//     "paginationLoadingText": {
//         "type": "string",
//         "default": "Loading..."
//     },
//     "paginationNumberPost": {
//         "type": "string",
//         "default": 3
//     },
//     "paginationScrollLimit": {
//         "type": "string",
//         "default": 0
//     },
//     "paginationIcon": {
//         "type": "string",
//         "default": ""
//     },
//     "paginationIconPosition": {
//         "type": "string",
//         "default": "before",
//         "copyStyle": true
//     },
//     "postItemGap": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "postItemBackground": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "postItemMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "postItemPadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "postItemBorder": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "postItemBorderResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "postItemBorder",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "postItemBoxShadow": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "thumbnailWidth": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "thumbnailBackground": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "thumbnailOverlayOpacity": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "thumbnailMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "thumbnailPadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "thumbnailBorder": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "thumbnailBorderResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "thumbnailBorder",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "thumbnailBoxShadow": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "thumbnailHeight": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "thumbnailContainerBackground": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "thumbnailRadius": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "thumbnailContainerShadow": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "contentAlign": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "contentContainerBackground": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "contentMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "contentPadding": {
//         "type": "object",
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
//     "contentContainerShadow": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "categoryColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "categoryTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "categoryBackground": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "categoryMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "categoryPadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "categoryBorder": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "categoryBorderResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "categoryBorder",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "categoryShadow": {
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
//     "titleTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleColorHover": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "titleTypographyHover": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "excerptMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "excerptColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "excerptTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "readmoreTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "readmoreMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "readmorePadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "readmoreSpacing": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "readmoreIconSize": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "readmoreColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "readmoreHoverColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "readmoreBackground": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "readmoreHoverBackground": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "readmoreBorder": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "readmoreBorderResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "readmoreBorder",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "readmoreHoverBorder": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "readmoreHoverBorderResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "readmoreHoverBorder",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "readmoreShadow": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "readmoreHoverShadow": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "commentColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "commentSize": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "commentSpacing": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "commentMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "commentPadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "metaTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "metaColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "metaAuthorTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "metaAuthorColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "metaMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "metaAuthorIconSpacing": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "metaDateIconSpacing": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "paginationTypography": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "paginationMargin": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "lazyLoad": {
//         "type": "boolean",
//         "default": false
//     },
//     "paginationPadding": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "paginationWidth": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "paginationIconSpacing": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "paginationIconSize": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "paginationAlign": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "paginationColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "paginationHoverColor": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "paginationBackground": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "paginationHoverBackground": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "paginationBorder": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "paginationBorderResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "paginationBorder",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "paginationHoverBorder": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "paginationHoverBorderResponsive": {
//         "type": "object",
//         "migrate": {
//             "attr": "paginationHoverBorder",
//             "type": "border"
//         },
//         "copyStyle": true
//     },
//     "paginationShadow": {
//         "type": "object",
//         "copyStyle": true
//     },
//     "paginationHoverShadow": {
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
//     "condition": {
//         "type": "object",
//         "default": {}
//     }
// },