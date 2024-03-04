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

