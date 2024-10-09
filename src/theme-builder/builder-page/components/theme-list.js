import { useState, useEffect } from '@wordpress/element';
import { deleteTheme, getThemeList, getThemeListPagination, updateActiveTheme } from '../../../data/api-fetch';
import { isEmpty } from 'lodash';
import { __ } from '@wordpress/i18n';
import Table from './table';
import { DeleteIcon, EditIcon, PlusIcon } from '../data/icons';
import { WarningPopup } from './warning-popup';
import ContentWrapper from './content-wrapper';
import Details from './details';
import { createTheme } from '../../../data/api-fetch';
import { DEFAULT_DATA } from '../data/default';
import { ArrowLeft } from 'react-feather';
import { getThemeData, updateTheme } from '../../../data/api-fetch';
import { checkDetails } from '../data/helper';

const importantData = {
    slug: true,
    title: true,
    author_name: true,
    theme_version: true,
    wp_min_version: true,
    wp_tested_version: true,
    php_version: true,
};

const CreateTheme = ({ setMode, updateThemeList }) => {
    const [themeData, setThemeData] = useState(DEFAULT_DATA);
    const [noticeMessage, setNoticeMessage] = useState('');

    const updateCallback = (response) => {
        if (response?.status === 'success') {
            updateThemeList();
            setMode('list');
        } else {
            setNoticeMessage(response?.data?.message);
        }
    };

    const onCreateTheme = () => {
        if (!checkDetails(importantData, themeData?.info_details)) {
            return setNoticeMessage('Please fill all the required data!');
        }

        createTheme(themeData, updateCallback);
    };

    const backButton = <div className="buttons inline">
        <button className="button data" onClick={() => setMode('list')}><ArrowLeft size={14} /></button>
    </div>;

    const actionButton = <div className="buttons end">
        <button className="button data create" onClick={onCreateTheme}>{__('Create Theme', 'gutenverse-themes-builder')}</button>
    </div>;

    const notice = !isEmpty(noticeMessage) && <div className="gtb-notice">
        {noticeMessage}
    </div>;

    return (
        <>
            <div className="builder-content">
                <Details
                    notice={notice}
                    backButton={backButton}
                    actionButton={actionButton}
                    themeData={themeData}
                    setThemeData={setThemeData} />
            </div>
        </>
    );
};

const EditTheme = ({ themeId, setMode, updateThemeList }) => {
    const [themeData, setThemeData] = useState({});
    const [noticeMessage, setNoticeMessage] = useState('');

    useEffect(() => {
        getThemeData(themeId, setThemeData);
    }, []);

    const updateCallback = (response) => {
        if (response?.status === 'success') {
            updateThemeList();
            setMode('list');
        } else {
            setNoticeMessage(response?.data?.message);
        }
    };

    const updateThemeData = () => {
        if (!checkDetails(importantData, themeData?.info_details)) {
            return setNoticeMessage('Please fill all the required data!');
        }

        updateTheme(themeData, themeId, updateCallback);
    };

    const backButton = <div className="buttons inline">
        <button className="button data" onClick={() => setMode('list')}><ArrowLeft size={14} /></button>
    </div>;

    const actionButton = <div className="buttons end">
        <button className="button data create" onClick={updateThemeData}>{__('Save Changes', 'gutenverse-themes-builder')}</button>
    </div>;

    const notice = !isEmpty(noticeMessage) && <div className="gtb-notice">
        {noticeMessage}
    </div>;

    return (
        <>
            <div className="builder-content">
                <Details
                    notice={notice}
                    backButton={backButton}
                    actionButton={actionButton}
                    themeData={themeData}
                    setThemeData={setThemeData} />
            </div>
        </>
    );
};

