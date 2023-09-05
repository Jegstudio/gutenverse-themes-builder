import { useEffect, useState } from '@wordpress/element';
import ContentWrapper from './content-wrapper';
import { __ } from '@wordpress/i18n';
import { getPluginList, getThemeData, updateOtherData } from '../../../data/api-fetch';
import SelectSearchControl from '../controls/select-search-control';
import { CloseIcon } from '../data/icons';

const defaultPlugins = [
    'gutenverse',
    'pro'
];

const ManagePlugins = () => {
    const [plugins, setPlugins] = useState([]);
    const [loading, setLoading] = useState(false);

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
                                version: '1.8.5',
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
                                version: '1.8.5',
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

    return (
        <ContentWrapper
            title={__('Manage Plugins', 'gtb')}
            description={__('This is place to manage which plugins are used in your current theme.', 'gtb')}
            headingButton={true}
            headingButtonIcon={false}
            headingButtonText={__('Save', 'gtb')}
            headingButtonOnClick={() => updatePluginData(true)}
        >
            {loading ? <div className="saving-indicator">{__('Saving...', 'gtb')}</div> : <>
                <SelectSearchControl
                    id={'search'}
                    title={__('WP.org Plugins', 'gtb')}
                    description={__('Search for WP.org plugins you used for building your current active theme.', 'gtb')}
                    value={''}
                    onChange={updatePluginList}
                    onSearch={searchPlugin}
                />
                <h3>{__('List plugins used for current theme', 'gtb')}</h3>
                <ul>
                    {plugins.map((plugin, key) => {
                        return <li className="plugin-req" key={key}>
                            <p className="name">{plugin?.label}</p>
                            <p className="type">{plugin?.type}</p>
                            <input type="text" value={plugin?.version} onChange={e => updatePluginList({
                                ...plugin,
                                version: e.target.value
                            })} />
                            {!defaultPlugins.includes(plugin?.value) && <div className="icon" onClick={() => deletePlugin(plugin?.value)}><CloseIcon /></div>}
                        </li>;
                    })}
                </ul>
            </>}
        </ContentWrapper>
    );
};

export default ManagePlugins;