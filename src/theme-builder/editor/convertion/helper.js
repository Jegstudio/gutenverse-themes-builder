import { hexToRgb } from "gutenverse-core/editor-helper";
import isEmpty from "lodash/isEmpty";

export const getAttributes = (data) => {
    if (isEmpty(data?.settings)) {
        return {};
    }

    const attrs = data?.settings;

    if (!isEmpty(attrs?.__globals__)) {
        Object.keys(attrs?.__globals__).map(key => {
            if (attrs?.__globals__[key].includes('globals\/colors?id=')) { // eslint-disable-line no-useless-escape
                attrs[key] = {
                    type: 'variable',
                    id: attrs?.__globals__[key].replace('globals\/colors?id=', '') // eslint-disable-line no-useless-escape
                };
            }

            if (attrs?.__globals__[key].includes('globals\/typography?id=')) { // eslint-disable-line no-useless-escape
                attrs[key] = {
                    type: 'variable',
                    id: attrs?.__globals__[key].replace('globals\/typography?id=', '') // eslint-disable-line no-useless-escape
                };
            }
        });
    }

    return attrs;
};

export const getValueNormal = (attrs, key) => {
    return attrs?.[key];
}

export const getValueRange = (attrs, key) => {
    return attrs?.[`${key}`]?.size;
}

export const getValueUnitPoint = (attrs, key) => {
    return {
        unit: attrs?.[`${key}`]?.unit,
        point: attrs?.[`${key}`]?.size
    };
}

export const getValueDimension = (attrs, key) => {
    return {
        unit: attrs?.[`${key}`]?.unit,
        dimension: {
            top: attrs?.[`${key}`]?.top,
            right: attrs?.[`${key}`]?.right,
            bottom: attrs?.[`${key}`]?.bottom,
            left: attrs?.[`${key}`]?.left
        }
    };
}

export const getValueIcon = (attrs, key) => {
    return attrs?.[key]?.value?.replace('jki jki', 'gtn gtn');
}

export const getValueResponsive = (attrs, key, callback = () => { }) => {
    let result = {};

    if (attrs?.[`${key}`]) {
        result['Desktop'] = callback(attrs, `${key}`);
    }

    if (attrs?.[`${key}_tablet`]) {
        result['Tablet'] = callback(attrs, `${key}_tablet`);
    }

    if (attrs?.[`${key}_mobile`]) {
        result['Mobile'] = callback(attrs, `${key}_mobile`);
    }

    return result
}

export const getAttrMargin = ({ attrs, name = 'margin', prefix = '' }) => {
    return getValueResponsive(attrs, `${prefix}margin`, getValueDimension);
};

export const getAttrPadding = ({ attrs, name = 'padding', prefix = '' }) => {
    return getValueResponsive(attrs, `${prefix}padding`, getValueDimension);
};

export const getAttrZIndex = ({ attrs, name = 'zIndex', prefix = '' }) => {
    return getValueResponsive(attrs, `${prefix}z_index`, getValueNormal);
};

