import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes, getValueIcon } from '../../helper';

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
