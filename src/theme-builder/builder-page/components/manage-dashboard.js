import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { updateOtherData, getThemeData } from '../../../data/api-fetch';
import ContentWrapper from './content-wrapper';
import { Select } from 'gutenverse-core/components';

const MediaSelect = ({ updateThumbnailData }) => {
    const [thumbnailFrame, setThumbnailFrame] = useState(null);

    useEffect(() => {
        const firstFrame = wp?.media({
            title: 'Select or Upload Media',
            button: {
                text: 'Select as Thumbnail'
            },
            library: {
                type: ['image/jpg', 'image/jpeg', , 'image/webp']
            },
            multiple: false
        });

        setThumbnailFrame(firstFrame);
    }, []);

    useEffect(() => {
        if (thumbnailFrame) {
            thumbnailFrame.on('select', function () {
                const attachment = thumbnailFrame.state().get('selection').first().toJSON();
                updateThumbnailData({
                    id: attachment?.id,
                    filename: attachment?.filename,
                    url: attachment?.url,
                });
            });
        }
    }, [thumbnailFrame]);

    const selectItem = (frame) => {
        if (frame) {
            frame.open();
            return;
        }
    };

    return <button className='button' onClick={() => selectItem(thumbnailFrame)}>{__('Choose Image', 'gutenverse-themes-builder')}</button>;
};

