import { useState, useEffect } from '@wordpress/element';
import { deletePage, getPageList } from '../../../data/api-fetch';
import { isEmpty } from 'lodash';
import { __ } from '@wordpress/i18n';
import Table from './table';
import { DeleteIcon, EditIcon, PlusIcon } from '../data/icons';
import { WarningPopup } from './warning-popup';
import ContentWrapper from './content-wrapper';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { ArrowLeft } from 'react-feather';
import { AsyncSelect } from 'gutenverse-core/components';

export const CreatePagePopup = ({ onClose, updateList, onSearch,  }) => {
    const [pageName, setPageName] = useState('');
    const [templateSlug, setTemplateSlug] = useState('default');
    const pageCategory = 'gutenverse';

    const pageSubmit = () => {
        if (pageName !== '') {
            apiFetch({
                path: '/gtb-backend/v1/pages/create',
                method: 'POST',
                data: {
                    name: pageName,
                    category: pageCategory,
                    template: 'default' !== templateSlug ? `gutenverse-${templateSlug}` : 'default'
                }
            }).then(result => {
                const { status, data } = result;
                if ('success' === status) {
                    updateList(result?.data);
                    onClose();
                }
            }).catch((err) => {
                alert(err.message);
            });
        }
    };
    
    return (
        <div className="popup-container" onClick={onClose}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <div className="popup-header">
                    <span className="title pattern">{__('Create Page')}</span>
                </div>
                <div className="popup-body">
                    <div className="input-wrap">
                        <label>{__('Page Name', 'gutenverse-themes-builder')}</label>
                        <input type="text" value={pageName} onChange={e => setPageName(e.target.value)} />
                        <span className="description">{__('The name for your page', 'gutenverse-themes-builder')}</span>
                    </div>
                    <div className='input-wrap'>
                        <label>{__('Template', 'gutenverse-themes-builder')}</label><br/>
                        <AsyncSelect
                            id={"template-selector"}
                            className={"async-select-container"}
                            classNamePrefix={"async-select"}
                            isMulti={false}
                            noOptionsMessage={() => __('Type to start searching...', '--gctd--')}
                            onChange={(value)=> setTemplateSlug(value.value)}
                            loadOptions={input => onSearch(input)}
                        />
                    </div>
                </div>
                <div className="popup-footer">
                    <div className="buttons spaced">
                        <div className="back-button" onClick={onClose}>
                            <ArrowLeft size={14} />
                            {__('Back', 'gutenverse-themes-builder')}
                        </div>
                        <div className="button" onClick={pageSubmit}>
                            {__('Submit', 'gutenverse-themes-builder')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const EditPagePopup = ({ page, onClose, updateList, onSearch  }) => {
    const [pageName, setPageName] = useState(page.post_title);
    const [templateSlug, setTemplateSlug] = useState(page.template);
    const pageCategory = 'gutenverse';

    const pageSubmit = () => {
        if (pageName !== '') {
            apiFetch({
                path: '/gtb-backend/v1/pages/update',
                method: 'POST',
                data: {
                    id : page.ID,
                    name: pageName,
                    category: pageCategory,
                    template: 'default' !== templateSlug ? `gutenverse-${templateSlug}` : 'default'
                }
            }).then(result => {
                const { status, data } = result;
                if ('success' === status) {
                    updateList(result?.data);
                    onClose();
                }
            }).catch((err) => {
                alert(err.message);
            });
        }
    };
    
    return (
        <div className="popup-container" onClick={onClose}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <div className="popup-header">
                    <span className="title pattern">{__('Edit Page')}</span>
                </div>
                <div className="popup-body">
                    <div className="input-wrap">
                        <label>{__('Page Name', 'gutenverse-themes-builder')}</label>
                        <input type="text" value={pageName} onChange={e => setPageName(e.target.value)} />
                        <span className="description">{__('The name for your page', 'gutenverse-themes-builder')}</span>
                    </div>
                    <div className='input-wrap'>
                        <label>{__('Template', 'gutenverse-themes-builder')}</label><br/>
                        <AsyncSelect
                            id={"template-selector"}
                            className={"async-select-container"}
                            classNamePrefix={"async-select"}
                            isMulti={false}
                            noOptionsMessage={() => __('Type to start searching...', '--gctd--')}
                            onChange={(value)=> setTemplateSlug(value.value)}
                            loadOptions={input => onSearch(input)}
                            value={{id: templateSlug, label: templateSlug}}
                        />
                    </div>
                </div>
                <div className="popup-footer">
                    <div className="buttons spaced">
                        <div className="back-button" onClick={onClose}>
                            <ArrowLeft size={14} />
                            {__('Back', 'gutenverse-themes-builder')}
                        </div>
                        <div className="button" onClick={pageSubmit}>
                            {__('Submit', 'gutenverse-themes-builder')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ManagePages = () => {
    const [pageList, setPageList] = useState([]);
    const [deletePopup, setDeletePopup] = useState(false);
    const [createPagePopup, setCreatePagePopup] = useState(false);
    const [editPagePopup, setEditPagePopup] = useState(false);
    const {
        editPath,
    } = window['GutenverseThemeBuilder'];

    const updateList = (result) => {
        setPageList(result);
    };
    const onSearch = (input) => new Promise(resolve => {
        apiFetch({
            method: 'POST',
            path: addQueryArgs('gtb-backend/v1/templates/list'),
            data: {
                search : input,
                category : 'gutenverse'
            }
        }).then((response) => {
            let data = response.data.map(el => {
                return {
                    label: el.name,
                    value: el.name
                };
            });
            resolve(data);
        }).catch((err) => {
            alert(err.message);
        });
    });
    useEffect(() => {
        getPageList(updateList);
    }, []);
    const removePage = () => deletePage({ id: deletePopup }, updateList);
    return (
        <ContentWrapper
            title={__('Page List', 'gutenverse-themes-builder')}
            description={__('List of the page used for the theme', 'gutenverse-themes-builder')}
            headingButton={true}
            headingButtons={[
                {
                    buttonText: __('Add New', 'gutenverse-themes-builder'),
                    buttonEvent: () => setCreatePagePopup(true),
                    buttonIcon: <PlusIcon />,
                    buttonLoading: false
                }
            ]}
        >
            <>
                <Table
                    heads={['ID', 'Slug', 'Title', 'Action',]}
                >
                    <>
                        {!isEmpty(pageList) && pageList.map((page, key) => {
                            return <tr key={key}>
                                <td>{page?.ID}</td>
                                <td>{page?.post_name}</td>
                                <td>{page?.post_title}</td>
                                <td>
                                    <div className="actions">
                                        <a className="edit" onClick={() => setEditPagePopup(page)}><EditIcon />Edit</a>
                                        <a className="edit edit-content" target="_blank" rel="noreferrer" href={`${editPath}?post=${page?.ID}&action=edit`}><EditIcon />Edit Content</a>
                                        <a className="delete" onClick={() => setDeletePopup(page?.ID)}><DeleteIcon />Delete</a>
                                    </div>
                                </td>
                            </tr>;
                        })}
                    </>
                </Table>
                {deletePopup && <WarningPopup
                    title={__('Are you sure want to delete this pattern?', 'gutenverse-themes-builder')}
                    detail={__('Any templates that use this pattern will NOT be able to render and use this pattern again.', 'gutenverse-themes-builder')}
                    onProceed={removePage}
                    onClose={() => setDeletePopup(false)}
                />}
                {createPagePopup && <CreatePagePopup 
                    onClose={() => setCreatePagePopup(false)} 
                    updateList={updateList}
                    onSearch={onSearch}
                />}
                {editPagePopup && <EditPagePopup 
                    page={editPagePopup} 
                    onClose={() => setEditPagePopup(false)} 
                    updateList={updateList}
                    onSearch={onSearch}
                />}
            </>
        </ContentWrapper>
    );
};

export default ManagePages;