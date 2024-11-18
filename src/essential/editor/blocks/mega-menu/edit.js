import React, { useEffect } from 'react';
import { createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withCustomStyle, withMouseMoveEffect } from 'gutenverse-core/hoc';
import {
    useBlockProps,
    useInnerBlocksProps,
    BlockControls,
    InspectorControls
} from 'gutenverse-core/components';
import { classnames } from 'gutenverse-core/components';
import { cryptoRandomString } from 'gutenverse-core/components';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { plus } from 'gutenverse-core/components';
import { ToolbarButton, ToolbarGroup } from 'gutenverse-core/components';
import { displayShortcut } from '@wordpress/keycodes';
import { PanelController } from 'gutenverse-core/controls';
import { useRef } from 'react';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { AlertControl } from 'gutenverse-core/controls';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { dispatch, useSelect } from '@wordpress/data';
import isEmpty from 'lodash/isEmpty';
import { panelList } from './panels/panel-list';

const MegaMenu = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar(),
    withMouseMoveEffect
)(props => {
    const {
        clientId,
        attributes,
        setElementRef,
    } = props;

    const {
        elementId,
        orientation,
        breakpoint,
        mobileMenuLogo,
        mobileMenuLogoAlt,
        mobileMenuLogoLazyMode,
        mobileIcon,
        mobileCloseIcon,
    } = attributes;

    const deviceType = getDeviceType();
    const menusRef = useRef();
    const innerRef = useRef();
    const wrapperRef = useRef();

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const {
        getBlocks,
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        insertBlock,
    } = dispatch('core/block-editor');

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-mega-menu',
            'no-margin',
            `break-point-${breakpoint}`,
            elementId,
            orientation,
            animationClass,
            displayClass,
            deviceType,
        ),
        ref: menusRef,
    });

    const innerBlocksProps = useInnerBlocksProps({
        className: 'mega-menu-item-panel',
        ref: innerRef
    }, {
        template: [
            ['gutenverse/mega-menu-item', {
                'menuId': 'menu-a',
                'text': 'Menu 1'
            }],
            ['gutenverse/mega-menu-item', {
                'menuId': 'menu-b',
                'text': 'Menu 2'
            }],
            ['gutenverse/mega-menu-item', {
                'menuId': 'menu-c',
                'text': 'Menu 3'
            }]
        ],
        orientation,
        allowedBlocks: ['gutenverse/mega-menu-item'],
        __experimentalAppenderTagName: 'div',
    });

    const addNewMenu = () => {
        const menuId = cryptoRandomString({ length: 6, type: 'alphanumeric' });

        const newChild = createBlock('gutenverse/mega-menu-item', {
            key: menuId,
            menuId: menuId,
        });

        insertBlock(newChild, getBlocks(clientId).length + 1, clientId);
    };

    const openWrapper = () => {
        if (wrapperRef.current) {
            wrapperRef.current.classList.add('active');
        }
    };

    const closeWrapper = () => {
        if (wrapperRef.current) {
            wrapperRef.current.classList.remove('active');
        }
    };

    useEffect(() => {
        if (menusRef.current) {
            setElementRef(menusRef.current);
        }
    }, [menusRef]);

    return <>
        <InspectorControls>
            <div className={'header-control'}>
                <AlertControl type={'warning'}>
                    {__('Hover is simulated by click. Please click the title to see menu dropdown.', 'gutenverse-pro')}
                </AlertControl>
            </div>
        </InspectorControls>
        <PanelController elementRef={menusRef} panelList={panelList} {...props} />
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    name="add"
                    icon={plus}
                    title={__('Add New Menu', 'gutenverse-pro')}
                    shortcut={displayShortcut.primary('a')}
                    onClick={() => addNewMenu()}
                />
            </ToolbarGroup>
        </BlockControls>
        <div {...blockProps}>
            <div className="mega-menu-wrapper" ref={wrapperRef}>
                <div className={`mega-menu-identity-panel${mobileMenuLogo ? ' has-logo' : ''}`}>
                    {!isEmpty(mobileMenuLogo) && (
                        <div className="mega-menu-site-image">
                            <a href="#" className="mega-menu-nav-logo">
                                <img decoding="async" src={mobileMenuLogo.media?.sizes?.[mobileMenuLogo.size || '']?.url} alt={mobileMenuLogoAlt} loading={mobileMenuLogoLazyMode && 'lazy'}></img>
                            </a>
                        </div>
                    )}
                    <button className="mega-menu-close" onClick={closeWrapper}>
                        <i aria-hidden="true" className={mobileCloseIcon}></i>
                    </button>
                </div>
                <div {...innerBlocksProps} />
            </div>
            <div className="mega-menu-hamburger-wrapper">
                <button className="mega-menu-hamburger" onClick={openWrapper}>
                    <i aria-hidden="true" className={mobileIcon}></i>
                </button>
            </div>
        </div>
    </>;
});

export default MegaMenu;