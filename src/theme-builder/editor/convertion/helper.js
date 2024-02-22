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

export const getValueUnitPoint = (attrs, key) => {
    return {
        unit: attrs?.[`${key}`]?.unit,
        point: attrs?.[`${key}`]?.size
    };
}

export const getDimensionValue = (attrs, key) => {
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

export const getValueResponsive = (attrs, key, callback = () => { }) => {
    const result = {};

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
    return {
        [name]: getValueResponsive(attrs, `${prefix}margin`, getDimensionValue)
    };
};

export const getAttrPadding = ({ attrs, name = 'padding', prefix = '' }) => {
    return {
        [name]: getValueResponsive(attrs, `${prefix}padding`, getDimensionValue)
    };
};

export const getAttrZIndex = ({ attrs, name = 'zIndex', prefix = '' }) => {
    return {
        [name]: getValueResponsive(attrs, `${prefix}z_index`, getValueNormal)
    };
};

export const getAttrBorderResponsive = ({ attrs, name = 'borderResponsive', prefix = '' }) => {
    const result = {
        [name]: {},
    };

    if (attrs?.[`${prefix}border_border`]) {

        if (attrs?.[`${prefix}border_width_tablet`]) {
            if (isEmpty(attrs?.[`${prefix}border_width_tablet`]?.isLinked)) {
                result[name]['Tablet'] = {
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
                    result[name]['Tablet']['top'] = {
                        ...result[name]['Tablet']['top'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result[name]['Tablet']['right'] = {
                        ...result[name]['Tablet']['right'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result[name]['Tablet']['bottom'] = {
                        ...result[name]['Tablet']['bottom'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result[name]['Tablet']['left'] = {
                        ...result[name]['Tablet']['left'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }
                }

                result[name]['Tablet']['top'] = {
                    ...result[name]['Tablet']['top'],
                    width: attrs?.[`${prefix}border_width_tablet`]?.top
                }

                result[name]['Tablet']['right'] = {
                    ...result[name]['Tablet']['right'],
                    width: attrs?.[`${prefix}border_width_tablet`]?.right
                }

                result[name]['Tablet']['bottom'] = {
                    ...result[name]['Tablet']['bottom'],
                    width: attrs?.[`${prefix}border_width_tablet`]?.bottom
                }

                result[name]['Tablet']['left'] = {
                    ...result[name]['Tablet']['left'],
                    width: attrs?.[`${prefix}border_width_tablet`]?.left
                }
            } else {
                result[name]['Tablet'] = {
                    all: {
                        type: attrs?.[`${prefix}border_border`]
                    }
                };

                if (attrs?.[`${prefix}border_color`]) {
                    result[name]['Tablet']['all'] = {
                        ...result[name]['Tablet']['all'],
                        color: hexToRgb(attrs?.[`${prefix}border_color`])
                    }
                }

                result[name]['Tablet']['all'] = {
                    ...result[name]['Tablet']['all'],
                    width: attrs?.[`${prefix}border_width_tablet`]?.top
                }
            }
        }

        if (attrs?.[`${prefix}border_width_mobile`]) {
            if (isEmpty(attrs?.[`${prefix}border_width_mobile`]?.isLinked)) {
                result[name]['Mobile'] = {
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
                    result[name]['Mobile']['top'] = {
                        ...result[name]['Mobile']['top'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result[name]['Mobile']['right'] = {
                        ...result[name]['Mobile']['right'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result[name]['Mobile']['bottom'] = {
                        ...result[name]['Mobile']['bottom'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result[name]['Mobile']['left'] = {
                        ...result[name]['Mobile']['left'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }
                }

                result[name]['Mobile']['top'] = {
                    ...result[name]['Mobile']['top'],
                    width: attrs?.[`${prefix}border_width_mobile`]?.top
                }

                result[name]['Mobile']['right'] = {
                    ...result[name]['Mobile']['right'],
                    width: attrs?.[`${prefix}border_width_mobile`]?.right
                }

                result[name]['Mobile']['bottom'] = {
                    ...result[name]['Mobile']['bottom'],
                    width: attrs?.[`${prefix}border_width_mobile`]?.bottom
                }

                result[name]['Mobile']['left'] = {
                    ...result[name]['Mobile']['left'],
                    width: attrs?.[`${prefix}border_width_mobile`]?.left
                }
            } else {
                result[name]['Mobile'] = {
                    all: {
                        type: attrs?.[`${prefix}border_border`]
                    }
                };

                if (attrs?.[`${prefix}border_color`]) {
                    result[name]['Mobile']['all'] = {
                        ...result[name]['Mobile']['all'],
                        color: hexToRgb(attrs?.[`${prefix}border_color`])
                    }
                }

                result[name]['Mobile']['all'] = {
                    ...result[name]['Mobile']['all'],
                    width: attrs?.[`${prefix}border_width_mobile`]?.top
                }
            }
        }
    }
}

export const getAttrBorder = ({ attrs, name = 'border', prefix = '' }) => {
    const result = {
        [name]: {},
    };

    if (attrs?.[`${prefix}border_border`]) {
        if (attrs?.[`${prefix}border_width`]) {
            if (isEmpty(attrs?.[`${prefix}border_width`]?.isLinked)) {
                result[name]['border'] = {
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
                    result[name]['border']['top'] = {
                        ...result[name]['border']['top'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result[name]['border']['right'] = {
                        ...result[name]['border']['right'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result[name]['border']['bottom'] = {
                        ...result[name]['border']['bottom'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }

                    result[name]['border']['left'] = {
                        ...result[name]['border']['left'],
                        color: attrs?.[`${prefix}border_color`]?.type === 'variable' ? attrs?.[`${prefix}border_color`] : hexToRgb(attrs?.[`${prefix}border_color`])
                    }
                }

                result[name]['border']['top'] = {
                    ...result[name]['border']['top'],
                    width: attrs?.[`${prefix}border_width`]?.top
                }

                result[name]['border']['right'] = {
                    ...result[name]['border']['right'],
                    width: attrs?.[`${prefix}border_width`]?.right
                }

                result[name]['border']['bottom'] = {
                    ...result[name]['border']['bottom'],
                    width: attrs?.[`${prefix}border_width`]?.bottom
                }

                result[name]['border']['left'] = {
                    ...result[name]['border']['left'],
                    width: attrs?.[`${prefix}border_width`]?.left
                }
            } else {
                result[name]['border'] = {
                    all: {
                        type: attrs?.[`${prefix}border_border`]
                    }
                };

                if (attrs?.[`${prefix}border_color`]) {
                    result[name]['border']['all'] = {
                        ...result[name]['border']['all'],
                        color: hexToRgb(attrs?.[`${prefix}border_color`])
                    }
                }

                result[name]['border']['all'] = {
                    ...result[name]['border']['all'],
                    width: attrs?.[`${prefix}border_width`]?.top
                }
            }
        }
    }

    return result;
}

export const getAttrBackground = ({ attrs, name = 'background', prefix = '' }) => {
    const result = {
        [name]: {}
    };

    if (attrs?.[`${prefix}background_background`] === 'classic') {
        result[name] = {
            type: 'default',
            color: attrs?.[`${prefix}background_color`]?.type === 'variable' ? attrs?.[`${prefix}background_color`] : hexToRgb(attrs?.[`${prefix}background_color`]),
            image: {}
        }

        if (attrs?.[`${prefix}background_image`]) {
            result[name]['image'] = {
                Desktop: {
                    id: attrs?.[`${prefix}background_image`]?.id,
                    image: attrs?.[`${prefix}background_image`]?.url,
                }
            }
        }

        if (attrs?.[`${prefix}background_image_tablet`]) {
            result[name]['image'] = {
                Tablet: {
                    id: attrs?.[`${prefix}background_image_tablet`]?.id,
                    image: attrs?.[`${prefix}background_image_tablet`]?.url,
                }
            }
        }

        if (attrs?.[`${prefix}background_image_mobile`]) {
            result[name]['image'] = {
                Mobile: {
                    id: attrs?.[`${prefix}background_image_mobile`]?.id,
                    image: attrs?.[`${prefix}background_image_mobile`]?.url,
                }
            }
        }
    }

    return result;
}

export const getAttrPositioning = ({ attrs }) => {
    const result = {};

    if (attrs?._element_width) {
        result['positioningType'] = {
            Desktop: attrs?._element_width === 'auto' ? 'inline' : 'default',
        };
    }

    return result;
}
