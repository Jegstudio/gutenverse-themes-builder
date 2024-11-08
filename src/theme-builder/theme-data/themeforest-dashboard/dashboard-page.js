import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { Loader } from 'react-feather';
import { ImporterModal } from './wizard-page';

const BlinkIcon = () => <span className='blink-icon'>
    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.12394 12.248C7.40699 8.4469 8.44684 7.40692 12.248 6.124C8.44684 4.84115 7.40699 3.80111 6.12394 0C4.84115 3.80111 3.80104 4.84115 0 6.124C3.80104 7.40692 4.84115 8.4469 6.12394 12.248Z" fill="url(#paint0_linear_19089_7751)" />
        <path d="M13.1535 11.3184C12.4535 13.392 11.8862 13.9594 9.8125 14.6593C11.8862 15.3591 12.4535 15.9265 13.1535 18.0002C13.8533 15.9265 14.4207 15.3591 16.4943 14.6593C14.4207 13.9594 13.8533 13.392 13.1535 11.3184Z" fill="url(#paint1_linear_19089_7751)" />
        <defs>
            <linearGradient id="paint0_linear_19089_7751" x1="1.5998" y1="-4.72723" x2="18.2853" y2="20.486" gradientUnits="userSpaceOnUse">
                <stop stopColor="#65DCF5" />
                <stop offset="1" stopColor="#65DCF5" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear_19089_7751" x1="10.6853" y1="8.73945" x2="19.788" y2="22.4943" gradientUnits="userSpaceOnUse">
                <stop stopColor="#65DCF5" />
                <stop offset="1" stopColor="#65DCF5" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
</span>;

const httpClient = (libraryApi) => axios.create({
    baseURL: libraryApi
});

const subscribeNews = (data) => {
    const { libraryApi } = window['GutenThemeConfig'];
    return httpClient(libraryApi).post('/subscribe', data);
};

const ImportTemplates = () => {
    const { assign } = window['GutenThemeConfig'];

    const [allImported, setAllImported] = useState(false);
    const [templateList, setTemplateList] = useState(assign);
    const [importerStep, setImporterStep] = useState([
        "Creating Pages",
        "Assigning Templates",
    ]);
    const [modal, setModal] = useState(false);
    const [importerNotice, setImporterNotice] = useState('');
    const [importerCurrent, setImporterCurrent] = useState(0);
    const [importerStatus, setImporterStatus] = useState(0);
    const [done, setDone] = useState(false);
    const [completeSubtitle, setCompleteSubtitle] = useState(null);
    const [importMode, setImportMode] = useState('');

    const updateTemplateStatus = (title) => {
        setTemplateList(prevTemplateList =>
            prevTemplateList.map(template =>
                template.title === title
                    ? {
                        ...template,
                        status: {
                            ...template.status,
                            using_template: true,
                            exists: true,
                        },
                    }
                    : template
            )
        );
    };

    useEffect(() => {
        if (templateList?.length > 0) {
            let allDone = true;

            templateList?.map(template => {
                allDone = allDone && template?.status?.exists && template?.status?.using_template;
            });

            setAllImported(allDone);
        }
    },[templateList])

    const openImportModal = (value) => {
        setModal(true);
        setDone(false);
        setImportMode(value);
    }

    return <div className='template-install'>
        {modal && <ImporterModal
            importerStep={importerStep}
            importerNotice={importerNotice}
            importerCurrent={importerCurrent}
            importerStatus={importerStatus}
            completeSubtitle={completeSubtitle}
            done={done}
            close={() => { setModal(false) }}
            setImporterStep = {setImporterStep}
            setImporterNotice = {setImporterNotice}
            setImporterStatus = {setImporterStatus}
            setImporterCurrent = {setImporterCurrent}
            setDone = {setDone}
            updateTemplateStatus = {updateTemplateStatus}
            setCompleteSubtitle = {setCompleteSubtitle}
            importMode ={importMode}
            templateList = {templateList}
        />}
        <div className='template-title'>
            <h1 className='content-title'>{__('Import Prebuilt Demos', '--gtb-theme-namespace--')}</h1>
            <div className={`button-import-all ${allImported? 'imported' : ''}`} onClick={() => {
                if (!allImported) {
                    openImportModal('all');
                }
            }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.00033 13.3327C3.63366 13.3327 3.31966 13.202 3.05833 12.9407C2.79699 12.6793 2.66655 12.3656 2.66699 11.9993V9.99935H4.00033V11.9993H12.0003V9.99935H13.3337V11.9993C13.3337 12.366 13.203 12.68 12.9417 12.9413C12.6803 13.2027 12.3665 13.3331 12.0003 13.3327H4.00033ZM8.00033 10.666L4.66699 7.33268L5.60033 6.36602L7.33366 8.09935V2.66602H8.66699V8.09935L10.4003 6.36602L11.3337 7.33268L8.00033 10.666Z" fill="white" />
                </svg>
                {allImported ? __('All Pages Imported', '--gtb-theme-namespace--') : __('Import All Pages', '--gtb-theme-namespace--')}
            </div>
        </div>
        <div className='template-list'>
            {templateList?.map((template, key) => {
                return <div className='template-page' key={key}>
                    <img src={template?.thumb} />
                    <div className='template-page-desc'>
                        <h3>{template?.title}</h3>
                        <div className='buttons'>
                            <div
                                className={`button-import-page ${template?.status?.exists
                                    ? (template?.status?.using_template ? 'imported' : 'switch')
                                    : 'import'
                                    }`}
                                onClick={() => {
                                    if (!template.status.using_template) {
                                        openImportModal(template);
                                    }
                                }}
                            >
                                {template?.status?.exists
                                    ? (template?.status?.using_template ? __('Imported', '--gtb-theme-namespace--') : __('Switch Template', '--gtb-theme-namespace--'))
                                    : __('Import Page', '--gtb-theme-namespace--')}
                            </div>
                            <div className='button-view-demo' onClick={() => window.open(template?.demo, '_blank')}>{__('View Demo', '--gtb-theme-namespace--')}</div>
                        </div>
                    </div>
                </div>
            })}
        </div>
        <div className='template-actions'>
        </div>
    </div>
}

const Wave = () => {
    return <div className='wave'>
        <svg width="145" height="138" viewBox="0 0 145 138" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="110" cy="28" r="110" fill="#F8FBFF" />
            <circle cx="110" cy="28" r="64" fill="#F2F8FF" />
        </svg>
    </div>;
}

const DashboardPage = () => {
    const { home_url, version, logo, title, plugins, upgradePro = 'https://gutenverse.com/pro', supportLink = 'https://support.jegtheme.com', docsLink = 'https://gutenverse.com/docs', subscribed = false } = window['GutenThemeConfig'];
    const [email, setEmail] = useState('');
    const [menu, setMenu] = useState('dashboard');
    const [pluginState, setPluginState] = useState('install');
    const [loading, setLoading] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [done, setDone] = useState(subscribed);

    const resetInvalid = () => setTimeout(() => setInvalid(false), 4000);

    const invalidMessage = () => {
        resetInvalid();
        switch (invalid) {
            case 'error':
                return __('there is an error requesting subscription.', '--gctd--');
            case 'format':
                return __('please use a valid email address format.', '--gctd--');
            case 'empty':
            default:
                return __('please input an email address.', '--gctd--');
        }
    };

    const onSubscribe = () => {
        if (isEmpty(email)) {
            setInvalid('empty');
            return;
        }

        const isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);

        if (!isValid) {
            setInvalid('format');
            return;
        }

        if (isValid && !loading) {
            setLoading(true);

            subscribeNews({
                email,
                domain: home_url,
            })
                .then(() => {
                    setDone(true);
                    setEmail('');
                })
                .catch(() => {
                    setInvalid('error');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const installPlugins = (index = 0) => {
        if (plugins && index < plugins.length) {
            const plugin = plugins[index];

            if (!plugin?.installed) {
                if(plugin?.download_url){
                    wp?.apiFetch({
                        path: 'gtb-themes-backend/v1/install/plugins',
                        method: 'POST',
                        data:{
                            slug: plugin?.slug,
                            download_url: plugin?.download_url
                        }
                    }).then((res) => {
                        if( 'failed' === res['status'] ){
                            console.log( res['message'] );
                        }
                        wp?.apiFetch({
                            path: `wp/v2/plugins/plugin?plugin=${plugin?.slug}/${plugin?.slug}`,
                            method: 'POST',
                            data: {
                                status: 'active'
                            }
                        }).then(() => {
                            installPlugins(index + 1);
                        }).catch(() => {
                            console.error('Error during plugin activation');
                            installPlugins(index);
                        })
                    })
                }else{
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
                        console.error('Error during installing plugin');
                    })
                }
            } else if (!plugin?.active) {
                wp?.apiFetch({
                    path: `wp/v2/plugins/plugin?plugin=${plugin?.slug}/${plugin?.slug}`,
                    method: 'POST',
                    data: {
                        status: 'active'
                    }
                }).then(() => {
                    installPlugins(index + 1);
                }).catch(() => {
                    console.error('Error during plugin activation');
                    installPlugins(index);
                })
            } else {
                installPlugins(index + 1);
            }
        } else {
            setPluginState('done');
        }
    }

    const onInstall = () => {
        setPluginState('loading');
        installPlugins(0);
    }

    useEffect(() => {
        let allActive = true;
        plugins?.map(plugin => {
            allActive = allActive && plugin?.active;
        });

        if (allActive) {
            setPluginState('done');
        }
    }, []);

    const pluginButton = () => {
        switch (pluginState) {
            case 'done':
                return <div className='action-button plugin-done'>{__('Plugin Installed', '--gtb-theme-namespace--')}</div>;
            case 'loading':
                return <div className='action-button plugin-loading'>
                    <div className="rotating" style={{ display: 'flex' }}>
                        <Loader size={20} />
                    </div>
                </div>;
            case 'install':
            default:
                return <div className='action-button plugin-install' onClick={onInstall}>{__('Install Plugins', '--gtb-theme-namespace--')}</div>;
        }
    }

    const content = () => {
        switch (menu) {
            case 'demo':
                return <ImportTemplates />;
            case 'dashboard':
            default:
                const { images } = window['GutenThemeConfig'];
                return <div className='content-wrapper'>
                    <div className='content-left'>
                        <div className='top'>
                            <p className='description'>{sprintf(__('Welcome to %s Theme 👋', '--gtb-theme-namespace--'), title)}</p>
                            <p className='version'>{__('version ', '--gtb-theme-namespace--')}{version}</p>
                        </div>
                        <div className='middle'>
                            <img className='background' src={images + '/bg-dashboard-tf.png'} />
                            <div className='detail'>
                                <div className='texts'>
                                    <p className='texts-title'>
                                        {__('Thank You For Choosing ', '--gtb-theme-namespace--')}
                                        <span className='gradient-text'>{title}<BlinkIcon /></span>
                                    </p>
                                    <p className='texts-description'>{sprintf(__('Thank you for bringing us happiness! We truly appreciate your purchase of the %s Theme. Dive into its features, explore all the possibilities, and create a stunning site with ease.', '--gtb-theme-namespace--'), title)}</p>
                                </div>
                                <div className='dancer'>
                                    <img src={images + '/image-dancer.png'} />
                                </div>
                            </div>
                        </div>
                        <div className='bottom'>
                            <div className='content-1'>
                                <Wave />
                                <div className='content-icon'>
                                    <img src={images + '/icon-plugin.png'}/>
                                </div>
                                <p className='content-title'>{__('Plugin Requirements', '--gtb-theme-namespace--')}</p>
                                <p className='content-description'>{__('Install and activate the required plugins to unlock all theme features.', '--gtb-theme-namespace--')}</p>
                                {pluginButton()}
                            </div>
                            <div className='content-2'>
                                <Wave />
                                <div className='content-icon'>
                                    <img src={images + '/icon-demo.png'}/>
                                </div>
                                <p className='content-title'>{__('Install Demo', '--gtb-theme-namespace--')}</p>
                                <p className='content-description'>{__('Importing the demo and style takes only one click. It is easily customizable.', '--gtb-theme-namespace--')}</p>
                                <div className='action-button' onClick={() => setMenu('demo')}>{__('View Demo', '--gtb-theme-namespace--')}</div>
                            </div>
                            <div className='content-3'>
                                <Wave />
                                <div className='content-icon'>
                                    <img src={images + '/icon-docs.png'}/>
                                </div>
                                <p className='content-title'>{__('Documentation', '--gtb-theme-namespace--')}</p>
                                <p className='content-description'>{__('Check our documentation to find the best solution for you.', '--gtb-theme-namespace--')}</p>
                                <div className='action-button' onClick={() => window.open(docsLink, '_blank')}>{__('Check Now', '--gtb-theme-namespace--')}</div>
                            </div>
                        </div>
                    </div>
                    <div className='content-right'>
                        <div className='top'>
                            <img className='background' src={images + '/bg-upgrade-pro.png'} />
                            <img className='image' src={images + '/mockup-upgrade-pro.png'} />
                            <p className='content-title'>{__('Upgrade To ', '--gtb-theme-namespace--')}<span className='gradient-text'>{__('Gutenverse PRO', '--gtb-theme-namespace--')}</span></p>
                            <p className='content-description'>{__('Unlock the WordPress Editor\'s potential with Gutenverse PRO.', '--gtb-theme-namespace--')}</p>
                            <div className='action-button' onClick={() => { window.open(upgradePro, '_blank'); }}>
                                {__('Upgrade To PRO', '--gtb-theme-namespace--')}
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 11L0.5 2.75L4.625 6.5L7.25 2L9.875 6.5L14 2.75L12.5 11H2ZM12.5 13.25C12.5 13.7 12.2 14 11.75 14H2.75C2.3 14 2 13.7 2 13.25V12.5H12.5V13.25Z" fill="white" />
                                </svg>
                            </div>
                        </div>
                        <div className='bottom'>
                            <p className='content-title'>{__('Join Our Newsletter', '--gtb-theme-namespace--')}</p>
                            <p className='content-description'>{__('Be the first to receive updates and stay informed about all our news', '--gtb-theme-namespace--')}</p>
                            <input type='text' placeholder={__('Your Email', '--gtb-theme-namespace--')} value={email} disabled={loading} onChange={(e) => setEmail(e.target.value)} />
                            <div className='action-button' onClick={onSubscribe}>{__('Subcsribe', '--gtb-theme-namespace--')}</div>
                            {invalid && !done && <span className="warning">{invalidMessage()}</span>}
                        </div>
                    </div>
                </div>;
        }
    }

    return <div className='themeforest-dashboard'>
        <div className='dashboard-header'>
            <div className='logo'>{logo ? <img src={logo} /> : __('LOGO', '--gtb-theme-namespace--')}</div>
            <ul className='menu'>
                <li onClick={() => setMenu('dashboard')} className={`${menu === 'dashboard' ? 'active' : ''}`}>{__('Dashboard', '--gtb-theme-namespace--')}</li>
                <li onClick={() => setMenu('demo')} className={`${menu === 'demo' ? 'active' : ''}`}>{__('Demo', '--gtb-theme-namespace--')}</li>
                <div className='support' onClick={() => window.open(supportLink, '_blank')}>
                    <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_19874_7889)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.48793 1.89237C6.09975 1.88536 5.71401 1.95497 5.35276 2.09721C4.99152 2.23945 4.66187 2.45153 4.38269 2.72132C4.1035 2.9911 3.88025 3.3133 3.72573 3.66946C3.5712 4.02562 3.48843 4.40876 3.48214 4.79694V8.85666C3.48214 9.10293 3.38431 9.33912 3.21017 9.51326C3.03603 9.6874 2.79984 9.78523 2.55357 9.78523H1.39286C1.02345 9.78523 0.66917 9.63848 0.407958 9.37727C0.146747 9.11606 0 8.76178 0 8.39237L0 6.53523C0 6.16582 0.146747 5.81154 0.407958 5.55033C0.66917 5.28912 1.02345 5.14237 1.39286 5.14237H2.08929V4.78023C2.09776 4.20952 2.21857 3.64608 2.44483 3.12207C2.67109 2.59806 2.99835 2.12375 3.40794 1.72624C3.81752 1.32873 4.3014 1.01579 4.83195 0.805309C5.36249 0.594826 5.9293 0.490917 6.5 0.499517C7.0707 0.490917 7.63751 0.594826 8.16805 0.805309C8.6986 1.01579 9.18248 1.32873 9.59206 1.72624C10.0016 2.12375 10.3289 2.59806 10.5552 3.12207C10.7814 3.64608 10.9022 4.20952 10.9107 4.78023V5.14237H11.6071C11.9766 5.14237 12.3308 5.28912 12.592 5.55033C12.8533 5.81154 13 6.16582 13 6.53523V8.39237C13 8.76178 12.8533 9.11606 12.592 9.37727C12.3308 9.63848 11.9766 9.78523 11.6071 9.78523H10.9107V10.2495C10.9108 10.877 10.6799 11.4826 10.262 11.9507C9.84411 12.4187 9.26849 12.7166 8.645 12.7873C8.52392 13.0035 8.34736 13.1835 8.13353 13.3086C7.91971 13.4338 7.67635 13.4997 7.42857 13.4995H6.03571C5.66631 13.4995 5.31203 13.3528 5.05082 13.0916C4.7896 12.8303 4.64286 12.4761 4.64286 12.1067C4.64286 11.7373 4.7896 11.383 5.05082 11.1218C5.31203 10.8605 5.66631 10.7138 6.03571 10.7138H7.42857C7.93186 10.7138 8.37293 10.9803 8.61714 11.3805C8.87308 11.3217 9.10151 11.1778 9.26511 10.9724C9.42871 10.767 9.51781 10.5121 9.51786 10.2495V4.79602C9.51149 4.40583 9.42784 4.02078 9.27175 3.66312C9.11566 3.30545 8.89023 2.98228 8.60848 2.71227C8.32673 2.44227 7.99425 2.23079 7.63027 2.09006C7.2663 1.94933 6.87803 1.88214 6.48793 1.89237Z" fill="#011627"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_19874_7889">
                            <rect width="13" height="13" fill="white" transform="translate(0 0.5)"/>
                            </clipPath>
                        </defs>
                    </svg>
                    {__('Get Support', '--gtb-theme-namespace--')}
                </div>
            </ul>
        </div>
        <div className='dashboard-content'>
            {content()}
        </div>
    </div>
}

export default DashboardPage;