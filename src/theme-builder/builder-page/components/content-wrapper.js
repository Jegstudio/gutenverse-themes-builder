import { __ } from '@wordpress/i18n';
import { PlusIcon } from '../data/icons';

const ContentWrapper = (props) => {
    const {
        title = __('Title', 'gtb'),
        description = '',
        headingButton = false,
        headingButtonIcon = true,
        headingButtonOnClick,
        headingButtonText = __('Add New', 'gtb'),
        children
    } = props;

    return (
        <div className="content-wrapper">
            <div className="content-heading">
                <div>
                    <h3 className="subtitle">{title}</h3>
                    <p className="description text">{description}</p>
                </div>
                {headingButton && <div className="button" onClick={headingButtonOnClick}>{headingButtonIcon && <PlusIcon />}{headingButtonText}</div>}
            </div>
            {children}
        </div>
    );
};

export default ContentWrapper;