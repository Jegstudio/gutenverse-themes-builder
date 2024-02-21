import { hexToRgb } from "gutenverse-core/editor-helper";
import isEmpty from "lodash/isEmpty";

export const getAttributes = (data) => {
    if (isEmpty(data?.settings)) {
        return {};
    }

    const attr = data?.settings;

    if (!isEmpty(attr?.__globals__)) {
        Object.keys(attr?.__globals__).map(key => {
            if (attr?.__globals__[key].includes('globals\/colors?id=')) { // eslint-disable-line no-useless-escape
                attr[key] = {
                    type: 'variable',
                    id: attr?.__globals__[key].replace('globals\/colors?id=', '') // eslint-disable-line no-useless-escape
                };
            }

            if (attr?.__globals__[key].includes('globals\/typography?id=')) { // eslint-disable-line no-useless-escape
                attr[key] = {
                    type: 'variable',
                    id: attr?.__globals__[key].replace('globals\/typography?id=', '') // eslint-disable-line no-useless-escape
                };
            }
        });
    }

    return attr;
};

const getDeviceValue = (attr, key) => {
    const result = {};

    if (attr?.[`${key}`]) {
        result['Desktop'] = {
            unit: attr?.[`${key}`]?.unit,
            dimension: {
                top: attr?.[`${key}`]?.top,
                right: attr?.[`${key}`]?.right,
                bottom: attr?.[`${key}`]?.bottom,
                left: attr?.[`${key}`]?.left
            }
        };
    }

    if (attr?.[`${key}_tablet`]) {
        result['Tablet'] = {
            unit: attr?.[`${key}_tablet`].unit,
            dimension: {
                top: attr?.[`${key}_tablet`].top,
                right: attr?.[`${key}_tablet`].right,
                bottom: attr?.[`${key}_tablet`].bottom,
                left: attr?.[`${key}_tablet`].left
            }
        };
    }

    if (attr?.[`${key}_mobile`]) {
        result['Mobile'] = {
            unit: attr?.[`${key}_mobile`]?.unit,
            dimension: {
                top: attr?.[`${key}_mobile`]?.top,
                right: attr?.[`${key}_mobile`]?.right,
                bottom: attr?.[`${key}_mobile`]?.bottom,
                left: attr?.[`${key}_mobile`]?.left
            }
        };
    }

    return result
}

export const getMargin = (attr, wrapper = false) => {
    const key = wrapper ? 'margin' : '_margin';

    return {
        margin: getDeviceValue(attr, key)
    };
};

export const getPadding = (attr, wrapper = false) => {
    const key = wrapper ? 'padding' : '_padding';

    return {
        padding: getDeviceValue(attr, key)
    };
};

