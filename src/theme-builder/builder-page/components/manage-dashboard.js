import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { updateOtherData, getThemeData } from '../../../data/api-fetch';
import ContentWrapper from './content-wrapper';
import { Select } from 'gutenverse-core/components';
import TextControl from '../controls/text-control';
import TextareaControl from '../controls/textarea-control';
import NumberControl from '../controls/number-control';
import SwitchControl from '../controls/switch-control';

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
        setTimeout(() => {
            updateOtherData({
                key: 'dashboard',
                data: { ...dashboardData }
            });
        }, 500);
        setLoading(false);
    };

    return (
        <ContentWrapper
            title={__('Manage Dashboard', 'gutenverse-themes-builder')}
            description={__('This is a place to manage your theme Dashboard.', 'gutenverse-themes-builder')}
        >
            {/* <ContentPreview /> */}
            <div className="manage-dashboard">
                <div>
                    <div className="input-wrapper select-dashboard">
                        <Select
                            value={dashboardData?.mode}
                            options={[
                                { value: 'default', label: 'Default Dashboard' },
                                { value: 'lite', label: 'Lite Dashboard' },
                                { value: 'themeforest', label: 'Themeforest Dashboard' },
                            ]}
                            onChange={value => updateData('mode', value)}
                        />
                        <span className='description'>{__('Select your dashboard mode', 'gutenverse-themes-builder')}</span>
                    </div>
                    
                    {dashboardData?.mode?.value === 'themeforest' && <>
                        
                        <div className='media-input-wrapper'>
                            <SwitchControl 
                                id={'theme-forest-include-pro'}
                                title={__('Themeforest Mode', 'gutenverse-themes-builder')}
                                description= {__('This mode will export certain features of the theme builder within the theme.', 'gutenverse-themes-builder')}
                                value={dashboardData.themeforest_mode}
                                onChange={value => updateData('themeforest_mode', value)}
                            />
                            <h3>{__('Your Theme Logo', 'gutenverse-themes-builder')}</h3>
                            <p>{__('Upload a logo of your theme', 'gutenverse-themes-builder')}</p>
                            {dashboardData?.logo ? <div className="image-wrapper">
                                <img src={dashboardData?.logo?.url} />
                            </div> : <div style={{height: '100px'}}></div>}
                            <MediaSelect updateThumbnailData={value => updateData('logo', value)} />
                        </div>
                    </>}
                    {dashboardData?.mode?.value === 'lite' && <>
                    <div className="lite-wrapper">
                        <div className='names-desc-wrapper'>
                            <div className="header">
                                <h3>{__('Names and Description', 'gutenverse-themes-builder')}</h3>
                            </div>
                            <div className="content">
                                <TextControl
                                    id={'core-theme-name'}
                                    title={__('Core Theme Name', 'gutenverse-themes-builder')}
                                    onChange={value => {
                                        updateData('comparison', {
                                            ...dashboardData?.comparison,
                                            name_core: value
                                        });
                                    }}
                                    value={dashboardData?.comparison?.name_core}
                                    important={true}
                                    description={__('The name of the core theme', 'gutenverse-themes-builder')}
                                />
                                <TextControl
                                    id={'lite-theme-name'}
                                    title={__('Lite Theme Name', 'gutenverse-themes-builder')}
                                    onChange={(value) => {
                                        updateData('comparison', {
                                            ...dashboardData?.comparison,
                                            name_lite: value
                                        });
                                    }}
                                    value={dashboardData?.comparison?.name_lite}
                                    important={true}
                                    description={__('The name of the lite version', 'gutenverse-themes-builder')}
                                />
                                <TextControl
                                    id={'pro-theme-name'}
                                    title={__('Pro Theme Name', 'gutenverse-themes-builder')}
                                    onChange={(value) => {
                                        updateData('comparison', {
                                            ...dashboardData?.comparison,
                                            name_pro: value
                                        });
                                    }}
                                    value={dashboardData?.comparison?.name_pro}
                                    important={true}
                                    description={__('The name of the pro version', 'gutenverse-themes-builder')}
                                />
                                <TextareaControl
                                    id={'comparison-desc'}
                                    title={__('Comparison Description', 'gutenverse-themes-builder')}
                                    onChange={(value) => {
                                        updateData('comparison', {
                                            ...dashboardData?.comparison,
                                            description: value
                                        });
                                    }}
                                    description={__('Describe the key differences between the themes', 'gutenverse-themes-builder')}
                                    value={dashboardData?.comparison?.description}
                                    important={true}
                                />
                            </div>
                        </div>
                        <div className='comparison-wrapper'>
                            <div className="header">
                                <h3>{__('Theme Comparison Features', 'gutenverse-themes-builder')}</h3>
                            </div>
                            <div className="content">
                                <NumberControl
                                    id={'core-template-count'}
                                    title={__('Core Theme Template Count', 'gutenverse-themes-builder')}
                                    onChange={(value) => {
                                        updateData('comparison', {
                                            ...dashboardData?.comparison,
                                            core_template_count: parseInt(value)
                                        });
                                    }}
                                    value={dashboardData?.comparison?.core_template_count}
                                    important={true}
                                    description={__('Number of templates in the core theme', 'gutenverse-themes-builder')}
                                />
                                <NumberControl
                                    id={'lite-template-count'}
                                    title={__('Lite Theme Template Count', 'gutenverse-themes-builder')}
                                    onChange={(value) => {
                                        updateData('comparison', {
                                            ...dashboardData?.comparison,
                                            lite_theme_template_count: parseInt(value)
                                        });
                                    }}
                                    value={dashboardData?.comparison?.lite_theme_template_count}
                                    important={true}
                                    description={__('Number of templates in the lite version', 'gutenverse-themes-builder')}
                                />
                                <NumberControl
                                    id={'lite-gtv-block-count'}
                                    title={__('Lite Gutenverse Block Count', 'gutenverse-themes-builder')}
                                    onChange={(value) => {
                                        updateData('comparison', {
                                            ...dashboardData?.comparison,
                                            lite_block_count: parseInt(value)
                                        });
                                    }}
                                    value={dashboardData?.comparison?.lite_block_count}
                                    important={true}
                                    description={__('Number of Gutenverse blocks in the lite version', 'gutenverse-themes-builder')}
                                />
                                <NumberControl
                                    id={'lite-template-library-count'}
                                    title={__('Lite Template Library Count', 'gutenverse-themes-builder')}
                                    onChange={(value) => {
                                        updateData('comparison', {
                                            ...dashboardData?.comparison,
                                            lite_template_count: parseInt(value)
                                        });
                                    }}
                                    value={dashboardData?.comparison?.lite_template_count}
                                    important={true}
                                    description={__('Total templates in the lite library', 'gutenverse-themes-builder')}
                                />
                                <NumberControl
                                    id={'pro-template-count'}
                                    title={__('Pro Theme Template Count', 'gutenverse-themes-builder')}
                                    onChange={(value) => {
                                        updateData('comparison', {
                                            ...dashboardData?.comparison,
                                            pro_theme_template_count: parseInt(value)
                                        });
                                    }}
                                    value={dashboardData?.comparison?.pro_theme_template_count}
                                    important={true}
                                    description={__('Number of templates in the pro version', 'gutenverse-themes-builder')}
                                />
                                <NumberControl
                                    id={'pro-gtv-block-count'}
                                    title={__('Pro Gutenverse Block Count', 'gutenverse-themes-builder')}
                                    onChange={(value) => {
                                        updateData('comparison', {
                                            ...dashboardData?.comparison,
                                            pro_block_count: parseInt(value)
                                        });
                                    }}
                                    value={dashboardData?.comparison?.pro_block_count}
                                    important={true}
                                    description={__('Number of Gutenverse blocks in the pro version', 'gutenverse-themes-builder')}
                                />
                                <NumberControl
                                    id={'pro-template-library-count'}
                                    title={__('Pro Template Library Count', 'gutenverse-themes-builder')}
                                    onChange={(value) => {
                                        updateData('comparison', {
                                            ...dashboardData?.comparison,
                                            pro_template_count: parseInt(value)
                                        });
                                    }}
                                    value={dashboardData?.comparison?.pro_template_count}
                                    important={true}
                                    description={__('Total templates in the pro library', 'gutenverse-themes-builder')}
                                />
                            </div>
                        </div>
                    </div>
                        
                    </>}
                </div>
                <div className="buttons margin-top-32 end">
                    {
                        loading ? <div className="button button-loading padding-12-28" disabled>Loading... </div> :
                        <div className="button create padding-12-28" onClick={() => updateDashboardData()}>{__('Save Changes', 'gutenverse-themes-builder')}</div>
                    }
                </div>
            </div>
        </ContentWrapper>
    );
};

export default ManageDashbaord;