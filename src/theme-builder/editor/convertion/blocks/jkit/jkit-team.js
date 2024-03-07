import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrBoxShadow, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes, getValueIcon, getValueResponsive, getValueUnitPoint } from '../../helper';

export const createJkitTeamBlock = (attrs) => {
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
            id: 'showDesc',
            value: ({ attrs }) => !isEmpty(attrs?.sg_member_description)
        },
        {
            id: 'src',
            value: ({ attrs }) => ({
                id: attrs?.sg_member_image?.id,
                image: attrs?.sg_member_image?.url
            })
        },
        {
            id: 'profileType',
            value: ({attrs}) => attrs?.sg_member_style
        },
        {
            id: 'name',
            value: ({attrs}) => attrs?.sg_member_name
        },
        {
            id: 'job',
            value: ({attrs}) => attrs?.sg_member_position
        },
        {
            id: 'description',
            value: ({attrs}) => attrs?.sg_member_description
        },
        {
            id: 'phone',
            value: ({attrs}) => attrs?.sg_popup_phone
        },
        {
            id: 'email',
            value: ({attrs}) => attrs?.sg_popup_email
        },
        {
            id: 'nameColor',
            value: ({attrs}) => attrs?.st_name_normal_color_responsive
        },
        {
            id: 'descColor',
            value: ({attrs}) => attrs?.st_description_normal_color_responsive
        },
        {
            id: 'jobColor',
            value: ({attrs}) => attrs?.st_position_normal_color_responsive
        },
        {
            id: 'nameTypography',
            value: ({attrs}) => attrs?.st_description_typography_content_typography_typography
        },
        {
            id: 'descTypography',
            value: ({attrs}) => attrs?.st_name_typography_content_typography_typography
        },
        {
            id: 'jobTypography',
            value: ({attrs}) => attrs?.st_position_typography_content_typography_typography
        },
        {
            id: 'profileBackground',
            prefix: 'st_content_normal_background_',
            value: getAttrBackground
        },
        {
            id: 'profileBackgroundHover',
            prefix: 'st_content_hover_background_',
            value: getAttrBackground
        },
        {
            id: 'imgWidth',
            value: ({ attrs }) => getValueResponsive(attrs, 'st_image_width_responsive', getValueUnitPoint)
        },
        {
            id: 'imgHeight',
            value: ({ attrs }) => getValueResponsive(attrs, 'st_image_height_responsive', getValueUnitPoint)
        },
        {
            id: 'overlayPosition',
            value: ({attrs}) => attrs?.sg_member_overlay_content_alignment
        },
        {
            id: 'nameTag',
            value: ({attrs}) => attrs?.sg_member_html_tag
        },
        {
            id: 'showSocial',
            value: ({attrs}) => 'yes' === attrs?.sg_social_show
        },
        {
            id: 'showDescription',
            value: ({attrs}) => 'yes' === attrs?.sg_description_show
        }
    ];

    const socialIconsInnerBlocks = attrs?.sg_social_icon?.map(social => {
        return createBlock(
            'gutenverse/social-icon',
            {
                url: social?.sg_social_link?.url,
                icon: getValueIcon(social, 'sg_social_icon'),
                text: social?.sg_social_label
            }
        );
    });

    const innerBlocks = [
        createBlock(
            'gutenverse/social-icons',
            {},
            socialIconsInnerBlocks
        )
    ];

    return createBlock(
        'gutenverse/team',
        getBlockAttributes(list, attrs),
        innerBlocks
    );
};
