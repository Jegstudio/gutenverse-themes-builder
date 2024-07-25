import { render } from '@wordpress/element';
import DashboardPage from './dashboard-page';
import './dashboard.scss';

if ( document.getElementById('gutenverse-theme-dashboard') ) {
    document.addEventListener('DOMContentLoaded', () => {
        const root = createRoot(document.getElementById('gutenverse-theme-dashboard'));
        root.render(<DashboardPage/>);
    });
}