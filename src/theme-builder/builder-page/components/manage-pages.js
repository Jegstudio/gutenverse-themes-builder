import { useState, useEffect } from '@wordpress/element';
import { deletePage, getPageList, getTemplateListSelector } from '../../../data/api-fetch';
import { isEmpty } from 'lodash';
import { __ } from '@wordpress/i18n';
import Table from './table';
import { DeleteIcon, EditIcon, PlusIcon } from '../data/icons';
import { WarningPopup } from './warning-popup';
import ContentWrapper from './content-wrapper';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { ArrowLeft } from 'react-feather';

export const CreatePagePopup = ({ onClose, updateList }) => {
    const [pageName, setPageName] = useState('');
    const [templateSlug, setTemplateSlug] = useState('default');
    const [pageCategory, setPageCategory] = useState('gutenverse');
    const [noticeMessage, setNoticeMessage] = useState('');

    const pageSubmit = () => {
        if (pageName !== '') {
            apiFetch({
                path: '/gtb-backend/v1/page/create',
                method: 'POST',
                data: {
                    name: pageName,
                    category: pageCategory
                }
            }).then(result => {
                const { status, data } = result;
                if ('success' === status) {
                    updateList(result?.data?.list);
                    onClose();
                } else {
                    const { message } = data;
                    setNoticeMessage(message);
                }
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
                    {!isEmpty(noticeMessage) && <div className="gtb-notice">
                        {noticeMessage}
                    </div>}
                    <div className="input-wrap pattern-name">
                        <label>{__('Page Name', 'gutenverse-themes-builder')}</label>
                        <input type="text" value={pageName} onChange={e => setPageName(e.target.value)} />
                        <span className="description">{__('The name for your page', 'gutenverse-themes-builder')}</span>
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

export const EditPatternPopup = ({ id, onClose, updateList }) => {
    const [patternName, setPatternName] = useState('');
    const [patternSlug, setPatternSlug] = useState('');
    const [patternCategory, setPatternCategory] = useState('');
    const [noticeMessage, setNoticeMessage] = useState('');
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        apiFetch({
            path: addQueryArgs('gtb-backend/v1/pattern/data', {
                id
            })
        }).then(result => {
            if (!isEmpty(result)) {
                setPatternSlug(result?.slug);
                setPatternName(result?.name);
                setPatternCategory(result?.category);
                setFetching(false);
            }
        }).catch(() => { });
    }, []);

    const patternSubmit = () => {
        if (!fetching && patternName !== '' && patternSlug !== '') {
            apiFetch({
                path: '/gtb-backend/v1/pattern/edit',
                method: 'POST',
                data: {
                    id: id,
                    name: patternName,
                    slug: patternSlug,
                    category: patternCategory
                }
            }).then(result => {
                const { status, data } = result;

                if ('success' === status) {
                    updateList(result?.data?.list);
                    onClose();
                } else {
                    const { message } = data;
                    setNoticeMessage(message);
                }
            });
        }
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <div className="popup-header">
                    <span className="title pattern">{__('Edit Pattern')}</span>
                </div>
                <div className="popup-body">
                    {!isEmpty(noticeMessage) && <div className="gtb-notice">
                        {noticeMessage}
                    </div>}
                    <div className="input-wrap pattern-slug">
                        <label>{__('Pattern Slug', 'gutenverse-themes-builder')}</label>
                        <input type="text" value={patternSlug} onChange={e => setPatternSlug(e.target.value)} />
                        <span className="description">{__('Slug must use lowercase letter and replace spacing with dash (-).', 'gutenverse-themes-builder')}</span>
                    </div>
                    <div className="input-wrap pattern-name">
                        <label>{__('Pattern Name', 'gutenverse-themes-builder')}</label>
                        <input type="text" value={patternName} onChange={e => setPatternName(e.target.value)} />
                        <span className="description">{__('The name for your pattern', 'gutenverse-themes-builder')}</span>
                    </div>
                    <div className="input-wrap pattern-category">
                        <label>{__('Pattern Category', 'gutenverse-themes-builder')}</label>
                        <select onChange={e => { setPatternCategory(e.target.value); }}>
                            <option selected={patternCategory === 'core'} value="core">{__('Core', 'gutenverse-themes-builder')}</option>
                            <option selected={patternCategory === 'gutenverse'} value="gutenverse">{__('Gutenverse', 'gutenverse-themes-builder')}</option>
                            <option selected={patternCategory === 'pro'} value="pro">{__('Pro', 'gutenverse-themes-builder')}</option>
                        </select>
                        <span className="description">{__('Select your pattern category.', 'gutenverse-themes-builder')}</span>
                    </div>
                </div>
                <div className="popup-footer">
                    <div className="buttons spaced">
                        <div className="back-button" onClick={onClose}>
                            <ArrowLeft size={14} />
                            {__('Back', 'gutenverse-themes-builder')}
                        </div>
                        <div className="button" onClick={patternSubmit}>
                            {__('Save', 'gutenverse-themes-builder')}
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
    const [editPatternPopup, setEditPatternPopup] = useState(false);
    const [templateList, setTemplateList] = useState([]);
    const [templateSearch, setTemplateSearch] = useState('');
    const {
        editPath,
    } = window['GutenverseThemeBuilder'];

    const updateList = (result) => {
        setPageList(result);
    };
    const afterFetching = (response) => {
        setTemplateList(response?.data);
    };
    useEffect(() => {
        getPageList({ paged: 1 }, updateList);
        getTemplateListSelector({ search: templateSearch, category: 'gutenverse'}, afterFetching );
    }, []);
    console.log(templateList);
    const removePage = () => deletePage({ page_id: deletePopup, paged: 1 }, updateList);
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
                {/* <Table
                    heads={['ID', 'Slug', 'Title', 'Action',]}
                >
                    <>
                        {!isEmpty(patternList) && patternList.map((pattern, key) => {
                            return <tr key={key}>
                                <td>{pattern?.ID}</td>
                                <td>{pattern?.post_name}</td>
                                <td>{pattern?.post_title}</td>
                                <td>
                                    <div className="actions">
                                        <a className="edit" onClick={() => setEditPatternPopup(pattern?.ID)}><EditIcon />Edit</a>
                                        <a className="edit edit-content" target="_blank" rel="noreferrer" href={`${editPath}?post=${pattern?.ID}&action=edit`}><EditIcon />Edit Content</a>
                                        <a className="delete" onClick={() => setDeletePopup(pattern?.ID)}><DeleteIcon />Delete</a>
                                    </div>
                                </td>
                            </tr>;
                        })}
                    </>
                </Table>
                {deletePopup && <WarningPopup
                    title={__('Are you sure want to delete this pattern?', 'gutenverse-themes-builder')}
                    detail={__('Any templates that use this pattern will NOT be able to render and use this pattern again.', 'gutenverse-themes-builder')}
                    onProceed={removePattern}
                    onClose={() => setDeletePopup(false)}
                />} */}
                {createPagePopup && <CreatePagePopup onClose={() => setCreatePagePopup(false)} updateList={updateList} />}
                {/* {editPatternPopup && <EditPatternPopup id={editPatternPopup} onClose={() => setEditPatternPopup(false)} updateList={updateList} />} */}
            </>
        </ContentWrapper>
    );
};

export default ManagePages;