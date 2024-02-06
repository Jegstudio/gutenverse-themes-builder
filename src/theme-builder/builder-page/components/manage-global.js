import { useState, useCallback, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ContentWrapper from './content-wrapper';
import { useDropzone } from 'react-dropzone';
import { createGlobal, deleteGlobal, getGlobalList, importGlobaStyle, updateActiveGlobal, updateGlobal } from '../../../data/api-fetch';
import Table from './table';
import isEmpty from 'lodash/isEmpty';
import { WarningPopup } from './warning-popup';
import { DeleteIcon, EditIcon } from '../data/icons';
import TextControl from '../controls/text-control';
import { ArrowLeft } from 'react-feather';
import FileControl from '../controls/file-control';

const ManageGlobalOption = ({ title, globalData, setMode, files, setFiles, updateDetails, actionGlobalData, notice }) => {
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false
    });

    return <div className="font-data-wrapper">
        <div className="data-header">
            <div className="buttons inline">
                <button className="button data" onClick={() => setMode('')}><ArrowLeft size={14} /></button>
            </div>
            <h3 className="subtitle">{title}</h3>
        </div>
        <div className="data-notice">
            {notice}
        </div>
        <div className="data-body">
            {loading ? <div className="saving-indicator">{__('Saving...', 'gtb')}</div> :
                <>
                    <TextControl
                        id={'title'}
                        title={__('Title', 'gtb')}
                        value={globalData?.title}
                        onChange={value => updateDetails('title', value)}
                        important={true}
                    />
                    <FileControl
                        id={'file'}
                        title={__('Template kit global.json file', 'gtb')}
                        value={globalData?.file}
                        onChange={value => updateDetails('file', value)}
                    />
                    {/* <section className="container">
                        {files.length === 0 ?
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <p>{__('Upload global.json from your template kit files', 'gtn')}</p>
                            </div> :
                            files.length && files.map(file => {
                                const { name, lastModified, size } = file;
                                return <div key={lastModified} className="dropzone">
                                    <div><strong> {name} </strong></div>
                                    <h3 className="clear" onClick={() => setFiles('')}>{__('Clear', 'gtn')}</h3>
                                </div>;
                            })
                        }
                    </section> */}
                </>
            }
        </div>
        {!loading && <div className="data-footer">
            <div className="buttons inline"></div>
            <div className="buttons inline">
                <button className="button create" onClick={actionGlobalData}>{title}</button>
            </div>
        </div>}
    </div>;
};

const EditGlobal = ({ data, setMode, updateGlobalList }) => {
    const [globalData, setGlobalData] = useState(data);
    const [loading, setLoading] = useState(false);
    const [noticeMessage, setNoticeMessage] = useState('');
    const [files, setFiles] = useState([]);

    const updateCallback = (response) => {
        setMode('');
        updateGlobalList(response);
        setLoading(false);
    };

    const updateGlobalData = () => {
        // const formData = new FormData();
        // formData.append('file', files[0]);
        // formData.append('name', 'name');
        // formData.append('title', 'Global Title');
        setLoading(true);
        updateGlobal({ ...globalData }, updateCallback);
    };

    const updateDetails = (name, value) => {
        setGlobalData(data => {
            return {
                ...data,
                [name]: value
            };
        });
    };

    const notice = !isEmpty(noticeMessage) && <div className="gtb-notice">
        {noticeMessage}
    </div>;

    const params = { notice, globalData, setMode, files, setFiles, updateDetails, loading, actionGlobalData: updateGlobalData };
    return <ManageGlobalOption
        {...params}
        title={__('Edit Global Detail', 'gtb')}
    />;
};

