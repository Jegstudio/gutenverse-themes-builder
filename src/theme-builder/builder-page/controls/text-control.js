
const TextControl = (props) => {
    const {
        id,
        title = 'Text Title',
        placeholder = '',
        description,
        value,
        important = false,
        onChange,
        errors = []
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
                    required={important}
                />
                <ul className="error-list">
                    {
                        errors.length > 0 && errors.map((el, index) => {
                            return <li key={index}>{el}</li>
                        })
                    }
                </ul>
                {description && <span>{description}</span>}
            </div>
        </div>
    );
};

export default TextControl;