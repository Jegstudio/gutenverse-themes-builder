
const TextareaControl = (props) => {
    const {
        id,
        title = 'Textarea Title',
        placeholder = '',
        description,
        value,
        onChange
    } = props;

    const onTextChange = e => onChange(e.target.value);

    return (
        <div className="input-wrapper">
            <label name={id}>{title}</label>
            <textarea
                id={id}
                className="control-input-textarea"
                placeholder={placeholder}
                value={value}
                onChange={onTextChange}
            />
            {description && <span>{description}</span>}
        </div>
    );
};

export default TextareaControl;