const ThemeList = () => {
    const [themeId, setThemeId] = useState(null);
    const [mode, setMode] = useState(false);
    const [themeList, setThemeList] = useState([]);
    const [activeTheme, setActiveTheme] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false);
    const [switchPopup, setSwitchPopup] = useState(false);
    const [paged,setPaged] = useState(1);
    const [totalData, setTotalData] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    let num_post = 10;

    const updateThemeList = (result) => {
        setThemeList(result?.data.list);
        setTotalData(parseInt(result?.data.total_data));
        setActiveTheme(result?.active);
        setTotalPage(result?.total_page);
    };

    const handleChangeData = (result) => {
        setPaged(1);
        getThemeListPagination({
            paged: 1,
            num_post : num_post
        },updateThemeList);
    }

    useEffect(() => {
        getThemeListPagination({
            paged,
            num_post : num_post
        },updateThemeList);
    }, [paged]);

    const setEditTheme = (id) => {
        setMode('edit');
        setThemeId(id);
    };

    const removeTheme = () => {
        deleteTheme(deletePopup, handleChangeData);
    };

    const updateActiveID = () => {
        updateActiveTheme(switchPopup, handleChangeData);
    };

    let Content = null;

    switch (mode) {
        case 'create':
            Content = <CreateTheme themeId={themeId} setMode={setMode} updateThemeList={handleChangeData} />;
            break;
        case 'edit':
            Content = <EditTheme themeId={themeId} setMode={setMode} updateThemeList={handleChangeData} />;
            break;
        default:
            Content = <ContentWrapper
                title={__('Theme List', 'gutenverse-themes-builder')}
                description={__('This is a place to manage all your current themes project and it’s details information. Only one theme can be active at a time.', 'gutenverse-themes-builder')}
                headingButton={true}
                headingButtons={[
                    {
                        buttonText: __('Create Theme', 'gutenverse-themes-builder'),
                        buttonEvent: () => setMode('create'),
                        buttonIcon: <PlusIcon />,
                        buttonLoading: false,
                        buttonHide : totalData === 0
                    }
                ]}
            >
                <>
                    <Table
                        heads={['Theme ID', 'Slug', 'Name', 'Status', 'Action',]}
                        length={themeList.length}
                        paged={paged}
                        setPaged={setPaged}
                        numPost={num_post}
                        totalData={totalData}
                        totalPage={totalPage}
                        emptyTitle = {__('You Haven’t Created Any Theme Yet', 'gutenverse-themes-builder')} 
                        emptySubtitle = {__('Click \'Create Theme\' to create and manage your theme projects.', 'gutenverse-themes-builder')}
                        showButton = {true}
                        buttons = {[
                            {
                                buttonElement : () => <div className="button create" onClick={() => setMode('create')}><PlusIcon fill={'white'}/> {__('Create Theme', 'gutenverse-themes-builder')}</div>,
                                buttonLoading : false
                            }
                        ]}
                    >
                        <>
                            {!isEmpty(themeList) && themeList.map((theme, key) => {
                                const active = activeTheme === theme?.theme_id;

                                return <tr key={key}>
                                    <td width={'10%'}>{theme?.theme_id}</td>
                                    <td >{theme?.slug}</td>
                                    <td >{theme?.theme_data?.title}</td>
                                    <td width={'10%'}><span className={`status ${active ? 'active' : ''}`}>{active ? __('ACTIVE', 'gutenverse-themes-builder') : __('INACTIVE', 'gutenverse-themes-builder')}</span></td>
                                    <td>
                                        <div className="actions">
                                            {!active && <a className="edit" onClick={() => setSwitchPopup(theme?.theme_id)}>Set Active</a>}
                                            <a className="edit" onClick={() => setEditTheme(theme?.theme_id)}><EditIcon />Edit</a>
                                            <a className="delete" onClick={() => setDeletePopup(theme?.theme_id)}><DeleteIcon />Delete</a>
                                        </div>
                                    </td>
                                </tr>;
                            })}
                        </>
                    </Table>
                    {switchPopup && <WarningPopup
                        title={__('Switch to this theme?', 'gutenverse-themes-builder')}
                        detail={__('Your current theme templates data will be saved into files, your data won\'t be lost when you switch back BUT any saved changes will be made PERMANENT.', 'gutenverse-themes-builder')}
                        actionText={__('Switch', 'gutenverse-themes-builder')}
                        onProceed={updateActiveID}
                        onClose={() => setSwitchPopup(false)}
                    />}
                    {deletePopup && <WarningPopup
                        title={__('Are you sure want to delete this theme?', 'gutenverse-themes-builder')}
                        detail={__('This is PERMANENT and you would not be able to restore this later.', 'gutenverse-themes-builder')}
                        onProceed={removeTheme}
                        onClose={() => setDeletePopup(false)}
                    />}
                </>
            </ContentWrapper>;
            break;
    }

    return Content;
};

export default ThemeList;