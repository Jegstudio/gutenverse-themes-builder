import { createRoot } from '@wordpress/element';
import { Routing } from 'gutenverse-core/router';
import ThemeBuilder from './theme-builder';
import Navigation from './navigation';
import { __ } from '@wordpress/i18n';

if (document.getElementById('gtb-root')) {
    document.addEventListener('DOMContentLoaded', () => {
        const root = createRoot(document.getElementById('gtb-root'));
        root.render(<Routing>
            {(props) => {
                return <>
                    <div className="header">
                        <h2 className="title">{__('Gutenverse Themes Builder', 'gutenverse-themes-builder')}</h2>
                        <p className="text">{__('Start bulding your own block theme with Gutenverse Themes Builder.')}</p>
                    </div>
                    <Navigation {...props} />
                    <ThemeBuilder {...props} />
                </>;
            }}
        </Routing>);
    });
}