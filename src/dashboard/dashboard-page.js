import { Fragment, useState, useEffect } from '@wordpress/element';
import { DashCheck, DashClose, DashEye } from './dashboard-icons';
import { __ } from '@wordpress/i18n';

const DashboardPage = () => {
    const {
        demo,
        pages,
        domain,
        plugins,
    } = window['GutenverseThemeConfig'];
    const [installed, setInstalled] = useState(true);
    const [actions, setActions] = useState({});
    const [loading, setLoading] = useState(true);
    const [popupImg, setPopupImg] = useState('');
    const [openPopup, setOpenPopup] = useState(false);

    const pluginList = plugins.map(plugin => plugin?.name);

    useEffect(() => {
        const promises = [];

        plugins.map(plugin => {
            const path = plugin?.slug + '/' + plugin?.slug;

            promises.push(
                new Promise((resolve) => {
                    wp.apiFetch({
                        path: 'wp/v2/plugins/' + path,
                        method: 'GET',
                    }).then(data => {
                        if (data) {
                            resolve({
                                slug: plugin?.slug,
                                status: data?.status,
                            });
                        } else {
                            resolve({
                                slug: plugin?.slug,
                            });
                        }
                    }).catch(() => {
                        resolve({
                            slug: plugin?.slug,
                        });
                    });
                })
            );
        });

        Promise.all(promises).then((values) => {
            let checked = true;
            const list = {};

            values?.map((value) => {
                list[value?.slug] = value?.status;

                checked = value?.status === 'active' ? checked && true : checked && false;
            });

            setActions(list);
            setInstalled(checked);
            setLoading(false);
        });
    }, []);

    const activatePlugin = () => {
        setLoading(true);
        const promises = [];


        const sequenceInstall = (plugins, index = 0) => {
            if (plugins[index]) {
                const plugin = plugins[index];

                switch (actions[plugin?.slug]) {
                    case 'active':
                        break;
                    case 'inactive':
                        const path = plugin?.slug + '/' + plugin?.slug;
                        promises.push(
                            new Promise((resolve) => {
                                wp.apiFetch({
                                    path: 'wp/v2/plugins/' + path,
                                    method: 'POST',
                                    data: {
                                        status: 'active'
                                    }
                                }).finally(() => {
                                    sequenceInstall(plugins, index + 1);
                                    resolve(plugin);
                                });
                            })
                        );
                        break;
                    default:
                        promises.push(
                            new Promise((resolve) => {
                                wp.apiFetch({
                                    path: 'wp/v2/plugins',
                                    method: 'POST',
                                    data: {
                                        slug: plugin?.slug,
                                        status: 'active'
                                    }
                                }).finally(() => {
                                    sequenceInstall(plugins, index + 1);
                                    resolve(plugin);
                                });
                            })
                        );
                        break;
                }
            }

            return;
        };

        sequenceInstall(plugins);

        Promise.all(promises).then(() => {
            setLoading(false);
            location.reload();
        });
    };

    const onOpen = img => {
        setOpenPopup(true);
        setPopupImg(img);
    };

    const onClose = () => {
        setOpenPopup(false);
    };

    const comparisons = [
        __('Advanced Templates', domain),
        __('Responsive Styling', domain),
        __('Variety of Fonts', domain),
        __('Icon Library', domain),
        __('Animation Effects', domain),
        __('Form Builder', domain),
    ];

    const benefits = [
        __('Modern and clean design', domain),
        __('5+ Ready to use templates', domain),
        __('15+ template parts', domain),
        __('Fully responsive layout', domain),
        __('Fully customizable', domain),
    ];

    return <Fragment>
        <section>
            <div className="container templates">
                <div className="thumbnail">
                    {Object.keys(pages).map(key => {
                        return <div key={key} className="image" onClick={() => onOpen(pages[key])}>
                            <img src={pages[key]} alt="image" width="400" height="300" />
                            <div className="hover"><DashEye /></div>
                        </div>;
                    })}
                </div>
                <div className="content">
                    <h2 className="title">{__('Unlock Advanced Templates for Free!', domain)}</h2>
                    <p className="description">{__('Simply install and activate the required plugins to gain access to the advanced templates available in this theme. By using the required plugins, you can enjoy the enhanced versions of templates and block patterns, all created with Gutenberg blocks. Upgrade your website\'s design and functionality with ease.', domain)}</p>
                    <div className="notes">
                        <h4>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 14C9.5913 14 11.1174 13.3679 12.2426 12.2426C13.3679 11.1174 14 9.5913 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8C2 9.5913 2.63214 11.1174 3.75736 12.2426C4.88258 13.3679 6.4087 14 8 14ZM8 15.5C3.85775 15.5 0.5 12.1422 0.5 8C0.5 3.85775 3.85775 0.5 8 0.5C12.1422 0.5 15.5 3.85775 15.5 8C15.5 12.1422 12.1422 15.5 8 15.5ZM7.25 11H8.75V12.5H7.25V11ZM7.25 3.5H8.75V9.5H7.25V3.5Z" fill="#ECB905" />
                            </svg>
                            {__('Important Notice', domain)}
                        </h4>
                        <ul>
                            <li><strong>{pluginList.join(', ')}</strong>{__(' must be installed for this theme to work correctly', 'gutenverse')}</li>
                            <li>{__('Clicking the button will install all required plugins above and also templates for this theme. Please first backup your current templates if you have any changes to it.', domain)}</li>
                        </ul>
                    </div>
                    <div className="theme-buttons">
                        {installed ? <div className="theme-button active">
                            {loading ? <div className="loader"></div> : __('Plugins Installed & Activated', domain)}
                        </div> : <div className="theme-button" onClick={activatePlugin}>
                            {loading ? <div className="loader"></div> : __('Install Required Plugins', domain)}
                        </div>}
                        <a className="theme-link" href={demo} target="_blank" rel="noreferrer">{__('View Live Demo →', domain)}</a>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div className="container comparisons">
                <h2 className="title">{__('Comparison Gutenverse VS WordPress Core', domain)}</h2>
                <table>
                    <thead>
                        <tr className="thead_tr">
                            <th className="thead_th">{ }</th>
                            <th className="thead_th">{__('Gutenverse Version', domain)}</th>
                            <th className="thead_th">{__('WordPress Core', domain)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparisons.map((feature, key) => {
                            return <tr key={key}>
                                <td className="tbody_td">{feature}</td>
                                <td className="tbody_td center"><DashCheck /></td>
                                <td className="tbody_td center"><DashClose /></td>
                            </tr>;
                        })}
                    </tbody>
                </table>
            </div>
            <div className="container benefits">
                <h2 className="title">{__('Benefits for Installing Gutenverse Version', domain)}</h2>
                <p className="description">{__('You can customize your website instantly with powerful and lightweight add-ons plugin for Gutenberg/FSE.', domain)}</p>
                <div className="features">
                    <h4>{__('Features', domain)}</h4>
                    <ul>
                        {benefits.map((feature, key) => {
                            return <li key={key}>{feature}</li>;
                        })}
                    </ul>
                </div>
            </div>
        </section>
        <div className={`popup ${!openPopup ? 'hide' : ''}`} onClick={onClose}>
            <img src={popupImg} alt="image" />
        </div>
    </Fragment>;
};

export default DashboardPage;