import { useState, useEffect } from '@wordpress/element';
import { deletePattern, getPatternListPagination } from '../../../data/api-fetch';
import { isEmpty } from 'lodash';
import { __ } from '@wordpress/i18n';
import Table from './table';
import { CloseIcon, DeleteIcon, EditIcon, PlusIcon } from '../data/icons';
import { WarningPopup } from './warning-popup';
import ContentWrapper from './content-wrapper';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

export const CreatePatternPopup = ({ onClose, updateList }) => {
    const [patternName, setPatternName] = useState('');
    const [patternSlug, setPatternSlug] = useState('');
    const [patternCategory, setPatternCategory] = useState('core');
    const [patternSync, setPatternSync] = useState(false);
    const [noticeMessage, setNoticeMessage] = useState('');

    const patternSubmit = () => {
        if (patternName !== '' && patternSlug !== '') {
            apiFetch({
                path: '/gtb-backend/v1/pattern/create',
                method: 'POST',
                data: {
                    name: patternName,
                    slug: patternSlug,
                    category: patternCategory,
                    sync: patternSync
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
                    <div className="close-button" onClick={onClose}>
                        <CloseIcon />
                    </div>
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
                    <div className="input-wrap pattern-sync">
                        <input
                            type="checkbox"
                            onChange={() => setPatternSync(!patternSync)}
                            checked={patternSync}
                            hidden
                        />
                        <label>{__('Export as Pattern Sync', 'gutenverse-themes-builder')}</label><br/>
                        <span className="description">{__('Sync pattern when exported. This option does not have any function in pattern wrapper. It used to categorize when pattern exported', 'gutenverse-themes-builder')}</span>
                    </div>
                </div>
                <div className="popup-footer">
                    <div className="buttons end">
                        <div className="button" onClick={patternSubmit}>
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
    const [patternSync, setPatternSync] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [isEdited, setIsEdited] = useState(false);
    const [closeWhenEdited, setCloseWhenEdited] = useState(false);

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
                setPatternSync(result?.sync);
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
                    category: patternCategory,
                    sync: patternSync
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

    const handleOnClose = () => {
        if(isEdited){
            setCloseWhenEdited(true);
        }else{
            onClose();
        }
    }

    return <>
        {
            closeWhenEdited ? <WarningPopup 
                title={__('Are you sure want to leave this menu ?', 'gutenverse-themes-builder')}
                detail={__('Changes you made may not be saved.', 'gutenverse-themes-builder')}
                onProceed={onClose}
                onClose={() => setCloseWhenEdited(false)}
                actionText={__('Leave', 'gutenverse-themes-builder')}
                buttonFill='#3B57F7'
                svgFill='#FFC908'
            /> : <div className="popup-container" onClick={handleOnClose}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <div className="popup-header">
                    <span className="title pattern">{__('Edit Pattern')}</span>
                    <div className="close-button" onClick={handleOnClose}>
                        <CloseIcon />
                    </div>
                </div>
                <div className="popup-body">
                    {!isEmpty(noticeMessage) && <div className="gtb-notice">
                        {noticeMessage}
                    </div>}
                    <div className="input-wrap pattern-slug">
                        <label>{__('Pattern Slug', 'gutenverse-themes-builder')}</label>
                        <input type="text" value={patternSlug} onChange={e => { setPatternSlug(e.target.value); setIsEdited(true)}} />
                        <span className="description">{__('Slug must use lowercase letter and replace spacing with dash (-).', 'gutenverse-themes-builder')}</span>
                    </div>
                    <div className="input-wrap pattern-name">
                        <label>{__('Pattern Name', 'gutenverse-themes-builder')}</label>
                        <input type="text" value={patternName} onChange={e => { setPatternName(e.target.value); setIsEdited(true)}} />
                        <span className="description">{__('The name for your pattern', 'gutenverse-themes-builder')}</span>
                    </div>
                    <div className="input-wrap pattern-category">
                        <label>{__('Pattern Category', 'gutenverse-themes-builder')}</label>
                        <select onChange={e => { setPatternCategory(e.target.value); setIsEdited(true)}}>
                            <option selected={patternCategory === 'core'} value="core">{__('Core', 'gutenverse-themes-builder')}</option>
                            <option selected={patternCategory === 'gutenverse'} value="gutenverse">{__('Gutenverse', 'gutenverse-themes-builder')}</option>
                            <option selected={patternCategory === 'pro'} value="pro">{__('Pro', 'gutenverse-themes-builder')}</option>
                        </select>
                        <span className="description">{__('Select your pattern category.', 'gutenverse-themes-builder')}</span>
                    </div>
                    <div className="input-wrap pattern-sync">
                        <input
                            type="checkbox"
                            onChange={() => { setPatternSync(e.target.value); setIsEdited(true)}}
                            checked={patternSync}
                            hidden
                        />
                        <label>{__('Export as Pattern Sync', 'gutenverse-themes-builder')}</label><br/>
                        <span className="description">{__('Sync pattern when exported. This option does not have any function in pattern wrapper. It used to categorize when pattern exported', 'gutenverse-themes-builder')}</span>
                    </div>
                </div>
                <div className="popup-footer">
                    <div className="buttons end">
                        <div className="button" onClick={patternSubmit}>
                            {__('Save', 'gutenverse-themes-builder')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
    </>
        
};

const PatternList = () => {
    const [patternList, setPatternList] = useState([]);
    const [deletePopup, setDeletePopup] = useState(false);
    const [createPatternPopup, setCreatePatternPopup] = useState(false);
    const [editPatternPopup, setEditPatternPopup] = useState(false);
    const [paged,setPaged] = useState(1);
    const [totalData, setTotalData] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    let num_post = 10;

    const {
        editPath,
    } = window['GutenverseThemeBuilder'];

    const updateList = (result) => {
        setPatternList(result?.patterns);
        setTotalData(result?.total_posts);
        setTotalPage(result?.total_page);
    };

    useEffect(() => {
        getPatternListPagination({ paged: paged, num_post: num_post }, updateList);
    }, [paged]);

    const removePattern = () => deletePattern({ pattern_id: deletePopup, paged: 1 }, updateList);
    return (
        <ContentWrapper
            title={__('Pattern List', 'gutenverse-themes-builder')}
            description={__('This is a place to manage all your block patterns of your current active theme. Please make sure each pattern on each of your theme projects have different slug names.', 'gutenverse-themes-builder')}
            headingButton={true}
            headingButtons={[
                {
                    buttonText: __('Add New', 'gutenverse-themes-builder'),
                    buttonEvent: () => setCreatePatternPopup(true),
                    buttonIcon: <PlusIcon />,
                    buttonLoading: false
                }
            ]}
        >
            <>
                <Table
                    heads={['ID', 'Slug', 'Title', 'Category', 'Action']}
                    length={patternList.length}
                    paged={paged}
                    setPaged={setPaged}
                    numPost={num_post}
                    totalData={totalData}
                    totalPage={totalPage}
                >
                    <>
                        {!isEmpty(patternList) && patternList.map((pattern, key) => {
                            return <tr key={key}>
                                <td>{pattern?.ID}</td>
                                <td>{pattern?.post_name}</td>
                                <td>{pattern?.post_title}</td>
                                <td>{pattern?.category.charAt(0).toUpperCase() + pattern?.category.slice(1)}</td>
                                <td>
                                    <div className="actions">
                                        <a className="edit" onClick={() => setEditPatternPopup(pattern?.ID)}>Quick Edit</a>
                                        <a className="edit" target="_blank" rel="noreferrer" href={`${editPath}?post=${pattern?.ID}&action=edit`}><EditIcon />Editor</a>
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
                />}
                {createPatternPopup && <CreatePatternPopup onClose={() => setCreatePatternPopup(false)} updateList={updateList} />}
                {editPatternPopup && <EditPatternPopup id={editPatternPopup} onClose={() => setEditPatternPopup(false)} updateList={updateList} />}
            </>
        </ContentWrapper>
    );
};

export default PatternList;