import { useEffect, useState } from '@wordpress/element';
import ContentWrapper from './content-wrapper';
import { __ } from '@wordpress/i18n';
import { getPluginList, getThemeData, updateOtherData } from '../../../data/api-fetch';
import SelectSearchControl from '../controls/select-search-control';
import { CloseIcon, DeleteIcon } from '../data/icons';
import Table from './table';
import { isEmpty } from 'lodash';
import { FormPopup } from './form-popup';
import TextControl from '../controls/text-control';
import { WarningPopup } from './warning-popup';
import SwitchControl from '../controls/switch-control';


const defaultPlugins = [
    'gutenverse',
    'pro'
];

const ManagePlugins = () => {
    const [pluginNoticeNormal, setPluginNoticeNormal] = useState(false);
    const [plugins, setPlugins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [paged,setPaged] = useState(1);
    const [num_post] = useState(10);
    const indexOfLastItem = paged * num_post;
    const indexOfFirstItem = indexOfLastItem - num_post;
    const paginationData = plugins.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        getThemeData(null, response => {
            if (response?.other?.plugins) {
                setPlugins([...response?.other?.plugins]);
            } else {
                switch (response?.info_details?.theme_mode) {
                    case 'gutenverse-pro':
                    case 'pro-only':
                        setPlugins([
                            {
                                value: 'gutenverse',
                                version: '2.0.0',
                                type: 'wporg',
                                label: 'Gutenverse'
                            },
                            {
                                value: 'pro',
                                version: '1.0.0',
                                type: 'premium',
                                label: 'Gutenverse Pro'
                            }
                        ]);
                        break;
                    case 'core-gutenverse':
                    case 'gutenverse-only':
                        setPlugins([
                            {
                                value: 'gutenverse',
                                version: '2.0.0',
                                type: 'wporg',
                                label: 'Gutenverse'
                            }
                        ]);
                        break;
                    default:
                        break;
                }
            }

            setPluginNoticeNormal(response?.other?.pluginNoticeNormal);
        });
    }, []);

    const updatePluginData = () => {
        setLoading(true);
        setTimeout( () => {
            updateOtherData({
                key: 'plugins',
                data: plugins
            }, setLoading(false));
        },1000)
    };

    const updatePluginNoticeData = (value) => {
        setLoading(true);
        updateOtherData({
            key: 'pluginNoticeNormal',
            data: value
        }, () => {
            setLoading(false);
        });
    };

    let searchTimer;

    const searchPlugin = input => new Promise(resolve => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => getPluginList(input, (response) => {
            const list = [];
            response?.plugins?.map(plugin => {
                list.push({
                    label: plugin.name,
                    value: plugin.slug,
                    type: 'wporg',
                    version: plugin.version
                });
            });
            resolve(list);
        }), 1000);
    });

    const deletePlugin = slug => {
        const update = plugins.filter(plugin => plugin.value !== slug);
        setPlugins([
            ...update
        ]);
        setPaged(1);
    };

    const updatePluginList = (value) => {
        let checkIndex = plugins.indexOf(el => el.value = value?.value);
        if (!defaultPlugins.includes(value?.value) || -1 === checkIndex) {
            const update = plugins.filter(plugin => plugin.value !== value.value);

            setPlugins([
                ...update,
                value
            ]);
            let newPlugins = [...update,value];
            updateOtherData({
                key: 'plugins',
                data: newPlugins
            });
        }
    };

    const updatePluginValue = (value, index) => {
        let arrCopy = [...plugins];

        arrCopy[index] = value;
        setPlugins([
            ...arrCopy
        ]);
        updateOtherData({
            key: 'plugins',
            data: arrCopy
        });
    };

    console.log(pluginNoticeNormal)

    return (
        <ContentWrapper
            title={__('Manage Plugins', 'gutenverse-themes-builder')}
            description={__('This is place to manage which plugins are used in your current theme.', 'gutenverse-themes-builder')}
        >
            {loading ? <div className="saving-indicator">{__('Saving...', 'gutenverse-themes-builder')}</div> : <>
                <div>
                    <SwitchControl
                        id={'plugi-notice-mode'}
                        title={__('Use Normal Notice (Not Custom)?', 'gutenverse-themes-builder')}
                        value={pluginNoticeNormal}
                        onChange={(value) => {
                            updatePluginNoticeData(value);
                            setPluginNoticeNormal(value);
                        }}
                    />
                </div>
    
                <div className="plugin-search-wrapper">
                    <SelectSearchControl
                        id={'search'}
                        title={__('Search Plugin', 'gutenverse-themes-builder')}
                        description={__('Search for WP.org plugins you used for building your current active theme.', 'gutenverse-themes-builder')}
                        value={''}
                        onChange={updatePluginList}
                        onSearch={searchPlugin}
                    />
                </div>
                
                <h3>{__('List plugins used for current theme', 'gutenverse-themes-builder')}</h3>
                <Table
                    classnames={'manage-plugins'}
                    heads={['Plugin Name', 'Hosted', 'Version', 'Actions',]}
                    length={paginationData.length}
                    paged={paged}
                    setPaged={setPaged}
                    totalData={plugins.length}
                    totalPage={Math.ceil(plugins.length/num_post)}
                    emptyTitle = {__('You Haven’t Add Any Required Plugin Yet', 'gutenverse-themes-builder')} 
                    emptySubtitle = {__('Start by searching for a plugin above, then select it to add to the list.', 'gutenverse-themes-builder')}
                >
                    <>
                        {!isEmpty(plugins) && paginationData.map((plugin, key) => {
                            return <tr key={key}>
                                <td>{plugin?.label}</td>
                                <td>{__('Wordpress.org', 'gutenverse-themes-builder')}</td>
                                <td>{plugin?.version}</td>
                                <td>
                                    <div className="actions">
                                        <a className="edit" onClick={() => setEditPopup( {plugin : plugin, key: (((paged-1) * num_post) + parseInt(key) )} )}>{__('Quick Edit', 'gutenverse-themes-builder')}</a>
                                        {
                                            !defaultPlugins.includes(plugin?.value) && <a className="delete" onClick={() => setDeletePopup(plugin)}><DeleteIcon />{__('Delete', 'gutenverse-themes-builder')}</a>
                                        }
                                        
                                    </div>
                                </td>
                            </tr>;
                        })}
                    </>
                </Table>
                <div className="buttons margin-top-32 end">
                    {
                        loading ? <div className="button button-loading padding-12-28" disabled>Loading... </div> :
                        <div className="button create padding-12-28" onClick={() => updatePluginData()}>{__('Save Plugin', 'gutenverse-themes-builder')}</div>
                    }
                </div>
                
                {editPopup && <FormPopup
                    onClose={() =>   setEditPopup(false)}
                    initialData={editPopup}
                    buttonText={__('Save Changes', 'gutenverse-themes-builder')}
                    classnames={'manage-plugins'}
                    onSubmit={(updateData) => {
                        updatePluginValue(updateData.plugin, updateData.key )
                        setEditPopup(false)
                    }}
                >
                    {
                        ({data, updateData, setIsEdited}) => {
                            return <>
                                <TextControl
                                    id={'label'}
                                    title={__('Plugin Name', 'gutenverse-themes-builder')}
                                    value={data.plugin.label}
                                    onChange={(value) => { updateData('label',value); setIsEdited(true);}}
                                    important={true}
                                    description={__('Simplify the plugin name by removing extra details.', 'gutenverse-themes-builder')}
                                />
                                <TextControl
                                    id={'version'}
                                    title={__('Plugin Version', 'gutenverse-themes-builder')}
                                    value={data.plugin.version}
                                    onChange={(value) => { updateData('version',value); setIsEdited(true);}}
                                    important={true}
                                    description={__('Set the version used in your theme.', 'gutenverse-themes-builder')}
                                />
                            </>
                        }
                    }
                </FormPopup>
                }

                {deletePopup && <WarningPopup
                    title={__('Are you sure want to delete this plugin requirement?', 'gutenverse-themes-builder')}
                    onProceed={() => deletePlugin(deletePopup.value)}
                    onClose={() => setDeletePopup(false)}
                />}
            </>}
        </ContentWrapper>
    );
};

export default ManagePlugins;