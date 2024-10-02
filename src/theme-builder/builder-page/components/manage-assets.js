import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { DeleteIcon, EditIcon, PlusIcon } from '../data/icons';
import Table from './table';
import { isEmpty } from 'lodash';
import { createAsset, deleteAsset, getAssetList, updateAsset } from '../../../data/api-fetch';
import { ArrowLeft } from 'react-feather';
import TextControl from '../controls/text-control';
import SelectControl from '../controls/select-control';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { WarningPopup } from './warning-popup';
import { PRESET_CSS } from '../data/preset-css';
import { PRESET_JS } from '../data/preset-js';
import ContentWrapper from './content-wrapper';

const ManageAssetOption = ({ title, assetData, setMode, updateDetails, loading, actionAssetData, presetStyles }) => {

    return <div className="asset-data-wrapper">
        <div className="data-header">
            <div className="buttons inline">
                <button className="button data" onClick={() => setMode('')}><ArrowLeft size={14} /></button>
            </div>
            <h3 className="subtitle">{title}</h3>
        </div>
        <div className="data-body">
            {loading ? <div className="saving-indicator">{__('Saving...', 'gutenverse-themes-builder')}</div> :
                <>
                    <TextControl
                        id={'handler'}
                        title={__('Handler', 'gutenverse-themes-builder')}
                        value={assetData?.handler}
                        onChange={value => { updateDetails('handler', value); }}
                    />
                    <SelectControl
                        id={'enqueue'}
                        title={__('Enqueue Location')}
                        value={assetData?.enqueue}
                        options={[
                            {
                                value: 'both',
                                label: __('Backend & Frontend', 'gutenverse-themes-builder')
                            },
                            {
                                value: 'backend',
                                label: __('Backend Only', 'gutenverse-themes-builder')
                            },
                            {
                                value: 'frontend',
                                label: __('Frontend Only', 'gutenverse-themes-builder')
                            },
                        ]}
                        onChange={value => updateDetails('enqueue', value)}
                    />
                    <SelectControl
                        id={'type'}
                        title={__('Type')}
                        value={assetData?.type}
                        options={[
                            {
                                value: 'js',
                                label: __('Javascript', 'gutenverse-themes-builder')
                            },
                            {
                                value: 'css',
                                label: __('Stylesheet', 'gutenverse-themes-builder')
                            },
                        ]}
                        onChange={value => updateDetails('type', value)}
                    />
                    <SelectControl
                        id={'media_type'}
                        title={__('Media Type', 'gutenverse-themes-builder')}
                        value={assetData.media_type}
                        options={[
                            {
                                value: 'media',
                                label: __('Media URL', 'gutenverse-themes-builder')
                            },
                            {
                                value: 'content',
                                label: __('Content', 'gutenverse-themes-builder')
                            },
                            {
                                value: 'wordpress',
                                label: __('WordPress Registered Script', 'gutenverse-themes-builder')
                            },
                        ]}
                        onChange={value => {
                            updateDetails('media_type', value);
                            updateDetails('content', '');
                        }}
                    />
                    {assetData?.media_type === 'content' && <SelectControl
                        id={'preset'}
                        title={__('Use Preset', 'gutenverse-themes-builder')}
                        value={assetData?.preset ? assetData?.preset : 'none'}
                        options={[
                            {
                                value: 'none',
                                label: __('None', 'gutenverse-themes-builder')
                            },
                            {
                                value: 'core_css',
                                label: __('Core CSS Preset', 'gutenverse-themes-builder')
                            },
                            {
                                value: 'core_js',
                                label: __('Core Javascript Preset', 'gutenverse-themes-builder')
                            },
                        ]}
                        onChange={value => {
                            updateDetails('preset', value);

                            switch (value) {
                                case 'core_css':
                                    updateDetails('content', presetStyles?.css);
                                    break;
                                case 'core_js':
                                    updateDetails('content', presetStyles?.js);
                                    break;
                            }
                        }}
                    />}
                    {assetData.media_type === 'media' && <TextControl
                        id={'media'}
                        title={__('Media URL', 'gutenverse-themes-builder')}
                        value={assetData?.media}
                        description={__('URL must be accesible publicly. You can use CDN or host it on your server.', 'gutenverse-themes-builder')}
                        onChange={value => updateDetails('media', value)}
                    />}
                    {assetData.media_type === 'content' && <div className="input-wrapper code-editor">
                        <label>{__('Asset Content', 'gutenverse-themes-builder')}</label>
                        <div style={{
                            overflow: 'auto',
                            height: '400px',
                            width: '100%',
                            borderRadius: '5px',
                            marginTop: '5px'
                        }}>
                            <CodeEditor
                                value={assetData?.content}
                                language={assetData?.type}
                                placeholder={assetData.type === 'css' ? __('Write your sytle right here', 'gutenverse-themes-builder') : __('Write your script right here', 'gutenverse-themes-builder')}
                                onChange={(evn) => updateDetails('content', evn.target.value)}
                                minHeight={400}
                                data-color-mode="dark"
                                style={{
                                    fontSize: 13,
                                    backgroundColor: '#f5f5f5',
                                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                }}
                            />
                        </div>
                        <span>{__('Theme slug (use lowercase letter only)', 'gutenverse-themes-builder')}</span>
                    </div>}
                </>
            }
        </div>
        {!loading && <div className="data-footer">
            <div className="buttons inline"></div>
            <div className="buttons inline">
                <button className="button create" onClick={actionAssetData}>{title}</button>
            </div>
        </div>}
    </div>;
};

