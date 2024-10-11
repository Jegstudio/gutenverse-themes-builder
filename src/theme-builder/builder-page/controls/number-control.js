
const NumberControl = (props) => {
    const {
        id,
        title = 'Number Title',
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
                    type="number"
                    className="control-input-number"
                    placeholder={placeholder}
                    value={value}
                    onChange={onTextChange}
                />
                {description && <span>{description}</span>}
            </div>
        </div>
    );
};

export default NumberControl;