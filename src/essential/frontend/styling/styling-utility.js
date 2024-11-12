export const checkEmpty = (value) => {
    let empty = true;

    if (typeof value === 'object') {
        for (let key in value) {
            empty &&= checkEmpty(value[key]);
        }

        return empty;
    } else if (typeof value === 'number') {
        return false;
    }

    return !value;
};

export const DeviceLoop = (callback) => {
    ['Desktop', 'Tablet', 'Mobile'].forEach(device => callback(device));
};

export const deviceStyleValue = (device, value) => {
    const check = (val) => typeof val === 'object' ? !checkEmpty(val) : val === false || !!val;
    const devices = [];

    switch (device) {
        case 'Desktop':
            devices.push('Desktop');
            break;
        case 'Tablet':
            devices.push('Tablet', 'Desktop');
            break;
        case 'Mobile':
            devices.push('Mobile', 'Tablet', 'Desktop');
            break;
    }

    for (const _device of devices) {
        if (check(value[_device])) {
            return value[_device];
        }
    }

    return false;
};