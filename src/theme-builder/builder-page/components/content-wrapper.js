import { __ } from '@wordpress/i18n';
import { PlusIcon, WarningIcon } from '../data/icons';

const ContentWrapper = (props) => {
    const {
        title = __('Title', 'gutenverse-themes-builder'),
        description = '',
        headingButton = false,
        headingButtons = [
            {
                buttonText: __('Add New', 'gutenverse-themes-builder'),
                buttonEvent: null,
                buttonIcon: <PlusIcon />,
                buttonLoading: false
            }
        ],
        children,
        showNotice = false,
        notice = {
            icon : <WarningIcon/>,
            message : () => __('Notice Message', 'gutenverse-themes-builder'),
        }
    } = props;

    const ButtonElement = () => {
        return headingButtons.map(button => {
            if(!button.buttonHide){
                return button.buttonLoading ? <div className="button button-loading" disabled>Loading... </div> :
                <div className="button" onClick={button.buttonEvent}>{button.buttonIcon && button.buttonIcon}{button.buttonText}</div>
            }
        })
    }
    return (
        <div className="content-wrapper">
            <div className="content-heading">
                <div>
                    <h3 className="subtitle">{title}</h3>
                    <p className="description text">{description}</p>
                </div>
                {headingButton && <div className="button-wrapper"><ButtonElement /></div>}
            </div>
            {
                showNotice && <div className='content-notice'>
                {notice?.icon}
                <div className='notice-message'>
                {notice?.message()}
                </div>
                </div>
            }
            
            {children}
        </div>
    );
};

export default ContentWrapper;