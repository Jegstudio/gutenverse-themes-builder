import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { getTemplateList, updateOtherData, getThemeData } from '../../../data/api-fetch';
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

    return <button onClick={() => selectItem(thumbnailFrame)}>{__('Choose Image', 'gutenverse-themes-builder')}</button>;
};

const ManageDashbaord = () => {
    const [dashboardData, setDashboardData] = useState({});

    useEffect(() => {
        getThemeData(null, response => {
            const themeDataRes = response;

            getTemplateList(response => {
                const templateList = response?.data?.filter(template => template?.template_type === 'custom_template');
                const dashboardTemplates = themeDataRes?.other?.dashboard?.templates || [];
                const templateListIds = templateList.map(template => template.id);

                const syncedTemplates = dashboardTemplates.filter(template =>
                    templateListIds.includes(template.id)
                );

                templateList.forEach(template => {
                    if (!syncedTemplates.some(dashboardTemplate => dashboardTemplate.id === template.id)) {
                        syncedTemplates.push(template);
                    }
                });

                const filteredCore = syncedTemplates.filter(template => template.category !== 'core')

                setDashboardData({
                    ...dashboardData,
                    ...themeDataRes?.other?.dashboard,
                    templates: filteredCore
                });
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
        updateOtherData({
            key: 'dashboard',
            data: { ...dashboardData }
        });
    };

    console.log(dashboardData);

    return (
        <ContentWrapper
            title={__('Manage Dashboard', 'gutenverse-themes-builder')}
            description={__('This is a place to manage your theme Dashboard.', 'gutenverse-themes-builder')}
            headingButton={true}
            headingButtons={[
                {
                    buttonText: __('Save', 'gutenverse-themes-builder'),
                    buttonEvent: updateDashboardData,
                    buttonIcon: false,
                    buttonLoading: false
                }
            ]}
        >
            {/* <ContentPreview /> */}
            <div className="manage-dashboard">
                <p>{__('Select your dashboard mode:', 'gutenverse-themes-builder')}</p>
                <div>
                    <Select
                        value={dashboardData?.mode}
                        options={[
                            { value: 'default', label: 'Default Dashboard' },
                            { value: 'lite', label: 'Lite Dashboard' },
                            { value: 'themeforest', label: 'Themeforest Dashboard' },
                        ]}
                        onChange={value => updateData('mode', value)}
                    />
                    {dashboardData?.mode?.value === 'themeforest' && <>
                        <div>
                            <h3>{__('Your Theme Logo', 'gutenverse-themes-builder')}</h3>
                            <MediaSelect updateThumbnailData={value => updateData('logo', value)} />
                            {dashboardData?.logo && <div className="image-wrapper">
                                <img src={dashboardData?.logo?.url} />
                            </div>}
                        </div>
                        <br /><br />
                        <div>
                            <h3>{__('Importable Custom Template', 'gutenverse-themes-builder')}</h3>
                            <div className="custom-templates">
                                {dashboardData?.templates && dashboardData?.templates?.map((template, index) => {
                                    const updateTemplateData = (index, key, value) => {
                                        let templateArr = dashboardData?.templates ? dashboardData?.templates : [];

                                        templateArr[index] = {
                                            ...templateArr[index],
                                            [key]: value,
                                        };

                                        updateData('templates', [...templateArr]);
                                    };

                                    return template?.template_type === 'custom_template' && <div className="template-import">
                                        <h3>{template?.name}</h3>
                                        <div>
                                            <label htmlFor="page_name">
                                                {__('Page Name', 'gutenverse-themes-builder')}
                                            </label>
                                            <input
                                                type="text"
                                                name="page_name"
                                                value={template?.page_name}
                                                onChange={e => updateTemplateData(index, 'page_name', e?.target?.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="page_demo">
                                                {__('Page Preview Url', 'gutenverse-themes-builder')}
                                            </label>
                                            <input
                                                type="text"
                                                name="page_demo"
                                                value={template?.page_demo}
                                                onChange={e => updateTemplateData(index, 'page_demo', e?.target?.value)}
                                            />
                                        </div>
                                        <MediaSelect updateThumbnailData={value => updateTemplateData(index, 'thumbnail', value)} />
                                        {template?.thumbnail && <div className="image-wrapper">
                                            <img src={template?.thumbnail?.url} />
                                        </div>}
                                    </div>;
                                })}
                            </div>
                        </div>
                    </>}
                    {dashboardData?.mode?.value === 'lite' && <>
                        <div>
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
            </div>
        </ContentWrapper>
    );
};

export default ManageDashbaord;