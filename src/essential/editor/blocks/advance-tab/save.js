
import { InnerBlocks } from 'gutenverse-core/components';
import { classnames } from 'gutenverse-core/components';

const SaveTab = ({ attributes }) => {
    const {
        tabId,
        first
    } = attributes;

    const className = classnames(
        tabId,
        'advance-tab-body-item',
        {
            active: first
        }
    );

    return <div className={className} data-id={tabId}>
        <InnerBlocks.Content/>
    </div>;
};

export default SaveTab;
