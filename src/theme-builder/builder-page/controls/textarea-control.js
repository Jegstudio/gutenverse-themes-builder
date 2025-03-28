
const TextareaControl = (props) => {
    const {
        id,
        title = 'Textarea Title',
        placeholder = '',
        description,
        value,
        onChange,
        important= false,
    } = props;

    const onTextChange = e => onChange(e.target.value);

    return (
        <div className="input-wrapper">
            <label name={id}>{title}{important && <span>&nbsp;*</span>}</label>
            <div className="input-inner">
                <textarea
                    id={id}
                    className="control-input-textarea"
                    placeholder={placeholder}
                    value={value}
                    onChange={onTextChange}
                /><br/>
                {description && <span>{description}</span>}
            </div>
        </div>
    );
};

export default TextareaControl;