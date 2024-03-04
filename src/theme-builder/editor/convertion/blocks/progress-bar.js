import { createBlock } from '@wordpress/blocks';
import isEmpty from 'lodash/isEmpty';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getValueResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getValueUnitPoint, getAttrZIndex, getValueRange } from '../helper';

const pairs = {
    sg_progress_title: 'title',
    sg_progress_style: 'style',
};

export const createProgressBarBlock = (attrs) => {
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
        space: getValueResponsive(attrs, 'space', getValueUnitPoint),
        percentage: getValueRange(attrs, 'sg_progress_percentage'),
        duration: getValueRange(attrs, 'sg_progress_duration')
    };

    Object.keys(attrs).map(key => {
        if (!isEmpty(pairs[key])) {
            attributes[pairs[key]] = attrs[key];
        }
    });

    return createBlock(
        'gutenverse/progress-bar',
        attributes
    );
};
