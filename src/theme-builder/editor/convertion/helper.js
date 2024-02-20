import isEmpty from "lodash/isEmpty";

export const getAttributes = (data) => {
    if (data?.settings) {
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
};

export const getMargin = (attr) => {
    const result = {};

    if (attr?._margin) {
        result['Desktop'] = {
            unit: attr?._margin?.unit,
            dimension: {
                top: attr?._margin?.top,
                right: attr?._margin?.right,
                bottom: attr?._margin?.bottom,
                left: attr?._margin?.left
            }
        };
    }

    if (attr?._margin_tablet) {
        result['Tablet'] = {
            unit: attr?._margin_tablet?.unit,
            dimension: {
                top: attr?._margin_tablet?.top,
                right: attr?._margin_tablet?.right,
                bottom: attr?._margin_tablet?.bottom,
                left: attr?._margin_tablet?.left
            }
        };
    }

    if (attr?._margin_mobile) {
        result['Mobile'] = {
            unit: attr?._margin_mobile?.unit,
            dimension: {
                top: attr?._margin_mobile?.top,
                right: attr?._margin_mobile?.right,
                bottom: attr?._margin_mobile?.bottom,
                left: attr?._margin_mobile?.left
            }
        };
    }

    return result;
};

export const getPadding = (attr) => {
    const result = {};

    if (attr?._padding) {
        result['Desktop'] = {
            unit: attr?._padding?.unit,
            dimension: {
                top: attr?._padding?.top,
                right: attr?._padding?.right,
                bottom: attr?._padding?.bottom,
                left: attr?._padding?.left
            }
        };
    }

    if (attr?._padding_tablet) {
        result['Tablet'] = {
            unit: attr?._padding_tablet?.unit,
            dimension: {
                top: attr?._padding_tablet?.top,
                right: attr?._padding_tablet?.right,
                bottom: attr?._padding_tablet?.bottom,
                left: attr?._padding_tablet?.left
            }
        };
    }

    if (attr?._padding_mobile) {
        result['Mobile'] = {
            unit: attr?._padding_mobile?.unit,
            dimension: {
                top: attr?._padding_mobile?.top,
                right: attr?._padding_mobile?.right,
                bottom: attr?._padding_mobile?.bottom,
                left: attr?._padding_mobile?.left
            }
        };
    }

    return result;
};