const ManageDashbaord = () => {
    const [dashboardData, setDashboardData] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getThemeData(null, response => {
            const themeDataRes = response;
            setDashboardData({
                ...dashboardData,
                ...themeDataRes?.other?.dashboard,
            });
        });
    }, []);

    const updateData = (key, value) => {
        setDashboardData({
            ...dashboardData,
            [key]: value
        });
    };

    const updateDashboardData = () => {
        setLoading(true);
        setInterval(() => {
            updateOtherData({
                key: 'dashboard',
                data: { ...dashboardData }
            });
            setLoading(false)
        }, 500);
    };

    return (
        <ContentWrapper
            title={__('Manage Dashboard', 'gutenverse-themes-builder')}
            description={__('This is a place to manage your theme Dashboard.', 'gutenverse-themes-builder')}
        >
            {/* <ContentPreview /> */}
            <div className="manage-dashboard">
                <div>
                    <div className="input-wrapper se">
                        <Select
                            value={dashboardData?.mode}
                            options={[
                                { value: 'default', label: 'Default Dashboard' },
                                { value: 'lite', label: 'Lite Dashboard' },
                                { value: 'themeforest', label: 'Themeforest Dashboard' },
                            ]}
                            onChange={value => updateData('mode', value)}
                        />
                        <span>{__('Select your dashboard mode', 'gutenverse-themes-builder')}</span>
                    </div>
                    
                    {dashboardData?.mode?.value === 'themeforest' && <>
                        <div className='media-input-wrapper'>
                            <h3>{__('Your Theme Logo', 'gutenverse-themes-builder')}</h3>
                            <p>{__('Upload a logo of your theme', 'gutenverse-themes-builder')}</p>
                            {dashboardData?.logo && <div className="image-wrapper">
                                <img src={dashboardData?.logo?.url} />
                            </div>}
                            <MediaSelect updateThumbnailData={value => updateData('logo', value)} />
                        </div>
                    </>}
                    {dashboardData?.mode?.value === 'lite' && <>
                        <div>
                            <h3>{__('Names and Description', 'gutenverse-themes-builder')}</h3>
                            <label>{__('Core Theme Name :', 'gutenverse-themes-builder')}</label>
                            <br/>
                            <input type="text"
                                onChange={(e) => {
                                    updateData('comparison', {
                                        ...dashboardData?.comparison,
                                        name_core: e.target.value
                                    });
                                }}
                                value={dashboardData?.comparison?.name_core}
                            />
                            <br/>
                            <label>{__('Lite Theme Name :', 'gutenverse-themes-builder')}</label>
                            <br/>
                            <input type="text"
                                onChange={(e) => {
                                    updateData('comparison', {
                                        ...dashboardData?.comparison,
                                        name_lite: e.target.value
                                    });
                                }}
                                value={dashboardData?.comparison?.name_lite}
                            />
                            <br/>
                            <label>{__('Pro Theme Name :', 'gutenverse-themes-builder')}</label>
                            <br/>
                            <input type="text"
                                onChange={(e) => {
                                    updateData('comparison', {
                                        ...dashboardData?.comparison,
                                        name_pro: e.target.value
                                    });
                                }}
                                value={dashboardData?.comparison?.name_pro}
                            />
                            <br/>
                            <label>{__('Comparison Description :', 'gutenverse-themes-builder')}</label>
                            <br/>
                            <textarea
                                onChange={(e) => {
                                    updateData('comparison', {
                                        ...dashboardData?.comparison,
                                        description: e.target.value
                                    });
                                }}
                                value={dashboardData?.comparison?.description}
                            />
                            <br/>
                            <h3>{__('Theme Comparison Features', 'gutenverse-themes-builder')}</h3>
                            <label>{__('Core Theme Template Count :', 'gutenverse-themes-builder')}</label>
                            <br/>
                            <input type="number"
                                onChange={(e) => {
                                    updateData('comparison', {
                                        ...dashboardData?.comparison,
                                        core_template_count: parseInt(e.target.value)
                                    });
                                }}
                                value={dashboardData?.comparison?.core_template_count}
                            />
                            <br/>
                            <label>{__('Lite Theme Template Count :', 'gutenverse-themes-builder')}</label>
                            <br/>
                            <input type="number"
                                onChange={(e) => {
                                    updateData('comparison', {
                                        ...dashboardData?.comparison,
                                        lite_theme_template_count: parseInt(e.target.value)
                                    });
                                }}
                                value={dashboardData?.comparison?.lite_theme_template_count}
                            />
                            <br/>
                            <label>{__('Lite Gutenverse Block Count :', 'gutenverse-themes-builder')}</label>
                            <br/>
                            <input type="number"
                                onChange={(e) => {
                                    updateData('comparison', {
                                        ...dashboardData?.comparison,
                                        lite_block_count: parseInt(e.target.value)
                                    });
                                }}
                                value={dashboardData?.comparison?.lite_block_count}
                            />
                            <br/>
                            <label>{__('Lite Template Library Count :', 'gutenverse-themes-builder')}</label>
                            <br/>
                            <input type="number"
                                onChange={(e) => {
                                    updateData('comparison', {
                                        ...dashboardData?.comparison,
                                        lite_template_count: parseInt(e.target.value)
                                    });
                                }}
                                value={dashboardData?.comparison?.lite_template_count}
                            />
                            <br/>
                            <label>{__('Pro Theme Template Count :', 'gutenverse-themes-builder')}</label>
                            <br/>
                            <input type="number"
                                onChange={(e) => {
                                    updateData('comparison', {
                                        ...dashboardData?.comparison,
                                        pro_theme_template_count: parseInt(e.target.value)
                                    });
                                }}
                                value={dashboardData?.comparison?.pro_theme_template_count}
                            />
                            <br/>
                            <label>{__('Pro Gutenverse Block Count :', 'gutenverse-themes-builder')}</label>
                            <br/>
                            <input type="number"
                                onChange={(e) => {
                                    updateData('comparison', {
                                        ...dashboardData?.comparison,
                                        pro_block_count: parseInt(e.target.value)
                                    });
                                }}
                                value={dashboardData?.comparison?.pro_block_count}
                            />
                            <br/>
                            <label>{__('Pro Template Library Count :', 'gutenverse-themes-builder')}</label>
                            <br/>
                            <input type="number"
                                onChange={(e) => {
                                    updateData('comparison', {
                                        ...dashboardData?.comparison,
                                        pro_template_count: parseInt(e.target.value)
                                    });
                                }}
                                value={dashboardData?.comparison?.pro_template_count}
                            />
                            <br/>
                        </div>
                    </>}
                </div>
                <div className="buttons margin-top-32 end">
                    {
                        loading ? <div className="button button-loading" disabled>Loading... </div> :
                        <div className="button create padding-12-28" onClick={() => updateDashboardData()}>{__('Save Changes', 'gutenverse-themes-builder')}</div>
                    }
                </div>
            </div>
        </ContentWrapper>
    );
};

export default ManageDashbaord;