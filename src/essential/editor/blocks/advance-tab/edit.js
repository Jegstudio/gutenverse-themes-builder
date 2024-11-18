
import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import {
    useInnerBlocksProps,
} from 'gutenverse-core/components';
import { classnames } from 'gutenverse-core/components';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';

const Tab = compose(
    withCustomStyle(panelList)
)(props => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        active,
        tabId
    } = attributes;

    const tabRef = useRef();

    const tabClass = classnames('gutenverse-advance-tab-item', {
        active: active
    });

    const innerBlocksProps = useInnerBlocksProps({
        className: tabClass
    }, {
        template: [['core/paragraph']]
    });

    const classname = classnames(
        `advance-tab-${tabId}`,
        'advance-tab-body-item'
    );

    useEffect(() => {
        if (tabRef.current) {
            setElementRef(tabRef.current);
        }
    }, [tabRef]);

    return <div className={classname} data-id={tabId} ref={tabRef}>
        <div {...innerBlocksProps}/>
    </div>;
});

export default Tab;
