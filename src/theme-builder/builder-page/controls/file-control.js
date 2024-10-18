import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';


const FileControl = (props) => {
    const { id, title, description, value, onChange, typeMedia = [], important, placeholder } = props;
    const [fileFrame, setFileFrame] = useState(null);

    useEffect(() => {
        const fontFrame = wp?.media({
            title: 'Select or Upload Media',
            button: {
                text: 'Select File'
            },
            library: {
                type: typeMedia,
            },
            multiple: false,
        });
        setFileFrame(fontFrame);
    }, []);

    useEffect(() => {
        if (fileFrame) {
            fileFrame.on('select', function () {
                const attachment = fileFrame.state().get('selection').toJSON();

                attachment.map((item, index) => {
                    if (index === 0) {
                        onChange({
                            id: item?.id,
                            filename: item?.filename
                        });
                    }
                });
            });
        }
    }, [fileFrame]);

    const selectItem = (frame) => {
        if (frame) {
            frame.open();
            return;
        }
    };

    return <div className="input-wrapper">
        <label name={id}>{title}{important && <span>&nbsp;*</span>}</label>
        <div className="input-inner">
            <input type="text" className="input-file-text" value={value?.filename} disabled placeholder={placeholder}/>
            <button onClick={() => selectItem(fileFrame)} className="input-file-button button" >{__('Choose File', 'gutenverse-themes-builder')}</button>
            {description && <span>{description}</span>}
        </div>
    </div>;
};

export default FileControl;