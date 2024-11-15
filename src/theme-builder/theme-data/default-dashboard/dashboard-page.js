import { Fragment, useState, useEffect } from '@wordpress/element';
import { DashEye } from './dashboard-icons';
import { __ } from '@wordpress/i18n';

const DashboardPage = () => {
    const {
        title,
        description,
        pluginTitle,
        pluginDesc,
        pages,
        demoUrl,
        plugins,
        eventBanner = null
    } = window['GutenThemeConfig'];

    const [allActive, setAllActive] = useState(false);
    const [popupImg, setPopupImg] = useState('');
    const [openPopup, setOpenPopup] = useState(false);

    const today = new Date();
    const expired = new Date(eventBanner?.expired);
    const EventBanner = () => {
        return <>
            {
                ( eventBanner && today <= expired ) && <div className="event-banner-wrapper">
                    <a href={eventBanner?.url} target="_blank" rel="noreferrer" >
                        <img src={eventBanner?.banner} alt="event-banner"/>
                    </a>
                </div>
            }
        </>
    }

    useEffect(() => {
        let done = true;

        plugins.map(plugin => {
            done = done && plugin?.active;
        });

        setAllActive(done);
    }, [])

    const onOpen = img => {
        setOpenPopup(true);
        setPopupImg(img);
    };

    const onClose = () => {
        setOpenPopup(false);
    };

    const installPlugins = (index = 0) => {
        if (plugins && index < plugins.length) {
            const plugin = plugins[index];

            if (!plugin?.installed) {
                wp?.apiFetch({
                    path: 'wp/v2/plugins',
                    method: 'POST',
                    data: {
                        slug: plugin?.slug,
                        status: 'active'
                    },
                }).then(() => {
                    installPlugins(index + 1);
                }).catch(() => {
                    alert('Error during installing plugin');
                })
            } 
            
            if (!plugin?.active) {
                wp?.apiFetch({
                    path: `wp/v2/plugins/plugin?plugin=${plugin?.slug}/${plugin?.slug}`,
                    method: 'POST',
                    data: {
                        status: 'active'
                    }
                }).then(() => {
                    installPlugins(index + 1);
                }).catch(() => {
                })
            }
        } else {
            window.location.reload();
        }
    }

    const buttonState = () => {
        if (!allActive) {
            return <div onClick={() => installPlugins(0)} className="theme-button">Install &amp; Activate Plugins</div>;
        }

        return <div className="theme-button active">Plugins Installed &amp; Activated</div>;
    }

    return <Fragment>
        <div className="top-container">
            <div className="install-template">
                <div className="thumbnail">
                    {Object.keys(pages).map(key => {
                        return <div key={key} className="image" onClick={() => onOpen(pages[key])}>
                            <img src={pages[key]} alt="image" width="400" height="300" />
                            <div className="hover"><DashEye /></div>
                        </div>;
                    })}
                </div>
                <div className="content">
                    <h2 className="title">{title}</h2>
                    <span className="description">{description}</span>
                    <div className="notes"><h4><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 14C9.5913 14 11.1174 13.3679 12.2426 12.2426C13.3679 11.1174 14 9.5913 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8C2 9.5913 2.63214 11.1174 3.75736 12.2426C4.88258 13.3679 6.4087 14 8 14ZM8 15.5C3.85775 15.5 0.5 12.1422 0.5 8C0.5 3.85775 3.85775 0.5 8 0.5C12.1422 0.5 15.5 3.85775 15.5 8C15.5 12.1422 12.1422 15.5 8 15.5ZM7.25 11H8.75V12.5H7.25V11ZM7.25 3.5H8.75V9.5H7.25V3.5Z" fill="#ECB905"></path></svg>Important Notice</h4><ul><li>
                        {plugins.map((plugin, index) => {
                            return <strong key={index}>{plugin?.title}{(index + 1 < plugins?.length) ? ', ' : ' '}</strong>;
                        })} must be installed for this theme to work correctly</li><li>Clicking the button will install all required plugins above and also templates for this theme. Please first backup your current templates if you have any changes to it.</li></ul>
                    </div>
                    <div className="theme-buttons">
                        {buttonState()}
                        <a className="theme-link" href={demoUrl} target="_blank" rel="noreferrer">View Live Demo →</a>
                    </div>
                </div>
            </div>
        </div>
        <EventBanner/>
        <div className="bottom-container">
            <div className="comparison">
                <h2 className="title">{pluginTitle}</h2>
                <p className="description">{pluginDesc}</p>
                <table>
                    <thead>
                        <tr className="thead_tr">
                            <td>Plugin Name</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {plugins.map((plugin) => {
                            return <tr key={plugin?.slug}>
                                <td className="tbody_td">{plugin?.title}</td>
                                <td className="tbody_td"><span className={`status ${plugin?.active && 'active'}`}>{plugin?.active ? 'Active' : 'Not Active'}</span></td>
                            </tr>;
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        <div className={`popup ${!openPopup ? 'hide' : ''}`} onClick={onClose}>
            <img src={popupImg} alt="image" />
        </div>
    </Fragment>;
};

export default DashboardPage;