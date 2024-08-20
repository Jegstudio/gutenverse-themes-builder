import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { getTemplateList, updateOtherData, getThemeData } from '../../../data/api-fetch';
import ContentWrapper from './content-wrapper';
import { Select } from 'gutenverse-core/components';
import { addQueryArgs } from '@wordpress/url';
import { CloseIcon } from '../data/icons';

// ----------------------------------------
// vvv Move to Theme
// ----------------------------------------

// const ImportLoading = (props) => {
//     let progress = '0%';
//     const width = () => {
//         switch (props?.progress) {
//             case '1/4':
//                 progress = '25%';
//                 return 'twenty-five';
//             case '2/4':
//                 progress = '50%';
//                 return 'fifty';
//             case '3/4':
//                 progress = '75%';
//                 return 'seventy-five';
//             case '4/4':
//                 progress = '100%';
//                 return 'hundred';
//             default:
//                 progress = '0%';
//                 return 'zero';
//         }
//     };

//     width();

//     return <div className="installing-notice">
//         <div className="installing-notice-container">
//             <div className="importing-notice">
//                 <div className="notice-inner">
//                     <span>{props?.message}</span>
//                     <span>{progress}</span>
//                 </div>
//                 <div className="bar-progress-container">
//                     <div className={'notice-bar-progress ' + `${width()}-percent`} />
//                 </div>
//             </div>
//         </div>
//     </div>;
// };

// const InstallPlugin = ({action, setAction, themeData, updateProgress}) => {
//     const [installing, setInstalling] = useState({show: true, message: 'Preparing...', progress: '1/4'})
//     const boldWord = (str, word) => {
//         const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//         const regex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
//         const parts = str.split(regex);
//         const matches = str.match(regex);

//         return parts.map((part, index) => (
//             <React.Fragment key={index}>
//                 {part}
//                 {index < matches?.length ? <span className='gutenverse'>{matches[index]}</span> : null}
//             </React.Fragment>
//         ));
//     };

//     const onInstall = () => {
//         setAction('loading');
//         setInstalling({show: true, message: 'Installing Plugins...', progress: '2/4'});
//         setTimeout(() => {
//             setAction('done');
//             setInstalling({show: true, message: 'Installing Complete', progress: '4/4'});
//         }, 4000);
//     }

//     const pluginActions = () => {
//         switch (action) {
//             case 'done':
//                 return <>
//                     <div className='button-done'>{__('Installed & Activated', 'gutenverse-temes-builder')}</div>
//                     <div onClick={() => updateProgress('importTemplate', 1)} className='button-next'>{__('Next', 'gutenverse-temes-builder')}</div>
//                 </>;
//             case 'loading':
//                 return <>
//                     <ImportLoading message={installing?.message} progress={installing?.progress} />
//                 </>;
//             case 'install':
//             default:
//                 return <>
//                     <div onClick={() => updateProgress('importTemplate', 1)} className='button-skip'>{__('Skip', 'gutenverse-temes-builder')}</div>
//                     <div onClick={() => onInstall()} className='button-install'>{__('Install Required Plugins', 'gutenverse-temes-builder')}</div>
//                 </>;
//         }
//     }

//     return <div className='plugin-install'>
//         <h1 className='content-title'>{__('Install Required Plugins', 'gutenverse-temes-builder')}</h1>
//         <p className='content-desc'>{__('To unlock the full range of theme features, please install and activation of the necessary plugins. Your enhanced user experience awaits!', 'gutenverse-themes-builder')}</p>
//         <div className='plugin-list'>
//             {themeData?.plugins?.map(plugin => {
//                 return <div className='plugin-data'>
//                     <div className='logo'></div>
//                     <div className='plugin-detail'>
//                         <h3 className='plugin-title'>{boldWord(plugin?.label, 'Gutenverse')}</h3>
//                         <p className='plugin-desc'>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius risus dolor, vitae ornare metus porta ac. Nulla dignissim velit tellus, sed aliquam est mattis et.`}</p>
//                     </div>
//                 </div>;
//             })}
//         </div>
//         <div className='plugin-actions'>
//             {pluginActions()}
//         </div>
//     </div>
// }

