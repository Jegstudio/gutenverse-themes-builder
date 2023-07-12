
const SwitchControl = (props) => {
    const {
        id,
        title = 'Text Title',
        description,
        value = '',
        onChange,
    } = props;

    return (
        <>
            <div className="input-wrapper control-checkbox">
                <label name={id}>{title}</label>
                <div className="select-inner">
                    <input
                        id={id}
                        type="checkbox"
                        checked={value}
                        hidden
                    />
                    <span className="switch" onClick={() => onChange(!value)}/>
                    {description && <span>{description}</span>}
                </div>
            </div>

        </>
    );
};

export default SwitchControl;