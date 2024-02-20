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

    return getDeviceValue(attr, key);
};

export const getPadding = (attr, wrapper = false) => {
    const key = wrapper ? 'padding' : '_padding';

    return getDeviceValue(attr, key);
};

export const getBorder = (attr) => {
    const result = {};

    if (attr?._border_border && attr?._border_width) {

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

    // const value = {
    //     "border": {
    //         "radius": {
    //             "Desktop": { "unit": "px", "dimension": { "top": "5", "right": "5", "bottom": "5", "left": "5" } }
    //         },
    //         "all": { "type": "solid", "width": "5", "color": { "r": 108, "g": 225, "b": 99, "a": 1 } },
    //         "top": { "type": "solid", "width": "1" },
    //         "right": { "type": "solid", "width": "2" },
    //         "bottom": { "type": "solid", "width": "3" },
    //         "left": { "type": "solid", "width": "4" }
    //     },
    //     "borderResponsive": {
    //         "Tablet": {
    //             "radius": {},
    //             "all": { "type": "solid", "width": "6", "color": { "r": 82, "g": 130, "b": 209, "a": 1 } }
    //         }
    //     }
    // }

    return result;
}