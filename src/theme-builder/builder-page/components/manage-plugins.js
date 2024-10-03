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


const defaultPlugins = [
    'gutenverse',
    'pro'
];

const ManagePlugins = () => {
    const [plugins, setPlugins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);

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
        });
    }, []);

    const updatePluginData = () => {
        setLoading(true);
        updateOtherData({
            key: 'plugins',
            data: plugins
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
    };

    const updatePluginList = (value) => {
        if (!defaultPlugins.includes(value?.value)) {
            const update = plugins.filter(plugin => plugin.value !== value.value);

            setPlugins([
                ...update,
                value
            ]);
        }
    };

    const updatePluginValue = (value, index) => {
        let arrCopy = [...plugins];

        arrCopy[index] = value;

        setPlugins([
            ...arrCopy
        ]);
    };

    return (
        <ContentWrapper
            title={__('Manage Plugins', 'gutenverse-themes-builder')}
            description={__('This is place to manage which plugins are used in your current theme.', 'gutenverse-themes-builder')}
            headingButton={true}
            headingButtons={[
                {
                    buttonText: __('Save Plugin', 'gutenverse-themes-builder'),
                    buttonEvent: () => updatePluginData(true),
                    buttonIcon: false,
                    buttonLoading: false
                }
            ]}
        >
            {loading ? <div className="saving-indicator">{__('Saving...', 'gutenverse-themes-builder')}</div> : <>
                <div className="plugin-search-wrapper">
                    <SelectSearchControl
                        id={'search'}
                        description={__('Search for WP.org plugins you used for building your current active theme.', 'gutenverse-themes-builder')}
                        value={''}
                        onChange={updatePluginList}
                        onSearch={searchPlugin}
                    />
                </div>
                
                <h3>{__('List plugins used for current theme', 'gutenverse-themes-builder')}</h3>
                <Table
                    heads={['Plugin Name', 'Hosted', 'Version', 'Actions',]}
                >
                    <>
                        {!isEmpty(plugins) && plugins.map((plugin, key) => {
                            return <tr key={key}>
                                <td>{plugin?.label}</td>
                                <td>{__('Wordpress.org', 'gutenverse-themes-builder')}</td>
                                <td>{plugin?.version}</td>
                                <td>
                                    <div className="actions">
                                        <a className="edit" onClick={() => setEditPopup(global)}>{__('Quick Edit', 'gutenverse-themes-builder')}</a>
                                        <a className="delete" onClick={() => setDeletePopup(global?.id)}><DeleteIcon />{__('Delete', 'gutenverse-themes-builder')}</a>
                                    </div>
                                </td>
                            </tr>;
                        })}
                    </>
                </Table>
                <div className="buttons margin-top-25 end">
                    {
                        loading ? <div className="button button-loading" disabled>Loading... </div> :
                        <div className="button create padding-12-28" onClick={() => updatePluginData(true)}>{__('Save Plugin', 'gutenverse-themes-builder')}</div>
                    }
                </div>
                
                {editPopup && <FormPopup
                    onClose={() => setEditPopup(false)}
                    data={editPopup}
                    showFooterButton={false}
                >
                    <TextControl
                        id={'label'}
                        title={__('Plugin Name', 'gutenverse-themes-builder')}
                        value={data.label}
                        onChange={value => updatePluginValue({ ...plugin, label: value})}
                        important={true}
                    />
                    <TextControl
                        id={'version'}
                        title={__('Title', 'gutenverse-themes-builder')}
                        value={data.version}
                        onChange={value => updatePluginValue({ ...plugin, version: value})}
                        important={true}
                    />
                </FormPopup>
                }

                {deletePopup && <WarningPopup
                    title={__('Are you sure want to delete this plugin requirement?', 'gutenverse-themes-builder')}
                    onProceed={() => deletePlugin(plugin?.value)}
                    onClose={() => setDeletePopup(false)}
                />}
                <ul>
                    {plugins.map((plugin, key) => {
                        return <li className="plugin-req" key={key}>
                            <textarea value={plugin?.label} onChange={e => updatePluginValue({
                                ...plugin,
                                label: e.target.value
                            }, key)} />
                            <p className="type">{plugin?.type}</p>
                            <input type="text" value={plugin?.version} onChange={e => updatePluginValue({
                                ...plugin,
                                version: e.target.value
                            }, key)} />
                            {!defaultPlugins.includes(plugin?.value) && <div className="icon" onClick={() => deletePlugin(plugin?.value)}><CloseIcon /></div>}
                        </li>;
                    })}
                </ul>
            </>}
        </ContentWrapper>
    );
};

export default ManagePlugins;