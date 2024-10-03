import { CloseIcon } from "../data/icons";
import { WarningPopup } from "./warning-popup";
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';


export const FormPopup = (props) => {
    const {
        onClose,
        onSubmit,
        children: FormInput,
        showFooterButton = true,
        initialData
    } = props;

    const [isEdited, setIsEdited] = useState(false);
    const [closeWhenEdited, setCloseWhenEdited] = useState(false);
    const [data, setData] = useState(initialData);

    // Function to update specific plugin details in data
    const updateData = (key, value) => {
        setData(prevData => ({
        ...prevData,
        plugin: {
            ...prevData.plugin,
            [key]: value,
        },
        }));
    };

    const handleOnClose = () => {
        if(isEdited){
            setCloseWhenEdited(true);
        }else{
            onClose();
        }
    }
    
    return <>
        {
            closeWhenEdited ? <WarningPopup
                title={__('Are you sure want to leave this menu ?', 'gutenverse-themes-builder')}
                detail={__('Changes you made may not be saved.', 'gutenverse-themes-builder')}
                onProceed={onClose}
                onClose={() => setCloseWhenEdited(false)}
                actionText={__('Leave', 'gutenverse-themes-builder')}
                buttonFill='#3B57F7'
                svgFill='#FFC908'
            /> : <div className="popup-container" onClick={handleOnClose}>
                <div className="popup-content" onClick={e => e.stopPropagation()}>
                    <div className="popup-header">
                        <span className="title pattern">{__('Edit Page')}</span>
                        <div className="close-button" onClick={handleOnClose}>
                            <CloseIcon />
                        </div>
                    </div>
                    <div className="popup-body">
                    <children/>
                    <FormInput data={data} setIsEdited={setIsEdited} updateData={updateData}/>
                    </div>
                    <div className="popup-footer">
                        {
                            showFooterButton && <div className="buttons end">
                                <div className="button" onClick={() => onSubmit(data)}>
                                    {__('Submit', 'gutenverse-themes-builder')}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        }
    </>
};