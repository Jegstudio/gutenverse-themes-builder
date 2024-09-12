import { exportTemplate, exportTheme } from '../../../data/api-fetch';
import ContentWrapper from './content-wrapper';
import { __ } from '@wordpress/i18n';

const ExportTheme = () => {
    const startExportTheme = () => {
        exportTheme(response => {
            window.open(response?.fileresult?.fileurl);
            if (response?.fileresult?.child?.fileurl) {
                setTimeout(()=>{
                    window.open(response?.fileresult?.child?.fileurl);
                }, 500)
            }
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
                    <div className="button" onClick={startExportTheme}>{__('Export as Theme', 'gutenverse-themes-builder')}</div>
                    <div className="button" onClick={startExportTemplate}>{__('Export only Templates', 'gutenverse-themes-builder')}</div>
                </div>
            </>
        </ContentWrapper>
    );
};

export default ExportTheme;