import React from 'react';
import { classnames } from 'gutenverse-core/components';
import { InnerBlocks } from 'gutenverse-core/components';
import { compose } from '@wordpress/compose';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withMouseMoveEffectScript } from 'gutenverse-core/hoc';

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
        mobileMenuLink,
        mobileMenuURL,
        mobileIcon,
        mobileCloseIcon,
    } = attributes;

    const {
        domainURL
    } = window['GutenverseConfig'];

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
        <div className={className}>
            <div className={'mega-menu-wrapper'}>
                <div className={`mega-menu-identity-panel${mobileMenuLogo ? ' has-logo' : ''}`}>
                    {mobileMenuLogo && (
                        <div className="mega-menu-site-image">
                            <a href={mobileMenuLink === 'home' ? domainURL : mobileMenuURL} className="mega-menu-nav-logo">
                                <img decoding="async" src={mobileMenuLogo.media?.sizes?.[mobileMenuLogo.size || '']?.url} alt=""></img>
                            </a>
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