export const getBorder = (attr) => {
    const result = {
        'border': {},
        'borderResponsive': {}
    };

    if (attr?._border_border) {
        if (attr?._border_width) {
            if (isEmpty(attr?._border_width?.isLinked)) {
                result['border'] = {
                    top: {
                        type: attr?._border_border
                    },
                    right: {
                        type: attr?._border_border
                    },
                    bottom: {
                        type: attr?._border_border
                    },
                    left: {
                        type: attr?._border_border
                    }
                }

                if (attr?._border_color) {
                    result['border']['top'] = {
                        ...result['border']['top'],
                        color: attr?._border_color?.type === 'variable' ? attr?._border_color : hexToRgb(attr?._border_color)
                    }

                    result['border']['right'] = {
                        ...result['border']['right'],
                        color: attr?._border_color?.type === 'variable' ? attr?._border_color : hexToRgb(attr?._border_color)
                    }

                    result['border']['bottom'] = {
                        ...result['border']['bottom'],
                        color: attr?._border_color?.type === 'variable' ? attr?._border_color : hexToRgb(attr?._border_color)
                    }

                    result['border']['left'] = {
                        ...result['border']['left'],
                        color: attr?._border_color?.type === 'variable' ? attr?._border_color : hexToRgb(attr?._border_color)
                    }
                }

                result['border']['top'] = {
                    ...result['border']['top'],
                    width: attr?._border_width?.top
                }

                result['border']['right'] = {
                    ...result['border']['right'],
                    width: attr?._border_width?.right
                }

                result['border']['bottom'] = {
                    ...result['border']['bottom'],
                    width: attr?._border_width?.bottom
                }

                result['border']['left'] = {
                    ...result['border']['left'],
                    width: attr?._border_width?.left
                }
            } else {
                result['border'] = {
                    all: {
                        type: attr?._border_border
                    }
                };

                if (attr?._border_color) {
                    result['border']['all'] = {
                        ...result['border']['all'],
                        color: hexToRgb(attr?._border_color)
                    }
                }

                result['border']['all'] = {
                    ...result['border']['all'],
                    width: attr?._border_width?.top
                }
            }
        }

        if (attr?._border_width_tablet) {
            if (isEmpty(attr?._border_width_tablet?.isLinked)) {
                result['borderResponsive']['Tablet'] = {
                    top: {
                        type: attr?._border_border
                    },
                    right: {
                        type: attr?._border_border
                    },
                    bottom: {
                        type: attr?._border_border
                    },
                    left: {
                        type: attr?._border_border
                    }
                }

                if (attr?._border_color) {
                    result['borderResponsive']['Tablet']['top'] = {
                        ...result['borderResponsive']['Tablet']['top'],
                        color: attr?._border_color?.type === 'variable' ? attr?._border_color : hexToRgb(attr?._border_color)
                    }

                    result['borderResponsive']['Tablet']['right'] = {
                        ...result['borderResponsive']['Tablet']['right'],
                        color: attr?._border_color?.type === 'variable' ? attr?._border_color : hexToRgb(attr?._border_color)
                    }

                    result['borderResponsive']['Tablet']['bottom'] = {
                        ...result['borderResponsive']['Tablet']['bottom'],
                        color: attr?._border_color?.type === 'variable' ? attr?._border_color : hexToRgb(attr?._border_color)
                    }

                    result['borderResponsive']['Tablet']['left'] = {
                        ...result['borderResponsive']['Tablet']['left'],
                        color: attr?._border_color?.type === 'variable' ? attr?._border_color : hexToRgb(attr?._border_color)
                    }
                }

                result['borderResponsive']['Tablet']['top'] = {
                    ...result['borderResponsive']['Tablet']['top'],
                    width: attr?._border_width_tablet?.top
                }

                result['borderResponsive']['Tablet']['right'] = {
                    ...result['borderResponsive']['Tablet']['right'],
                    width: attr?._border_width_tablet?.right
                }

                result['borderResponsive']['Tablet']['bottom'] = {
                    ...result['borderResponsive']['Tablet']['bottom'],
                    width: attr?._border_width_tablet?.bottom
                }

                result['borderResponsive']['Tablet']['left'] = {
                    ...result['borderResponsive']['Tablet']['left'],
                    width: attr?._border_width_tablet?.left
                }
            } else {
                result['borderResponsive']['Tablet'] = {
                    all: {
                        type: attr?._border_border
                    }
                };

                if (attr?._border_color) {
                    result['borderResponsive']['Tablet']['all'] = {
                        ...result['borderResponsive']['Tablet']['all'],
                        color: hexToRgb(attr?._border_color)
                    }
                }

                result['borderResponsive']['Tablet']['all'] = {
                    ...result['borderResponsive']['Tablet']['all'],
                    width: attr?._border_width_tablet?.top
                }
            }
        }

        if (attr?._border_width_mobile) {
            if (isEmpty(attr?._border_width_mobile?.isLinked)) {
                result['borderResponsive']['Mobile'] = {
                    top: {
                        type: attr?._border_border
                    },
                    right: {
                        type: attr?._border_border
                    },
                    bottom: {
                        type: attr?._border_border
                    },
                    left: {
                        type: attr?._border_border
                    }
                }

                if (attr?._border_color) {
                    result['borderResponsive']['Mobile']['top'] = {
                        ...result['borderResponsive']['Mobile']['top'],
                        color: attr?._border_color?.type === 'variable' ? attr?._border_color : hexToRgb(attr?._border_color)
                    }

                    result['borderResponsive']['Mobile']['right'] = {
                        ...result['borderResponsive']['Mobile']['right'],
                        color: attr?._border_color?.type === 'variable' ? attr?._border_color : hexToRgb(attr?._border_color)
                    }

                    result['borderResponsive']['Mobile']['bottom'] = {
                        ...result['borderResponsive']['Mobile']['bottom'],
                        color: attr?._border_color?.type === 'variable' ? attr?._border_color : hexToRgb(attr?._border_color)
                    }

                    result['borderResponsive']['Mobile']['left'] = {
                        ...result['borderResponsive']['Mobile']['left'],
                        color: attr?._border_color?.type === 'variable' ? attr?._border_color : hexToRgb(attr?._border_color)
                    }
                }

                result['borderResponsive']['Mobile']['top'] = {
                    ...result['borderResponsive']['Mobile']['top'],
                    width: attr?._border_width_mobile?.top
                }

                result['borderResponsive']['Mobile']['right'] = {
                    ...result['borderResponsive']['Mobile']['right'],
                    width: attr?._border_width_mobile?.right
                }

                result['borderResponsive']['Mobile']['bottom'] = {
                    ...result['borderResponsive']['Mobile']['bottom'],
                    width: attr?._border_width_mobile?.bottom
                }

                result['borderResponsive']['Mobile']['left'] = {
                    ...result['borderResponsive']['Mobile']['left'],
                    width: attr?._border_width_mobile?.left
                }
            } else {
                result['borderResponsive']['Mobile'] = {
                    all: {
                        type: attr?._border_border
                    }
                };

                if (attr?._border_color) {
                    result['borderResponsive']['Mobile']['all'] = {
                        ...result['borderResponsive']['Mobile']['all'],
                        color: hexToRgb(attr?._border_color)
                    }
                }

                result['borderResponsive']['Mobile']['all'] = {
                    ...result['borderResponsive']['Mobile']['all'],
                    width: attr?._border_width_mobile?.top
                }
            }
        }
    }

    return result;
}

export const getBackground = (attr) => {
    const result = {
        background: {}
    };

    if (attr?.background_background === 'classic') {
        result['background'] = {
            type: 'default',
            color: attr?.background_color?.type === 'variable' ? attr?.background_color : hexToRgb(attr?.background_color),
            image: {}
        }

        if (attr?.background_image) {
            result['background']['image'] = {
                Desktop: {
                    id: attr?.background_image?.id,
                    image: attr?.background_image?.url,
                }
            }
        }

        if (attr?.background_image_tablet) {
            result['background']['image'] = {
                Tablet: {
                    id: attr?.background_image_tablet?.id,
                    image: attr?.background_image_tablet?.url,
                }
            }
        }

        if (attr?.background_image_mobile) {
            result['background']['image'] = {
                Mobile: {
                    id: attr?.background_image_mobile?.id,
                    image: attr?.background_image_mobile?.url,
                }
            }
        }
    }

    return result;
}