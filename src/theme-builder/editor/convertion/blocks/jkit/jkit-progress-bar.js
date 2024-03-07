import { createBlock } from '@wordpress/blocks';
import { getAttrBackground, getAttrBorder, getAttrBorderResponsive, getValueResponsive, getAttrMargin, getAttrPadding, getAttrPositioning, getValueUnitPoint, getAttrZIndex, getValueRange, getBlockAttributes, getValueDimension } from '../../helper';

export const createJkitProgressBarBlock = (attrs) => {
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
            id: 'space',
            value: ({ attrs }) => getValueResponsive(attrs, 'space', getValueUnitPoint)
        },
        {
            id: 'percentage',
            value: ({ attrs }) => getValueRange(attrs, 'sg_progress_percentage')
        },
        {
            id: 'duration',
            value: ({ attrs }) => getValueRange(attrs, 'sg_progress_duration')
        },
        {
            id: 'trackHeight',
            value: ({ attrs }) => getValueResponsive(attrs, 'st_bar_height_responsive', getValueRange)
        },
        {
            id: 'barRadius',
            value: ({ attrs }) => getValueResponsive(attrs, 'st_bar_border_radius_responsive', getValueDimension)
        },
        {
            id: 'trackRadius',
            value: ({ attrs }) => getValueResponsive(attrs, 'st_track_border_radius_responsive', getValueDimension)
        },
        {
            id: 'title',
            value: ({ attrs }) => attrs?.sg_progress_title
        },
        {
            id: 'style',
            value: ({ attrs }) => attrs?.sg_progress_style
        },
        {
            id: 'barColor',
            value: ({ attrs }) => attrs?.st_bar_background_background_color
        },
        {
            id: 'trackColor',
            value: ({ attrs }) => attrs?.st_track_background_background_color
        },
        {
            id: 'titleColor',
            value: ({ attrs }) => attrs?.st_title_color_responsive
        },
        {
            id: 'percentColor',
            value: ({ attrs }) => attrs?.st_percent_color_responsive
        },
        {
            id: 'percentBgColor',
            value: ({ attrs }) => attrs?.st_percent_background
        },
        {
            id: 'titleTypography',
            value: ({ attrs }) => attrs?.st_title_typography_content_typography_typography
        },
        {
            id: 'percentTypography',
            value: ({ attrs }) => attrs?.st_percent_typography_content_typography_typography
        },
    ];

    return createBlock(
        'gutenverse/progress-bar',
        getBlockAttributes(list, attrs)
    );
};