const EditAsset = ({ data, setMode, updateAssetList, presetStyles }) => {
    const [assetData, setAssetData] = useState(data);
    const [loading, setLoading] = useState(false);

    const updateCallback = (response) => {
        setMode('');
        updateAssetList(response);
        setLoading(false);
    };

    const updateAssetData = () => {
        setLoading(true);
        updateAsset(assetData, updateCallback);
    };

    const updateDetails = (name, value) => {
        setAssetData(data => {
            return {
                ...data,
                [name]: value
            };
        });
    };

    const params = { assetData, setMode, updateDetails, loading, actionAssetData: updateAssetData, presetStyles };
    return <ManageAssetOption
        {...params}
        title={__('Edit Asset Detail', 'gutenverse-themes-builder')}
    />;
};

const CreateAsset = ({ setMode, updateAssetList, presetStyles }) => {
    const [assetData, setAssetData] = useState({});
    const [loading, setLoading] = useState(false);

    const updateCallback = (response) => {
        setMode('');
        updateAssetList(response);
        setLoading(false);
    };

    const createAssetData = () => {
        setLoading(true);
        createAsset(assetData, updateCallback);
    };

    const updateDetails = (name, value) => {
        setAssetData(data => {
            return {
                ...data,
                [name]: value
            };
        });
    };

    const params = { assetData, setMode, updateDetails, loading, actionAssetData: createAssetData, presetStyles };
    return <ManageAssetOption
        {...params}
        title={__('Create Asset', 'gutenverse-themes-builder')}
    />;
};

const ManageAssets = () => {
    const [mode, setMode] = useState();
    const [assetList, setAssetList] = useState([]);
    const [data, setData] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false);
    const [paged,setPaged] = useState(1);
    const [totalData, setTotalData] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    let num_post = 10;
    const themeSlug = window['GutenverseThemeBuilder']['themeSlug'];
    const presetStyles = {
        css: PRESET_CSS.replaceAll('{{theme_slug}}', themeSlug),
        js: PRESET_JS.replaceAll('{{theme_slug}}', themeSlug),
    };

    const setEditAsset = (data) => {
        setData(data);
        setMode('edit');
    };

    const updateAssetList = (result) => {
        console.log(result)
        setAssetList(result?.data.list);
        setTotalData(parseInt(result?.data.total_data));
        setTotalPage(parseInt(result?.total_page));
    };

    const removeAsset = () => {
        return deleteAsset({ id: deletePopup }, updateAssetList);
    };

    useEffect(() => {
        getAssetList({
            paged,
            num_post
        }, updateAssetList);
    }, [paged]);

    let Content = null;

    const getMediaType = type => {
        switch (type) {
            case 'media':
                return __('Media', 'gutenverse-themes-builder');
            case 'content':
                return __('Script / Style', 'gutenverse-themes-builder');
            case 'wordpress':
                return __('WordPress', 'gutenverse-themes-builder');
            default:
                return null;
        }
    };

    switch (mode) {
        case 'edit':
            Content = <EditAsset data={data} setMode={setMode} updateAssetList={updateAssetList} presetStyles={presetStyles} />;
            break;
        case 'create':
            Content = <CreateAsset setMode={setMode} updateAssetList={updateAssetList} presetStyles={presetStyles} />;
            break;
        default:
            Content = <ContentWrapper
                title={__('Manage Assets', 'gutenverse-themes-builder')}
                description={__('This is a place to manage all your theme JS and CSS assets of your current active theme.', 'gutenverse-themes-builder')}
                headingButtons={[
                    {
                        buttonText: __('Add New', 'gutenverse-themes-builder'),
                        buttonEvent: () => setMode('create'),
                        buttonIcon: <PlusIcon />,
                        buttonLoading: false
                    }
                ]}
                headingButton={true}
            >
                <>
                    <Table 
                        heads={['Handler Name', 'Type', 'Media Type', 'Action',]}
                        length={assetList.length}
                        paged={paged}
                        setPaged={setPaged}
                        numPost={num_post}
                        totalData={totalData}
                        totalPage={totalPage}
                        emptyTitle = {__('You Haven’t Created Any Assets Yet', 'gutenverse-themes-builder')} 
                        emptySubtitle = {__('Click \'Create Asset\' start designing your very first pattern and get things moving.', 'gutenverse-themes-builder')}
                        showButton = {true}
                        buttons = {[
                            {
                                buttonElement : () => <div className="button create" onClick={() => setMode('create')}><PlusIcon fill={'white'}/> {__('Create Assets', 'gutenverse-themes-builder')}</div>,
                                buttonLoading : false
                            }
                        ]}
                    >
                        <>
                            {!isEmpty(assetList) && assetList.map((asset, key) => {
                                return <tr key={key}>
                                    <td>{asset?.handler}</td>
                                    <td>{asset?.type === 'css' ? 'Stylesheet' : 'Javascript'}</td>
                                    <td>{getMediaType(asset?.media_type)}</td>
                                    <td>
                                        <div className="actions">
                                            <a className="edit" onClick={() => setEditAsset(asset)}><EditIcon />{__('Edit', 'gutenverse-themes-builder')}</a>
                                            <a className="delete" onClick={() => setDeletePopup(asset?.id)}><DeleteIcon />{__('Delete', 'gutenverse-themes-builder')}</a>
                                        </div>
                                    </td>
                                </tr>;
                            })}
                        </>
                    </Table>
                    {deletePopup && <WarningPopup
                        title={__('Are you sure want to delete this asset?', 'gutenverse-themes-builder')}
                        detail={__('Please note, every element related to this asset won\'t be working property after delete this aset.', 'gutenverse-themes-builder')}
                        onProceed={removeAsset}
                        onClose={() => setDeletePopup(false)}
                    />}
                </>
            </ContentWrapper>;
    }

    return Content;
};

export default ManageAssets;
