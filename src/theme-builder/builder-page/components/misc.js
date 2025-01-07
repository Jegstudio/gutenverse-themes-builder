import ContentWrapper from './content-wrapper';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { __ } from '@wordpress/i18n';
import { presetReadme } from '../data/preset-readme';
import { useState, useEffect } from '@wordpress/element';
import { updateOtherData, getMiscField } from '../../../data/api-fetch';
import SwitchControl from '../controls/switch-control';
import SelectSearchControl from '../controls/select-search-control';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

const Misc = () => {
    const [acfFieldData, setAcfFieldData] = useState([]);
    const [acfTaxData, setAcfTaxData] = useState([]);
    const [acfPostData, setAcfPostData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getMiscField(null, response => {
            console.log(response);
            if (response?.['acf-field']) {
                setAcfFieldData(response?.['acf-field']);
            }
            if (response?.['acf-tax']) {
                setAcfTaxData(response?.['acf-tax']);
            }
            if (response?.['acf-post']) {
                setAcfPostData(response?.['acf-post']);
            }
        });
    }, []);

    const handleFieldChange = (key, value) => {
        setAcfFieldData((prevData) =>
            prevData.map((item) =>
                item.key === key ? { ...item, selected: value } : item
            )
        );
    };

    const handleTaxChange = (key, value) => {
        setAcfTaxData((prevData) =>
            prevData.map((item) =>
                item.key === key ? { ...item, selected: value } : item
            )
        );
    };

    const handlePostChange = (key, value) => {
        setAcfPostData((prevData) =>
            prevData.map((item) =>
                item.key === key ? { ...item, selected: value } : item
            )
        );
    };

    const saveMisc = async () => {
        setLoading(true);

        const dataAcfField = acfFieldData
            .filter(field => field.selected)
            .map(field => field.key);

        const dataAcfTax = acfTaxData
            .filter(field => field.selected)
            .map(field => field.key);

        const dataAcfPost = acfPostData
            .filter(field => field.selected)
            .map(field => field.key);

        updateOtherData(
            {
                key: 'acf-field',
                data: dataAcfField,
            },
            () => {
                updateOtherData(
                    {
                        key: 'acf-post',
                        data: dataAcfPost,
                    },
                    () => {
                        updateOtherData(
                            {
                                key: 'acf-tax',
                                data: dataAcfTax,
                            },
                            () => {
                                setLoading(false);
                            }
                        );
                    }
                );
            }
        );


    };

    return (
        <ContentWrapper
            title={__('Miscellaneous', 'gutenverse-themes-builder')}
            description={__('Export additional content here. This content will be included as part of the template package', 'gutenverse-themes-builder')}
        >
            <br />
            <div className='media-input-wrapper'>
                <h3>{__('Export ACF Field Group', 'gutenverse-themes-builder')}</h3>
                {acfFieldData.map((item) => (
                    <div className='plugin-notice-mode-wrapper'>
                        <SwitchControl
                            key={item.key}
                            title={item.title}
                            value={item.selected}
                            onChange={(value) => handleFieldChange(item.key, value)}
                        />
                    </div>
                ))}
            </div>
            <br />
            <div className='media-input-wrapper'>
                <h3>{__('Export ACF Taxonomy', 'gutenverse-themes-builder')}</h3>
                {acfTaxData.map((item) => (
                    <div className='plugin-notice-mode-wrapper'>
                        <SwitchControl
                            key={item.key}
                            title={item.title}
                            value={item.selected}
                            onChange={(value) => handleTaxChange(item.key, value)}
                        />
                    </div>
                ))}
            </div>
            <br />
            <div className='media-input-wrapper'>
                <h3>{__('Export ACF Post Type', 'gutenverse-themes-builder')}</h3>
                {acfPostData.map((item) => (
                    <div className='plugin-notice-mode-wrapper'>
                        <SwitchControl
                            key={item.key}
                            title={item.title}
                            value={item.selected}
                            onChange={(value) => handlePostChange(item.key, value)}
                        />
                    </div>
                ))}
            </div>
            <br />
            <div className="data-footer">
                <div className="buttons end">
                    {
                        loading ? <div className="button button-loading padding-12-28" disabled>{__('Loading...', 'gutenverse-themes-builder')}</div> : <button className="button create padding-12-28" onClick={saveMisc}>{__('Save Misc', 'gutenverse-themes-builder')}</button>
                    }
                </div>
            </div>
        </ContentWrapper>
    );
};

export default Misc;