export const getAttrBorderResponsive = ({ attrs, name = 'borderResponsive', prefix = '' }) => {
    const result = {
        Tablet: {},
        Mobile: {}
    };

    if (attrs?.[`${prefix}border_radius_tablet`]) {
        result['Tablet'] = {
            radius: getValueDimension(attrs, `${prefix}border_radius_tablet`)
        };
    }

    if (attrs?.[`${prefix}border_radius_mobile`]) {
        result['Mobile'] = {
            radius: getValueDimension(attrs, `${prefix}border_radius_mobile`)
        };
    }

    if (attrs?.[`${prefix}border_border`]) {

        if (attrs?.[`${prefix}border_width_tablet`]) {

            if (isEmpty(attrs?.[`${prefix}border_width_tablet`]?.isLinked)) {
                result['Tablet'] = {
                    ...result['Tablet'],
                    top: {
                        type: attrs?.[`${prefix}border_border`]
                    },
                    right: {
                        type: attrs?.[`${prefix}border_border`]
                    },
                    bottom: {
                        type: attrs?.[`${prefix}border_border`]
                    },
                    left: {
                        type: attrs?.[`${prefix}border_border`]
                    }
                }

                if (attrs?.[`${prefix}border_color`]) {
                    result['Tablet']['top'] = {
                        ...result['Tablet']['top'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result['Tablet']['right'] = {
                        ...result['Tablet']['right'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result['Tablet']['bottom'] = {
                        ...result['Tablet']['bottom'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result['Tablet']['left'] = {
                        ...result['Tablet']['left'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }
                }

                result['Tablet']['top'] = {
                    ...result['Tablet']['top'],
                    width: attrs?.[`${prefix}border_width_tablet`]?.top
                }

                result['Tablet']['right'] = {
                    ...result['Tablet']['right'],
                    width: attrs?.[`${prefix}border_width_tablet`]?.right
                }

                result['Tablet']['bottom'] = {
                    ...result['Tablet']['bottom'],
                    width: attrs?.[`${prefix}border_width_tablet`]?.bottom
                }

                result['Tablet']['left'] = {
                    ...result['Tablet']['left'],
                    width: attrs?.[`${prefix}border_width_tablet`]?.left
                }
            } else {
                result['Tablet'] = {
                    all: {
                        type: attrs?.[`${prefix}border_border`]
                    }
                };

                if (attrs?.[`${prefix}border_color`]) {
                    result['Tablet']['all'] = {
                        ...result['Tablet']['all'],
                        color: hexToRgb(attrs?.[`${prefix}border_color`])
                    }
                }

                result['Tablet']['all'] = {
                    ...result['Tablet']['all'],
                    width: attrs?.[`${prefix}border_width_tablet`]?.top
                }
            }
        }

        if (attrs?.[`${prefix}border_width_mobile`]) {

            if (isEmpty(attrs?.[`${prefix}border_width_mobile`]?.isLinked)) {
                result['Mobile'] = {
                    ...result['Mobile'],
                    top: {
                        type: attrs?.[`${prefix}border_border`]
                    },
                    right: {
                        type: attrs?.[`${prefix}border_border`]
                    },
                    bottom: {
                        type: attrs?.[`${prefix}border_border`]
                    },
                    left: {
                        type: attrs?.[`${prefix}border_border`]
                    }
                }

                if (attrs?.[`${prefix}border_color`]) {
                    result['Mobile']['top'] = {
                        ...result['Mobile']['top'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result['Mobile']['right'] = {
                        ...result['Mobile']['right'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result['Mobile']['bottom'] = {
                        ...result['Mobile']['bottom'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result['Mobile']['left'] = {
                        ...result['Mobile']['left'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }
                }

                result['Mobile']['top'] = {
                    ...result['Mobile']['top'],
                    width: attrs?.[`${prefix}border_width_mobile`]?.top
                }

                result['Mobile']['right'] = {
                    ...result['Mobile']['right'],
                    width: attrs?.[`${prefix}border_width_mobile`]?.right
                }

                result['Mobile']['bottom'] = {
                    ...result['Mobile']['bottom'],
                    width: attrs?.[`${prefix}border_width_mobile`]?.bottom
                }

                result['Mobile']['left'] = {
                    ...result['Mobile']['left'],
                    width: attrs?.[`${prefix}border_width_mobile`]?.left
                }
            } else {
                result['Mobile'] = {
                    all: {
                        type: attrs?.[`${prefix}border_border`]
                    }
                };

                if (attrs?.[`${prefix}border_color`]) {
                    result['Mobile']['all'] = {
                        ...result['Mobile']['all'],
                        color: hexToRgb(attrs?.[`${prefix}border_color`])
                    }
                }

                result['Mobile']['all'] = {
                    ...result['Mobile']['all'],
                    width: attrs?.[`${prefix}border_width_mobile`]?.top
                }
            }
        }
    }
}

export const getAttrBorder = ({ attrs, name = 'border', prefix = '' }) => {
    let result = {};

    if (attrs?.[`${prefix}border_radius`]) {
        result = {
            radius: getValueResponsive(attrs, `${prefix}border_radius`, getValueDimension)
        };
    }

    if (attrs?.[`${prefix}border_border`]) {

        if (attrs?.[`${prefix}border_width`]) {
            if (isEmpty(attrs?.[`${prefix}border_width`]?.isLinked)) {
                result = {
                    ...result,
                    top: {
                        type: attrs?.[`${prefix}border_border`]
                    },
                    right: {
                        type: attrs?.[`${prefix}border_border`]
                    },
                    bottom: {
                        type: attrs?.[`${prefix}border_border`]
                    },
                    left: {
                        type: attrs?.[`${prefix}border_border`]
                    }
                }

                if (attrs?.[`${prefix}border_color`]) {
                    result['top'] = {
                        ...result['top'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result['right'] = {
                        ...result['right'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result['bottom'] = {
                        ...result['bottom'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result['left'] = {
                        ...result['left'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }
                }

                result['top'] = {
                    ...result['top'],
                    width: attrs?.[`${prefix}border_width`]?.top
                }

                result['right'] = {
                    ...result['right'],
                    width: attrs?.[`${prefix}border_width`]?.right
                }

                result['bottom'] = {
                    ...result['bottom'],
                    width: attrs?.[`${prefix}border_width`]?.bottom
                }

                result['left'] = {
                    ...result['left'],
                    width: attrs?.[`${prefix}border_width`]?.left
                }
            } else {
                result = {
                    all: {
                        type: attrs?.[`${prefix}border_border`]
                    }
                };

                if (attrs?.[`${prefix}border_color`]) {
                    result['all'] = {
                        ...result['all'],
                        color: hexToRgb(attrs?.[`${prefix}border_color`])
                    }
                }

                result['all'] = {
                    ...result['all'],
                    width: attrs?.[`${prefix}border_width`]?.top
                }
            }
        }
    }

    return result;
}

export const getAttrBackground = ({ attrs, name = 'background', prefix = '' }) => {
    let result = {};

    result = {
        type: 'default',
        color: attrs?.[`${prefix}background_color`]?.type === 'variable' ? attrs?.[`${prefix}background_color`] : hexToRgb(attrs?.[`${prefix}background_color`]),
        image: {}
    }

    if (attrs?.[`${prefix}background_background`] === 'classic') {
        if (attrs?.[`${prefix}background_image`]) {
            result['image'] = {
                Desktop: {
                    id: attrs?.[`${prefix}background_image`]?.id,
                    image: attrs?.[`${prefix}background_image`]?.url,
                }
            }
        }

        if (attrs?.[`${prefix}background_image_tablet`]) {
            result['image'] = {
                Tablet: {
                    id: attrs?.[`${prefix}background_image_tablet`]?.id,
                    image: attrs?.[`${prefix}background_image_tablet`]?.url,
                }
            }
        }

        if (attrs?.[`${prefix}background_image_mobile`]) {
            result['image'] = {
                Mobile: {
                    id: attrs?.[`${prefix}background_image_mobile`]?.id,
                    image: attrs?.[`${prefix}background_image_mobile`]?.url,
                }
            }
        }
    }

    return result;
}

export const getAttrBoxShadow = ({ attrs, name = 'boxShadow', prefix = '' }) => {
    let result = {};

    if (attrs?.[`${prefix}box_shadow_type`] === 'yes') {
        const color = attrs?.[`${prefix}box_shadow`]?.color?.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',');

        result = {
            color: {
                r: color[0],
                g: color[1],
                b: color[2],
                a: color[3]
            },
            horizontal: attrs?.[`${prefix}box_shadow`]?.horizontal,
            vertical: attrs?.[`${prefix}box_shadow`]?.vertical,
            blur: attrs?.[`${prefix}box_shadow`]?.blur,
            spread: attrs?.[`${prefix}box_shadow`]?.spread,
        }
    }

    return result;
}

export const getAttrPositioning = ({ attrs }) => {
    let result = {};

    if (attrs?._element_width) {
        result['positioningType'] = {
            Desktop: attrs?._element_width === 'auto' ? 'inline' : 'default',
        };
    }

    if (attrs?._element_custom_width) {
        result['positioningType'] = {
            Desktop: 'custom',
        };

        result['positioningWidth'] = getValueResponsive(attrs, '_element_custom_width', getValueUnitPoint);
    }

    if (attrs?._position) {
        result['positioningLocation'] = attrs?._position;
    }

    result['positioningTop'] = getValueResponsive(attrs, '_offset_y', getValueUnitPoint);
    result['positioningRight'] = getValueResponsive(attrs, '_offset_x_end', getValueUnitPoint);
    result['positioningBottom'] = getValueResponsive(attrs, '_offset_y_end', getValueUnitPoint);
    result['positioningLeft'] = getValueResponsive(attrs, '_offset_x', getValueUnitPoint);


    return result;
}


export const getBlockAttributes = (list, attrs) => {
    let attributes = {};

    list.map(({ value, ...data }) => {
        if (data?.multi) {
            attributes = {
                ...attributes,
                ...value({ attrs, ...data })
            };
        } else {
            attributes[data?.id] = value({ attrs, ...data });
        }
    });

    return attributes;
}