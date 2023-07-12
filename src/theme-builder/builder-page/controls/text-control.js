
const TextControl = (props) => {
    const {
        id,
        title = 'Text Title',
        placeholder = '',
        description,
        value,
        important = false,
        onChange
    } = props;

    const onTextChange = e => onChange(e.target.value);

    return (
        <div className="input-wrapper">
            <label name={id}>{title}{important && <span>&nbsp;*</span>}</label>
            <div className="input-inner">
                <input
                    id={id}
                    type="text"
                    className="control-input-text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onTextChange}
                />
                {description && <span>{description}</span>}
            </div>
        </div>
    );
};

export default TextControl;