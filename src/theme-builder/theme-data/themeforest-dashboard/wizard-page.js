import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';

const CloseIcon = ({ fill = 'inherit' }) => <svg width="12" height="12" viewBox="0 0 12 12" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M7.17593 6.00048L10.7593 2.42548C10.9162 2.26856 11.0043 2.05573 11.0043 1.83381C11.0043 1.6119 10.9162 1.39907 10.7593 1.24215C10.6023 1.08523 10.3895 0.99707 10.1676 0.99707C9.94567 0.99707 9.73285 1.08523 9.57593 1.24215L6.00093 4.82548L2.42593 1.24215C2.26901 1.08523 2.05618 0.99707 1.83426 0.99707C1.61234 0.99707 1.39951 1.08523 1.24259 1.24215C1.08567 1.39907 0.997516 1.6119 0.997516 1.83381C0.997516 2.05573 1.08567 2.26856 1.24259 2.42548L4.82593 6.00048L1.24259 9.57548C1.16449 9.65295 1.10249 9.74512 1.06018 9.84667C1.01788 9.94822 0.996094 10.0571 0.996094 10.1671C0.996094 10.2772 1.01788 10.3861 1.06018 10.4876C1.10249 10.5892 1.16449 10.6813 1.24259 10.7588C1.32006 10.8369 1.41223 10.8989 1.51378 10.9412C1.61533 10.9835 1.72425 11.0053 1.83426 11.0053C1.94427 11.0053 2.05319 10.9835 2.15474 10.9412C2.25629 10.8989 2.34846 10.8369 2.42593 10.7588L6.00093 7.17548L9.57593 10.7588C9.6534 10.8369 9.74556 10.8989 9.84711 10.9412C9.94866 10.9835 10.0576 11.0053 10.1676 11.0053C10.2776 11.0053 10.3865 10.9835 10.4881 10.9412C10.5896 10.8989 10.6818 10.8369 10.7593 10.7588C10.8374 10.6813 10.8994 10.5892 10.9417 10.4876C10.984 10.3861 11.0058 10.2772 11.0058 10.1671C11.0058 10.0571 10.984 9.94822 10.9417 9.84667C10.8994 9.74512 10.8374 9.65295 10.7593 9.57548L7.17593 6.00048Z" fill={fill} />
</svg>;

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
            <React.Fragment key={index}>
                {part}
                {index < matches?.length ? <span className='gutenverse'>{matches[index]}</span> : null}
            </React.Fragment>
        ));
    };

    const installPlugins = (index = 0) => {
        setInstalling({ show: true, message: 'Installing Plugins...', progress: '2/4' });
        if (plugins && index < plugins.length) {
            const plugin = plugins[index];
            console.log(plugin, 'asd')

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
                })
            } else {
                installPlugins(index + 1);
            }
        } else {
            setAction('done');
            setInstalling({ show: true, message: 'Installing Complete', progress: '4/4' });
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
                    <div className='button-done'>{__('Installed & Activated', 'gutenverse-temes-builder')}</div>
                    <div onClick={() => updateProgress('importTemplate', 1)} className='button-next'>{__('Next', 'gutenverse-temes-builder')}</div>
                </Fragment>;
            case 'loading':
                return <Fragment>
                    <ImportLoading message={installing?.message} progress={installing?.progress} />
                </Fragment>;
            case 'install':
            default:
                return <Fragment>
                    <div onClick={() => updateProgress('importTemplate', 1)} className='button-skip'>{__('Skip', 'gutenverse-temes-builder')}</div>
                    <div onClick={() => onInstall()} className='button-install'>{__('Install Required Plugins', 'gutenverse-temes-builder')}</div>
                </Fragment>;
        }
    }

    return <div className='plugin-install'>
        <h1 className='content-title'>{__('Install Required Plugins', 'gutenverse-temes-builder')}</h1>
        <p className='content-desc'>{__('To access the full range of theme features, please install and activate the required plugins. Your enhanced user experience is just a few steps away!', 'gutenverse-themes-builder')}</p>
        <div className='plugin-list'>
            {plugins?.map((plugin, key) => {
                return <div className='plugin-data' key={key}>
                    <div className='logo'>
                        {plugin?.icons && plugin?.icons['1x'] && <img src={plugin?.icons['1x']} />}
                    </div>
                    <div className='plugin-detail'>
                        <h3 className='plugin-title'>{boldWord(plugin?.title, 'Gutenverse')}</h3>
                        <p className='plugin-desc'>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius risus dolor, vitae ornare metus porta ac. Nulla dignissim velit tellus, sed aliquam est mattis et.`}</p>
                    </div>
                </div>;
            })}
        </div>
        <div className='plugin-actions'>
            {pluginActions()}
        </div>
    </div>
}

const ImportTemplates = ({ updateProgress }) => {
    const { assign } = window['GutenThemeConfig'];

    return <div className='template-install'>
        <div className='template-title'>
            <h1 className='content-title'>{__('Import Prebuilt Demos', 'gutenverse-temes-builder')}</h1>
            <div className='button-import-all'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.00033 13.3327C3.63366 13.3327 3.31966 13.202 3.05833 12.9407C2.79699 12.6793 2.66655 12.3656 2.66699 11.9993V9.99935H4.00033V11.9993H12.0003V9.99935H13.3337V11.9993C13.3337 12.366 13.203 12.68 12.9417 12.9413C12.6803 13.2027 12.3665 13.3331 12.0003 13.3327H4.00033ZM8.00033 10.666L4.66699 7.33268L5.60033 6.36602L7.33366 8.09935V2.66602H8.66699V8.09935L10.4003 6.36602L11.3337 7.33268L8.00033 10.666Z" fill="white" />
                </svg>
                {__('Import All Pages', 'gutenverse-temes-builder')}
            </div>
        </div>
        <div className='template-list'>
            {assign?.map((template, key) => {
                return <div className='template-page' key={key}>
                    <img src={template?.thumb} />
                    <div className='template-page-desc'>
                        <h3>{template?.title}</h3>
                        <div className='buttons'>
                            <div className='button-import-page'>{__('Import Page', 'gutenverse-themes-builder')}</div>
                            <div className='button-view-demo'>{__('View Demo', 'gutenverse-themes-builder')}</div>
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
                {__('Back', 'gutenverse-temes-builder')}
            </div>
            <div onClick={() => updateProgress('done', 1)} className='button-next'>{__('Next', 'gutenverse-temes-builder')}</div>
        </div>
    </div>
}

const WizardPage = () => {
    const [progress, setProgress] = useState('installPlugin');
    const [themeData, setThemeData] = useState(null);
    const [templateList, setTemplateList] = useState(null);
    const [progressCount, setProgressCount] = useState(0);
    const [action, setAction] = useState('install');

    useEffect(() => {
        // getThemeData(null, response => {
        //     const themeDataRes = response;
        //     setThemeData(themeDataRes?.other)
        // });

        // getTemplateList(response => {
        //     const templates = response?.data?.filter(template => template?.template_type === 'custom_template');
        //     setTemplateList(templates)
        // });
    }, []);

    const updateProgress = (progress, inc) => {
        setProgress(progress);
        setProgressCount(progressCount + inc);
    }

    const content = () => {
        switch (progress) {
            case 'done':
                const { gtbAssetURL } = window['GutenverseDashboard'];

                return <div className='finalizing'>
                    <div className='image-wrapper'>
                        <img className='image-done' src={gtbAssetURL + '/img/final.png'} />
                    </div>
                    <div className='final-detail'>
                        <h3 className='final-title'>{__('Congratulations All Set 🤩', 'gutenverse-themes-builder')}</h3>
                        <p className='final-desc'>{__('Gutenverse is a powerful and lightweight Gutenberg blocks and page builder plugin for WordPress Site Editor.', 'gutenverse-themes-builder')}</p>
                        <div onClick={() => {
                            window.location.href = window['GutenThemeConfig']['dashboardPage']
                        }} className='button-visit'>{__('Visit Dashboard', 'gutenverse-temes-builder')}</div>
                    </div>
                </div>;
            case 'importTemplate':
                return <ImportTemplates updateProgress={updateProgress} />;
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
                    <h3 className='progress-title'>Plugin Requirements</h3>
                </div>
                <div className={`progress ${progress === 'importTemplate' ? 'active' : ''} ${progressCount >= 1 ? 'done' : ''}`}>
                    <p className='number'>2</p>
                    <h3 className='progress-title'>Assign Templates</h3>
                </div>
                <div className={`progress ${progress === 'done' ? 'active' : ''} ${progressCount >= 2 ? 'done' : ''}`}>
                    <p className='number'>3</p>
                    <h3 className='progress-title'>Finalizing</h3>
                </div>
            </div>
            <div className='wizard-body'>
                {content()}
            </div>
        </div>
    </div>;
}

export default WizardPage;