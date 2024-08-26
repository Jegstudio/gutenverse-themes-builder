import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { Loader } from 'react-feather';
import { ImporterModal } from './wizard-page';

const CloseIcon = ({ fill = 'inherit' }) => <svg width="12" height="12" viewBox="0 0 12 12" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M7.17593 6.00048L10.7593 2.42548C10.9162 2.26856 11.0043 2.05573 11.0043 1.83381C11.0043 1.6119 10.9162 1.39907 10.7593 1.24215C10.6023 1.08523 10.3895 0.99707 10.1676 0.99707C9.94567 0.99707 9.73285 1.08523 9.57593 1.24215L6.00093 4.82548L2.42593 1.24215C2.26901 1.08523 2.05618 0.99707 1.83426 0.99707C1.61234 0.99707 1.39951 1.08523 1.24259 1.24215C1.08567 1.39907 0.997516 1.6119 0.997516 1.83381C0.997516 2.05573 1.08567 2.26856 1.24259 2.42548L4.82593 6.00048L1.24259 9.57548C1.16449 9.65295 1.10249 9.74512 1.06018 9.84667C1.01788 9.94822 0.996094 10.0571 0.996094 10.1671C0.996094 10.2772 1.01788 10.3861 1.06018 10.4876C1.10249 10.5892 1.16449 10.6813 1.24259 10.7588C1.32006 10.8369 1.41223 10.8989 1.51378 10.9412C1.61533 10.9835 1.72425 11.0053 1.83426 11.0053C1.94427 11.0053 2.05319 10.9835 2.15474 10.9412C2.25629 10.8989 2.34846 10.8369 2.42593 10.7588L6.00093 7.17548L9.57593 10.7588C9.6534 10.8369 9.74556 10.8989 9.84711 10.9412C9.94866 10.9835 10.0576 11.0053 10.1676 11.0053C10.2776 11.0053 10.3865 10.9835 10.4881 10.9412C10.5896 10.8989 10.6818 10.8369 10.7593 10.7588C10.8374 10.6813 10.8994 10.5892 10.9417 10.4876C10.984 10.3861 11.0058 10.2772 11.0058 10.1671C11.0058 10.0571 10.984 9.94822 10.9417 9.84667C10.8994 9.74512 10.8374 9.65295 10.7593 9.57548L7.17593 6.00048Z" fill={fill} />
</svg>;

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

    const [templateList, setTemplateList] = useState(assign);
    const [importerStep, setImporterStep] = useState([
        "Creating Pages",
        "Assigning Templates",
    ]);
    const [modal, setModal] = useState(false);
    const [importerNotice, setImporterNotice] = useState('')
    const [importerCurrent, setImporterCurrent] = useState(0)
    const [importerStatus, setImporterStatus] = useState(0)
    const [done, setDone] = useState(false)

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
            }, 500);
        }, 500);
    };

    return <div className='template-install'>
        {modal && <ImporterModal
            importerStep={importerStep}
            importerNotice={importerNotice}
            importerCurrent={importerCurrent}
            importerStatus={importerStatus}
            done={done}
            close={() => { setModal(false) }}
        />}
        <div className='template-title'>
            <h1 className='content-title'>{__('Import Prebuilt Demos', 'gutenverse-temes-builder')}</h1>
            <div className='button-import-all' onClick={() => importAll()}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.00033 13.3327C3.63366 13.3327 3.31966 13.202 3.05833 12.9407C2.79699 12.6793 2.66655 12.3656 2.66699 11.9993V9.99935H4.00033V11.9993H12.0003V9.99935H13.3337V11.9993C13.3337 12.366 13.203 12.68 12.9417 12.9413C12.6803 13.2027 12.3665 13.3331 12.0003 13.3327H4.00033ZM8.00033 10.666L4.66699 7.33268L5.60033 6.36602L7.33366 8.09935V2.66602H8.66699V8.09935L10.4003 6.36602L11.3337 7.33268L8.00033 10.666Z" fill="white" />
                </svg>
                {__('Import All Pages', 'gutenverse-temes-builder')}
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