const CreateGlobal = ({ setMode, updateGlobalList }) => {
    const [globalData, setGlobalData] = useState({});
    const [loading, setLoading] = useState(false);
    const [noticeMessage, setNoticeMessage] = useState('');
    const [files, setFiles] = useState([]);

    const updateCallback = (response) => {
        setMode('');
        updateGlobalList(response);
        setLoading(false);
    };

    const createGlobalData = () => {
        // const formData = new FormData();
        // formData.append('file', files[0]);
        // formData.append('name', 'name');
        // formData.append('title', 'Global Title');
        setLoading(true);
        createGlobal({ ...globalData }, updateCallback);
    };

    const updateDetails = (name, value) => {
        setGlobalData(data => {
            return {
                ...data,
                [name]: value
            };
        });
    };

    const notice = !isEmpty(noticeMessage) && <div className="gtb-notice">
        {noticeMessage}
    </div>;

    const params = { notice, globalData, setMode, files, setFiles, updateDetails, loading, actionGlobalData: createGlobalData };
    return <ManageGlobalOption
        {...params}
        title={__('Create Global', 'gtb')}
    />;
};

const ManageGlobal = () => {
    const [mode, setMode] = useState();
    const [globalList, setGlobalList] = useState([]);
    const [activeGlobal, setActiveGlobal] = useState(false);
    const [data, setData] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false);
    const [switchPopup, setSwitchPopup] = useState(false);

    const setEditGlobal = (data) => {
        setData(data);
        setMode('edit');
    };

    const updateGlobalList = (result) => {
        setGlobalList(result?.data);
        setActiveGlobal(result?.active);
    };

    const removeGlobal = () => {
        return deleteGlobal({ id: deletePopup }, updateGlobalList);
    };

    useEffect(() => {
        getGlobalList(updateGlobalList);
    }, []);

    const updateActiveID = () => {
        updateActiveGlobal(switchPopup, updateGlobalList);
    };

    let Content = null;

    switch (mode) {
        case 'edit':
            Content = <EditGlobal data={data} setMode={setMode} updateGlobalList={updateGlobalList} />;
            break;
        case 'create':
            Content = <CreateGlobal setMode={setMode} updateGlobalList={updateGlobalList} />;
            break;
        default:
            Content = <ContentWrapper
                title={__('Manage Global Styles', 'gtb')}
                description={__('Select which global styles you want to use in your current theme. You might need to reapply some of the styling.', 'gtb')}
                headingButton={true}
                headingButtonOnClick={() => setMode('create')}
            >
                <>
                    <Table heads={['ID', 'Global Title', 'Status', 'Actions',]}>
                        <>
                            {!isEmpty(globalList) && globalList.map((global, key) => {
                                return <tr key={key}>
                                    <td>{global?.id}</td>
                                    <td>{global?.title}</td>
                                    <td><span className={`status ${activeGlobal === global?.id? 'active' : ''}`}>{activeGlobal === global?.id ? __('Active', 'gtb') : __('Inactive', 'gtb')}</span></td>
                                    <td>
                                        <div className="actions">
                                            {activeGlobal !== global?.id && <a className="edit" onClick={() => setSwitchPopup(global?.id)}>Set Active</a>}
                                            <a className="edit" onClick={() => setEditGlobal(global)}><EditIcon />{__('Edit', 'gtb')}</a>
                                            <a className="delete" onClick={() => setDeletePopup(global?.id)}><DeleteIcon />{__('Delete', 'gtb')}</a>
                                        </div>
                                    </td>
                                </tr>;
                            })}
                        </>
                    </Table>
                    {switchPopup && <WarningPopup
                        title={__('Switch to this global style?', 'gtb')}
                        detail={__('Your current theme is using this global style, changing it might have effects on your layout design and you might need to re-assign the global variable', 'gtb')}
                        actionText={__('Switch', 'gtb')}
                        onProceed={updateActiveID}
                        onClose={() => setSwitchPopup(false)}
                    />}
                    {deletePopup && <WarningPopup
                        title={__('Are you sure want to delete this global?', 'gtb')}
                        detail={__('This might affect your current element\'s styles.', 'gtb')}
                        onProceed={removeGlobal}
                        onClose={() => setDeletePopup(false)}
                    />}
                </>
            </ContentWrapper>;
    }

    return Content;
};

export default ManageGlobal;