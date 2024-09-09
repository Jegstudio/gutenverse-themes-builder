import { exportTheme } from '../../../data/api-fetch';
import ContentWrapper from './content-wrapper';
import { __ } from '@wordpress/i18n';

const ExportTheme = () => {
    const startExport = () => {
        exportTheme(response => {
            window.open(response?.fileresult?.fileurl);
            if (response?.fileresult?.child?.fileurl) {
                setTimeout(()=>{
                    window.open(response?.fileresult?.child?.fileurl);
                }, 500)
            }
        });
    };

    return (
        <ContentWrapper
            title={__('Export Theme', 'gutenverse-themes-builder')}
            description={__('Export your current active theme as zip file.', 'gutenverse-themes-builder')}
        >
            <>
                {/* Tambah element select disini */}
                <div className="buttons">
                    <div className="button" onClick={startExport}>{__('Export', 'gutenverse-themes-builder')}</div>
                </div>
            </>
        </ContentWrapper>
    );
};

export default ExportTheme;