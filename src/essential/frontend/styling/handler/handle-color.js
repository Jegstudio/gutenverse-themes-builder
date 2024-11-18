const variableColorName = (id) => {
    return `--wp--preset--color--${id}`;
};

export const getColor = (props) => {
    const { r, g, b, a, type, id } = props;
    let result = '';

    if ((r || r === 0) && (g || g === 0) && (g || g === 0)) {
        result = `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    if ('variable' === type) {
        const value = variableColorName(id);
        result = `var(${value})`;
    }

    return result;
};