import { useEffect, useState } from '@wordpress/element';
import { createBlocksFromInnerBlocksTemplate, createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withCustomStyle, withMouseMoveEffect } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import {
    RichText,
    useBlockProps,
    useInnerBlocksProps, BlockControls, u
} from 'gutenverse-core/components';
import { classnames } from 'gutenverse-core/components';
import { cryptoRandomString } from 'gutenverse-core/components';
import { trash, plus } from 'gutenverse-core/components';
import { ToolbarButton, ToolbarGroup, Tooltip } from 'gutenverse-core/components';
import { displayShortcut } from '@wordpress/keycodes';
import { PanelController } from 'gutenverse-core/controls';
import { useRef } from '@wordpress/element';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'gutenverse-core/components';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { reorder } from 'gutenverse-core/helper';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { dispatch, useSelect } from '@wordpress/data';

const TabHeadingItem = ({
    tab,
    index,
    total,
    changeActiveTab,
    editTabHeading,
    headingTag,
    activeTab,
    onChangeSequence,
    orientation,
}) => {
    const classname = classnames('advance-tab-heading-item', {
        active: activeTab === tab.tabId,
    });
    let frontIcon = null;
    let backIcon = null;
    let theIcon = null;
    const { type, position, icon, image, imageAlt, imageLazyMode } = tab;

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

    const shiftLeft = () => {
        onChangeSequence({
            source: index,
            destination: index - 1
        });
    };
    const shiftRight = () => {
        onChangeSequence({
            source: index,
            destination: index + 1
        });
    };
    return <div
        className={classname}
        data-id={tab.tabId}
        key={tab.tabId}
        onClick={() => changeActiveTab(tab.tabId)}>
        {orientation === 'horizontal' && index > 0 && <Tooltip text={__('Click to move tab left', 'gutenverse-pro')}>
            <div className={'advance-tab-shift advance-tab-shift-left'} onClick={shiftLeft}>
                <ChevronLeft />
            </div>
        </Tooltip>}
        <div className="advance-tab-heading-content">
            {frontIcon}
            <RichText
                tagName={headingTag}
                aria-label={__('Tab text')}
                value={tab.text}
                onChange={value => editTabHeading(value, index)}
                withoutInteractiveFormatting
                identifier={`heading-${tab.tabId}`}
            />
            {backIcon}
        </div>
        {orientation === 'horizontal' && index < (total - 1) && <Tooltip text={__('Click to move tab right', 'gutenverse-pro')}>
            <div className={'advance-tab-shift advance-tab-shift-right'} onClick={shiftRight}>
                <ChevronRight />
            </div>
        </Tooltip>}
        {orientation === 'vertical' && <div className="heading-navigation">
            {index > 0 && <Tooltip text={__('Click to move tab up', 'gutenverse-pro')}>
                <div className="advance-tab-shift-vertical advance-tab-shift-up" onClick={shiftLeft}>
                    <ChevronUp />
                </div>
            </Tooltip>}
            {index < (total - 1) && <Tooltip text={__('Click to move tab down', 'gutenverse-pro')}>
                <div className="advance-tab-shift-vertical advance-tab-shift-down" onClick={shiftRight}>
                    <ChevronDown />
                </div>
            </Tooltip>}
        </div>}
    </div>;
};

const getFrontBackIcon = (child) => {
    const { type, position, icon, image, imageLazyMode, imageAlt  } = child;
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
            <img src={image.image} loading={imageLazyMode && 'lazy'} alt={imageAlt}  />
        </div>;
    }
    if (position === 'left') frontIcon = theIcon;
    if (position === 'right') backIcon = theIcon;
    return {frontIcon, backIcon};
};

