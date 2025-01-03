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
    const [acfData, setAcfData] = useState([]);
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getMiscField(null, response => {
            console.log(response);
            if (response?.acf) {
                setAcfData(response?.acf);
            }
            if (response?.post) {
                setPostData(response?.post);
            }
        });
    }, []);

    const handleSwitchChange = (key, value) => {
        setAcfData((prevData) =>
            prevData.map((item) =>
                item.key === key ? { ...item, selected: value } : item
            )
        );
    };

    const saveMisc = async () => {
        setLoading(true);

        const dataAcf = acfData
            .filter(field => field.selected)
            .map(field => field.key);

        updateOtherData(
            {
                key: 'post',
                data: postData,
            },
            () => {
                updateOtherData(
                    {
                        key: 'acf-field',
                        data: dataAcf,
                    },
                    () => { setLoading(false); }
                );
            }
        );


    };

    return (
        <ContentWrapper
            title={__('Miscellaneous', 'gutenverse-themes-builder')}
            description={__('Export additional content here. This content will be included as part of the theme package', 'gutenverse-themes-builder')}
        >
            <br />
            <div className='media-input-wrapper'>
                <h3>{__('Export ACF Field Group', 'gutenverse-themes-builder')}</h3>
                {acfData.map((item) => (
                    <div className='plugin-notice-mode-wrapper'>
                        <SwitchControl
                            key={item.key}
                            title={item.title}
                            value={item.selected}
                            onChange={(value) => handleSwitchChange(item.key, value)}
                        />
                    </div>
                ))}
            </div>
            <br />
            <div className='media-input-wrapper'>
                <h3>{__('Export Post', 'gutenverse-themes-builder')}</h3>
                <div className="plugin-search-wrapper">
                    <SelectSearchControl
                        id={'search'}
                        title={__('Search Post', 'gutenverse-themes-builder')}
                        value={postData}
                        isMulti={true}
                        onChange={(a) => {
                            setPostData(a)
                        }}
                        onSearch={input => new Promise(resolve => {
                            apiFetch({
                                path: addQueryArgs('/wp/v2/posts', {
                                    search: input,
                                }),
                            }).then(data => {
                                const promiseOptions = data.map(item => {
                                    return {
                                        label: item.title.rendered,
                                        value: item.id
                                    };
                                });

                                resolve(promiseOptions);
                            }).catch(() => {
                                resolve([]);
                            });
                        })}
                    />
                </div>
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