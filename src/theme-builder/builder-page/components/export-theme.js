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
        <ContentWrapper
            title={__('Export Theme', 'gutenverse-themes-builder')}
            description={__('Export your current active theme as zip file.', 'gutenverse-themes-builder')}
        >
            <>
                <div className="buttons">
                    { loading ? <div className="button button-loading" disabled>Loading... </div> : <div className="button" onClick={startExport}>{__('Export Theme', 'gutenverse-themes-builder')}</div>}
                    { loading ? <div className="button button-loading" disabled>Loading... </div> : <div className="button" onClick={startExportTemplate}>{__('Export Template', 'gutenverse-themes-builder')}</div>}
                </div>
            </>
        </ContentWrapper>
    );
};

export default ExportTheme;