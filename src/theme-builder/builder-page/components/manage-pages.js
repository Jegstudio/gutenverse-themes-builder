import { useState, useEffect } from '@wordpress/element';
import { deletePage, getPageListPagination } from '../../../data/api-fetch';
import { isEmpty } from 'lodash';
import { __ } from '@wordpress/i18n';
import Table from './table';
import { CloseIcon, DeleteIcon, EditIcon, PlusIcon, WarningIcon } from '../data/icons';
import { WarningPopup } from './warning-popup';
import ContentWrapper from './content-wrapper';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import AsyncSelect from 'react-select/async';

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

    return <button className="button" onClick={() => selectItem(thumbnailFrame)}>{__('Choose Image', 'gutenverse-themes-builder')}</button>;
};
export const CreatePagePopup = ({ onClose, updateList, onSearch,  }) => {
    const [pageName, setPageName] = useState('');
    const [pagePreview, setPagePreview] = useState('');
    const [templateSlug, setTemplateSlug] = useState('default');
    const [pageImage, setPageImage] = useState('');
    const [isHomepage, setIsHomepage] = useState(false);
    const [order, setOrder] = useState(0);
    const pageCategory = 'gutenverse';

    const pageSubmit = () => {
        if (pageName !== '' && pagePreview !== '' && !isEmpty(pageImage)) {
            let slug = 'default';
            if('default' !== templateSlug){
                slug = `gutenverse-${templateSlug}`
            }
            apiFetch({
                path: '/gtb-backend/v1/pages/create',
                method: 'POST',
                data: {
                    name: pageName,
                    category: pageCategory,
                    template: slug,
                    pagePreview : pagePreview,
                    pageImage: pageImage?.id,
                    isHomepage: isHomepage,
                    order : order,
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
        }else{
            alert('You need to fill all field!');
        }
    };
    
    return (
        <div className="popup-container" onClick={onClose}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <div className="popup-header">
                    <span className="title pattern">{__('Create Page')}</span>
                    <div className="close-button" onClick={onClose}>
                        <CloseIcon />
                    </div>
                </div>
                <div className="popup-body">
                    <div className="input-wrap">
                        <label>{__('Page Name', 'gutenverse-themes-builder')}</label>
                        <input type="text" value={pageName} onChange={e => setPageName(e.target.value)} />
                        <span className="description">{__('The name for your page', 'gutenverse-themes-builder')}</span>
                    </div>
                    <div className="input-wrap">
                        <label>{__('Page Order', 'gutenverse-themes-builder')}</label>
                        <input type="number" min="1" value={order} onChange={e => setOrder(e.target.value)} />
                        <span className="description">{__('Set Your Page Order in Wizard. Page order cannot be duplicate. Each Page must have different order.', 'gutenverse-themes-builder')}</span>
                    </div>
                    <div className='input-wrap'>
                        <label>{__('Template', 'gutenverse-themes-builder')}</label>
                        <AsyncSelect
                            id={"template-selector"}
                            title={__('Template', 'gutenverse-themes-builder')}
                            className={"async-select-container"}
                            classNamePrefix={"async-select"}
                            isMulti={false}
                            noOptionsMessage={() => __('Type to start searching...', '--gctd--')}
                            onChange={(value)=> setTemplateSlug(value.value)}
                            loadOptions={input => onSearch(input)}
                        />
                    </div>
                    <div className='input-wrap'>
                        <input
                            type="checkbox"
                            onChange={() => setIsHomepage(!isHomepage)}
                            checked={isHomepage}
                            hidden
                        />
                        <label>{__('Assign as Homepage', 'gutenverse-themes-builder')}</label>
                    </div>
                    <div className='input-wrap'>
                        <label>
                            {__('Page Preview Url', 'gutenverse-themes-builder')}
                        </label>
                        <input
                            type="text"
                            name="page_demo"
                            value={pagePreview}
                            onChange={e => setPagePreview(e.target.value)}
                        />
                    </div>
                    <div className='input-wrap media-wrap'>
                        <label>
                            {__('Page Image', 'gutenverse-themes-builder')}
                        </label>
                        <MediaSelect updateThumbnailData={value => setPageImage(value)} />
                        {pageImage?.url && <div className="image-wrapper">
                            <img src={pageImage?.url}/>
                        </div>}
                    </div>
                </div>
                <div className="popup-footer">
                    <div className="buttons end">
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
    const [pagePreview, setPagePreview] = useState(page.page_preview);
    const [pageImage, setPageImage] = useState(page.page_image);
    const [isHomepage, setIsHomepage] = useState(page?.is_homepage);
    const [order, setOrder] = useState(page?.order);
    const pageCategory = 'gutenverse';
    const [isEdited, setIsEdited] = useState(false);
    const [closeWhenEdited, setCloseWhenEdited] = useState(false);

    const pageSubmit = () => {
        if (pageName !== '') {
            let slug = 'default';
            if('default' !== templateSlug){
                slug = `gutenverse-${templateSlug}`
            }
            apiFetch({
                path: '/gtb-backend/v1/pages/update',
                method: 'POST',
                data: {
                    id : page.ID,
                    name: pageName,
                    category: pageCategory,
                    template: slug,
                    pagePreview : pagePreview,
                    pageImage: pageImage?.id,
                    isHomepage: isHomepage,
                    order: order
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
                        <span className="title pattern">{__('Edit Page')}</span>
                        <div className="close-button" onClick={handleOnClose}>
                            <CloseIcon />
                        </div>
                    </div>
                    <div className="popup-body">
                        <div className="input-wrap">
                            <label>{__('Page Name', 'gutenverse-themes-builder')}</label>
                            <input type="text" value={pageName} onChange={e => { setPageName(e.target.value); setIsEdited(true); }} />
                            <span className="description">{__('The name for your page', 'gutenverse-themes-builder')}</span>
                        </div>
                        <div className="input-wrap">
                            <label>{__('Page Order', 'gutenverse-themes-builder')}</label>
                            <input type="number" min="1" value={order} onChange={e => { setOrder(e.target.value); setIsEdited(true);}} />
                            <span className="description">{__('Set Your Page Order in Wizard. Page order cannot be duplicate. Each Page must have different order.', 'gutenverse-themes-builder')}</span>
                        </div>
                        <div className='input-wrap'>
                            <label>{__('Template', 'gutenverse-themes-builder')}</label><br/>
                            <AsyncSelect
                                id={"template-selector"}
                                className={"async-select-container"}
                                classNamePrefix={"async-select"}
                                isMulti={false}
                                noOptionsMessage={() => __('Type to start searching...', '--gctd--')}
                                onChange={(value)=> { setTemplateSlug(value.value); setIsEdited(true); }}
                                loadOptions={input => onSearch(input)}
                                value={{id: templateSlug, label: templateSlug}}
                            />
                        </div>
                        <div className='input-wrap'>
                            <input
                                type="checkbox"
                                onChange={() => { setIsHomepage(!isHomepage); setIsEdited(true); }}
                                checked={isHomepage}
                                hidden
                            />
                            <label>{__('Assign as Homepage', 'gutenverse-themes-builder')}</label>
                        </div>
                        <div className='input-wrap'>
                            <label>
                                {__('Page Preview Url', 'gutenverse-themes-builder')}
                            </label>
                            <input
                                type="text"
                                name="page_demo"
                                value={pagePreview}
                                onChange={e => { setPagePreview(e.target.value); setIsEdited(true); }}
                            />
                        </div>
                        <div className='input-wrap media-wrap'>
                            <label>
                                {__('Page Image', 'gutenverse-themes-builder')}
                            </label>
                            <MediaSelect updateThumbnailData={value => { setPageImage(value); setIsEdited(true);}} />
                            {pageImage?.url && <div className="image-wrapper">
                                <img src={pageImage?.url}/>
                            </div>}
                        </div>
                    </div>
                    <div className="popup-footer">
                        <div className="buttons end">
                            <div className="button" onClick={pageSubmit}>
                                {__('Submit', 'gutenverse-themes-builder')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
};

const ManagePages = () => {
    const [pageList, setPageList] = useState([]);
    const [deletePopup, setDeletePopup] = useState(false);
    const [createPagePopup, setCreatePagePopup] = useState(false);
    const [editPagePopup, setEditPagePopup] = useState(false);
    const [paged,setPaged] = useState(1);
    const [totalData, setTotalData] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    let num_post = 10;

    const {
        editPath,
    } = window['GutenverseThemeBuilder'];

    const {
       url
    } = window['GutenverseDashboard'];

    const updateList = (result) => {
        setPageList(result?.pages);
        setTotalData(result?.total_posts);
        setTotalPage(result?.total_page);
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
                let label = el.name.toLowerCase();
                let value = label?.replace(' ', '-');

                return {
                    label,
                    value
                };
            });
            resolve(data);
        }).catch((err) => {
            alert(err.message);
        });
    });

    useEffect(() => {
        getPageListPagination({
            paged,
            num_post
        },updateList);
    }, [paged]);

    const removePage = () => deletePage({ id: deletePopup }, updateList);

    return (
        <ContentWrapper
            title={__('Page List', 'gutenverse-themes-builder')}
            description={__('List of the page used for the theme', 'gutenverse-themes-builder')}
            headingButton={true}
            headingButtons={[
                {
                    buttonText: __('Create Page', 'gutenverse-themes-builder'),
                    buttonEvent: () => setCreatePagePopup(true),
                    buttonIcon: <PlusIcon />,
                    buttonLoading: false,
                    buttonHide : totalData === 0
                }
            ]}
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
            <>
                <Table
                    heads={['Order', 'Slug', 'Title', 'Action',]}
                    length={pageList.length}
                    paged={paged}
                    setPaged={setPaged}
                    totalData={totalData}
                    totalPage={totalPage}
                    emptyTitle = {__('You Haven’t Created Any Pages Yet', 'gutenverse-themes-builder')} 
                    emptySubtitle = {__('Click \'Create Page\' to add and manage pages that will be included as demos when exporting your theme.', 'gutenverse-themes-builder')}
                    showButton = {true}
                    buttons = {[
                        {
                            buttonElement : () => <div className="button create" onClick={() => setCreatePagePopup(true)}><PlusIcon fill={'white'}/> {__('Create Page', 'gutenverse-themes-builder')}</div>,
                            buttonLoading : false
                        }
                    ]}
                >
                    <>
                        {!isEmpty(pageList) && pageList.map((page, key) => {
                            return <tr key={key}>
                                <td width={'5%'}>{page?.order}</td>
                                <td >{page?.post_name}</td>
                                <td >{page?.post_title}</td>
                                <td>
                                    <div className="actions">
                                        <a className="edit" onClick={() => setEditPagePopup(page)}>Quick Edit</a>
                                        <a className="edit" target="_blank" rel="noreferrer" href={`${editPath}?post=${page?.ID}&action=edit`}><EditIcon />Edit</a>
                                        <a className="edit" target="_blank" rel="noreferrer" href={`${url}/${page?.post_name}`}>View</a>
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