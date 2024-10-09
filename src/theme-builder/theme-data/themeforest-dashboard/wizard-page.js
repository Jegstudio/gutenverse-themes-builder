import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';


const ImportLoading = (props) => {
    let progress = '0%';
    const width = () => {
        switch (props?.progress) {
            case '1/4':
                progress = '25%';
                return 'twenty-five';
            case '2/4':
                progress = '50%';
                return 'fifty';
            case '3/4':
                progress = '75%';
                return 'seventy-five';
            case '4/4':
                progress = '100%';
                return 'hundred';
            default:
                progress = '0%';
                return 'zero';
        }
    };

    width();

    return <div className="installing-notice">
        <div className="installing-notice-container">
            <div className="importing-notice">
                <div className="notice-inner">
                    <span>{props?.message}</span>
                    <span>{progress}</span>
                </div>
                <div className="bar-progress-container">
                    <div className={'notice-bar-progress ' + `${width()}-percent`} />
                </div>
            </div>
        </div>
    </div>;
};

const InstallPlugin = ({ action, setAction, updateProgress }) => {
    const { plugins } = window['GutenThemeConfig'];
    const [installing, setInstalling] = useState({ show: true, message: 'Preparing...', progress: '1/4' })

    useEffect(() => {
        let allActive = true;
        plugins?.map(plugin => {
            allActive = allActive && plugin?.active;
        });

        if (allActive) {
            setAction('done');
        }
    }, [])

    const boldWord = (str, word) => {
        const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
        const parts = str.split(regex);
        const matches = str.match(regex);

        return parts.map((part, index) => (
            <Fragment key={index}>
                {part}
                {index < matches?.length ? <span className='gutenverse'>{matches[index]}</span> : null}
            </Fragment>
        ));
    };

    const installPlugins = (index = 0) => {
        if (plugins && index < plugins.length) {
            setTimeout(() => {
                setInstalling({ show: true, message: 'Installing Plugins...', progress: '2/4' });
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
                        console.error('Error during installing plugin');
                    })
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
            }, 1500);
        } else {
            setInstalling({ show: true, message: 'Installing Complete', progress: '4/4' });
            setTimeout(() => {
                setAction('done');
            }, 1500);
        }

    }

    const onInstall = () => {
        setAction('loading');
        installPlugins(0);
    }

    const pluginActions = () => {
        switch (action) {
            case 'done':
                return <Fragment>
                    <div className='button-done'>{__('Installed & Activated', '--gtb-theme-namespace--')}</div>
                    <div onClick={() => updateProgress('importTemplate', 1)} className='button-next'>{__('Next', '--gtb-theme-namespace--')}</div>
                </Fragment>;
            case 'loading':
                return <Fragment>
                    <ImportLoading message={installing?.message} progress={installing?.progress} />
                </Fragment>;
            case 'install':
            default:
                return <Fragment>
                    <div onClick={() => onInstall()} className='button-install'>{__('Install Required Plugins', '--gtb-theme-namespace--')}</div>
                </Fragment>;
        }
    }

    return <div className='plugin-install'>
        <h1 className='content-title'>{__('Install Required Plugins', '--gtb-theme-namespace--')}</h1>
        <p className='content-desc'>{__('To access the full range of theme features, please install and activate the required plugins. Your enhanced user experience is just a few steps away!', '--gtb-theme-namespace--')}</p>
        <div className='plugin-list'>
            {plugins?.map((plugin, key) => {
                return <div className='plugin-data' key={key}>
                    <div className='logo'>
                        {plugin?.icons && plugin?.icons['1x'] && <img src={plugin?.icons['1x']} />}
                    </div>
                    <div className='plugin-detail'>
                        <h3 className='plugin-title'>{boldWord(plugin?.title, 'Gutenverse')}</h3>
                        <p className='plugin-desc'>{plugin?.short_desc.toLowerCase()}</p>
                    </div>
                </div>;
            })}
        </div>
        <div className='plugin-actions'>
            {pluginActions()}
        </div>
    </div>
}

