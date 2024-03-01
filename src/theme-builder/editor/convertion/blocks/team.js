import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex } from '../helper';

const pairs = {
    sg_member_name: 'name',
    sg_member_position: 'job',
    sg_member_description: 'description',
    sg_popup_phone: 'phone',
    sg_popup_email: 'email'
};

export const createTeamBlock = (attrs) => {
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
        showDesc: !isEmpty(attrs?.sg_member_description),
        src: {
            id: attrs?.sg_member_image?.id,
            image: attrs?.sg_member_image?.url
        }
    };

    const socialIconItems = attrs?.sg_social_icon?.map(social => {
        return createBlock(
            'gutenverse/social-icon',
            {
                url: social?.sg_social_link?.url,
                icon: social?.sg_social_icon?.value,
                text: social?.sg_social_label
            }
        );
    });

    const socialIcons = [
        createBlock(
            'gutenverse/social-icons',
            {},
            socialIconItems
        )
    ];

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/team',
        attributes,
        socialIcons
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
//     "profileType": {
//       "type": "string",
//       "default": "default"
//     },
//     "overlayType": {
//       "type": "string"
//     },
//     "overlayPosition": {
//       "type": "string"
//     },
//     "src": {
//       "type": "object"
//     },
//     "nameTag": {
//       "type": "string",
//       "default": "h3"
//     },
//     "lazy": {
//       "type": "boolean",
//       "default": false
//     },
//     "name": {
//       "type": "string",
//       "default": "John Doe"
//     },
//     "job": {
//       "type": "string",
//       "default": "Designer"
//     },
//     "showDesc": {
//       "type": "boolean",
//       "default": false
//     },
//     "description": {
//       "type": "string",
//       "default": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget dignissim quam. Nam posuere velit vitae ultricies commodo."
//     },
//     "phone": {
//       "type": "string",
//       "default": "+12 345 678 90"
//     },
//     "email": {
//       "type": "string",
//       "default": "placeholder@email.com"
//     },
//     "addPopup": {
//       "type": "boolean",
//       "default": false
//     },
//     "showSocial": {
//       "type": "boolean",
//       "default": true
//     },
//     "nameColor": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "nameColorHover": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "nameTypography": {
//       "type": "object",
//       "default": {},
//       "copyStyle": true
//     },
//     "nameTextShadow": {
//       "type": "object",
//       "default": {},
//       "copyStyle": true
//     },
//     "jobColor": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "jobColorHover": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "jobTypography": {
//       "type": "object",
//       "default": {},
//       "copyStyle": true
//     },
//     "jobTextShadow": {
//       "type": "object",
//       "default": {},
//       "copyStyle": true
//     },
//     "descColor": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "descColorHover": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "descTypography": {
//       "type": "object",
//       "default": {},
//       "copyStyle": true
//     },
//     "descTextShadow": {
//       "type": "object",
//       "default": {},
//       "copyStyle": true
//     },
//     "alignment": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "profilePadding": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "detailsPadding": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "profileBorderRadius": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "profileBorderRadiusResponsive": {
//       "type": "object",
//       "migrate": {
//         "attr": "profileBorderRadius",
//         "type": "border"
//       },
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
//     "profileBackground": {
//       "type": "object",
//       "default": {},
//       "copyStyle": true
//     },
//     "profileBackgroundHover": {
//       "type": "object",
//       "default": {},
//       "copyStyle": true
//     },
//     "profileBorder": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "profileBorderResponsive": {
//       "type": "object",
//       "migrate": {
//         "attr": "profileBorder",
//         "type": "border"
//       },
//       "copyStyle": true
//     },
//     "profileBoxShadow": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "profileBorderHover": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "profileBorderHoverResponsive": {
//       "type": "object",
//       "migrate": {
//         "attr": "profileBorderHover",
//         "type": "border"
//       },
//       "copyStyle": true
//     },
//     "profileBoxShadowHover": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "imageBorder": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "imageBorderResponsive": {
//       "type": "object",
//       "migrate": {
//         "attr": "imageBorder",
//         "type": "border"
//       },
//       "copyStyle": true
//     },
//     "imageBoxShadow": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "imageBorderHover": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "imageBorderHoverResponsive": {
//       "type": "object",
//       "migrate": {
//         "attr": "imageBorderHover",
//         "type": "border"
//       },
//       "copyStyle": true
//     },
//     "imageBoxShadowHover": {
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
//     "imgWidth": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "imgHeight": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "imgRotate": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "imgSpacing": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "hoverPadding": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "hoverBottom": {
//       "type": "boolean",
//       "default": false,
//       "copyStyle": true
//     },
//     "hoverBottomColor": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "hoverBottomDirection": {
//       "type": "string",
//       "default": "left",
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
//     "hoverBgColor": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "nameSpace": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "jobSpace": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "descSpace": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "hoverContentBgColor": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "hoverContentBorder": {
//       "type": "object",
//       "copyStyle": true
//     },
//     "hoverContentBorderResponsive": {
//       "type": "object",
//       "migrate": {
//         "attr": "hoverContentBorder",
//         "type": "border"
//       },
//       "copyStyle": true
//     },
//     "hoverContentShadow": {
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