const PluginIcon = () => {
    return <svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i_19089_8048)">
            <path d="M5.26562 2.77265C5.26562 1.24135 6.46255 0 7.93906 0H29.3265C30.8029 0 32 1.24135 32 2.77265V16.6359C32 18.1672 30.8029 19.4085 29.3265 19.4085H7.93906C6.46255 19.4085 5.26562 18.1672 5.26562 16.6359V2.77265Z" fill="url(#paint0_linear_19089_8048)" />
        </g>
        <g filter="url(#filter1_bi_19089_8048)">
            <mask id="path-2-inside-1_19089_8048" fill="white">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 8.09908C0 6.60755 1.19693 5.39844 2.67343 5.39844H24.0609C25.5374 5.39844 26.7343 6.60755 26.7343 8.09908V21.6023C26.7343 23.0938 25.5374 24.3029 24.0609 24.3029H24.0603V28.0736C24.0603 28.6749 23.3404 28.9763 22.9194 28.551L18.7141 24.3029H2.67343C1.19693 24.3029 0 23.0938 0 21.6023V8.09908Z" />
            </mask>
            <path fillRule="evenodd" clipRule="evenodd" d="M0 8.09908C0 6.60755 1.19693 5.39844 2.67343 5.39844H24.0609C25.5374 5.39844 26.7343 6.60755 26.7343 8.09908V21.6023C26.7343 23.0938 25.5374 24.3029 24.0609 24.3029H24.0603V28.0736C24.0603 28.6749 23.3404 28.9763 22.9194 28.551L18.7141 24.3029H2.67343C1.19693 24.3029 0 23.0938 0 21.6023V8.09908Z" fill="url(#paint1_linear_19089_8048)" fillOpacity="0.5" />
            <path d="M24.0603 24.3029V24.0029H23.7603V24.3029H24.0603ZM22.9194 28.551L22.7062 28.762L22.7062 28.762L22.9194 28.551ZM18.7141 24.3029L18.9273 24.0919L18.8393 24.0029H18.7141V24.3029ZM2.67343 5.09844C1.02839 5.09844 -0.3 6.44473 -0.3 8.09908H0.3C0.3 6.77036 1.36547 5.69844 2.67343 5.69844V5.09844ZM24.0609 5.09844H2.67343V5.69844H24.0609V5.09844ZM27.0343 8.09908C27.0343 6.44473 25.7059 5.09844 24.0609 5.09844V5.69844C25.3689 5.69844 26.4343 6.77036 26.4343 8.09908H27.0343ZM27.0343 21.6023V8.09908H26.4343V21.6023H27.0343ZM24.0609 24.6029C25.7059 24.6029 27.0343 23.2566 27.0343 21.6023H26.4343C26.4343 22.931 25.3689 24.0029 24.0609 24.0029V24.6029ZM24.0603 24.6029H24.0609V24.0029H24.0603V24.6029ZM24.3603 28.0736V24.3029H23.7603V28.0736H24.3603ZM22.7062 28.762C23.3203 29.3825 24.3603 28.9363 24.3603 28.0736H23.7603C23.7603 28.4134 23.3605 28.5702 23.1326 28.3399L22.7062 28.762ZM18.5009 24.514L22.7062 28.762L23.1326 28.3399L18.9273 24.0919L18.5009 24.514ZM2.67343 24.6029H18.7141V24.0029H2.67343V24.6029ZM-0.3 21.6023C-0.3 23.2566 1.02839 24.6029 2.67343 24.6029V24.0029C1.36547 24.0029 0.3 22.931 0.3 21.6023H-0.3ZM-0.3 8.09908V21.6023H0.3V8.09908H-0.3Z" fill="url(#paint2_linear_19089_8048)" mask="url(#path-2-inside-1_19089_8048)" />
        </g>
        <rect x="4.01807" y="8.9707" width="18.5345" height="2.00605" rx="1.00302" fill="url(#paint3_linear_19089_8048)" />
        <rect x="4.01807" y="13.6484" width="18.5345" height="2.00605" rx="1.00302" fill="url(#paint4_linear_19089_8048)" />
        <rect x="4.01807" y="18.334" width="10.5911" height="2.00605" rx="1.00302" fill="url(#paint5_linear_19089_8048)" />
        <defs>
            <filter id="filter0_i_19089_8048" x="5.26562" y="0" width="26.7344" height="19.4082" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="4.62178" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.7 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_19089_8048" />
            </filter>
            <filter id="filter1_bi_19089_8048" x="-13.8653" y="-8.4669" width="54.4651" height="51.0822" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
                <stop stopColor="#3B57F7" />
                <stop offset="1" stopColor="#3EBCFB" />
            </linearGradient>
            <linearGradient id="paint1_linear_19089_8048" x1="26.736" y1="5.33587" x2="-0.184125" y2="24.5483" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="#C2D2FF" />
            </linearGradient>
            <linearGradient id="paint2_linear_19089_8048" x1="13.3672" y1="5.39844" x2="13" y2="24.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint3_linear_19089_8048" x1="4.01807" y1="9.97373" x2="22.5525" y2="9.97373" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="#E5EBFF" />
            </linearGradient>
            <linearGradient id="paint4_linear_19089_8048" x1="4.01807" y1="14.6515" x2="22.5525" y2="14.6515" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="#E5EBFF" />
            </linearGradient>
            <linearGradient id="paint5_linear_19089_8048" x1="4.01807" y1="19.337" x2="14.6092" y2="19.337" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="#E5EBFF" />
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
                <path d="M26.6681 18.6678C26.6681 26.0319 20.6984 32.0016 13.3343 32.0016C5.97024 32.0016 0.000488281 26.0319 0.000488281 18.6678C0.000488281 11.3037 5.97024 5.33398 13.3343 5.33398C20.6984 5.33398 26.6681 11.3037 26.6681 18.6678Z" fill="url(#paint1_linear_19097_8086)" fillOpacity="0.4" />
                <path d="M26.5181 18.6678C26.5181 25.949 20.6155 31.8516 13.3343 31.8516C6.05308 31.8516 0.150488 25.949 0.150488 18.6678C0.150488 11.3866 6.05308 5.48398 13.3343 5.48398C20.6155 5.48398 26.5181 11.3866 26.5181 18.6678Z" stroke="url(#paint2_linear_19097_8086)" strokeWidth="0.3" />
            </g>
        </g>
        <g filter="url(#filter3_ii_19097_8086)">
            <path d="M20.0687 18.4423C20.0687 17.751 19.4634 17.1906 18.7169 17.1906H14.8116V13.2854C14.8116 12.5388 14.2512 11.9336 13.56 11.9336C12.8687 11.9336 12.3083 12.5388 12.3083 13.2854V17.1906H8.40308C7.6565 17.1906 7.05127 17.751 7.05127 18.4423C7.05127 19.1335 7.6565 19.6939 8.40308 19.6939H12.3083V23.5992C12.3083 24.3458 12.8687 24.951 13.56 24.951C14.2512 24.951 14.8116 24.3458 14.8116 23.5992V19.6939H18.7169C19.4634 19.6939 20.0687 19.1335 20.0687 18.4423Z" fill="url(#paint3_linear_19097_8086)" />
        </g>
        <defs>
            <filter id="filter0_i_19097_8086" x="5.33301" y="0" width="26.6675" height="26.668" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="2.56709" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_19097_8086" />
            </filter>
            <filter id="filter1_i_19097_8086" x="-0.999512" y="5.33398" width="27.6675" height="27.668" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="-1" dy="1" />
                <feGaussianBlur stdDeviation="4" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_19097_8086" />
            </filter>
            <filter id="filter2_bi_19097_8086" x="-14.9995" y="-9.66602" width="56.6675" height="56.668" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
            <filter id="filter3_ii_19097_8086" x="7.05127" y="11.9336" width="13.0176" height="15.5847" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
                <stop stopColor="#3B57F7" />
                <stop offset="1" stopColor="#3EBCFB" />
            </linearGradient>
            <linearGradient id="paint1_linear_19097_8086" x1="12.204" y1="5.96642" x2="9.18957" y2="33.8448" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="0.61" />
                <stop offset="0.997071" stopColor="#C2D2FF" />
            </linearGradient>
            <linearGradient id="paint2_linear_19097_8086" x1="13.3343" y1="5.33398" x2="13.3343" y2="32.0016" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint3_linear_19097_8086" x1="7.81904" y1="24.951" x2="17.6948" y2="11.9336" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="#D8CFFF" />
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
                <path fillRule="evenodd" clipRule="evenodd" d="M12.9591 27.6581C5.80197 27.6581 0 22.4706 0 16.0713C0 9.67202 5.80197 4.48438 12.9591 4.48438C20.1162 4.48438 25.9181 9.67202 25.9181 16.0713C25.9181 18.5869 25.0216 20.9152 23.4985 22.8148L25.2862 27.4634C25.5648 28.1878 24.948 28.9395 24.1832 28.8079L15.8389 27.3711C14.9127 27.559 13.9488 27.6581 12.9591 27.6581ZM14.9029 16.7955C14.9029 17.869 14.0326 18.7393 12.9591 18.7393C11.8855 18.7393 11.0152 17.869 11.0152 16.7955C11.0152 15.7219 11.8855 14.8516 12.9591 14.8516C14.0326 14.8516 14.9029 15.7219 14.9029 16.7955ZM8.42339 16.7955C8.42339 17.5112 7.84318 18.0914 7.12749 18.0914C6.41179 18.0914 5.83158 17.5112 5.83158 16.7955C5.83158 16.0798 6.41179 15.4996 7.12749 15.4996C7.84318 15.4996 8.42339 16.0798 8.42339 16.7955ZM20.0865 16.7955C20.0865 17.5112 19.5063 18.0914 18.7906 18.0914C18.0749 18.0914 17.4947 17.5112 17.4947 16.7955C17.4947 16.0798 18.0749 15.4996 18.7906 15.4996C19.5063 15.4996 20.0865 16.0798 20.0865 16.7955Z" fill="url(#paint1_linear_19089_8073)" fillOpacity="0.4" />
                <path d="M23.3815 22.721L23.3276 22.7882L23.3585 22.8686L25.1462 27.5173C25.383 28.133 24.8587 28.772 24.2086 28.66L15.8643 27.2232L15.8366 27.2185L15.809 27.2241C14.8927 27.41 13.9388 27.5081 12.9591 27.5081C5.86858 27.5081 0.15 22.3724 0.15 16.0713C0.15 9.77021 5.86858 4.63438 12.9591 4.63438C20.0495 4.63438 25.7681 9.77021 25.7681 16.0713C25.7681 18.5502 24.8849 20.8459 23.3815 22.721ZM12.9591 18.8893C14.1155 18.8893 15.0529 17.9519 15.0529 16.7955C15.0529 15.6391 14.1155 14.7016 12.9591 14.7016C11.8027 14.7016 10.8652 15.6391 10.8652 16.7955C10.8652 17.9519 11.8027 18.8893 12.9591 18.8893ZM7.12749 18.2414C7.92602 18.2414 8.57339 17.594 8.57339 16.7955C8.57339 15.9969 7.92602 15.3496 7.12749 15.3496C6.32895 15.3496 5.68158 15.9969 5.68158 16.7955C5.68158 17.594 6.32895 18.2414 7.12749 18.2414ZM18.7906 18.2414C19.5892 18.2414 20.2365 17.594 20.2365 16.7955C20.2365 15.9969 19.5892 15.3496 18.7906 15.3496C17.9921 15.3496 17.3447 15.9969 17.3447 16.7955C17.3447 17.594 17.9921 18.2414 18.7906 18.2414Z" stroke="url(#paint2_linear_19089_8073)" strokeWidth="0.3" />
            </g>
        </g>
        <defs>
            <filter id="filter0_i_19089_8073" x="6.08203" y="0" width="25.918" height="24.6221" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="4.62178" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.7 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_19089_8073" />
            </filter>
            <filter id="filter1_i_19089_8073" x="0" y="4.48438" width="25.918" height="24.3389" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="4" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_19089_8073" />
            </filter>
            <filter id="filter2_bi_19089_8073" x="-15" y="-10.5156" width="55.918" height="54.3389" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
                <stop stopColor="#3B57F7" />
                <stop offset="1" stopColor="#3EBCFB" />
            </linearGradient>
            <linearGradient id="paint1_linear_19089_8073" x1="29.7978" y1="2.28533" x2="23.5114" y2="29.2086" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="0.61" />
                <stop offset="0.997071" stopColor="#C2D2FF" />
            </linearGradient>
            <linearGradient id="paint2_linear_19089_8073" x1="12.9591" y1="4.48437" x2="12.9591" y2="38.3165" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="#999999" />
            </linearGradient>
        </defs>
    </svg>;
}

