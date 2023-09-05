import { useState, useEffect } from '@wordpress/element';
import { deleteTheme, getThemeList, updateActiveTheme } from '../../../data/api-fetch';
import { isEmpty } from 'lodash';
import { __ } from '@wordpress/i18n';
import Table from './table';
import { DeleteIcon, EditIcon } from '../data/icons';
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
            updateThemeList(response?.data?.list);
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
        <button className="button data create" onClick={onCreateTheme}>{__('Create Now', 'gtb')}</button>
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
            updateThemeList(response?.data?.list);
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
        <button className="button data create" onClick={updateThemeData}>{__('Save Changes', 'gtb')}</button>
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

    const updateThemeList = (result) => {
        setThemeList(result?.data);
        setActiveTheme(result?.active);
    };

    useEffect(() => {
        getThemeList(updateThemeList);
    }, []);

    const setEditTheme = (id) => {
        setMode('edit');
        setThemeId(id);
    };

    const removeTheme = () => {
        deleteTheme(deletePopup, updateThemeList);
    };

    const updateActiveID = () => {
        updateActiveTheme(switchPopup, updateThemeList);
    };

    let Content = null;

    switch (mode) {
        case 'create':
            Content = <CreateTheme themeId={themeId} setMode={setMode} updateThemeList={updateThemeList} />;
            break;
        case 'edit':
            Content = <EditTheme themeId={themeId} setMode={setMode} updateThemeList={updateThemeList} />;
            break;
        default:
            Content = <ContentWrapper
                title={__('Theme List', 'gtb')}
                description={__('This is a place to manage all your current themes project and it’s details information. Only one theme can be active at a time.', 'gtb')}
                headingButton={true}
                headingButtonOnClick={() => setMode('create')}
            >
                <>
                    <Table
                        heads={['Theme ID', 'Slug', 'Name', 'Status', 'Action',]}
                    >
                        <>
                            {!isEmpty(themeList) && themeList.map((theme, key) => {
                                const active = activeTheme === theme?.theme_id;

                                return <tr key={key}>
                                    <td>{theme?.theme_id}</td>
                                    <td>{theme?.slug}</td>
                                    <td>{theme?.theme_data?.title}</td>
                                    <td><span className={`status ${active ? 'active' : ''}`}>{active ? __('Active', 'gtb') : __('Inactive', 'gtb')}</span></td>
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
                        title={__('Switch to this theme?', 'gtb')}
                        detail={__('Your current theme templates data will be saved into files, your data won\'t be lost when you switch back BUT any saved changes will be made PERMANENT.', 'gtb')}
                        actionText={__('Switch', 'gtb')}
                        onProceed={updateActiveID}
                        onClose={() => setSwitchPopup(false)}
                    />}
                    {deletePopup && <WarningPopup
                        title={__('Are you sure want to delete this theme?', 'gtb')}
                        detail={__('This is PERMANENT and you would not be able to restore this later.', 'gtb')}
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