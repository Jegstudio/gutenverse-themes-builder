import { useState, useEffect } from '@wordpress/element';
import ManageTemplates from './components/manage-templates';
import ThemeList from './components/theme-list';
import ExportTheme from './components/export-theme';
import PatternList from './components/pattern-list';
import ManageAssets from './components/manage-assets';
import ManageFonts from './components/manage-fonts';
import ManageFontSizes from './components/manage-font-sizes';
import ManagePlugins from './components/manage-plugins';
import ManageScreenshots from './components/manage-screenshots';
import ReadmeEditor from './components/readme-editor';
import ManageGlobal from './components/manage-global';
import ManageDashbaord from './components/manage-dashboard';
import ManageNotice from './components/manage-notice';
import ManagePages from './components/manage-pages';

const ThemeBuilder = ({ location }) => {
    const [path, setPath] = useState('list');
    const { search } = location;
    const query = new URLSearchParams(search);
    let Content = null;

    useEffect(() => {
        setPath(query.get('path'));
    }, [query]);

    switch (path) {
        case 'manage-templates':
            Content = ManageTemplates;
            break;
        case 'manage-pages':
            Content = ManagePages;
            break;
        case 'manage-patterns':
            Content = PatternList;
            break;
        case 'manage-assets':
            Content = ManageAssets;
            break;
        case 'manage-global':
            Content = ManageGlobal;
            break;
        case 'manage-fonts':
            Content = ManageFonts;
            break;
        case 'manage-font-sizes':
            Content = ManageFontSizes;
            break;
        case 'manage-plugins':
            Content = ManagePlugins;
            break;
        case 'manage-dashboard':
            Content = ManageDashbaord;
            break;
        case 'manage-screenshots':
            Content = ManageScreenshots;
            break;
        case 'readme-editor':
            Content = ReadmeEditor;
            break;
        case 'export-theme':
            Content = ExportTheme;
            break;
        case 'notice-editor':
            Content = ManageNotice;
            break;
        default:
            Content = ThemeList;
            break;
    }

    const params = {
        path,
        setPath
    };

    return (
        <div className="builder-wrapper">
            <Content {...params} />
        </div>
    );
};

export default ThemeBuilder;