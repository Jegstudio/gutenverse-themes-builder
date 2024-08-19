import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { getTemplateList, updateOtherData, getThemeData } from '../../../data/api-fetch';
import ContentWrapper from './content-wrapper';
import { Select } from 'gutenverse-core/components';
import { addQueryArgs } from '@wordpress/url';
import { CloseIcon } from '../data/icons';

// ----------------------------------------
// vvv Move to Theme
// ----------------------------------------

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

const InstallPlugin = ({action, setAction, themeData, updateProgress}) => {
    const [installing, setInstalling] = useState({show: true, message: 'Preparing...', progress: '1/4'})
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

    const onInstall = () => {
        setAction('loading');
        setInstalling({show: true, message: 'Installing Plugins...', progress: '2/4'});
        setTimeout(() => {
            setAction('done');
            setInstalling({show: true, message: 'Installing Complete', progress: '4/4'});
        }, 4000);
    }

    const pluginActions = () => {
        switch (action) {
            case 'done':
                return <>
                    <div className='button-done'>{__('Installed & Activated', 'gutenverse-temes-builder')}</div>
                    <div onClick={() => updateProgress('importTemplate', 1)} className='button-next'>{__('Next', 'gutenverse-temes-builder')}</div>
                </>;
            case 'loading':
                return <>
                    <ImportLoading message={installing?.message} progress={installing?.progress} />
                </>;
            case 'install':
            default:
                return <>
                    <div onClick={() => updateProgress('importTemplate', 1)} className='button-skip'>{__('Skip', 'gutenverse-temes-builder')}</div>
                    <div onClick={() => onInstall()} className='button-install'>{__('Install Required Plugins', 'gutenverse-temes-builder')}</div>
                </>;
        }
    }

    return <div className='plugin-install'>
        <h1 className='content-title'>{__('Install Required Plugins', 'gutenverse-temes-builder')}</h1>
        <p className='content-desc'>{__('To unlock the full range of theme features, please install and activation of the necessary plugins. Your enhanced user experience awaits!', 'gutenverse-themes-builder')}</p>
        <div className='plugin-list'>
            {themeData?.plugins?.map(plugin => {
                return <div className='plugin-data'>
                    <div className='logo'></div>
                    <div className='plugin-detail'>
                        <h3 className='plugin-title'>{boldWord(plugin?.label, 'Gutenverse')}</h3>
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

const ImportTemplates = ({templateList,updateProgress}) => {
    const [selected, setSelected] = useState(false);
    const [installing, setInstalling] = useState({show: true, message: 'Preparing...', progress: '1/4'})

    const importingTemplate = () => {
        setInstalling({show: true, message: 'Installing Templates...', progress: '2/4'});
        setTimeout(() => {
            setAction('done');
            setInstalling({show: true, message: 'Installing Complete', progress: '4/4'});
        }, 4000);
    };

    return <div className='template-install'>
        {selected && <div className='install-popup-wrapper'>
            <div className='install-popup'>
                <div className='popup-header'>
                    <h3>{__('Installing Progress', 'gutenverse-themes-builder')}</h3>
                    <div onClick={() => setSelected(false)}>
                        <CloseIcon />
                    </div>
                </div>
                <div className='popup-body'></div>
                <div className='popup-footer'>
                    <ImportLoading message={installing?.message} progress={installing?.progress} />
                </div>
            </div>
        </div>}
        <div className='template-title'>
            <h1 className='content-title'>{__('Import Prebuilt Demos', 'gutenverse-temes-builder')}</h1>
            <div className='button-import-all' onClick={() => setSelected('all')}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.00033 13.3327C3.63366 13.3327 3.31966 13.202 3.05833 12.9407C2.79699 12.6793 2.66655 12.3656 2.66699 11.9993V9.99935H4.00033V11.9993H12.0003V9.99935H13.3337V11.9993C13.3337 12.366 13.203 12.68 12.9417 12.9413C12.6803 13.2027 12.3665 13.3331 12.0003 13.3327H4.00033ZM8.00033 10.666L4.66699 7.33268L5.60033 6.36602L7.33366 8.09935V2.66602H8.66699V8.09935L10.4003 6.36602L11.3337 7.33268L8.00033 10.666Z" fill="white"/>
                </svg>
                {__('Import All Demos', 'gutenverse-temes-builder')}
            </div>
        </div>
        <div className='template-list'>
            {templateList?.map(template => {
                return <div className='template-page'>
                    <div className='template-page-desc'>
                        <h3>{template?.name}</h3>
                        <div className='buttons'>
                            <div className='button-import-page' onClick={() => setSelected(template?.name)}>{__('Import Page', 'gutenverse-themes-builder')}</div>
                            <div className='button-view-demo'>{__('View Demo', 'gutenverse-themes-builder')}</div>
                        </div>
                    </div>
                </div>
            })}
        </div>
        <div className='template-actions'>
            <div onClick={() => updateProgress('installPlugin', -1)} className='button-back'>
                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 5.1C15.3314 5.1 15.6 4.83137 15.6 4.5C15.6 4.16863 15.3314 3.9 15 3.9V5.1ZM0.575736 4.07574C0.341421 4.31005 0.341421 4.68995 0.575736 4.92426L4.39411 8.74264C4.62843 8.97696 5.00833 8.97696 5.24264 8.74264C5.47696 8.50833 5.47696 8.12843 5.24264 7.89411L1.84853 4.5L5.24264 1.10589C5.47696 0.871573 5.47696 0.491674 5.24264 0.257359C5.00833 0.0230446 4.62843 0.0230446 4.39411 0.257359L0.575736 4.07574ZM15 3.9L1 3.9V5.1L15 5.1V3.9Z" fill="#99A2A9"/>
                </svg>
                {__('Back', 'gutenverse-temes-builder')}
            </div>
            <div onClick={() => updateProgress('done', 1)} className='button-next'>{__('Next', 'gutenverse-temes-builder')}</div>
        </div>
    </div>
}

const ContentPreview = () => {
    const [progress, setProgress] = useState('installPlugin');
    const [themeData, setThemeData] = useState(null);
    const [templateList, setTemplateList] = useState(null);
    const [progressCount, setProgressCount] = useState(0);
    const [action, setAction] = useState('install');

    useEffect(() => {
        getThemeData(null, response => {
            const themeDataRes = response;
            setThemeData(themeDataRes?.other)
        });

        getTemplateList(response => {
            const templates = response?.data?.filter(template => template?.template_type === 'custom_template');
            setTemplateList(templates)
        });
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
                        <img className='image-done' src={gtbAssetURL + '/img/final.png'}/>
                    </div>
                    <div className='final-detail'>
                        <h3 className='final-title'>{__('Congratulations All Set 🤩', 'gutenverse-themes-builder')}</h3>
                        <p className='final-desc'>{__('Gutenverse is a powerful and lightweight Gutenberg blocks and page builder plugin for WordPress Site Editor.', 'gutenverse-themes-builder')}</p>
                        <div onClick={() => {}} className='button-visit'>{__('Visit Dashboard', 'gutenverse-temes-builder')}</div>
                    </div>
                </div>;
            case 'importTemplate':
                return <ImportTemplates templateList={templateList} updateProgress={updateProgress}/>;
            case 'installPlugin':
            default:
                return <InstallPlugin themeData={themeData} updateProgress={updateProgress} action={action} setAction={setAction}/>;
        }
    }

    return <div >
        <h3>Dashboard Preview</h3>
        <div className='theme-wizard-preview'>
            <div className='wizard-header'>
                <div className={`progress ${progress === 'installPlugin' ? 'active' :''} ${progressCount >= 0 ? 'done' : ''}`}>
                    <p className='number'>1</p>
                    <h3 className='progress-title'>Plugin Requirements</h3>
                </div>
                <div className={`progress ${progress === 'importTemplate' ? 'active' :''} ${progressCount >= 1 ? 'done' : ''}`}>
                    <p className='number'>2</p>
                    <h3 className='progress-title'>Assign Templates</h3>
                </div>
                <div className={`progress ${progress === 'done' ? 'active' :''} ${progressCount >= 2 ? 'done' : ''}`}>
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

// ----------------------------------------
// ^^^ Move to Theme
// ----------------------------------------

const MediaSelect = ({updateThumbnailData}) => {
    const [thumbnailFrame, setThumbnailFrame] = useState(null);

    useEffect(() => {
        const firstFrame = wp?.media({
            title: 'Select or Upload Media',
            button: {
                text: 'Select as Thumbnail'
            },
            library: {
                type: ['image/jpg', 'image/jpeg', , 'image/webp']
            },
            multiple: false
        });

        setThumbnailFrame(firstFrame);
    }, []);

    useEffect(() => {
        if (thumbnailFrame) {
            thumbnailFrame.on('select', function () {
                const attachment = thumbnailFrame.state().get('selection').first().toJSON();
                updateThumbnailData({
                    id: attachment?.id,
                    filename: attachment?.filename,
                    url: attachment?.url,
                });
            });
        }
    }, [thumbnailFrame]);

    const selectItem = (frame) => {
        if (frame) {
            frame.open();
            return;
        }
    };

    return <button onClick={() => selectItem(thumbnailFrame)}>{__('Choose Image', 'gutenverse-themes-builder')}</button>;
}

const ManageDashbaord = () => {
    const [dashboardData, setDashboardData] = useState({});

    useEffect(() => {
        getThemeData(null, response => {
            const themeDataRes = response;

            getTemplateList(response => {
                const templateList = response?.data?.filter(template => template?.template_type === 'custom_template');

                setDashboardData({
                    ...dashboardData,
                    ...themeDataRes?.other?.dashboard,
                    templates: themeDataRes?.other?.dashboard?.templates ? themeDataRes?.other?.dashboard?.templates : templateList
                })
            });
        });
    }, []);

    const updateData = (key, value) => {
        setDashboardData({
            ...dashboardData,
            [key]: value
        })
    }

    const updateDashboardData = () => {
        updateOtherData({
            key: 'dashboard',
            data: {...dashboardData}
        });
    };

    console.log(dashboardData);

    return (
        <ContentWrapper
            title={__('Manage Dashboard', 'gutenverse-themes-builder')}
            description={__('This is a place to manage your theme Dashboard.', 'gutenverse-themes-builder')}
            headingButton={true}
            headingButtons={[
                {
                    buttonText: __('Save', 'gutenverse-themes-builder'),
                    buttonEvent: updateDashboardData,
                    buttonIcon: false,
                    buttonLoading: false
                }
            ]}
        >
            <ContentPreview />
            <div className='manage-dashboard'>
                <p>{__('Select your dashboard mode:', 'gutenverse-themes-builder')}</p>
                <div>
                    <Select
                        value={dashboardData?.mode}
                        options={[
                            { value: 'default', label: 'Default Dashboard' },
                            { value: 'themeforest', label: 'Themeforest Dashboard' },
                        ]}
                        onChange={value => updateData('mode', value)}
                    />
                    {dashboardData?.mode?.value === 'themeforest' && <>
                        <div>
                            <h3>{__('Your Theme Logo', 'gutenverse-themes-builder')}</h3>
                            <MediaSelect updateThumbnailData={value => updateData('logo', value)} />
                            {dashboardData?.logo && <div className='image-wrapper'>
                                <img src={dashboardData?.logo?.url}/>
                            </div>}
                        </div>
                        <br/><br/>
                        <div>
                            <h3>{__('Importable Custom Template', 'gutenverse-themes-builder')}</h3>
                            {dashboardData?.templates && dashboardData?.templates?.map((template, index) => {
                                const updateTemplateData = (index, key, value) => {
                                    let templateArr = dashboardData?.templates ? [...dashboardData?.templates] : [];

                                    templateArr[index] = {
                                        ...templateArr[index],
                                        [key]: value,
                                    }

                                    updateData('templates', [...templateArr]);
                                }

                                return template?.template_type === 'custom_template' && <div className="template-import">
                                    <h3>{template?.name}</h3>
                                    <div>
                                        <label for='page_name'>
                                            {__('Page Name', 'gutenverse-themes-builder')}
                                        </label>
                                        <input
                                            type='text'
                                            name='page_name'
                                            value={template?.page_name}
                                            onChange={e => updateTemplateData(index, 'page_name', e?.target?.value)}    
                                        />
                                    </div>
                                    <div>
                                        <label for='exclude'>
                                            {__('Exclude this Template?', 'gutenverse-themes-builder')}
                                        </label>
                                        <input
                                            type='checkbox'
                                            name='exclude'
                                            checked={template?.exclude}
                                            onChange={e => updateTemplateData(index, 'exclude', e?.target?.checked)}    
                                        />
                                    </div>
                                    <MediaSelect updateThumbnailData={value => updateTemplateData(index, 'thumbnail', value)} />
                                    {template?.thumbnail && <div className='image-wrapper'>
                                        <img src={template?.thumbnail?.url}/>
                                    </div>}
                                </div>;  
                            })}
                        </div>
                    </>}
                </div>
            </div>
        </ContentWrapper>
    );
};

export default ManageDashbaord;