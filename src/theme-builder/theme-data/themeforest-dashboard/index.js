import { createRoot } from '@wordpress/element';
import DashboardPage from './dashboard-page';
import WizardPage from './wizard-page';
import './dashboard.scss';

if ( document.getElementById('gutenverse-theme-dashboard') ) {
    document.addEventListener('DOMContentLoaded', () => {
        const root = createRoot(document.getElementById('gutenverse-theme-dashboard'));
        root.render(<DashboardPage/>);
    });
}

if ( document.getElementById('gutenverse-theme-wizard') ) {
    document.addEventListener('DOMContentLoaded', () => {
        const root = createRoot(document.getElementById('gutenverse-theme-wizard'));
        root.render(<WizardPage/>);
    });
}