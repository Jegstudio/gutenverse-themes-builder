
import { __ } from '@wordpress/i18n';
import AsyncSelect from 'react-select/async';

const SelectSearchControl = (props) => {
    const {
        id,
        title,
        description,
        value = '',
        values,
        onChange,
        onSearch,
        className = 'select-search',
        classNamePrefix = 'async-select',
        isMulti = false,
        noOptionsMessage = () => __('Not Found', 'gutenverse')
    } = props;

    return (
        <>
            <div className="input-wrapper">
                { title && <label name={id}>{title}</label>}
                <div className="select-inner">
                    <AsyncSelect
                        id={id}
                        placeholder={__('Search...', 'gutenverse')}
                        noOptionsMessage={noOptionsMessage}
                        className={className}
                        classNamePrefix={classNamePrefix}
                        isMulti={isMulti}
                        styles={{
                            control: (styles) => ({
                                ...styles,
                                width: '100%',
                                minHeight: '36px',
                                border: '1px solid var(--gtb-border)'
                            })
                        }}
                        value={value}
                        /* cacheOptions={cacheOptions}
                        defaultOptions={defaultOptions} */
                        onChange={onChange}
                        loadOptions={input => onSearch(input, values)} />
                    {description && <span className='description'>{description}</span>}
                </div>
            </div>

        </>
    );
};

export default SelectSearchControl;