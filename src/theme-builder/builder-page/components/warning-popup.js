import { __ } from '@wordpress/i18n';
import { CloseIcon, WarningIcon } from '../data/icons';

export const WarningPopup = ({ title = '', detail = '', actionText = 'Delete', onProceed, onClose }) => {
    const proceedAction = () => {
        onProceed();
        onClose();
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <div className="popup-header">
                    <div className="title">
                        <WarningIcon />
                        <span>{__('Warning', 'gtb')}</span>
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
                        <div className="button cancel" onClick={onClose}>{__('Cancel', 'gtb')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};