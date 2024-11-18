import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import { ElementSelectorControl, IconRadioControl, SizeControl } from 'gutenverse-core/controls';
import { getActiveWindow } from 'gutenverse-core/helper';
import { handleUnitPoint } from 'gutenverse-core/styling';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';

const setPosition = (wrapperId, orientation, breakpoint, elementId) => {
    const frame = getActiveWindow();
    const document = frame.document ? frame.document : frame;
    let item = document.querySelector(`.${elementId}`);
    let wrapper = document.querySelector(`.${wrapperId}`);

    if (wrapper) {
        const device = getDeviceType();

        if (!breakpoint
            || (breakpoint === 'mobile' && device.toLowerCase() !== 'mobile')
            || (breakpoint === 'tablet' && device.toLowerCase() !== 'tablet' && device.toLowerCase() !== 'mobile')
        ) {
            let itemRect;
            let wrapperRect;

            wrapper = wrapper.classList.contains('guten-section') ? wrapper.querySelector(':scope > .guten-container') : wrapper;

            wrapperRect = wrapper.getBoundingClientRect();
            itemRect = item.getBoundingClientRect();

            if (orientation === 'horizontal') {
                return `left: ${(0 - itemRect.left) + wrapperRect.left}px; width: ${wrapperRect.width}px;`;
            }

            return `top: ${(0 - itemRect.top) + wrapperRect.top}px; min-height: ${wrapperRect.height}px; width: auto;`;
        }
    }

    return '';
};

export const panelPanel = (props) => {
    const {
        clientId,
        elementId,
        orientation,
        breakpoint,
        subMenuType,
    } = props;

    const parentBlocks = [];
    const parentClientIds = select('core/block-editor').getBlockParents(clientId);

    parentClientIds.map(parent => {
        parentBlocks.push(select('core/block-editor').getBlock(parent));
    });

    parentBlocks.push(select('core/block-editor').getBlock(clientId));

    return [
        {
            id: 'subMenuAlignment',
            label: __('Menu Alignment', 'gutenverse-pro'),
            allowDeviceControl: false,
            component: IconRadioControl,
            show: (subMenuType === 'mega-menu' || subMenuType === 'list') && orientation === 'horizontal',
            options: [
                {
                    label: __('Align Left', 'gutenverse-pro'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse-pro'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse-pro'),
                    value: 'right',
                    icon: <AlignRight />,
                },
            ],
            style: [{
                selector: `.guten-mega-menu .guten-mega-menu-item.${elementId} .mega-menu-body`,
                render: value => {
                    return `justify-content: ${value}`;
                }
            }]
        },
        {
            id: 'panelWrap',
            label: __('Choose Parent', 'gutenverse-pro'),
            component: ElementSelectorControl,
            show: subMenuType === 'mega-menu' || (subMenuType === 'list' && orientation === 'vertical'),
            blocks: parentBlocks,
            showChild: false,
            style: [
                {
                    selector: `.guten-mega-menu .guten-mega-menu-item.${elementId} .mega-menu-body`,
                    allowRender: () => subMenuType === 'mega-menu' || (subMenuType === 'list' && orientation === 'vertical'),
                    render: value => setPosition(value, orientation, breakpoint, elementId)
                }
            ]
        },
        {
            id: 'panelWidth',
            label: __('Width', 'gutenverse-pro'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 0,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 0,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: 0,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vh',
                    min: 0,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            style: [
                {
                    selector: `.guten-mega-menu .mega-menu-item.${elementId} .sub-menu`,
                    render: value => handleUnitPoint(value, 'width')
                },
                {
                    selector: `.guten-mega-menu .mega-menu-item.${elementId} .mega-menu-item-body`,
                    render: value => handleUnitPoint(value, 'width')
                },
                {
                    selector: `.guten-mega-menu .mega-menu-item.${elementId} .mega-menu-item-body`,
                    render: value => handleUnitPoint(value, 'min-width')
                },
            ]
        },
    ];
};