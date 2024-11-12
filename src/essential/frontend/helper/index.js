import { responsiveBreakpoint } from 'gutenverse-core-frontend';

const pointOfAngle = (a) => {
    return {
        x: Math.cos(a),
        y: Math.sin(a)
    };
};

const degreesToRadians = (d) => {
    return ((d * Math.PI) / 180);
};

export const directionStartEndPoint = (direction) => {
    const eps = Math.pow(2, -52);
    const angle = (direction % 360);

    let startPoint = pointOfAngle(degreesToRadians(180 - angle));
    let endPoint = pointOfAngle(degreesToRadians(360 - angle));

    if (Math.abs(startPoint.x) <= eps)
        startPoint.x = 0;

    if (Math.abs(startPoint.y) <= eps)
        startPoint.y = 0;

    if (Math.abs(endPoint.x) <= eps)
        endPoint.x = 0;

    if (Math.abs(endPoint.y) <= eps)
        endPoint.y = 0;

    return { startPoint, endPoint };
};

export const gradientDefault = () => {
    return [
        {
            color: 'rgb(49, 207, 180)',
            id: 1,
            offset: '0.000',
            active: true,
        },
        {
            color: 'rgb(126, 32, 207)',
            id: 2,
            offset: '1.000',
            active: false,
        },
    ];
};

export const getDevice = () => {
    const deviceWidth = window.screen.width;
    const { tabletBreakpoint, mobileBreakpoint } = responsiveBreakpoint();

    if (deviceWidth > tabletBreakpoint) {
        return 'Desktop';
    } else if (deviceWidth <= tabletBreakpoint && deviceWidth > mobileBreakpoint) {
        return 'Tablet';
    }

    return 'Mobile';
};

export const getRgbaValue = (colorId) =>{
    const color = `var(--wp--preset--color--${colorId})`;
    const tempElement = document.createElement('div');
    document.body.appendChild(tempElement);

    tempElement.style.color = color;
    const computedColor = window.getComputedStyle(tempElement).getPropertyValue('color');
    const rgbValues = computedColor.match(/\d+/g);
    const rgbaObject = {
        r: Number(rgbValues[0]),
        g: Number(rgbValues[1]),
        b: Number(rgbValues[2]),
        a:1
    };

    document.body.removeChild(tempElement);
    return rgbaObject;
};