const UpgradePro = ({ updateProgress }) => {
    const { images, upgradePro } = window['GutenThemeConfig'];

    return <div className='upgrade-pro-wrapper'>
        <div className='upgrade-pro-content'>
            <img className='background' src={images + '/bg-upgrade-wizard.png'} />
            <h3 className='content-title'>
                {__('Unlock Limitless Possibilities with ', '--gtb-theme-namespace--')}
                <span className='gradient-text'>{__('Gutenverse PRO', '--gtb-theme-namespace--')}</span>
            </h3>
            <p className='content-desc'>
                {__('Empowering you to build a website that truly stands out with advanced features and seamless integration.', '--gtb-theme-namespace--')}
            </p>
            <div className='upgrade-pro-button' onClick={() => window.open(upgradePro, '_blank')}>
                <div className='button-content-wrapper'>
                    <span>{__('Upgrade To PRO', '--gtb-theme-namespace--')}</span>
                    <svg width={18} height={18} viewBox="0 0 15 15" fill={'white'} transform={'translate(0,0)'} xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.25 9.5L2 2.625L5.4375 5.75L7.625 2L9.8125 5.75L13.25 2.625L12 9.5H3.25ZM12 11.375C12 11.75 11.75 12 11.375 12H3.875C3.5 12 3.25 11.75 3.25 11.375V10.75H12V11.375Z" fill={'white'} />
                    </svg>
                </div>
            </div>
            <img className='upgrade-image' src={images + '/upgrade-content.png'} />
        </div>
        <div className='upgrade-pro-actions'>
            <div onClick={() => updateProgress('importMenu', -1)} className='button-back'>
                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 5.1C15.3314 5.1 15.6 4.83137 15.6 4.5C15.6 4.16863 15.3314 3.9 15 3.9V5.1ZM0.575736 4.07574C0.341421 4.31005 0.341421 4.68995 0.575736 4.92426L4.39411 8.74264C4.62843 8.97696 5.00833 8.97696 5.24264 8.74264C5.47696 8.50833 5.47696 8.12843 5.24264 7.89411L1.84853 4.5L5.24264 1.10589C5.47696 0.871573 5.47696 0.491674 5.24264 0.257359C5.00833 0.0230446 4.62843 0.0230446 4.39411 0.257359L0.575736 4.07574ZM15 3.9L1 3.9V5.1L15 5.1V3.9Z" fill="#99A2A9" />
                </svg>
                {__('Back', '--gtb-theme-namespace--')}
            </div>
            <div onClick={() => updateProgress('done', 1)} className='button-next'>{__('Next', '--gtb-theme-namespace--')}</div>
        </div>
    </div>;
}
const ImportMenu = ({updateProgress}) => {
    const [loading, setLoading] = useState(false);
    const [isImported, setIsImported] = useState(false);

    const handleImportMenu = () => {
        setLoading(true);
        wp?.apiFetch({
            path: `gtb-themes-backend/v1/import/menus`,
            method: 'GET',
        }).then(() => {
            console.log('masuk')
            setLoading(false);
            setIsImported(true);
        }).catch(() => {
        })
    }
    return <div className='import-menu-wrapper'>
        <div className='title-wrapper'>
            <h1 className='content-title'>{__('Import Menu', '--gtb-theme-namespace--')}</h1>
        </div>
        <div className='content-wrapper'>
            {
                loading ? <div className="load"></div> : isImported ? <div className="menu-imported">
                    <h1>{__('Menu Imported!', '--gtb-theme-namespace--')}</h1>
                    <p>{__('Proceed to the next step.', '--gtb-theme-namespace--')}</p>
                </div> : <div onClick={() => handleImportMenu()} className='import-button'>{__('Import Menu', '--gtb-theme-namespace--')}</div>
            }
        </div>
        <div className='footer-wrapper'>
            <div onClick={() => updateProgress('importTemplate', -1)} className='button-back'>
                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 5.1C15.3314 5.1 15.6 4.83137 15.6 4.5C15.6 4.16863 15.3314 3.9 15 3.9V5.1ZM0.575736 4.07574C0.341421 4.31005 0.341421 4.68995 0.575736 4.92426L4.39411 8.74264C4.62843 8.97696 5.00833 8.97696 5.24264 8.74264C5.47696 8.50833 5.47696 8.12843 5.24264 7.89411L1.84853 4.5L5.24264 1.10589C5.47696 0.871573 5.47696 0.491674 5.24264 0.257359C5.00833 0.0230446 4.62843 0.0230446 4.39411 0.257359L0.575736 4.07574ZM15 3.9L1 3.9V5.1L15 5.1V3.9Z" fill="#99A2A9" />
                </svg>
                {__('Back', '--gtb-theme-namespace--')}
            </div>
            <div onClick={() => updateProgress('upgradePro', 1)} className='button-next'>{__('Next', '--gtb-theme-namespace--')}</div>
        </div>
    </div>
}

