import { __ } from '@wordpress/i18n';
import { RepeaterControl, TextControl, IconControl, SelectControl, SizeControl, ImageControl, RangeControl, CheckboxControl } from 'gutenverse-core/controls';
import { handleUnitPoint } from 'gutenverse-core/styling';

export const itemsPanel = (props) => {
    const {
        elementId
    } = props;
    return [
        {
            id: 'childs',
            label: __('Tab Headers', 'gutenverse-pro'),
            component: RepeaterControl,
            titleFormat: (value) => {
                if (value.text) {
                    return `<strong>${value.text}</strong>`;
                } else {
                    return __('Enter Tab Title', 'gutenverse-pro');
                }
            },
            repeaterDefault: {
                text: 'Tab Title',
                type: '',
                position: 'left',
            },
            isDragable: false,
            isDuplicate : false,
            isAddNew : false,
            isRemove : false,
            options: [
                {
                    id: 'text',
                    label: __('Label', 'gutenverse-pro'),
                    component: TextControl,
                },
                {
                    id: 'type',
                    label: __('Icon Type', 'gutenverse-pro'),
                    component: SelectControl,
                    options: [
                        {
                            label: 'None',
                            value: ''
                        },
                        {
                            label: 'Icon',
                            value: 'icon'
                        },
                        {
                            label: 'Image',
                            value: 'image'
                        },
                    ],
                },
                {
                    id: 'position',
                    label: __('Position'),
                    show: value => value.type === 'icon' || value.type === 'image',
                    component: SelectControl,
                    options: [
                        {
                            label: __('Left', 'gutenverse-pro'),
                            value: 'left'
                        },
                        {
                            label: __('Right', 'gutenverse-pro'),
                            value: 'right'
                        },
                    ],
                },
                {
                    id: 'icon',
                    show: value => value.type === 'icon',
                    label: __('Icon', 'gutenverse-pro'),
                    component: IconControl,
                },
                {
                    id: 'iconSize',
                    label: __('Icon Size', 'gutenverse-pro'),
                    component: SizeControl,
                    allowDeviceControl: true,
                    show: value => value.type === 'icon',
                    units: {
                        px: {
                            text: 'px',
                            min: 1,
                            max: 100,
                            step: 1
                        },
                        em: {
                            text: 'em',
                            min: 0.1,
                            max: 3,
                            step: 0.1
                        },
                    },
                    style: [
                        {
                            selector: (index,{props}) => {
                                return `.${elementId} .advance-tab-heading .advance-tab-heading-item[data-id="${props.tabId}"] .item-icon i, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-dinamic-title .item-icon i, .${elementId} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item[data-id="${props.tabId}"]  .item-icon i`;
                            },
                            render: value => handleUnitPoint(value, 'font-size')
                        }
                    ]
                },
                {
                    id: 'image',
                    show: value => value.type === 'image',
                    label: __('Image', 'gutenverse-pro'),
                    component: ImageControl,
                },
                {
                    id: 'imageAlt',
                    show: value => value.type === 'image',
                    label: __('Image Alt', 'gutenverse-pro'),
                    component: TextControl,
                },
                {
                    id: 'imageLazyMode',
                    show: value => value.type === 'image',
                    label: __('Set Lazy Load', 'gutenverse-pro'),
                    component: CheckboxControl,
                },
                {
                    id: 'imageWidth',
                    show: value => value.type === 'image',
                    label: __('Width', 'gutenverse-pro'),
                    component: SizeControl,
                    allowDeviceControl: true,
                    units: {
                        px: {
                            text: 'px',
                            min: 1,
                            max: 1000,
                            step: 1
                        },
                        ['%']: {
                            text: '%',
                            min: 1,
                            max: 100,
                            step: 1
                        },
                        vw: {
                            text: 'vw',
                            min: 1,
                            max: 100,
                            step: 1
                        },
                    },
                    style: [
                        {
                            selector: (index,{props}) => {
                                return `.${elementId} .advance-tab-heading .advance-tab-heading-item[data-id="${props.tabId}"] .item-image img, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-dinamic-title .item-image img, .${elementId} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item[data-id="${props.tabId}"]  .item-image img`;
                            },
                            render: value => handleUnitPoint(value, 'width')
                        },
                    ],
                },
                {
                    id: 'imageHeight',
                    show: value => value.type === 'image',
                    label: __('Height', 'gutenverse-pro'),
                    component: SizeControl,
                    allowDeviceControl: true,
                    units: {
                        px: {
                            text: 'px',
                            min: 1,
                            max: 500,
                            step: 1
                        },
                        vh: {
                            text: 'vh',
                            min: 1,
                            max: 100,
                            step: 1
                        },
                    },
                    style: [
                        {
                            selector: (index,{props}) => {
                                return `.${elementId} .advance-tab-heading .advance-tab-heading-item[data-id="${props.tabId}"] .item-image img, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-dinamic-title .item-image img, .${elementId} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item[data-id="${props.tabId}"] .item-image img`;
                            },
                            render: value => handleUnitPoint(value, 'height')
                        },
                    ],
                },
                {
                    id: 'imageOpacity',
                    show: value => value.type === 'image',
                    label: __('Opacity', 'gutenverse-pro'),
                    component: RangeControl,
                    min: 0.1,
                    max: 1,
                    step: 0.1,
                    style: [
                        {
                            selector: (index,{props}) => {
                                return `.${elementId} .advance-tab-heading .advance-tab-heading-item[data-id="${props.tabId}"] .item-image img, .${elementId} .advance-tab-heading-mobile .advance-tab-heading-item-mobile .advance-tab-dinamic-title .item-image img, .${elementId} .advance-tab-heading-mobile .advance-tab-option .advance-tab-option-item[data-id="${props.tabId}"]  .item-image img`;
                            },
                            render: value => `opacity: ${value};`
                        },
                    ],
                },
            ]
        },
    ];
};