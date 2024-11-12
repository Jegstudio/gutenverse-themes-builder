import React, { useState } from 'react';
import { compose } from '@wordpress/compose';
import { withCopyElementToolbar, withCustomStyle } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import {
    BlockControls,
    InspectorControls,
    RichText,
    useInnerBlocksProps,
} from 'gutenverse-core/components';
import { classnames } from 'gutenverse-core/components';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Button, ToolbarButton, ToolbarGroup } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
import NavSkeleton from '../../components/skeleton/nav-skeleton';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { AlertControl } from 'gutenverse-core/controls';
import { trash } from 'gutenverse-core/components';
import { displayShortcut } from '@wordpress/keycodes';
import { useBlockProps } from 'gutenverse-core/components';
import { URLToolbar } from 'gutenverse-core/toolbars';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useSelect, dispatch } from '@wordpress/data';

const MegaMenuItem = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)(props => {
    const {
        context,
        clientId,
        attributes,
        setAttributes,
        setElementRef,
        isSelected
    } = props;

    const {
        menuId,
        elementId,
        text,
        url,
        subMenuType,
        subMenuList,
        indicator,
        hover,
        active
    } = attributes;

    const {
        getBlockRootClientId,
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        selectBlock,
        removeBlocks
    } = dispatch('core/block-editor');

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    const isStillMounted = useRef();
    const menuRef = useRef();
    const itemRef = useRef();

    const animationClass = useAnimationEditor(attributes);

    const menuClass = classnames(
        'mega-menu-item-body',
    );

    const bodyClass = classnames(
        'mega-menu-body',
        animationClass,
    );

    const innerBlocksProps = useInnerBlocksProps({
        className: menuClass,
        ref: itemRef,
    }, {
        template: [['core/paragraph']],
    });

    const selectParent = () => {
        const rootId = getBlockRootClientId(clientId);
        selectBlock(rootId);
    };

    const selectItem = () => {
        setAttributes({
            active: !active
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isSidebar = event.target.closest('.interface-interface-skeleton__sidebar');
            const isToolbar = event.target.closest('.components-popover');

            if (menuRef.current && !menuRef.current.contains(event.target) && !isSidebar && !isToolbar) {
                setAttributes({
                    active: false
                });
            }
        };

        menuRef.current && menuRef.current.ownerDocument.addEventListener('mousedown', handleClickOutside);

        return () => {
            menuRef.current && menuRef.current.ownerDocument.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    const subMenuEvent = () => {
        setTimeout(() => {
            menuRef.current && menuRef.current.querySelectorAll('.gutenverse-menu li').forEach(menu => {
                // Disable link click
                menu.querySelector('a').addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                });

                // On hover
                menu.querySelector('a').addEventListener('mouseover', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    e.currentTarget.closest('ul').querySelectorAll('li').forEach(li => {
                        li.classList.remove('active');
                    });

                    e.currentTarget.closest('li').classList.add('active');
                });

                // Add sub menu indicator
                if (menu.classList.contains('menu-item-has-children')) {
                    const ahref = menu.querySelector(':scope > a');

                    if (ahref) {
                        const icon = ahref.querySelector('i');
                        const indicatorEl = document.createElement('i');

                        indicatorEl.setAttribute('class', indicator);

                        if (icon) {
                            icon.remove();
                        }

                        ahref.append(indicatorEl);
                    }
                }
            });
        }, 1);
    };

    const subMenuAnimation = () => {
        if (menuRef.current) {
            // setTimeout(() => {
            menuRef.current.querySelectorAll('.gutenverse-menu ul.sub-menu').forEach(menu => {
                // Add animation class
                menu.setAttribute('class', 'sub-menu');

                if (animationClass) {
                    Object.keys(animationClass).filter(r => !!animationClass[r]).forEach(className => {
                        menu.classList.add(className);
                    });
                }
            });
            // }, 1);
        }
    };

    const editMenuHeading = (value) => {
        setAttributes({
            text: value
        });
    };

    const deleteMenu = () => {
        removeBlocks(clientId);
    };

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-mega-menu-item',
            'no-margin',
            'mega-menu-item',
            `mega-menu-${menuId}`,
            `mega-menu-${subMenuType}`,
            elementId,
            {
                hover,
                active
            }
        ),
        ref: menuRef,
        onClick: e => selectItem(e),
        ['data-id']: menuId,
    });

    setAttributes({
        indicator: context['gutenverse/megaMenuIndicator'],
        orientation: context['gutenverse/megaMenuOrientation'],
        breakpoint: context['gutenverse/megaMenuBreakpoint'],
    });

    useEffect(() => {
        if (menuRef.current) {
            setElementRef(menuRef.current);
        }
    }, [menuRef]);

    useEffect(() => {
        subMenuAnimation();
    }, [animationClass]);

    useEffect(() => {
        setLoading(true);
        apiFetch({
            path: addQueryArgs('/gutenverse-client/v1/menu/render', {
                indicator,
                menu: subMenuList,
            }),
        }).then((data) => {
            setResponse(data);
            subMenuEvent();
            subMenuAnimation();
        }).catch(() => {
            setResponse('<h1>Error</h1>');
        }).finally(() => setLoading(false));
    }, [
        indicator,
        subMenuType,
        subMenuList,
    ]);

    useEffect(() => {
        isStillMounted.current = true;

        apiFetch({
            path: addQueryArgs('/gutenverse-client/v1/menu'),
        }).then((data) => {
            setAttributes({
                menus: data
            });
        });

        return () => {
            isStillMounted.current = false;
        };
    }, []);

    return <>
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    name="delete"
                    icon={trash}
                    title={__('Delete', 'gutenverse-pro')}
                    shortcut={displayShortcut.primary('a')}
                    onClick={() => deleteMenu()}
                />
                <URLToolbar
                    url={url}
                    setAttributes={setAttributes}
                    isSelected={isSelected}
                    anchorRef={blockProps.ref}
                    opensInNewTab={false}
                />
            </ToolbarGroup>
        </BlockControls>
        <InspectorControls>
            <div className={'parent-button'}>
                <Button isPrimary onClick={selectParent}>
                    {__('Modify Parent', 'gutenverse-pro')}
                </Button>
            </div>
            <div className={'header-control'}>
                <AlertControl type={'warning'}>
                    {__('Hover is simulated by click. Please click the title to see menu dropdown.', 'gutenverse-pro')}
                </AlertControl>
            </div>
        </InspectorControls>
        <PanelController panelList={panelList} elementRef={menuRef} {...props} />
        <div {...blockProps}>
            <div className="mega-menu-heading">
                <RichText
                    tagName="span"
                    aria-label={__('Menu text')}
                    placeholder={__('Add text…')}
                    value={text}
                    onChange={value => editMenuHeading(value)}
                    withoutInteractiveFormatting
                    identifier={`heading-${menuId}`}
                />
                {subMenuType !== 'none' && indicator && <i className={indicator}></i>}
            </div>
            <div className={bodyClass}>
                {loading && <div className={menuClass}><NavSkeleton /></div>}
                {!loading &&
                    <>
                        {subMenuType === 'mega-menu' && <div {...innerBlocksProps} />}
                        {subMenuType === 'list' && <div className={menuClass}><RawHTML key="html">{response}</RawHTML></div>}
                    </>
                }
            </div>
        </div>
    </>;
});

export default MegaMenuItem;
