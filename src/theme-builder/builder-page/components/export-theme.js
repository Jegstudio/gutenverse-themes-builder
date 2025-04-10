import { exportTemplate, exportTheme, exportBaseTheme, exportLibrary } from '../../../data/api-fetch';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

const ExportTheme = () => {
    const [loading, setLoading] = useState(false);

    const startExport = (type) => {
        setLoading(true);
        if (type === 'base-theme') {
            exportBaseTheme(response => {
                if (response?.fileresult?.fileurl) {
                    window.open(response?.fileresult?.fileurl);
                }
            });
        }

        if (type === 'theme') {
            exportTheme(response => {
                window.open(response?.fileresult?.fileurl);
                if (response?.fileresult?.child?.fileurl) {
                    setTimeout(() => {
                        window.open(response?.fileresult?.child?.fileurl);
                    }, 500)
                }
            });
        }
        setLoading(false);
    };

    const startExportDemo = () => {
        setLoading(true);
        exportTemplate(null, response => {
            window.open(response?.fileresult?.fileurl);
            if (response?.fileresult?.child?.fileurl) {
                setTimeout(() => {
                    window.open(response?.fileresult?.child?.fileurl);
                }, 500)
            }
        });
        setLoading(false);
    }

    const startExportLibrary = () => {
        setLoading(true);
        exportLibrary(response => {
            window.open(response?.fileresult?.fileurl);
            if (response?.fileresult?.child?.fileurl) {
                setTimeout(() => {
                    window.open(response?.fileresult?.child?.fileurl);
                }, 500)
            }
        });
        setLoading(false);
    }

    return <>
        <div className='table empty margin-top-0'>
            <div className='empty-content'>
                <h3>{__('Ready to export your themes ?', 'gutenverse-themes-builder')}</h3>
                <p className='export-paragraph'>{__('Click \'Export Themes\' to generate a ZIP file of your theme. This package includes all theme files, ready for installation or sharing.', 'gutenverse-themes-builder')}</p>
                <div className="buttons">
                    {
                        loading ? <div className="button button-loading" disabled>Loading... </div> : <>
                            <div className="button" onClick={() => startExport('theme')}>{__('Export Themes', 'gutenverse-themes-builder')}</div>
                            <div className="button" onClick={() => startExport('base-theme')}>{__('Export Companion Base Themes', 'gutenverse-themes-builder')}</div>
                            <div className="button" onClick={startExportDemo}>{__('Export Companion Demo', 'gutenverse-themes-builder')}</div>
                            <div className="button" onClick={startExportLibrary}>{__('Export Library Data', 'gutenverse-themes-builder')}</div>
                        </>
                    }
                </div>
            </div>
        </div>
    </>;
};

export default ExportTheme;