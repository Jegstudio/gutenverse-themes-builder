import { Fragment, useState, useEffect } from '@wordpress/element';
import { DashEye, CompCheck, CompX, Crown } from './dashboard-icons';
import { __ } from '@wordpress/i18n';

const DashboardPage = () => {
    const {
        title,
        description,
        pages,
        demoUrl,
        plugins,
        dashboardData,
        slug,
        eventBanner = null
    } = window['GutenThemeConfig'];

    const coreTitle = dashboardData?.comparison?.name_core;
    const liteTitle = dashboardData?.comparison?.name_lite;
    const proTitle = dashboardData?.comparison?.name_pro;

    const [allActive, setAllActive] = useState(false);
    const [popupImg, setPopupImg] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const [loading, setLoading] = useState(false);

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
                setLoading(true);
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
                setLoading(true);
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

            if (plugin?.installed && plugin?.active) {
                installPlugins(index + 1);
            }
        } else {
            window.location.reload();
        }
    }

    const buttonState = () => {
        const [dotCount, setDotCount] = useState(0);

        useEffect(() => {
            if (loading) {
                const interval = setInterval(() => {
                    setDotCount(prevCount => (prevCount + 1) % 3);
                }, 500);
                return () => clearInterval(interval);
            }
        }, [loading]);

        const dots = (
            <>
                <div style={{ opacity: dotCount === 0 ? 1 : 0.3 }}>.</div>
                <div style={{ opacity: dotCount === 1 ? 1 : 0.3 }}>.</div>
                <div style={{ opacity: dotCount === 2 ? 1 : 0.3 }}>.</div>
            </>
        );

        if (!allActive) {
            return (
                <div onClick={() => installPlugins(0)} className={`theme-button ${loading ? 'active loading' : ''}`}>
                    {loading ? 'Installing & Activating' : 'Install & Activate Plugins'}
                    {loading && dots}
                </div>
            );
        }

        return <div className="theme-button active">Plugins Installed & Activated</div>;
    };

    return <Fragment>
        <EventBanner/>
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
        <div className="bottom-container">
            <div className="comparison">
                <h2 className="title">{title} Theme Comparison Features</h2>
                <p className="description">{dashboardData?.comparison?.description}</p>
                <div className='comparison-wrapper'>
                    <div className='comparison-item'>
                        <div className='comparison-item-inner'>
                            <h2 className="title">{coreTitle}</h2>
                            <div className='comparison-list'>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>{dashboardData?.comparison?.core_template_count} Theme Templates</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Global Settings</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Basic Core Blocks</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Support forum on Wordpress.org</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Free Lifetime Updates</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Sticky Element</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Highlight Styles</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Custom Font</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Icon Library</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Animation Effects</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Responsive Styling</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Advance Animation Effects</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Mega Menu Builder</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Dynamic Data</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Background Animation</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Shape Divider Animation</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Cursor Effect</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Mouse Move Effect</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Background Effect</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Transform</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Text Clip</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Condition Filter</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Fluid Background</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='comparison-item'>
                        <div className='comparison-item-inner'>
                            <h2 className="title">{liteTitle}</h2>
                            <div className='comparison-list'>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span><b>{dashboardData?.comparison?.lite_theme_template_count}+</b> Theme Templates</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span><b>{dashboardData?.comparison?.lite_block_count}+</b> Gutenverse Blocks</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span><b>{dashboardData?.comparison?.lite_template_count}+</b> Template Library</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Advanced Global Style</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Icon Library</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Animation Effects</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Responsive Styling</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Support forum on Wordpress.org</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Free Lifetime Updates</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Advance Animation Effects</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Mega Menu Builder</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Background Animation</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Shape Divider Animation</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Sticky Element</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Cursor Effect</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Mouse Move Effect</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Background Effect</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Transform</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Text Clip</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Highlight Styles</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Condition Filter</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Fluid Background</span>
                                </div>
                                <div className='list-item disable'>
                                    <CompX />
                                    <span>Custom Font</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='comparison-item pro'>
                        <div className='comparison-item-inner'>
                            <h2 className="title">{proTitle} <span>PRO {<Crown/>}</span></h2>
                            <div className='comparison-list'>
                                <a href={`https://gutenverse.com/pro?utm_source=${slug}&utm_medium=dashboard&utm_campaign=upgradepro`} className='upgrade-button' target='_blank'>
                                    <span>Upgrade Now</span><Crown/>
                                </a>
                                <span>By upgrading to Gutenverse Pro, you'll unlock the pro version of {proTitle}, <b>30+</b> other themes, and all exclusive PRO features.</span>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span><b>{dashboardData?.comparison?.pro_theme_template_count}+</b> Theme Templates</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span><b>{dashboardData?.comparison?.pro_block_count}+</b> Gutenverse Blocks</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span><b>{dashboardData?.comparison?.pro_template_count}+</b> Template Library</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Advanced Global Style</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Icon Library</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Animation Effects</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Responsive Styling</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Get Priority Support</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Advance Animation Effects</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Mega Menu Builder</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Dynamic Data</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Background Animation</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Shape Divider Animation</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Sticky Element</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Cursor Effect</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Mouse Move Effect</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Background Effect</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Transform</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Text Clip</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Advanced Highlight Styles</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Condition Filter</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Fluid Background</span>
                                </div>
                                <div className='list-item'>
                                    <CompCheck />
                                    <span>Custom Font</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={`popup ${!openPopup ? 'hide' : ''}`} onClick={onClose}>
            <img src={popupImg} alt="image" />
        </div>
    </Fragment>;
};

export default DashboardPage;