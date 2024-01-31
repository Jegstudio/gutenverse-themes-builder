import { useState, useCallback, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ContentWrapper from './content-wrapper';
import { useDropzone } from 'react-dropzone';
import { importGlobaStyle } from '../../../data/api-fetch';

const ManageGlobal = () => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false
    });

    const disableLoading = () => {
        setLoading(false);
        setFiles([]);
        alert(__('Import Success', 'gtn'));
    };

    const importGlobalStyle = () => {
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('name', 'name');
        setLoading(true);
        importGlobaStyle(formData, disableLoading);
    };


    return <ContentWrapper
        title={__('Global Style', 'gtb')}
        description={__('Import Global Style from elementor global style', 'gtb')}
        headingButton={files.length > 0}
        headingButtonIcon={false}
        headingButtonText={loading ? __('Loading...', 'gtb') : __('Import Global Style', 'gtb')}
        headingButtonOnClick={() => importGlobalStyle()}
    >
        <section className="container">
            {files.length === 0 ?
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>{__('Upload global.json from your template kit files', 'gtn')}</p>
                </div> :
                files.length && files.map(file => {
                    const { name, lastModified, size } = file;
                    return <div key={lastModified} className="dropzone">
                        <div><strong> {name} </strong></div>
                        <h3 className="clear" onClick={() => setFiles('')}>{__('Clear', 'gtn')}</h3>
                    </div>;
                })
            }
        </section>
    </ContentWrapper >;
};

export default ManageGlobal;