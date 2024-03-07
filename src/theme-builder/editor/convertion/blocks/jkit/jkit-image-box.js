import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrBoxShadow, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex, getBlockAttributes, getValueDimension, getValueNormal, getValueResponsive } from '../../helper';

export const createJkitImageBoxBlock = (attrs) => {
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
            id: 'bodyBackground',
            prefix: 'st_body_type_',
            value: getAttrBackground
        },
        {
            id: 'image',
            value: ({ attrs }) => ({
                media: {
                    imageId: attrs?.sg_image_choose?.id,
                    sizes: {
                        full: attrs?.sg_image_choose
                    }
                }
            })
        },
        {
            id: 'bodyAlignment',
            value: ({ attrs }) => getValueResponsive(attrs, 'sg_body_alignment_responsive', getValueNormal)
        },
        {
            id: 'imageBorderRadius',
            value: ({ attrs }) => getValueDimension(attrs, 'st_image_border_radius_responsive')
        },
        {
            id: 'title',
            value: ({ attrs }) => attrs?.sg_body_title
        },
        {
            id: 'description',
            value: ({ attrs }) => attrs?.sg_body_description
        },
        {
            id: 'titleTag',
            value: ({ attrs }) => attrs?.sg_body_title_tag
        },
        {
            id: 'titleTypography',
            value: ({ attrs }) => attrs?.st_body_title_typography_content_typography_typography
        },
        {
            id: 'descriptionTypography',
            value: ({ attrs }) => attrs?.st_body_description_typography_content_typography_typography
        },
        {
            id: 'titleNormalColor',
            value: ({ attrs }) => attrs?.st_body_title_normal_color_responsive
        },
        {
            id: 'descriptionNormalColor',
            value: ({ attrs }) => attrs?.st_body_description_normal_color_responsive
        },
        {
            id: 'titleHoverColor',
            value: ({ attrs }) => attrs?.st_body_title_hover_color_responsive
        },
        {
            id: 'descriptionHoverColor',
            value: ({ attrs }) => attrs?.st_body_description_hover_color_responsive
        },
    ];

    const innerBlocks = [
        createBlock(
            'gutenverse/button',
            {
                content: attrs?.sg_button_label,
                alignButton: getValueResponsive(attrs, 'sg_body_alignment_responsive', getValueNormal)
            }
        )
    ];

    return createBlock(
        'gutenverse/image-box',
        getBlockAttributes(list, attrs),
        innerBlocks
    );
};
