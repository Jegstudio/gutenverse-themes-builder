import { exportTemplate, exportTheme } from '../../../data/api-fetch';
import ContentWrapper from './content-wrapper';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';


const ExportTheme = () => {
    const [loading, setLoading] = useState(false);
    const startExport = () => {
        setLoading(true);
        exportTheme(response => {
            window.open(response?.fileresult?.fileurl);
            if (response?.fileresult?.child?.fileurl) {
                setTimeout(()=>{
                    window.open(response?.fileresult?.child?.fileurl);
                }, 500)
            }
            setLoading(false);
        });
    };

    const startExportTemplate = () => {
        exportTemplate(response => {
            window.open(response?.fileresult?.fileurl);
            if (response?.fileresult?.child?.fileurl) {
                setTimeout(()=>{
                    window.open(response?.fileresult?.child?.fileurl);
                }, 500)
            }
        });
    }

    return (
        <div className='table empty margin-top-0'>
            <div className='empty-content'>
                <h3>{__('Ready to export your themes ?', 'gutenverse-themes-builder')}</h3>
                <p className='export-paragraph'>{__('Click \'Export Themes\' to generate a ZIP file of your theme. This package includes all theme files, ready for installation or sharing.', 'gutenverse-themes-builder')}</p>
                <div className="buttons">
                    { loading ? <div className="button button-loading" disabled>Loading... </div> : <div className="button" onClick={startExport}>{__('Export Themes', 'gutenverse-themes-builder')}</div>}
                    { loading ? <div className="button button-loading" disabled>Loading... </div> : <div className="button" onClick={startExportTemplate}>{__('Export Template', 'gutenverse-themes-builder')}</div>}
                </div>
            </div>
        </div>
    );
};

export default ExportTheme;