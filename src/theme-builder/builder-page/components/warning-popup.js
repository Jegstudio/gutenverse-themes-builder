import { __ } from '@wordpress/i18n';
import { CloseIcon, WarningIcon } from '../data/icons';

export const WarningPopup = ({ title = '', detail = '', actionText = 'Delete', onProceed, onClose }) => {
    const proceedAction = () => {
        onProceed();
        onClose();
    };

    return (
        <div className="popup-container" onClick={onClose}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <div className="popup-header">
                    <div className="title">
                        <WarningIcon />
                        <span>{__('Warning', 'gutenverse-themes-builder')}</span>
                    </div>
                    <div className="close-button" onClick={onClose}>
                        <CloseIcon />
                    </div>
                </div>
                <div className="popup-body">
                    <h3>{title}</h3>
                    <p>{detail}</p>
                </div>
                <div className="popup-footer">
                    <div className="buttons end">
                        <div className="button proceed" onClick={proceedAction}>{actionText}</div>
                        <div className="button cancel" onClick={onClose}>{__('Cancel', 'gutenverse-themes-builder')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};