const DashboardPage = () => {
    const { home_url, version, logo, title, plugins, upgradePro = 'https://gutenverse.com/pro', supportLink = 'https://support.jegtheme.com', subscribed = false } = window['GutenThemeConfig'];
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
                return <div className='action-button plugin-done'>{__('Plugin Installed', 'gutenverse-temes-builder')}</div>;
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
                                    <PluginIcon />
                                </div>
                                <p className='content-title'>{__('Plugin Requirements', '--gtb-theme-namespace--')}</p>
                                <p className='content-description'>{__('Install and activate the required plugins to unlock all theme features.', '--gtb-theme-namespace--')}</p>
                                {pluginButton()}
                            </div>
                            <div className='content-2'>
                                <Wave />
                                <div className='content-icon'>
                                    <DemoIcon />
                                </div>
                                <p className='content-title'>{__('Install Demo', '--gtb-theme-namespace--')}</p>
                                <p className='content-description'>{__('Importing the demo and style takes only one click. It is easily customizable.', '--gtb-theme-namespace--')}</p>
                                <div className='action-button' onClick={() => setMenu('demo')}>{__('View Demo', '--gtb-theme-namespace--')}</div>
                            </div>
                            <div className='content-3'>
                                <Wave />
                                <div className='content-icon'>
                                    <SupportIcon />
                                </div>
                                <p className='content-title'>{__('Any Questions?', '--gtb-theme-namespace--')}</p>
                                <p className='content-description'>{__('Our support team is ready to help you with any questions or issues.', '--gtb-theme-namespace--')}</p>
                                <div className='action-button' onClick={() => window.open(supportLink, '_blank')}>{__('Ask for Support', '--gtb-theme-namespace--')}</div>
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
            </ul>
        </div>
        <div className='dashboard-content'>
            {content()}
        </div>
    </div>
}

export default DashboardPage;