import { useState, useCallback, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ContentWrapper from './content-wrapper';
import { useDropzone } from 'react-dropzone';
import { createGlobal, deleteGlobal, getGlobalListPagination, updateActiveGlobal, updateGlobal } from '../../../data/api-fetch';
import Table from './table';
import isEmpty from 'lodash/isEmpty';
import { WarningPopup } from './warning-popup';
import { DeleteIcon, EditIcon, PlusIcon } from '../data/icons';
import TextControl from '../controls/text-control';
import { ArrowLeft } from 'react-feather';
import FileControl from '../controls/file-control';
import apiFetch from '@wordpress/api-fetch';

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
            {loading ? <div className="saving-indicator">{__('Saving...', 'gutenverse-themes-builder')}</div> :
                <>
                    <TextControl
                        id={'title'}
                        title={__('Title', 'gutenverse-themes-builder')}
                        value={globalData?.title}
                        onChange={value => updateDetails('title', value)}
                        important={true}
                    />
                    <FileControl
                        id={'file'}
                        title={__('Template kit global.json file (Optional).', 'gutenverse-themes-builder')}
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
        title={__('Edit Global Detail', 'gutenverse-themes-builder')}
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
        title={__('Create Global', 'gutenverse-themes-builder')}
    />;
};

const ManageGlobal = () => {
    const [mode, setMode] = useState();
    const [globalList, setGlobalList] = useState([]);
    const [activeGlobal, setActiveGlobal] = useState(false);
    const [data, setData] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false);
    const [switchPopup, setSwitchPopup] = useState(false);
    const [importLoad, setImportLoad] = useState(false);
    const [paged,setPaged] = useState(1);
    const [totalData, setTotalData] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    let num_post = 10;

    const setEditGlobal = (data) => {
        setData(data);
        setMode('edit');
    };

    const updateGlobalList = (result) => {
        setGlobalList(result?.data.list);
        setTotalData(parseInt(result?.data.total_data));
        setTotalPage(Math.ceil(parseInt(result?.data.total_data)/num_post));
        setActiveGlobal(result?.active);
    };

    const removeGlobal = () => {
        return deleteGlobal({ id: deletePopup }, updateGlobalList);
    };

    useEffect(() => {
        getGlobalListPagination({
            paged,
            num_post : num_post
        }, updateGlobalList);
    }, [paged]);

    const updateActiveID = () => {
        updateActiveGlobal(switchPopup, updateGlobalList);
    };

    const handleImportColor = (id) => {
        setImportLoad(true);
        apiFetch({
            path: '/gtb-backend/v1/template/import/global-color',
            method: 'GET',
        }).then((result) => {
            setImportLoad(false);
        }).catch(() => {
            setImportLoad(false);
        })
    }

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
                title={__('Manage Global Styles', 'gutenverse-themes-builder')}
                description={__('Select which global styles you want to use in your current theme. You might need to reapply some of the styling.', 'gutenverse-themes-builder')}
                headingButton={true}
                headingButtons={[
                    {
                        buttonText: __('Add New', 'gutenverse-themes-builder'),
                        buttonEvent: () => setMode('create'),
                        buttonIcon: <PlusIcon />,
                        buttonLoading: false
                    },
                    {
                        buttonText: __('Import Color', 'gutenverse-themes-builder'),
                        buttonEvent: () => handleImportColor(),
                        buttonIcon: false,
                        buttonLoading: importLoad,
                    }
                ]}
            >
                <>
                    <Table 
                        heads={['ID', 'Global Title', 'Status', 'Actions',]}
                        length={globalList.length}
                        paged={paged}
                        setPaged={setPaged}
                        numPost={num_post}
                        totalData={totalData}
                        totalPage={totalPage}
                    >
                        <>
                            {!isEmpty(globalList) && globalList.map((global, key) => {
                                return <tr key={key}>
                                    <td>{global?.id}</td>
                                    <td>{global?.title}</td>
                                    <td><span className={`status ${activeGlobal === global?.id ? 'active' : ''}`}>{activeGlobal === global?.id ? __('Active', 'gutenverse-themes-builder') : __('Inactive', 'gutenverse-themes-builder')}</span></td>
                                    <td>
                                        <div className="actions">
                                            {activeGlobal !== global?.id && <a className="edit" onClick={() => setSwitchPopup(global?.id)}>Set Active</a>}
                                            <a className="edit" onClick={() => setEditGlobal(global)}><EditIcon />{__('Edit', 'gutenverse-themes-builder')}</a>
                                            <a className="delete" onClick={() => setDeletePopup(global?.id)}><DeleteIcon />{__('Delete', 'gutenverse-themes-builder')}</a>
                                        </div>
                                    </td>
                                </tr>;
                            })}
                        </>
                    </Table>
                    {switchPopup && <WarningPopup
                        title={__('Switch to this global style?', 'gutenverse-themes-builder')}
                        detail={__('Your current theme is using this global style, changing it might have effects on your layout design and you might need to re-assign the global variable', 'gutenverse-themes-builder')}
                        actionText={__('Switch', 'gutenverse-themes-builder')}
                        onProceed={updateActiveID}
                        onClose={() => setSwitchPopup(false)}
                    />}
                    {deletePopup && <WarningPopup
                        title={__('Are you sure want to delete this global?', 'gutenverse-themes-builder')}
                        detail={__('This might affect your current element\'s styles.', 'gutenverse-themes-builder')}
                        onProceed={removeGlobal}
                        onClose={() => setDeletePopup(false)}
                    />}
                </>
            </ContentWrapper>;
    }

    return Content;
};

export default ManageGlobal;