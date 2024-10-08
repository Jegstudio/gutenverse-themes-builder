import { exportTheme } from '../../../data/api-fetch';
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

    return (
        <div className='table empty margin-top-0'>
            <div className='empty-content'>
                <h3>{__('Ready to export your themes ?', 'gutenverse-themes-builder')}</h3>
                <p className='export-paragraph'>{__('Explore the unlimited possibilities of Gutenberg and Full Site Editing using Gutenverse.', 'gutenverse-themes-builder')}</p>
                <div className="buttons">
                    { loading ? <div className="button button-loading" disabled>Loading... </div> : <div className="button" onClick={startExport}>{__('Export Themes', 'gutenverse-themes-builder')}</div>}
                </div>
            </div>
        </div>
    );
};

export default ExportTheme;