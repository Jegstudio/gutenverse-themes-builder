import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { getTemplateList, createTemplate, deleteTemplate } from '../../../data/api-fetch';
import SelectControl from '../controls/select-control';
import TextControl from '../controls/text-control';
import { CATEGORIES, NAMABLE_TEMPLATES, TEMPLATE_TYPES } from '../data/default';
import { checkThemeMode } from '../data/helper';
import { DeleteAltIcon } from '../data/icons';
import { WarningPopup } from './warning-popup';
import ContentWrapper from './content-wrapper';

const ManageTemplates = () => {
    const [themeMode, setThemeMode] = useState(null);
    const [templateData, setTemplateData] = useState(null);
    const [templateList, setTemplateList] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false);
    const [fetching, setFetching] = useState(true);

    const afterFetching = (response) => {
        setThemeMode(response?.mode);
        setTemplateList(response?.data);
        setFetching(false);
    };

    useEffect(() => {
        getTemplateList(afterFetching);
    }, []);

    const addTemplate = (category) => {
        if (templateData?.[category]?.name && templateData?.[category]?.template_type) {
            const params = {
                template_data: {
                    category,
                    name: templateData?.[category]?.name,
                    template_type: templateData?.[category]?.template_type
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

    return (
        <ContentWrapper
            title={__('Template List', 'gtb')}
            description={__('This is a place to manage all your templates of your current active theme. Template categories is loaded based on what your current theme mode is. If you don’t have any active theme, please set one at the Theme List tab.', 'gtb')}
        >
            <div className="template-page-wrapper">
                {fetching ? <div className="loader"></div> : (
                    templateList ? CATEGORIES.map(item => {
                        return checkThemeMode(item?.id, themeMode) && <div key={item.id} className="template-page-category">
                            <div className="heading">
                                <h3 className="subtitle">{item.name}</h3>
                            </div>
                            <div className="body">
                                <SelectControl
                                    id={'template_type'}
                                    title={__('Type')}
                                    value={templateData?.[item.id]?.template_type}
                                    options={TEMPLATE_TYPES}
                                    onChange={onDataChange(item.id, 'template_type')}
                                />
                                {NAMABLE_TEMPLATES.includes(templateData?.[item.id]?.template_type) && <TextControl
                                    id={'template_name'}
                                    title={__('Name', 'gtb')}
                                    value={templateData?.[item.id]?.name}
                                    onChange={onDataChange(item.id, 'name')}
                                />}
                                <div className="buttons">
                                    <div className="template-add" onClick={() => addTemplate(item.id)}>{__('Add New', 'gtb')}</div>
                                </div>
                                <div className="template-list">
                                    <h3>{__('Template List', 'gtb')}</h3>
                                    <table style={{ width: '100%' }}>
                                        <tr className="template-item">
                                            <th><span><strong>{__('Name', 'gtb')}</strong></span></th>
                                            <th><span><strong>{__('Type', 'gtb')}</strong></span></th>
                                            <th><span><strong>{__('Delete', 'gtb')}</strong></span></th>
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
                    }) : <h3>{__('You don\'t have active theme', 'gtb')}</h3>
                )}
                {deletePopup && <WarningPopup
                    title={__('Are you sure want to delete this template?', 'gtb')}
                    detail={__('This will delete ALL content saved for this template.', 'gtb')}
                    onProceed={removeTemplate}
                    onClose={() => setDeletePopup(false)}
                />}
            </div>
        </ContentWrapper>
    );
};

export default ManageTemplates;