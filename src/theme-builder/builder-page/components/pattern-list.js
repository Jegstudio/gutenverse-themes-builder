import { useState, useEffect } from '@wordpress/element';
import { deletePattern, getPatternList } from '../../../data/api-fetch';
import { isEmpty } from 'lodash';
import { __ } from '@wordpress/i18n';
import Table from './table';
import { DeleteIcon, EditIcon, PlusIcon } from '../data/icons';
import { WarningPopup } from './warning-popup';
import ContentWrapper from './content-wrapper';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { ArrowLeft } from 'react-feather';

export const CreatePatternPopup = ({ onClose, updateList }) => {
    const [patternName, setPatternName] = useState('');
    const [patternSlug, setPatternSlug] = useState('');
    const [patternCategory, setPatternCategory] = useState('core');
    const [noticeMessage, setNoticeMessage] = useState('');

    const patternSubmit = () => {
        if (patternName !== '' && patternSlug !== '') {
            apiFetch({
                path: '/gtb-backend/v1/pattern/create',
                method: 'POST',
                data: {
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
        <div className="popup-container" onClick={onClose}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <div className="popup-header">
                    <span className="title pattern">{__('Create Pattern')}</span>
                </div>
                <div className="popup-body">
                    {!isEmpty(noticeMessage) && <div className="gtb-notice">
                        {noticeMessage}
                    </div>}
                    <div className="input-wrap pattern-slug">
                        <label>{__('Pattern Slug', 'gtb')}</label>
                        <input type="text" value={patternSlug} onChange={e => setPatternSlug(e.target.value)} />
                        <span className="description">{__('Slug must use lowercase letter and replace spacing with dash (-).', 'gtb')}</span>
                    </div>
                    <div className="input-wrap pattern-name">
                        <label>{__('Pattern Name', 'gtb')}</label>
                        <input type="text" value={patternName} onChange={e => setPatternName(e.target.value)} />
                        <span className="description">{__('The name for your pattern', 'gtb')}</span>
                    </div>
                    <div className="input-wrap pattern-category">
                        <label>{__('Pattern Category', 'gtb')}</label>
                        <select onChange={e => { setPatternCategory(e.target.value); }}>
                            <option selected={patternCategory === 'core'} value="core">{__('Core', 'gtb')}</option>
                            <option selected={patternCategory === 'gutenverse'} value="gutenverse">{__('Gutenverse', 'gtb')}</option>
                            <option selected={patternCategory === 'pro'} value="pro">{__('Pro', 'gtb')}</option>
                        </select>
                        <span className="description">{__('Select your pattern category.', 'gtb')}</span>
                    </div>
                </div>
                <div className="popup-footer">
                    <div className="buttons spaced">
                        <div className="back-button" onClick={onClose}>
                            <ArrowLeft size={14} />
                            {__('Back', 'gtb')}
                        </div>
                        <div className="button" onClick={patternSubmit}>
                            {__('Submit', 'gtb')}
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
                        <label>{__('Pattern Slug', 'gtb')}</label>
                        <input type="text" value={patternSlug} onChange={e => setPatternSlug(e.target.value)} />
                        <span className="description">{__('Slug must use lowercase letter and replace spacing with dash (-).', 'gtb')}</span>
                    </div>
                    <div className="input-wrap pattern-name">
                        <label>{__('Pattern Name', 'gtb')}</label>
                        <input type="text" value={patternName} onChange={e => setPatternName(e.target.value)} />
                        <span className="description">{__('The name for your pattern', 'gtb')}</span>
                    </div>
                    <div className="input-wrap pattern-category">
                        <label>{__('Pattern Category', 'gtb')}</label>
                        <select onChange={e => { setPatternCategory(e.target.value); }}>
                            <option selected={patternCategory === 'core'} value="core">{__('Core', 'gtb')}</option>
                            <option selected={patternCategory === 'gutenverse'} value="gutenverse">{__('Gutenverse', 'gtb')}</option>
                            <option selected={patternCategory === 'pro'} value="pro">{__('Pro', 'gtb')}</option>
                        </select>
                        <span className="description">{__('Select your pattern category.', 'gtb')}</span>
                    </div>
                </div>
                <div className="popup-footer">
                    <div className="buttons spaced">
                        <div className="back-button" onClick={onClose}>
                            <ArrowLeft size={14} />
                            {__('Back', 'gtb')}
                        </div>
                        <div className="button" onClick={patternSubmit}>
                            {__('Save', 'gtb')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PatternList = () => {
    const [patternList, setPatternList] = useState([]);
    const [deletePopup, setDeletePopup] = useState(false);
    const [createPatternPopup, setCreatePatternPopup] = useState(false);
    const [editPatternPopup, setEditPatternPopup] = useState(false);
    const {
        editPath,
    } = window['GutenverseThemeBuilder'];

    const updateList = (result) => {
        setPatternList(result);
    };

    useEffect(() => {
        getPatternList({ paged: 1 }, updateList);
    }, []);

    const removePattern = () => deletePattern({ pattern_id: deletePopup, paged: 1 }, updateList);
    return (
        <ContentWrapper
            title={__('Pattern List', 'gtb')}
            description={__('This is a place to manage all your block patterns of your current active theme. Please make sure each pattern on each of your theme projects have different slug names.', 'gtb')}
            headingButton={true}
            headingButtons={[
                {
                    buttonText : __('Add New', 'gtb'),
                    buttonEvent : () => setCreatePatternPopup(true),
                    buttonIcon : <PlusIcon />,
                    buttonLoading : false
                }
            ]}
        >
            <>
                <Table
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
                    title={__('Are you sure want to delete this pattern?', 'gtb')}
                    detail={__('Any templates that use this pattern will NOT be able to render and use this pattern again.', 'gtb')}
                    onProceed={removePattern}
                    onClose={() => setDeletePopup(false)}
                />}
                {createPatternPopup && <CreatePatternPopup onClose={() => setCreatePatternPopup(false)} updateList={updateList} />}
                {editPatternPopup && <EditPatternPopup id={editPatternPopup} onClose={() => setEditPatternPopup(false)} updateList={updateList} />}
            </>
        </ContentWrapper>
    );
};

export default PatternList;