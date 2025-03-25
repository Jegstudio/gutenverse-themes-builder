import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { getTemplateList, createTemplate, deleteTemplate } from '../../../data/api-fetch';
import SelectControl from '../controls/select-control';
import TextControl from '../controls/text-control';
import { CATEGORIES, NAMABLE_TEMPLATES, TEMPLATE_TYPES } from '../data/default';
import { checkThemeMode } from '../data/helper';
import { DeleteAltIcon, WarningIcon } from '../data/icons';
import { WarningPopup } from './warning-popup';
import ContentWrapper from './content-wrapper';
import apiFetch from '@wordpress/api-fetch';

const ManageTemplates = () => {
    const [themeMode, setThemeMode] = useState(null);
    const [templateData, setTemplateData] = useState(null);
    const [templateList, setTemplateList] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);
    const [addTemplateLoading, setAddTemplateLoading] = useState({
        core : false,
        gutenverse : false,
        pro : false
    });

    const afterFetching = (response) => {
        setThemeMode(response?.mode);
        setTemplateList(response?.data);
        setTemplateData(null);
        setFetching(false);
        let category = response?.param.category;
        setTimeout(() => {
            setAddTemplateLoading({
                ...addTemplateLoading,
                [category] : false
            })
        }, 500);
    };

    useEffect(() => {
        getTemplateList(afterFetching);
    }, []);

    const addTemplate = (category) => {
        if (templateData?.[category]?.name && templateData?.[category]?.template_type) {
            setAddTemplateLoading({
                ...addTemplateLoading,
                [category] : true
            })
            const params = {
                template_data: {
                    category,
                    name: templateData?.[category]?.name,
                    template_type: templateData?.[category]?.template_type,
                    content: templateData?.[category]?.content,
                    file: templateData?.[category]?.file
                }
            };

            createTemplate(params, afterFetching);
        }
    };


    const onDataChange = (category, key) => {
        return value => {
            if (key === 'template_type') {
                let templateName = null;

                if (!NAMABLE_TEMPLATES.includes(value)) {
                    const filtered = [...TEMPLATE_TYPES].filter(template => template.value === value);
                    templateName = filtered?.[0]?.label;
                }

                return setTemplateData({
                    ...templateData,
                    [category]: {
                        ...templateData?.[category],
                        template_type: value,
                        name: templateName
                    }
                });
            }

            return setTemplateData({
                ...templateData,
                [category]: {
                    ...templateData?.[category],
                    [key]: value
                }
            });
        };
    };

    const removeTemplate = () => {
        deleteTemplate({
            template_data: deletePopup
        }, afterFetching);
    };
    const importTemplate = () => {
        setLoading(true);
        apiFetch({
            path: '/gtb-backend/v1/template/import',
            method: 'GET',
        }).then(() => {
            getTemplateList(afterFetching);
            setLoading(false);
        })
    }
    return (
        <ContentWrapper
            title={__('Template List', 'gutenverse-themes-builder')}
            description={__('This is a place to manage all your templates of your current active theme. Template categories is loaded based on what your current theme mode is. If you don’t have any active theme, please set one at the Theme List tab.', 'gutenverse-themes-builder')}
            headingButton={true}
            headingButtons={[{
                buttonText: __('Import Active Theme Template', 'gutenverse-themes-builder'),
                buttonEvent: importTemplate,
                buttonIcon: false,
                buttonLoading: loading,
            }]}
            showNotice={true}
            notice = {{
                icon : <WarningIcon/>,
                message : () => {
                    return <>
                        <p><b>Warning:</b> You only need to make one of these options:</p>
                        <ul style={{listStyle: 'disc', padding: '10px'}}>
                            <li>Template Home</li>
                            <li>Template FrontPage</li>
                            <li>Page Homepage ( page that assign as homepage) </li>
                        </ul>
                        <p>If you already make one you don't need to make the other 2. For further explanation please read <a href='https://developer.wordpress.org/themes/basics/template-hierarchy/' target='_blank' >Wordpress hierarchy</a></p>
                    </>
                },
            }}
                
        >
            <div className="template-page-wrapper">
                {fetching ? <div className="loader"></div> : (
                    templateList ? CATEGORIES.map(item => {
                        const filteredOptions = [...TEMPLATE_TYPES].filter(type => {
                            let allowed = true;

                            if (!NAMABLE_TEMPLATES.includes(type?.value)) {
                                templateList.map(template => {
                                    if (template?.category === item.id && type?.value === template?.template_type) {
                                        allowed = false;
                                    }
                                });
                            }

                            return allowed;
                        });

                        return checkThemeMode(item?.id, themeMode) && <div key={item.id} className="template-page-category">
                            <div className="heading">
                                <h3 className="subtitle">{item.name}</h3>
                            </div>
                            <div className="body">
                                <SelectControl
                                    id={'template_type'}
                                    title={__('Type', 'gutenverse-themes-builder')}
                                    value={templateData?.[item.id]?.template_type}
                                    options={filteredOptions}
                                    onChange={onDataChange(item.id, 'template_type')}
                                    important={true}
                                />
                                {NAMABLE_TEMPLATES.includes(templateData?.[item.id]?.template_type) && <TextControl
                                    id={'template_name'}
                                    title={__('Name', 'gutenverse-themes-builder')}
                                    value={templateData?.[item.id]?.name}
                                    onChange={onDataChange(item.id, 'name')}
                                    important={true}
                                />}
                                <div className="buttons">
                                    {
                                        addTemplateLoading[item.id] ? <div className="button button-loading" disabled>Loading... </div> : <div className="template-add" onClick={() => addTemplate(item.id)}>{__('Add New', 'gutenverse-themes-builder')}</div>
                                    }
                                </div>
                                <div className="template-list">
                                    <h3>{__('Template List', 'gutenverse-themes-builder')}</h3>
                                    <table style={{ width: '100%' }}>
                                        <tr className="template-item">
                                            <th><span><strong>{__('Name', 'gutenverse-themes-builder')}</strong></span></th>
                                            <th><span><strong>{__('Type', 'gutenverse-themes-builder')}</strong></span></th>
                                            <th style={{textAlign: "center"}}><span><strong>{__('Delete', 'gutenverse-themes-builder')}</strong></span></th>
                                        </tr>
                                        {templateList.map((template, index) => {
                                            return template && template?.category === item.id && <tr key={index} className="template-item">
                                                <td><span>{template?.name}</span></td>
                                                <td><span className="template-type">{template?.template_type}</span></td>
                                                <td><div className="template-delete" onClick={() => setDeletePopup(template)}><DeleteAltIcon /></div></td>
                                            </tr>;
                                        })}
                                    </table>
                                </div>
                            </div>
                        </div>;
                    }) : <h3>{__('You don\'t have active theme', 'gutenverse-themes-builder')}</h3>
                )}
                {deletePopup && <WarningPopup
                    title={__('Are you sure want to delete this template?', 'gutenverse-themes-builder')}
                    detail={__('This will delete ALL content saved for this template.', 'gutenverse-themes-builder')}
                    onProceed={removeTemplate}
                    onClose={() => setDeletePopup(false)}
                />}
            </div>
        </ContentWrapper>
    );
};

export default ManageTemplates;