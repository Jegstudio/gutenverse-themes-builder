import React from 'react';
import { classnames } from 'gutenverse-core/components';
import { InnerBlocks, RichText, useBlockProps } from 'gutenverse-core/components';
import { compose } from '@wordpress/compose';
import { useAnimationFrontend } from 'gutenverse-core/hooks';

const save = compose(
)((props) => {
    const {
        attributes,
    } = props;

    const {
        menuId,
        elementId,
        text,
        url,
        indicator,
        subMenuType,
        subMenuList,
        panelWrap,
        orientation,
        breakpoint,
        menuLinkDisable,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);

    const menuClass = classnames(
        'mega-menu-item-body',
    );

    const bodyClass = classnames(
        'mega-menu-body',
        animationClass,
    );

    const className = classnames(
        'guten-element',
        'guten-mega-menu-item',
        'no-margin',
        'mega-menu-item',
        `mega-menu-${menuId}`,
        `mega-menu-${subMenuType}`,
        elementId
    );

    const id = elementId && elementId.split('-')[1];

    const blockProps = useBlockProps.save({
        className: className,
        ['data-indicator']: indicator,
        ['data-id']: id,
    });

    return <>
        <div { ...blockProps }>
            <div className="guten-data">
                {panelWrap &&
                <div data-var={`megaMenuItemPanelWrap${id}`} data-value={JSON.stringify({
                    panelWrap,
                    orientation,
                    breakpoint,
                    subMenuType
                })} />}
                <div data-var={`megaMenuItemAnimationClass${id}`} data-value={JSON.stringify(animationClass)} />
            </div>
            <div className="mega-menu-heading">
                <RichText.Content
                    value={text}
                    tagName={ !menuLinkDisable && url ? 'a' : 'span'}
                    href={ !menuLinkDisable ? url : false}
                />
                {subMenuType !== 'none' && indicator && <i className={indicator}></i>}
            </div>
            <div className={bodyClass}>
                {subMenuType === 'list' && <div className={menuClass} data-menu={subMenuList}>{/* Block content */}</div>}
                {subMenuType === 'mega-menu' && <div className={menuClass}><InnerBlocks.Content /></div>}
            </div>
        </div>
    </>;
});

export default save;
