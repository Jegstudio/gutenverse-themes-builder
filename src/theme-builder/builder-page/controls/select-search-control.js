
import { __ } from '@wordpress/i18n';
import AsyncSelect from 'react-select/async';

const SelectSearchControl = (props) => {
    const {
        id,
        title = 'Text Title',
        description,
        value = '',
        values,
        onChange,
        onSearch,
    } = props;

    return (
        <>
            <div className="input-wrapper">
                <label name={id}>{title}</label>
                <div className="select-inner">
                    <AsyncSelect
                        id={id}
                        placeholder={__('Search...', 'gutenverse')}
                        noOptionsMessage={() => __('Not Found', 'gutenverse')}
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
                    {description && <span>{description}</span>}
                </div>
            </div>

        </>
    );
};

export default SelectSearchControl;