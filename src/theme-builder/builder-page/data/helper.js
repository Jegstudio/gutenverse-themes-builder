import { isEmpty } from "lodash";

export const checkThemeMode = (category, themeMode) => {
    switch (themeMode) {
        case 'core-gutenverse':
            return ['core', 'gutenverse'].includes ( category );
        case 'gutenverse-pro':
            return ['gutenverse', 'pro'].includes ( category );
        case 'core-only':
            return 'core' === category;
        case 'gutenverse-only':
            return 'gutenverse' === category;
        case 'pro-only':
            return 'pro' === category;
        default:
            return false;
    }
};

export const checkDetails = (importantData, details = {}) => {
    if ( isEmpty( details ) ) {
        return false;
    }

    let result = true;

    Object.keys(importantData).map(key => {
        if ( importantData[key] && isEmpty(details[key]) ) {
            result = false;
        }
    });

    return result;
};