const TabHeadingResponsive = ({
    tabs,
    changeActiveTab,
    activeTab,
    ...attributes
}) => {
    let { childs } = attributes;
    if (!childs) {
        childs = tabs;
    }
    const [dropOpen, setDropOpen] = useState(false);
    const active = childs.filter(item => item.tabId === activeTab);

    const toggleOpenState = () => {
        setDropOpen(state => !state);
    };

    const activateTab = tabId => {
        toggleOpenState();
        changeActiveTab(tabId);
    };

    return <div className={classnames('advance-tab-heading-mobile', {
        open: dropOpen
    })}>
        <div className={'advance-tab-heading-item-mobile advance-tab-title'} onClick={toggleOpenState}>
            {active.length > 0 && <div className="advance-tab-heading-content advance-tab-dinamic-title">
                {getFrontBackIcon(active[0]).frontIcon}
                <RichText.Content
                    value={active[0].text}
                    tagName="span"
                />
                {getFrontBackIcon(active[0]).backIcon}
            </div>}
            <i className={'advance-tab-dropdown-icon fas'} />
        </div>
        <div className={'advance-tab-option'}>
            {childs.map(child => {
                const itemClassname = classnames('advance-tab-option-item','advance-tab-heading-item-mobile', {
                    active: child.tabId === activeTab
                });
                const {frontIcon, backIcon} = getFrontBackIcon(child);
                return <div key={child.tabId} data-id={child.tabId} className={itemClassname} onClick={() => activateTab(child.tabId)}>
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
    </div>;
};

const TabHeading = ({
    tabs,
    changeActiveTab,
    editTabHeading,
    onChangeSequence,
    ...attributes
}) => {
    let { childs } = attributes;
    if (!childs && tabs.length != 0) {
        childs = tabs;
    }
    const classname = classnames('advance-tab-heading');
    const TheTabHeading = childs.map((tab, index) => {
        return <TabHeadingItem
            tab={tab}
            index={index}
            key={tab.tabId}
            total={childs.length}
            changeActiveTab={changeActiveTab}
            editTabHeading={editTabHeading}
            onChangeSequence={onChangeSequence}
            {...attributes}
        />;
    });

    return <div className="advance-tab-heading-wrapper">
        <div className={classname}>
            {TheTabHeading}
        </div>
    </div>;
};

export const filterUnique = (arr1, arr2, prop) => {
    // Combine the arrays
    const combinedArray = arr1.concat(arr2);
    // Use the filter method to get unique values based on the specified property
    const uniqueArray = combinedArray.filter((item, index, self) => {
        return index === self.findIndex((t) => t[prop] === item[prop]);
    });
    return uniqueArray;
};

const AdvanceTabs = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar(),
    withMouseMoveEffect
)(props => {
    const {
        insertBlock,
        removeBlocks,
        replaceInnerBlocks
    } = dispatch('core/block-editor');

    const {
        getBlocks
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );
    const {
        clientId,
        attributes,
        setAttributes,
        addStyle,
        setElementRef,
        elementRef
    } = props;

    const {
        elementId,
        tabs,
        childs,
        orientation,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const deviceType = getDeviceType();
    const [activeTab, setActiveTab] = useState(0);
    const tabsRef = useRef();
    useEffect(() => {
        if(elementRef){
            if (elementId === undefined) {
                if (!childs) {
                    setAttributes({ childs: tabs });
                } else {
                    const arrNewChild = filterUnique(childs, tabs, 'tabId');
                    setAttributes({ childs: arrNewChild });
                }
            } else {
                const parent = u(elementRef).closest('html');
                if (!parent.hasClass('block-editor-block-preview__content-iframe') ) {
                    if (!childs) {
                        setAttributes({ childs: tabs });
                    } else {
                        const arrNewChild = filterUnique(childs, tabs, 'tabId');
                        setAttributes({ childs: arrNewChild });
                    }
                }
            }
        }
    }, [tabs]);
    useEffect(() => {
        if (tabs === undefined) {
            const newTabs = [
                {
                    tabId: 'tab-' + cryptoRandomString({ length: 6, type: 'alphanumeric' }),
                    text: 'Tab 1'
                },
                {
                    tabId: 'tab-' + cryptoRandomString({ length: 6, type: 'alphanumeric' }),
                    text: 'Tab 2'
                },
                {
                    tabId: 'tab-' + cryptoRandomString({ length: 6, type: 'alphanumeric' }),
                    text: 'Tab 3'
                },
            ];

            setAttributes({
                tabs: newTabs,
                childs: newTabs,
            });
            // Create Element
            const child = newTabs.map(tab => {
                return ['gutenverse/advance-tab', {
                    key: tab.tabId,
                    tabId: tab.tabId,
                }];
            });

            const variation = createBlocksFromInnerBlocksTemplate(child);
            replaceInnerBlocks(clientId, variation, true);
            changeActiveTab(newTabs[0].tabId);
        } else {
            changeActiveTab(childs[0].tabId);
        }
    }, []);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-advance-tabs',
            'no-margin',
            elementId,
            orientation,
            animationClass,
            displayClass,
            deviceType,
        ),
        ref: tabsRef
    });

    const innerBlocksProps = useInnerBlocksProps({
        className: 'advance-tab-body'
    }, {
        template: [['gutenverse/advance-tab']],
        allowedBlocks: ['gutenverse/advance-tab'],
        __experimentalAppenderTagName: 'div',
    });

    const editTabHeading = (value, index) => {
        const newTabs = tabs.map((tab, idx) => {
            if (index === idx) {
                return {
                    ...tab,
                    text: value
                };
            } else {
                return tab;
            }
        });
        const newChilds = childs.map((child, idx) => {
            if (index === idx) {
                return {
                    ...child,
                    text: value
                };
            } else {
                return child;
            }
        });

        setAttributes({
            tabs: newTabs,
            childs: newChilds
        });
    };

    const onChangeSequence = result => {
        const { destination, source } = result;
        const newOrder = reorder(childs, source, destination);
        setAttributes({
            childs: newOrder,
            tabs: newOrder
        });
    };

    const changeActiveTab = key => {
        setActiveTab(key);

        addStyle(
            'advance-tab-style',
            `[data-block="${clientId}"].guten-advance-tabs .advance-tab-body .advance-tab-body-item.advance-tab-${key} { display: block }`
        );
    };

    const headingParameter = {
        changeActiveTab,
        onChangeSequence,
        editTabHeading,
        activeTab,
        ...attributes
    };
    const deleteCurrentTab = () => {
        const remainingTab = tabs.filter(item => item.tabId !== activeTab);
        const removedClient = getBlocks(clientId).filter(item => item.attributes.tabId === activeTab)[0];
        const arrNewChild = childs.filter(item => item.tabId !== activeTab);
        setAttributes({ tabs: remainingTab, childs: arrNewChild });
        removeBlocks(removedClient.clientId, false);
        changeActiveTab(arrNewChild[0].tabId);
    };

    const addNewTab = () => {
        const tabId = cryptoRandomString({ length: 6, type: 'alphanumeric' });

        const newChild = createBlock('gutenverse/advance-tab', {
            key: tabId,
            tabId: tabId,
        });

        insertBlock(newChild, getBlocks(clientId).length + 1, clientId);

        setAttributes({
            tabs: [
                ...tabs,
                {
                    tabId: tabId,
                    text: __('New Tab', 'gutenverse-pro')
                }
            ]
        });
        changeActiveTab(tabId);
    };

    useEffect(() => {
        if (tabsRef.current) {
            setElementRef(tabsRef.current);
        }
    }, [tabsRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    name="add"
                    icon={plus}
                    title={__('Add New Tab', 'gutenverse-pro')}
                    shortcut={displayShortcut.primary('a')}
                    onClick={() => addNewTab()}
                />
                <ToolbarButton
                    name="delete"
                    icon={trash}
                    title={__('Delete Tab', 'gutenverse-pro')}
                    shortcut={displayShortcut.primary('d')}
                    onClick={() => deleteCurrentTab()}
                    disabled={childs !== undefined && childs.length <= 1}
                />
            </ToolbarGroup>
        </BlockControls>
        <div {...blockProps}>
            {childs !== undefined && (
                <>
                    <TabHeading {...headingParameter} />
                    <TabHeadingResponsive {...headingParameter} />
                </>
            )}
            <div {...innerBlocksProps} />
        </div>
    </>;
});

export default AdvanceTabs;