const ImportTemplates = ({ templateList }) => {
    const [selected, setSelected] = useState(false);
    const [installing, setInstalling] = useState({ show: true, message: 'Preparing...', progress: '1/4' })

    const importingTemplate = () => {
        setInstalling({ show: true, message: 'Installing Templates...', progress: '2/4' });
        setTimeout(() => {
            setAction('done');
            setInstalling({ show: true, message: 'Installing Complete', progress: '4/4' });
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
                    <path d="M4.00033 13.3327C3.63366 13.3327 3.31966 13.202 3.05833 12.9407C2.79699 12.6793 2.66655 12.3656 2.66699 11.9993V9.99935H4.00033V11.9993H12.0003V9.99935H13.3337V11.9993C13.3337 12.366 13.203 12.68 12.9417 12.9413C12.6803 13.2027 12.3665 13.3331 12.0003 13.3327H4.00033ZM8.00033 10.666L4.66699 7.33268L5.60033 6.36602L7.33366 8.09935V2.66602H8.66699V8.09935L10.4003 6.36602L11.3337 7.33268L8.00033 10.666Z" fill="white" />
                </svg>
                {__('Import All Demos', 'gutenverse-temes-builder')}
            </div>
        </div>
        <div className='template-list'>
            {templateList?.map(template => {
                return <div className='template-page'>
                    <img src={template?.thumb} />
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
        </div>
    </div>
}

// const ContentPreview = () => {
//     const [progress, setProgress] = useState('installPlugin');
//     const [themeData, setThemeData] = useState(null);
//     const [templateList, setTemplateList] = useState(null);
//     const [progressCount, setProgressCount] = useState(0);
//     const [action, setAction] = useState('install');

//     useEffect(() => {
//         getThemeData(null, response => {
//             const themeDataRes = response;
//             setThemeData(themeDataRes?.other)
//         });

//         getTemplateList(response => {
//             const templates = response?.data?.filter(template => template?.template_type === 'custom_template');
//             setTemplateList(templates)
//         });
//     }, []);

//     const updateProgress = (progress, inc) => {
//         setProgress(progress);
//         setProgressCount(progressCount + inc);
//     }

//     const content = () => {
//         switch (progress) {
//             case 'done':
//                 const { gtbAssetURL } = window['GutenverseDashboard'];

//                 return <div className='finalizing'>
//                     <div className='image-wrapper'>
//                         <img className='image-done' src={gtbAssetURL + '/img/final.png'}/>
//                     </div>
//                     <div className='final-detail'>
//                         <h3 className='final-title'>{__('Congratulations All Set 🤩', 'gutenverse-themes-builder')}</h3>
//                         <p className='final-desc'>{__('Gutenverse is a powerful and lightweight Gutenberg blocks and page builder plugin for WordPress Site Editor.', 'gutenverse-themes-builder')}</p>
//                         <div onClick={() => {}} className='button-visit'>{__('Visit Dashboard', 'gutenverse-temes-builder')}</div>
//                     </div>
//                 </div>;
//             case 'importTemplate':
//                 return <ImportTemplates templateList={templateList} updateProgress={updateProgress}/>;
//             case 'installPlugin':
//             default:
//                 return <InstallPlugin themeData={themeData} updateProgress={updateProgress} action={action} setAction={setAction}/>;
//         }
//     }

//     return <div >
//         <h3>Dashboard Preview</h3>
//         <div className='theme-wizard-preview'>
//             <div className='wizard-header'>
//                 <div className={`progress ${progress === 'installPlugin' ? 'active' :''} ${progressCount >= 0 ? 'done' : ''}`}>
//                     <p className='number'>1</p>
//                     <h3 className='progress-title'>Plugin Requirements</h3>
//                 </div>
//                 <div className={`progress ${progress === 'importTemplate' ? 'active' :''} ${progressCount >= 1 ? 'done' : ''}`}>
//                     <p className='number'>2</p>
//                     <h3 className='progress-title'>Assign Templates</h3>
//                 </div>
//                 <div className={`progress ${progress === 'done' ? 'active' :''} ${progressCount >= 2 ? 'done' : ''}`}>
//                     <p className='number'>3</p>
//                     <h3 className='progress-title'>Finalizing</h3>
//                 </div>
//             </div>
//             <div className='wizard-body'>
//                 {content()}
//             </div>
//         </div>
//     </div>;
// }

const Wave = () => {
    return <div className='wave'>
        <svg width="145" height="138" viewBox="0 0 145 138" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="110" cy="28" r="110" fill="#F8FBFF" />
            <circle cx="110" cy="28" r="64" fill="#F2F8FF" />
        </svg>
    </div>;
}

const PluginIcon = () => {
    return <svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i_19089_8048)">
            <path d="M5.26562 2.77265C5.26562 1.24135 6.46255 0 7.93906 0H29.3265C30.8029 0 32 1.24135 32 2.77265V16.6359C32 18.1672 30.8029 19.4085 29.3265 19.4085H7.93906C6.46255 19.4085 5.26562 18.1672 5.26562 16.6359V2.77265Z" fill="url(#paint0_linear_19089_8048)" />
        </g>
        <g filter="url(#filter1_bi_19089_8048)">
            <mask id="path-2-inside-1_19089_8048" fill="white">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.09908C0 6.60755 1.19693 5.39844 2.67343 5.39844H24.0609C25.5374 5.39844 26.7343 6.60755 26.7343 8.09908V21.6023C26.7343 23.0938 25.5374 24.3029 24.0609 24.3029H24.0603V28.0736C24.0603 28.6749 23.3404 28.9763 22.9194 28.551L18.7141 24.3029H2.67343C1.19693 24.3029 0 23.0938 0 21.6023V8.09908Z" />
            </mask>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.09908C0 6.60755 1.19693 5.39844 2.67343 5.39844H24.0609C25.5374 5.39844 26.7343 6.60755 26.7343 8.09908V21.6023C26.7343 23.0938 25.5374 24.3029 24.0609 24.3029H24.0603V28.0736C24.0603 28.6749 23.3404 28.9763 22.9194 28.551L18.7141 24.3029H2.67343C1.19693 24.3029 0 23.0938 0 21.6023V8.09908Z" fill="url(#paint1_linear_19089_8048)" fill-opacity="0.5" />
            <path d="M24.0603 24.3029V24.0029H23.7603V24.3029H24.0603ZM22.9194 28.551L22.7062 28.762L22.7062 28.762L22.9194 28.551ZM18.7141 24.3029L18.9273 24.0919L18.8393 24.0029H18.7141V24.3029ZM2.67343 5.09844C1.02839 5.09844 -0.3 6.44473 -0.3 8.09908H0.3C0.3 6.77036 1.36547 5.69844 2.67343 5.69844V5.09844ZM24.0609 5.09844H2.67343V5.69844H24.0609V5.09844ZM27.0343 8.09908C27.0343 6.44473 25.7059 5.09844 24.0609 5.09844V5.69844C25.3689 5.69844 26.4343 6.77036 26.4343 8.09908H27.0343ZM27.0343 21.6023V8.09908H26.4343V21.6023H27.0343ZM24.0609 24.6029C25.7059 24.6029 27.0343 23.2566 27.0343 21.6023H26.4343C26.4343 22.931 25.3689 24.0029 24.0609 24.0029V24.6029ZM24.0603 24.6029H24.0609V24.0029H24.0603V24.6029ZM24.3603 28.0736V24.3029H23.7603V28.0736H24.3603ZM22.7062 28.762C23.3203 29.3825 24.3603 28.9363 24.3603 28.0736H23.7603C23.7603 28.4134 23.3605 28.5702 23.1326 28.3399L22.7062 28.762ZM18.5009 24.514L22.7062 28.762L23.1326 28.3399L18.9273 24.0919L18.5009 24.514ZM2.67343 24.6029H18.7141V24.0029H2.67343V24.6029ZM-0.3 21.6023C-0.3 23.2566 1.02839 24.6029 2.67343 24.6029V24.0029C1.36547 24.0029 0.3 22.931 0.3 21.6023H-0.3ZM-0.3 8.09908V21.6023H0.3V8.09908H-0.3Z" fill="url(#paint2_linear_19089_8048)" mask="url(#path-2-inside-1_19089_8048)" />
        </g>
        <rect x="4.01807" y="8.9707" width="18.5345" height="2.00605" rx="1.00302" fill="url(#paint3_linear_19089_8048)" />
        <rect x="4.01807" y="13.6484" width="18.5345" height="2.00605" rx="1.00302" fill="url(#paint4_linear_19089_8048)" />
        <rect x="4.01807" y="18.334" width="10.5911" height="2.00605" rx="1.00302" fill="url(#paint5_linear_19089_8048)" />
        <defs>
            <filter id="filter0_i_19089_8048" x="5.26562" y="0" width="26.7344" height="19.4082" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="4.62178" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.7 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_19089_8048" />
            </filter>
            <filter id="filter1_bi_19089_8048" x="-13.8653" y="-8.4669" width="54.4651" height="51.0822" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="6.93267" />
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_19089_8048" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_19089_8048" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="2.31089" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.923889 0 0 0 0 0.908333 0 0 0 0 1 0 0 0 0.4 0" />
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_19089_8048" />
            </filter>
            <linearGradient id="paint0_linear_19089_8048" x1="6.8691" y1="1.3451e-07" x2="27.5903" y2="19.8508" gradientUnits="userSpaceOnUse">
                <stop stop-color="#3B57F7" />
                <stop offset="1" stop-color="#3EBCFB" />
            </linearGradient>
            <linearGradient id="paint1_linear_19089_8048" x1="26.736" y1="5.33587" x2="-0.184125" y2="24.5483" gradientUnits="userSpaceOnUse">
                <stop stop-color="white" />
                <stop offset="1" stop-color="#C2D2FF" />
            </linearGradient>
            <linearGradient id="paint2_linear_19089_8048" x1="13.3672" y1="5.39844" x2="13" y2="24.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="white" />
                <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="paint3_linear_19089_8048" x1="4.01807" y1="9.97373" x2="22.5525" y2="9.97373" gradientUnits="userSpaceOnUse">
                <stop stop-color="white" />
                <stop offset="1" stop-color="#E5EBFF" />
            </linearGradient>
            <linearGradient id="paint4_linear_19089_8048" x1="4.01807" y1="14.6515" x2="22.5525" y2="14.6515" gradientUnits="userSpaceOnUse">
                <stop stop-color="white" />
                <stop offset="1" stop-color="#E5EBFF" />
            </linearGradient>
            <linearGradient id="paint5_linear_19089_8048" x1="4.01807" y1="19.337" x2="14.6092" y2="19.337" gradientUnits="userSpaceOnUse">
                <stop stop-color="white" />
                <stop offset="1" stop-color="#E5EBFF" />
            </linearGradient>
        </defs>
    </svg>;
}

const DemoIcon = () => {
    return <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i_19097_8086)">
            <path d="M32.0006 13.3338C32.0006 20.6979 26.0309 26.6676 18.6668 26.6676C11.3028 26.6676 5.33301 20.6979 5.33301 13.3338C5.33301 5.96975 11.3028 0 18.6668 0C26.0309 0 32.0006 5.96975 32.0006 13.3338Z" fill="url(#paint0_linear_19097_8086)" />
        </g>
        <g filter="url(#filter1_i_19097_8086)">
            <g filter="url(#filter2_bi_19097_8086)">
                <path d="M26.6681 18.6678C26.6681 26.0319 20.6984 32.0016 13.3343 32.0016C5.97024 32.0016 0.000488281 26.0319 0.000488281 18.6678C0.000488281 11.3037 5.97024 5.33398 13.3343 5.33398C20.6984 5.33398 26.6681 11.3037 26.6681 18.6678Z" fill="url(#paint1_linear_19097_8086)" fill-opacity="0.4" />
                <path d="M26.5181 18.6678C26.5181 25.949 20.6155 31.8516 13.3343 31.8516C6.05308 31.8516 0.150488 25.949 0.150488 18.6678C0.150488 11.3866 6.05308 5.48398 13.3343 5.48398C20.6155 5.48398 26.5181 11.3866 26.5181 18.6678Z" stroke="url(#paint2_linear_19097_8086)" stroke-width="0.3" />
            </g>
        </g>
        <g filter="url(#filter3_ii_19097_8086)">
            <path d="M20.0687 18.4423C20.0687 17.751 19.4634 17.1906 18.7169 17.1906H14.8116V13.2854C14.8116 12.5388 14.2512 11.9336 13.56 11.9336C12.8687 11.9336 12.3083 12.5388 12.3083 13.2854V17.1906H8.40308C7.6565 17.1906 7.05127 17.751 7.05127 18.4423C7.05127 19.1335 7.6565 19.6939 8.40308 19.6939H12.3083V23.5992C12.3083 24.3458 12.8687 24.951 13.56 24.951C14.2512 24.951 14.8116 24.3458 14.8116 23.5992V19.6939H18.7169C19.4634 19.6939 20.0687 19.1335 20.0687 18.4423Z" fill="url(#paint3_linear_19097_8086)" />
        </g>
        <defs>
            <filter id="filter0_i_19097_8086" x="5.33301" y="0" width="26.6675" height="26.668" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="2.56709" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_19097_8086" />
            </filter>
            <filter id="filter1_i_19097_8086" x="-0.999512" y="5.33398" width="27.6675" height="27.668" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="-1" dy="1" />
                <feGaussianBlur stdDeviation="4" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_19097_8086" />
            </filter>
            <filter id="filter2_bi_19097_8086" x="-14.9995" y="-9.66602" width="56.6675" height="56.668" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="7.5" />
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_19097_8086" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_19097_8086" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="1.28354" />
                <feGaussianBlur stdDeviation="2.5" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.608972 0 0 0 0 0.529053 0 0 0 0 1 0 0 0 0.4 0" />
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_19097_8086" />
            </filter>
            <filter id="filter3_ii_19097_8086" x="7.05127" y="11.9336" width="13.0176" height="15.5847" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="1.28354" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_19097_8086" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="2.56709" />
                <feGaussianBlur stdDeviation="2.56709" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
                <feBlend mode="normal" in2="effect1_innerShadow_19097_8086" result="effect2_innerShadow_19097_8086" />
            </filter>
            <linearGradient id="paint0_linear_19097_8086" x1="6.93248" y1="1.84819e-07" x2="33.6489" y2="18.5807" gradientUnits="userSpaceOnUse">
                <stop stop-color="#3B57F7" />
                <stop offset="1" stop-color="#3EBCFB" />
            </linearGradient>
            <linearGradient id="paint1_linear_19097_8086" x1="12.204" y1="5.96642" x2="9.18957" y2="33.8448" gradientUnits="userSpaceOnUse">
                <stop stop-color="white" stop-opacity="0.61" />
                <stop offset="0.997071" stop-color="#C2D2FF" />
            </linearGradient>
            <linearGradient id="paint2_linear_19097_8086" x1="13.3343" y1="5.33398" x2="13.3343" y2="32.0016" gradientUnits="userSpaceOnUse">
                <stop stop-color="white" />
                <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="paint3_linear_19097_8086" x1="7.81904" y1="24.951" x2="17.6948" y2="11.9336" gradientUnits="userSpaceOnUse">
                <stop stop-color="white" />
                <stop offset="1" stop-color="#D8CFFF" />
            </linearGradient>
        </defs>
    </svg>;
}

const SupportIcon = () => {
    return <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i_19089_8073)">
            <path d="M19.0411 23.1739C26.1982 23.1739 32.0002 17.9862 32.0002 11.5869C32.0002 5.18764 26.1982 0 19.0411 0C11.884 0 6.08203 5.18764 6.08203 11.5869C6.08203 14.1025 6.9786 16.4308 8.50162 18.3304L6.08203 24.6222L16.1613 22.8867C17.0875 23.0747 18.0513 23.1739 19.0411 23.1739Z" fill="url(#paint0_linear_19089_8073)" />
        </g>
        <g filter="url(#filter1_i_19089_8073)">
            <g filter="url(#filter2_bi_19089_8073)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9591 27.6581C5.80197 27.6581 0 22.4706 0 16.0713C0 9.67202 5.80197 4.48438 12.9591 4.48438C20.1162 4.48438 25.9181 9.67202 25.9181 16.0713C25.9181 18.5869 25.0216 20.9152 23.4985 22.8148L25.2862 27.4634C25.5648 28.1878 24.948 28.9395 24.1832 28.8079L15.8389 27.3711C14.9127 27.559 13.9488 27.6581 12.9591 27.6581ZM14.9029 16.7955C14.9029 17.869 14.0326 18.7393 12.9591 18.7393C11.8855 18.7393 11.0152 17.869 11.0152 16.7955C11.0152 15.7219 11.8855 14.8516 12.9591 14.8516C14.0326 14.8516 14.9029 15.7219 14.9029 16.7955ZM8.42339 16.7955C8.42339 17.5112 7.84318 18.0914 7.12749 18.0914C6.41179 18.0914 5.83158 17.5112 5.83158 16.7955C5.83158 16.0798 6.41179 15.4996 7.12749 15.4996C7.84318 15.4996 8.42339 16.0798 8.42339 16.7955ZM20.0865 16.7955C20.0865 17.5112 19.5063 18.0914 18.7906 18.0914C18.0749 18.0914 17.4947 17.5112 17.4947 16.7955C17.4947 16.0798 18.0749 15.4996 18.7906 15.4996C19.5063 15.4996 20.0865 16.0798 20.0865 16.7955Z" fill="url(#paint1_linear_19089_8073)" fill-opacity="0.4" />
                <path d="M23.3815 22.721L23.3276 22.7882L23.3585 22.8686L25.1462 27.5173C25.383 28.133 24.8587 28.772 24.2086 28.66L15.8643 27.2232L15.8366 27.2185L15.809 27.2241C14.8927 27.41 13.9388 27.5081 12.9591 27.5081C5.86858 27.5081 0.15 22.3724 0.15 16.0713C0.15 9.77021 5.86858 4.63438 12.9591 4.63438C20.0495 4.63438 25.7681 9.77021 25.7681 16.0713C25.7681 18.5502 24.8849 20.8459 23.3815 22.721ZM12.9591 18.8893C14.1155 18.8893 15.0529 17.9519 15.0529 16.7955C15.0529 15.6391 14.1155 14.7016 12.9591 14.7016C11.8027 14.7016 10.8652 15.6391 10.8652 16.7955C10.8652 17.9519 11.8027 18.8893 12.9591 18.8893ZM7.12749 18.2414C7.92602 18.2414 8.57339 17.594 8.57339 16.7955C8.57339 15.9969 7.92602 15.3496 7.12749 15.3496C6.32895 15.3496 5.68158 15.9969 5.68158 16.7955C5.68158 17.594 6.32895 18.2414 7.12749 18.2414ZM18.7906 18.2414C19.5892 18.2414 20.2365 17.594 20.2365 16.7955C20.2365 15.9969 19.5892 15.3496 18.7906 15.3496C17.9921 15.3496 17.3447 15.9969 17.3447 16.7955C17.3447 17.594 17.9921 18.2414 18.7906 18.2414Z" stroke="url(#paint2_linear_19089_8073)" stroke-width="0.3" />
            </g>
        </g>
        <defs>
            <filter id="filter0_i_19089_8073" x="6.08203" y="0" width="25.918" height="24.6221" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="4.62178" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.7 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_19089_8073" />
            </filter>
            <filter id="filter1_i_19089_8073" x="0" y="4.48438" width="25.918" height="24.3389" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="4" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_19089_8073" />
            </filter>
            <filter id="filter2_bi_19089_8073" x="-15" y="-10.5156" width="55.918" height="54.3389" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="7.5" />
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_19089_8073" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_19089_8073" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="2" />
                <feGaussianBlur stdDeviation="2.31089" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.668759 0 0 0 0 0.601058 0 0 0 0 1 0 0 0 0.4 0" />
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_19089_8073" />
            </filter>
            <linearGradient id="paint0_linear_19089_8073" x1="7.63655" y1="1.70644e-07" x2="32.7187" y2="18.3623" gradientUnits="userSpaceOnUse">
                <stop stop-color="#3B57F7" />
                <stop offset="1" stop-color="#3EBCFB" />
            </linearGradient>
            <linearGradient id="paint1_linear_19089_8073" x1="29.7978" y1="2.28533" x2="23.5114" y2="29.2086" gradientUnits="userSpaceOnUse">
                <stop stop-color="white" stop-opacity="0.61" />
                <stop offset="0.997071" stop-color="#C2D2FF" />
            </linearGradient>
            <linearGradient id="paint2_linear_19089_8073" x1="12.9591" y1="4.48437" x2="12.9591" y2="38.3165" gradientUnits="userSpaceOnUse">
                <stop stop-color="white" />
                <stop offset="1" stop-color="#999999" />
            </linearGradient>
        </defs>
    </svg>;
}

const ContentPreview = () => {
    const [menu, setMenu] = useState('dashboard');
    const [templateList, setTemplateList] = useState(null);
    const logo = false;

    useEffect(() => {
        getTemplateList(response => {
            const templates = response?.data?.filter(template => template?.template_type === 'custom_template');
            setTemplateList(templates)
        });
    }, []);

    const content = () => {
        switch (menu) {
            case 'demo':
                return <ImportTemplates templateList={templateList} />;
            case 'dashboard':
            default:
                const { gtbAssetURL } = window['GutenverseDashboard'];
                return <div className='content-wrapper'>
                    <div className='content-left'>
                        <div className='top'>
                            <p className='description'>{__('Welcome to Finalyze Theme 👋', 'gutenverse-themes-builder')}</p>
                            <p className='version'>{__('version 1.0.0', 'gutenverse-themes-builder')}</p>
                        </div>
                        <div className='middle'>
                            <img className='background' src={gtbAssetURL + '/img/bg-dashboard-tf.png'} />
                            <div className='detail'>
                                <div className='texts'>
                                    <p className='texts-title'>{__('Thank You For Choosing Finalyze', 'gutenverse-themes-builder')}</p>
                                    <p className='texts-description'>{__('Thank you for bringing happiness to us, We really appreciate you for purchasing Finalyze Theme. Take advantage and get familiar with the features Finalyze offers and create a stunning site with ease.', 'gutenverse-themes-builder')}</p>
                                </div>
                                <div className='dancer'>
                                    <img src={gtbAssetURL + '/img/image-dancer.png'} />
                                </div>
                            </div>
                        </div>
                        <div className='bottom'>
                            <div className='content-1'>
                                <Wave />
                                <div className='content-icon'>
                                    <PluginIcon />
                                </div>
                                <p className='content-title'>{__('Plugin Requirements', 'gutenverse-themes-builder')}</p>
                                <p className='content-description'>{__('Install and activate the required plugins to unlock all theme features.', 'gutenverse-themes-builder')}</p>
                                <div className='action-button'>{__('Install Plugins', 'gutenverse-themes-builder')}</div>
                            </div>
                            <div className='content-2'>
                                <Wave />
                                <div className='content-icon'>
                                    <DemoIcon />
                                </div>
                                <p className='content-title'>{__('Install Demo', 'gutenverse-themes-builder')}</p>
                                <p className='content-description'>{__('Importing the demo and style takes only one click. It is easily customizable.', 'gutenverse-themes-builder')}</p>
                                <div className='action-button'>{__('Import Demo', 'gutenverse-themes-builder')}</div>
                            </div>
                            <div className='content-3'>
                                <Wave />
                                <div className='content-icon'>
                                    <SupportIcon />
                                </div>
                                <p className='content-title'>{__('Any Questions?', 'gutenverse-themes-builder')}</p>
                                <p className='content-description'>{__('Our support team is ready to help you with any questions or problems.', 'gutenverse-themes-builder')}</p>
                                <div className='action-button'>{__('Ask for Support', 'gutenverse-themes-builder')}</div>
                            </div>
                        </div>
                    </div>
                    <div className='content-right'>
                        <div className='top'>
                            <img className='background' src={gtbAssetURL + '/img/bg-upgrade-pro.png'} />
                            <img className='image' src={gtbAssetURL + '/img/mockup-upgrade-pro.png'} />
                            <p className='content-title'>{__('Upgrade To Gutenverse PRO', 'gutenverse-themes-builder')}</p>
                            <p className='content-description'>{__('Unlock the WordPress Editor\'s potential with Gutenverse PRO.', 'gutenverse-themes-builder')}</p>
                            <div className='action-button'>
                                {__('Upgrade To PRO', 'gutenverse-themes-builder')}
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 11L0.5 2.75L4.625 6.5L7.25 2L9.875 6.5L14 2.75L12.5 11H2ZM12.5 13.25C12.5 13.7 12.2 14 11.75 14H2.75C2.3 14 2 13.7 2 13.25V12.5H12.5V13.25Z" fill="white" />
                                </svg>
                            </div>
                        </div>
                        <div className='bottom'>
                            <p className='content-title'>{__('Join Our Newsletter', 'gutenverse-themes-builder')}</p>
                            <p className='content-description'>{__('Be the first to receive updates and stay informed about all our news', 'gutenverse-themes-builder')}</p>
                            <input type='text' placeholder={__('Your Email', 'gutenverse-themes-builder')} />
                            <div className='action-button'>{__('Subcsribe', 'gutenverse-themes-builder')}</div>
                        </div>
                    </div>
                </div>;
        }
    }

    return <div className='themeforest-dashboard'>
        <div className='dashboard-header'>
            <div className='logo'>{logo ? <img src='' /> : __('LOGO', 'gutenverse-themes-builder')}</div>
            <ul className='menu'>
                <li onClick={() => setMenu('dashboard')} className={`${menu === 'dashboard' ? 'active' : ''}`}>{__('Dashboard', 'gutenverse-themes-builder')}</li>
                <li onClick={() => setMenu('demo')} className={`${menu === 'demo' ? 'active' : ''}`}>{__('Demo', 'gutenverse-themes-builder')}</li>
            </ul>
        </div>
        <div className='dashboard-content'>
            {content()}
        </div>
    </div>
}

// ----------------------------------------
// ^^^ Move to Theme
// ----------------------------------------

const MediaSelect = ({ updateThumbnailData }) => {
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
            data: { ...dashboardData }
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
            {/* <ContentPreview /> */}
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
                                <img src={dashboardData?.logo?.url} />
                            </div>}
                        </div>
                        <br /><br />
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
                                        <img src={template?.thumbnail?.url} />
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