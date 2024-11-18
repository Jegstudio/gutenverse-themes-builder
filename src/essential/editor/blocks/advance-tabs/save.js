
import { classnames } from 'gutenverse-core/components';
import { InnerBlocks, RichText, useBlockProps } from 'gutenverse-core/components';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';

const save = compose(
    withMouseMoveEffectScript
)(({ attributes }) => {
    let {
        elementId,
        childs,
        tabs,
        orientation,
    } = attributes;
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    if(!childs){
        childs = tabs;
    }
    const className = classnames(
        'guten-element',
        'guten-advance-tabs',
        elementId,
        orientation,
        animationClass,
        displayClass,
    );
    const getFrontBackIcon = (child) => {
        const { type, position, icon, image, imageAlt, imageLazyMode  } = child;
        let frontIcon = null;
        let backIcon = null;
        let theIcon = null;
        if ('icon' === type) {
            theIcon = <div className="item-icon">
                <i className={icon} />
            </div>;
        }
        if ('image' === type && image) {
            theIcon = <div className="item-image">
                <img alt={imageAlt} loading={imageLazyMode && 'lazy'} src={image.image} />
            </div>;
        }
        if (position === 'left') frontIcon = theIcon;
        if (position === 'right') backIcon = theIcon;
        return {frontIcon, backIcon};
    };

    return childs && <div {...useBlockProps.save({ className })}>
        <div className="advance-tab-heading-wrapper">
            <div className={'advance-tab-heading'}>
                {childs.map((child, index) => {
                    const {frontIcon, backIcon} = getFrontBackIcon(child);
                    return <div className={classnames('advance-tab-heading-item', {
                        active: index === 0
                    })} id={child.tabId} data-id={child.tabId} key={child.tabId}>
                        <div className="advance-tab-heading-content">
                            {frontIcon}
                            <RichText.Content
                                value={child.text}
                                tagName="span"
                            />
                            {backIcon}
                        </div>
                    </div>;
                })}
            </div>
        </div>
        <div className={'advance-tab-heading-mobile'}>
            <div className={'advance-tab-title advance-tab-heading-item-mobile'}>
                <div className="advance-tab-dinamic-title advance-tab-heading-content">
                    {getFrontBackIcon(childs[0]).frontIcon}
                    <RichText.Content
                        value={childs[0].text}
                        tagName="span"
                    />
                </div>
                {getFrontBackIcon(childs[0]).backIcon}
                <i className={'advance-tab-dropdown-icon fas'} />
            </div>
            <div className={'advance-tab-option'}>
                {childs.map((child, index) => {
                    const itemClassname = classnames('advance-tab-option-item', {
                        active: index === 0
                    });
                    const {frontIcon, backIcon} = getFrontBackIcon(child);
                    return <div key={child.tabId} data-id={child.tabId} className={`${itemClassname} advance-tab-heading-item-mobile`}>
                        <div className="advance-tab-heading-content">
                            {frontIcon}
                            <RichText.Content
                                value={child.text}
                                tagName="span"
                            />
                            {backIcon}
                        </div>
                    </div>;
                })}
            </div>
        </div>
        <div className={'advance-tab-body'}>
            <InnerBlocks.Content />
        </div>
    </div>;
});

export default save;
