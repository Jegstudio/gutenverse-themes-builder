import { __ } from '@wordpress/i18n';
import { PlusIcon } from '../data/icons';

const ContentWrapper = (props) => {
    const {
        title = __('Title', 'gtb'),
        description = '',
        headingButton = false,
        headingButtons = [
            {
                buttonText : __('Add New', 'gtb'),
                buttonEvent : null,
                buttonIcon : <PlusIcon />,
                buttonLoading : false
            }
        ],
        children
    } = props;

    const ButtonElement = () => {
        return headingButtons.map(button => {
            return button.buttonLoading ? <div className="button button-loading" disabled>Loading... </div> : 
            <div className="button" onClick={button.buttonEvent}>{button.buttonIcon && button.buttonIcon}{button.buttonText}</div>
        })
    }
    return (
        <div className="content-wrapper">
            <div className="content-heading">
                <div>
                    <h3 className="subtitle">{title}</h3>
                    <p className="description text">{description}</p>
                </div>
                {headingButton && <div className="button-wrapper"><ButtonElement/></div>}
            </div>
            {children}
        </div>
    );
};

export default ContentWrapper;