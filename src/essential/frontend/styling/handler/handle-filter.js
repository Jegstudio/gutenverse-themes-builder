const isEmptyString = (str) => {
    return !str || str === '';
};

export const getFilter = ({ brightness, contrast, blur, saturation, hue }) => {
    return `
        brightness( ${!isEmptyString(brightness) ? brightness : 100}% )
        contrast( ${!isEmptyString(contrast) ? contrast : 100}% )
        saturate( ${!isEmptyString(saturation) ? saturation : 100}% )
        blur( ${!isEmptyString(blur) ? blur : 0}px )
        hue-rotate( ${!isEmptyString(hue) ? hue : 0}deg )`;
};