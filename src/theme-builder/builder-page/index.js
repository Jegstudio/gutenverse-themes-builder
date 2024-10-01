import { createRoot } from '@wordpress/element';
import { Routing } from 'gutenverse-core/router';
import ThemeBuilder from './theme-builder';
import Navigation from './navigation';
import { __ } from '@wordpress/i18n';

if (document.getElementById('gtb-root')) {
    document.addEventListener('DOMContentLoaded', () => {
        const root = createRoot(document.getElementById('gtb-root'));
        const {
            gtbAssetURL,
        } = window['GutenverseDashboard'];
        root.render(<Routing>
            {(props) => {
                return <>
                    <div className="header">
                        <div className='title-wrapper'>
                            <h2 className="title">{__('Gutenverse Themes Builder', 'gutenverse-themes-builder')}</h2>
                            <p className="text">{__('Start bulding your own block theme with Gutenverse Themes Builder.', 'gutenverse-themes-builder')}</p>
                        </div>
                        <div className='banner-wrapper'>
                            <img className="circle" src={`${gtbAssetURL}img/referral-banner-banner-circle.png`} />
                            <div className='left-wrapper'>
                                <div className='woman-image' style={{backgroundImage: `url('${gtbAssetURL}img/referral-banner-woman-blink.png')`}}>
                                    <img className="woman" src={`${gtbAssetURL}img/referral-banner-woman-image.png`} />
                                </div>
                                <div className='main-content'>
                                    <h3>{__('Get Rewarded For Your', 'gutenverse-themes-builder')}<span>{__(' Referral', 'gutenverse-themes-builder')}</span>
                                        <img className="text-blink" src={`${gtbAssetURL}img/referral-banner-blink.png`} />
                                    </h3>
                                    <p>{__('Sharing it to your social media to get a reward from us.', 'gutenverse-themes-builder')}</p>
                                </div>
                            </div>
                            
                            <div className='button-wrapper'>
                                <a className='join-button-wrap' href='https://pro.gutenverse.com/account/referral/' target='_blank'>
                                    <div className='join-button'>
                                        {__('Join Our Referal.', 'gutenverse-themes-builder')}
                                    </div>
                                </a>
                            </div>
                        </div>
                        
                    </div>
                    <Navigation {...props} />
                    <ThemeBuilder {...props} />
                </>;
            }}
        </Routing>);
    });
}