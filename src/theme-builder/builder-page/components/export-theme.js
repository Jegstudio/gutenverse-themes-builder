import { exportTemplate, exportTheme, exportBaseTheme, exportLibrary } from '../../../data/api-fetch';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { CloseIcon } from '../data/icons';
import SwitchControl from '../controls/switch-control';

const ExportTheme = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState({
        globalImport: false,
        type: ''
    });

    const startExport = () => {
        setOpen(false);
        setLoading(true);
        if (options.type === 'base-theme') {
            exportBaseTheme(options, response => {
                if (response?.fileresult?.fileurl) {
                    window.open(response?.fileresult?.fileurl);
                }
            });
        }

        if (options.type === 'theme') {
            exportTheme(options, response => {
                window.open(response?.fileresult?.fileurl);
                if (response?.fileresult?.child?.fileurl) {
                    setTimeout(() => {
                        window.open(response?.fileresult?.child?.fileurl);
                    }, 500)
                }
            });
        }

        if( options.type === 'demo') {
            exportTemplate(options, response => {
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

    const openOptions = (type) => {
        setOpen(true);
        setOptions({
            ...options,
            type: type
        })
    }

    return <>
        {
            open && <div className="popup-container export-popup" onClick={() => setOpen(false)}>
                <div className="popup-content" onClick={e => e.stopPropagation()}>
                    <div className="popup-header">
                        <div className="title">
                            <span>{__('Export Options', 'gutenverse-themes-builder')}</span>
                        </div>
                        <div className="close-button" onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </div>
                    </div>
                    <div className="popup-body">
                        <SwitchControl
                            id={'include-global-import-options'}
                            title={__('Include Import With Global Option Library', 'gutenverse-themes-builder')}
                            description={__('This mode will export theme with import section with global option in gutenverse library.', 'gutenverse-themes-builder')}
                            value={options.globalImport}
                            onChange={value => setOptions({
                                ...options,
                                globalImport: value
                            })}
                        />
                    </div>
                    <div className="popup-footer">
                        <div className="buttons end">
                            <div className="button proceed" onClick={startExport}>{__('Proceed', 'gutenverse-themes-builder')}</div>
                            <div className="button cancel" onClick={() => setOpen(false)}>{__('Cancel', 'gutenverse-themes-builder')}</div>
                        </div>
                    </div>
                </div>
            </div>
        }
        <div className='table empty margin-top-0'>
            <div className='empty-content'>
                <h3>{__('Ready to export your themes ?', 'gutenverse-themes-builder')}</h3>
                <p className='export-paragraph'>{__('Click \'Export Themes\' to generate a ZIP file of your theme. This package includes all theme files, ready for installation or sharing.', 'gutenverse-themes-builder')}</p>
                <div className="buttons">
                    {
                        loading ? <div className="button button-loading" disabled>Loading... </div> : <>
                            <div className="button" onClick={() => openOptions('theme')}>{__('Export Themes', 'gutenverse-themes-builder')}</div>
                            <div className="button" onClick={() => openOptions('base-theme')}>{__('Export Companion Base Themes', 'gutenverse-themes-builder')}</div>
                            <div className="button" onClick={() => openOptions('demo')}>{__('Export Companion Demo', 'gutenverse-themes-builder')}</div>
                            <div className="button" onClick={startExportLibrary}>{__('Export Library Data', 'gutenverse-themes-builder')}</div>
                        </>
                    }
                </div>
            </div>
        </div>
    </>;
};

export default ExportTheme;