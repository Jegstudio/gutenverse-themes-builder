import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getAttrZIndex } from '../helper';

const pairs = {};

export const createTestimonialsBlock = (attrs) => {
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
        testimonialData: attrs?.sg_testimonials_list?.map(data => {
            return {
                name: data?.sg_testimonials_list_client_name,
                description: data?.sg_testimonials_list_designation,
                comment: data?.sg_testimonials_list_review,
                src: {
                    id: data?.sg_testimonials_list_client_avatar?.id,
                    image: data?.sg_testimonials_list_client_avatar?.url
                },
                rating: 5,
            };
        }),
        contentType: parseInt(attrs?.sg_layout_testimonial_choose?.replace('style-', ''))
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/testimonials',
        attributes
    );
};
