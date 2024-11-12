import React from 'react';
import { classnames } from 'gutenverse-core/components';
import { InnerBlocks, useBlockProps } from 'gutenverse-core/components';
import { compose } from '@wordpress/compose';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import isEmpty from 'lodash/isEmpty';

const save = compose(
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes,
    } = props;

    const {
        elementId,
        orientation,
        breakpoint,
        mobileMenuLogo,
        mobileMenuURL,
        mobileIcon,
        mobileCloseIcon,
        mobileMenuLogoAlt,
        mobileMenuLogoLazyMode,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-mega-menu',
        `break-point-${breakpoint}`,
        orientation,
        elementId,
        animationClass,
        displayClass,
    );
    return (
        <div {...useBlockProps.save({ className })}>
            <div className={'mega-menu-wrapper'}>
                <div className={`mega-menu-identity-panel${mobileMenuLogo ? ' has-logo' : ''}`}>
                    {!isEmpty(mobileMenuLogo) && (
                        <div className="mega-menu-site-image">
                            {!isEmpty(mobileMenuURL) ? <a href={mobileMenuURL} className="mega-menu-nav-logo">
                                <img decoding="async" src={mobileMenuLogo.media?.sizes?.[mobileMenuLogo.size || '']?.url}  alt={mobileMenuLogoAlt} loading={mobileMenuLogoLazyMode && 'lazy'}></img>
                            </a> : <img decoding="async" src={mobileMenuLogo.media?.sizes?.[mobileMenuLogo.size || '']?.url}  alt={mobileMenuLogoAlt} loading={mobileMenuLogoLazyMode && 'lazy'}></img>}
                        </div>
                    )}
                    <button className="mega-menu-close">
                        <i aria-hidden="true" className={mobileCloseIcon}></i>
                    </button>
                </div>
                <div className="mega-menu-item-panel">
                    <InnerBlocks.Content />
                </div>
            </div>
            <div className="mega-menu-hamburger-wrapper">
                <button className="mega-menu-hamburger">
                    <i aria-hidden="true" className={mobileIcon}></i>
                </button>
            </div>
        </div>
    );
});

export default save;