const ImportTemplates = ({ updateProgress }) => {
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

    const importTemplates = template => {
        setImporterStep([
            "Creating Pages",
            "Assigning Templates",
        ])
        setImporterNotice(`Creating “${template.title}” page in progress...`);
        setImporterStatus(`Create Page: ${template.page}....`)
        setImporterCurrent(1);
        setDone(false);
        setModal(true);

        wp?.apiFetch({
            path: `gtb-themes-backend/v1/pages/assign`,
            method: 'POST',
            data: {
                title: template.title
            }
        }).then(() => {
            setImporterStatus(`Assigning Templates: ${template.page}....`)
            setImporterCurrent(2);
            updateTemplateStatus(template.title);
            setTimeout(() => {
                setImporterStatus(`Done....`)
                setImporterCurrent(3);
                setTimeout(() => {
                    setDone(true);
                    setCompleteSubtitle(`Page ${template.page} is successfully imported!`);
                }, 500)
            }, 500)
        }).catch(() => {
        })
    }

    const importAll = async () => {
        const filteredTemplateList = templateList.filter(template => !template?.status?.using_template);

        const steps = filteredTemplateList.map(element => element.title);
        setImporterStep(steps);
        setDone(false);
        setModal(true);

        for (let i = 0; i < filteredTemplateList.length; i++) {
            const template = filteredTemplateList[i];

            try {
                setImporterNotice(`Creating “${template.title}” page in progress...`);
                setImporterStatus(`Create Page: ${template.page}....`);

                await wp?.apiFetch({
                    path: `gtb-themes-backend/v1/pages/assign`,
                    method: 'POST',
                    data: {
                        title: template.title
                    }
                });

                updateTemplateStatus(template.title);
                setImporterStatus(`Assigning Templates: ${template.page}....`);
                setImporterCurrent(i + 1);

                await new Promise(resolve => setTimeout(resolve, 500));

            } catch (error) {
                console.error(`Failed to assign template for page: ${template.page}`, error);
            }
        }

        setTimeout(() => {
            setImporterStatus(`Done....`);
            setImporterCurrent(filteredTemplateList.length + 1);
            setTimeout(() => {
                setDone(true);
                setCompleteSubtitle(__('All Demo is successfully imported!', '--gtb-theme-namespace--'));
            }, 500);
        }, 500);
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

    return <div className='template-install'>
        {modal && <ImporterModal
            importerStep={importerStep}
            importerNotice={importerNotice}
            importerCurrent={importerCurrent}
            importerStatus={importerStatus}
            completeSubtitle={completeSubtitle}
            done={done}
            close={() => { setModal(false) }}
        />}
        <div className='template-title'>
            <h1 className='content-title'>{__('Import Prebuilt Demos', '--gtb-theme-namespace--')}</h1>
            <div className={`button-import-all ${allImported? 'imported' : ''}`} onClick={() => {
                if (!allImported) {
                    importAll();
                }
            }}>
                {!allImported && <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.00033 13.3327C3.63366 13.3327 3.31966 13.202 3.05833 12.9407C2.79699 12.6793 2.66655 12.3656 2.66699 11.9993V9.99935H4.00033V11.9993H12.0003V9.99935H13.3337V11.9993C13.3337 12.366 13.203 12.68 12.9417 12.9413C12.6803 13.2027 12.3665 13.3331 12.0003 13.3327H4.00033ZM8.00033 10.666L4.66699 7.33268L5.60033 6.36602L7.33366 8.09935V2.66602H8.66699V8.09935L10.4003 6.36602L11.3337 7.33268L8.00033 10.666Z" fill="white" />
                </svg>}
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
                                        importTemplates(template)
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
            <div onClick={() => updateProgress('installPlugin', -1)} className='button-back'>
                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 5.1C15.3314 5.1 15.6 4.83137 15.6 4.5C15.6 4.16863 15.3314 3.9 15 3.9V5.1ZM0.575736 4.07574C0.341421 4.31005 0.341421 4.68995 0.575736 4.92426L4.39411 8.74264C4.62843 8.97696 5.00833 8.97696 5.24264 8.74264C5.47696 8.50833 5.47696 8.12843 5.24264 7.89411L1.84853 4.5L5.24264 1.10589C5.47696 0.871573 5.47696 0.491674 5.24264 0.257359C5.00833 0.0230446 4.62843 0.0230446 4.39411 0.257359L0.575736 4.07574ZM15 3.9L1 3.9V5.1L15 5.1V3.9Z" fill="#99A2A9" />
                </svg>
                {__('Back', '--gtb-theme-namespace--')}
            </div>
            <div onClick={() => updateProgress('importMenu', 1)} className='button-next'>{__('Next', '--gtb-theme-namespace--')}</div>
        </div>
    </div>
}

export const ImporterModal = ({
    importerStep = [
        "Fetching Data",
        "Importing Assets",
        "Deploying Content"
    ],
    importerNotice = __('Importing “Home” demo in progress...', '--gtb-theme-namespace--'),
    importerCurrent = 2,
    importerStatus = __('Import: Demo Home....', '--gtb-theme-namespace--'),
    headerText = __('Important Notice', '--gtb-theme-namespace--'),
    warnText = __('Please do not refresh or close the page while importing data is in progress.', '--gtb-theme-namespace--'),
    completeTitle = __('Install Demo Completed', '--gtb-theme-namespace--'),
    completeSubtitle = __('All Demo is successfully imported!', '--gtb-theme-namespace--'),
    done = false,
    close = () => { }
}) => {
    return <div className='gutenverse-importer-wrapper-modal-wizzard'>
        <div className='importer-modal'>
            {done ? <>
                <div className='import-complete'>
                    <div className="auth-icon-status-wrapper">
                        <svg viewBox="0 0 160 160">
                            <defs>
                                <circle id="circle-clip" cx="50%" cy="50%" r="18%" />
                                <clipPath id="avatar-clip">
                                    <use href="#circle-clip" />
                                </clipPath>
                            </defs>
                            <circle cx="50%" cy="50%" r="18%" fill="white" fillOpacity="1">
                                <animate attributeName="r" values="18%;50%" dur="4s" repeatCount="indefinite" />
                                <animate attributeName="fill-opacity" values="1;0" dur="4s" repeatCount="indefinite" />
                            </circle>

                            <circle cx="50%" cy="50%" r="18%" fill="white" fillOpacity="1">
                                <animate attributeName="r" values="18%;50%" dur="4s" begin="1s" repeatCount="indefinite" />
                                <animate attributeName="fill-opacity" values="1;0" dur="4s" begin="1s" repeatCount="indefinite" />
                            </circle>

                            <circle cx="50%" cy="50%" r="18%" fill="white" fillOpacity="1">
                                <animate attributeName="r" values="18%;50%" dur="4s" begin="2s" repeatCount="indefinite" />
                                <animate attributeName="fill-opacity" values="1;0" dur="4s" begin="2s" repeatCount="indefinite" />
                            </circle>

                            <circle cx="50%" cy="50%" r="18%" fill="white" fillOpacity="1">
                                <animate attributeName="r" values="18%;50%" dur="4s" begin="3s" repeatCount="indefinite" />
                                <animate attributeName="fill-opacity" values="1;0" dur="4s" begin="3s" repeatCount="indefinite" />
                            </circle>
                        </svg>
                        <div className="auth-status-icon">
                            <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_b_1867_7047)">
                                    <path d="M29.9987 2.66689L9.9987 22.6669L0.832031 13.5002L3.18203 11.1502L9.9987 17.9502L27.6487 0.316895L29.9987 2.66689Z" fill="#1bc87f" />
                                </g>
                                <defs>
                                    <filter id="filter0_b_1867_7047" x="-3.16797" y="-3.68311" width="37.168" height="30.3501" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1867_7047" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1867_7047" result="shape" />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div className='complete-title'>
                        {completeTitle}
                    </div>
                    <div className='complete-subtitle'>
                        {completeSubtitle}
                    </div>
                    <div className='close-buttom' onClick={() => close()}>
                        {__('Close', '--gtb-theme-namespace--')}
                    </div>
                </div>
            </> : <>
                <div className='importer-header'>
                    <span>{headerText}</span>
                </div>
                <div className='importer-body'>
                    <div className='importer-warn'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0C4.47754 0 0 4.47915 0 10C0 15.5241 4.47754 20 10 20C15.5225 20 20 15.5241 20 10C20 4.47915 15.5225 0 10 0ZM10 4.43548C10.9353 4.43548 11.6935 5.19371 11.6935 6.12903C11.6935 7.06435 10.9353 7.82258 10 7.82258C9.06468 7.82258 8.30645 7.06435 8.30645 6.12903C8.30645 5.19371 9.06468 4.43548 10 4.43548ZM12.2581 14.6774C12.2581 14.9446 12.0414 15.1613 11.7742 15.1613H8.22581C7.95859 15.1613 7.74194 14.9446 7.74194 14.6774V13.7097C7.74194 13.4425 7.95859 13.2258 8.22581 13.2258H8.70968V10.6452H8.22581C7.95859 10.6452 7.74194 10.4285 7.74194 10.1613V9.19355C7.74194 8.92633 7.95859 8.70968 8.22581 8.70968H10.8065C11.0737 8.70968 11.2903 8.92633 11.2903 9.19355V13.2258H11.7742C12.0414 13.2258 12.2581 13.4425 12.2581 13.7097V14.6774Z" fill="#FFC908"></path>
                        </svg>
                        <span>
                            {warnText}
                        </span>
                    </div>
                    <div className='importer-step'>
                        <div className='import-step-notice'>
                            {importerNotice}
                        </div>
                        <div className='importer-inner-step'>
                            {importerStep.map((step, index) => {
                                const item = index + 1;
                                return (
                                    <div key={index} className={`steps ${importerCurrent > item ? 'done' : importerCurrent == item ? 'current' : ''}`}>
                                        {importerCurrent > item ? <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="2.5" width="15" height="15" rx="7.5" fill="#3B57F7" />
                                            <rect x="0.5" y="2.5" width="15" height="15" rx="7.5" stroke="#3B57F7" />
                                            <path d="M12 7L6.5 12.5L4 10" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg> : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="white" />
                                            <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#D0D5DD" />
                                        </svg>}
                                        <div>{step}</div>
                                        {importerCurrent > item ? <span className='completed'>{__('Completed', '--gtb-theme-namespace--')}</span> : importerCurrent == item ? <div className='loading'>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 1C8.13261 1 8.25979 1.05268 8.35355 1.14645C8.44732 1.24021 8.5 1.36739 8.5 1.5V4.5C8.5 4.63261 8.44732 4.75979 8.35355 4.85355C8.25979 4.94732 8.13261 5 8 5C7.86739 5 7.74022 4.94732 7.64645 4.85355C7.55268 4.75979 7.5 4.63261 7.5 4.5V1.5C7.5 1.36739 7.55268 1.24021 7.64645 1.14645C7.74022 1.05268 7.86739 1 8 1ZM8 11C8.13261 11 8.25979 11.0527 8.35355 11.1464C8.44732 11.2402 8.5 11.3674 8.5 11.5V14.5C8.5 14.6326 8.44732 14.7598 8.35355 14.8536C8.25979 14.9473 8.13261 15 8 15C7.86739 15 7.74022 14.9473 7.64645 14.8536C7.55268 14.7598 7.5 14.6326 7.5 14.5V11.5C7.5 11.3674 7.55268 11.2402 7.64645 11.1464C7.74022 11.0527 7.86739 11 8 11ZM15 8C15 8.13261 14.9473 8.25979 14.8536 8.35355C14.7598 8.44732 14.6326 8.5 14.5 8.5H11.5C11.3674 8.5 11.2402 8.44732 11.1464 8.35355C11.0527 8.25979 11 8.13261 11 8C11 7.86739 11.0527 7.74022 11.1464 7.64645C11.2402 7.55268 11.3674 7.5 11.5 7.5H14.5C14.6326 7.5 14.7598 7.55268 14.8536 7.64645C14.9473 7.74022 15 7.86739 15 8ZM5 8C5 8.13261 4.94732 8.25979 4.85355 8.35355C4.75979 8.44732 4.63261 8.5 4.5 8.5H1.5C1.36739 8.5 1.24021 8.44732 1.14645 8.35355C1.05268 8.25979 1 8.13261 1 8C1 7.86739 1.05268 7.74022 1.14645 7.64645C1.24021 7.55268 1.36739 7.5 1.5 7.5H4.5C4.63261 7.5 4.75979 7.55268 4.85355 7.64645C4.94732 7.74022 5 7.86739 5 8ZM3.05 3.05C3.14376 2.95626 3.27092 2.90361 3.4035 2.90361C3.53608 2.90361 3.66324 2.95626 3.757 3.05L5.88 5.172C5.97108 5.2663 6.02148 5.3926 6.02034 5.5237C6.0192 5.6548 5.96661 5.7802 5.87391 5.87291C5.78121 5.96561 5.6558 6.0182 5.5247 6.01934C5.3936 6.02048 5.2673 5.97008 5.173 5.879L3.05 3.757C2.95626 3.66324 2.90361 3.53608 2.90361 3.4035C2.90361 3.27092 2.95626 3.14376 3.05 3.05ZM10.121 10.121C10.2148 10.0273 10.3419 9.97461 10.4745 9.97461C10.6071 9.97461 10.7342 10.0273 10.828 10.121L12.95 12.243C13.0411 12.3373 13.0915 12.4636 13.0903 12.5947C13.0892 12.7258 13.0366 12.8512 12.9439 12.9439C12.8512 13.0366 12.7258 13.0892 12.5947 13.0903C12.4636 13.0915 12.3373 13.0411 12.243 12.95L10.121 10.828C10.0273 10.7342 9.97461 10.6071 9.97461 10.4745C9.97461 10.3419 10.0273 10.2148 10.121 10.121ZM12.95 3.051C13.0434 3.14472 13.0959 3.27166 13.0959 3.404C13.0959 3.53634 13.0434 3.66328 12.95 3.757L10.828 5.88C10.7337 5.97108 10.6074 6.02148 10.4763 6.02034C10.3452 6.0192 10.2198 5.96661 10.1271 5.87391C10.0344 5.78121 9.9818 5.6558 9.98066 5.5247C9.97952 5.3936 10.0299 5.2673 10.121 5.173L12.243 3.051C12.3368 2.95726 12.4639 2.90461 12.5965 2.90461C12.7291 2.90461 12.8562 2.95726 12.95 3.051ZM5.879 10.121C5.97274 10.2148 6.02539 10.3419 6.02539 10.4745C6.02539 10.6071 5.97274 10.7342 5.879 10.828L3.757 12.95C3.6627 13.0411 3.5364 13.0915 3.4053 13.0903C3.2742 13.0892 3.14879 13.0366 3.05609 12.9439C2.96339 12.8512 2.9108 12.7258 2.90966 12.5947C2.90852 12.4636 2.95892 12.3373 3.05 12.243L5.172 10.121C5.26576 10.0273 5.39292 9.97461 5.5255 9.97461C5.65808 9.97461 5.78524 10.0273 5.879 10.121Z" fill="#3B57F7" />
                                            </svg>
                                        </div> : ''}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='importer-footer'>
                    <div className='footer-info'>
                        <span>{importerStatus}</span>
                        <span>{__(`${(importerCurrent - 1)}/${(importerStep.length)} Completed`, '--gtb-theme-namespace--')}</span>
                    </div>
                </div>
                <div className='footer-loading'>
                    <div className='loading-status' style={{ width: `${((importerCurrent / (importerStep.length)) * 100)}%` }}></div>
                </div>
            </>}
        </div>
    </div>
}

const WizardPage = () => {
    const [progress, setProgress] = useState('installPlugin');
    const [progressCount, setProgressCount] = useState(0);
    const [action, setAction] = useState('install');

    const updateProgress = (progress, inc) => {
        setProgress(progress);
        setProgressCount(progressCount + inc);
    }

    const content = () => {
        switch (progress) {
            case 'done':
                const { images } = window['GutenThemeConfig'];

                return <div className='finalizing'>
                    <div className='image-wrapper'>
                        <img className='image-done' src={images + '/final.png'} />
                    </div>
                    <div className='final-detail'>
                        <h3 className='final-title'>{__('Congratulations All Set 🤩', '--gtb-theme-namespace--')}</h3>
                        <p className='final-desc'>{__('This theme is built with Gutenverse, a powerful and lightweight Gutenberg blocks and page builder plugin for the WordPress Site Editor.', '--gtb-theme-namespace--')}</p>
                        <div onClick={() => {
                            window.location.href = `${window['GutenThemeConfig']['dashboardPage']}&wizard_setup_done=yes`
                        }} className='button-visit'>{__('Visit Dashboard', '--gtb-theme-namespace--')}</div>
                    </div>
                </div>;
            case 'upgradePro':
                return <UpgradePro updateProgress={updateProgress} />;
            case 'importTemplate':
                return <ImportTemplates updateProgress={updateProgress} />;
            case 'importMenu':
                return <ImportMenu updateProgress={updateProgress} />;
            case 'installPlugin':
            default:
                return <InstallPlugin updateProgress={updateProgress} action={action} setAction={setAction} />;
        }
    }

    return <div className='theme-wizard-wrapper'>
        <div className='theme-wizard'>
            <div className='wizard-header'>
                <div className={`progress ${progress === 'installPlugin' ? 'active' : ''} ${progressCount >= 0 ? 'done' : ''}`}>
                    <p className='number'>1</p>
                    <h3 className='progress-title'>{__('Plugin Requirements', '--gtb-theme-namespace--')}</h3>
                </div>
                <div className={`progress ${progress === 'importTemplate' ? 'active' : ''} ${progressCount >= 1 ? 'done' : ''}`}>
                    <p className='number'>2</p>
                    <h3 className='progress-title'>{__('Import Demo', '--gtb-theme-namespace--')}</h3>
                </div>
                <div className={`progress ${progress === 'importMenu' ? 'active' : ''} ${progressCount >= 2 ? 'done' : ''}`}>
                    <p className='number'>3</p>
                    <h3 className='progress-title'>{__('Import Menu', '--gtb-theme-namespace--')}</h3>
                </div>
                <div className={`progress ${progress === 'upgradePro' ? 'active' : ''} ${progressCount >= 3 ? 'done' : ''}`}>
                    <p className='number'>4</p>
                    <h3 className='progress-title'>{__('Upgrade Your Site', '--gtb-theme-namespace--')}</h3>
                </div>
                <div className={`progress ${progress === 'done' ? 'active' : ''} ${progressCount >= 4 ? 'done' : ''}`}>
                    <p className='number'>5</p>
                    <h3 className='progress-title'>{__('Finalizing', '--gtb-theme-namespace--')}</h3>
                </div>
            </div>
            <div className='wizard-body'>
                {content()}
            </div>
        </div>
    </div>;
}

export default WizardPage;