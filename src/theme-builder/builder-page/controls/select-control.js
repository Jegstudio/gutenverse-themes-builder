
import Select from 'react-select';

const SelectControl = (props) => {
    const {
        id,
        title = 'Text Title',
        description,
        value = '',
        options,
        onChange,
        isMulti = false,
        important = false,
        classNamePrefix = 'tb-selector'
    } = props;

    const onSelectChange = obj => isMulti && Array.isArray(obj) ? onChange(obj.map(o => o?.value)) : onChange(obj?.value);

    return (
        <>
            <div className="input-wrapper">
                <label name={id}>{title}{important && <span>&nbsp;*</span>}</label>
                <div className="select-inner">
                    <Select
                        id={id}
                        styles={{
                            control: (styles) => ({
                                ...styles,
                                width: '100%',
                                minHeight: '36px',
                                border: '1px solid var(--gtb-border)'
                            })
                        }}
                        classNamePrefix={classNamePrefix}
                        value={options.filter(obj => isMulti ? value.includes(obj.value) : value === obj.value)}
                        options={options}
                        onChange={onSelectChange}
                        isMulti={isMulti} />
                    {description && <span className='description'>{description}</span>}
                </div>
            </div>

        </>
    );
};

export default SelectControl;