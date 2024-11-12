import { handleBackground, handleBorder, handleBorderResponsive, handleColor, handleDimension, handleTextClip, handleTypography, } from 'gutenverse-core/styling';
import { BackgroundControl, BorderControl, BorderResponsiveControl, ColorControl, DimensionControl, HeadingControl, RepeaterControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import isEmpty from 'lodash/isEmpty';
import { __ } from '@wordpress/i18n';
import { TextClipControl } from '../../../controls/index';

export const hightlightPanel = (results, props) => {
    const {
        elementId,
        setSwitcher,
        switcher,
        openChild,
        arrOfTextChilds
    } = props;

    const objectOfPanelChilds = {
        component: RepeaterControl,
        titleFormat: '<strong><%= value.value.innerHTML%></strong>',
        refreshDrag: false,
        isDuplicate: false,
        isAddNew: false,
        isRemove: false,
        isDragable: false,
        isReset: true,
        openChild: openChild,
        resetStatus: (values) => !isEmpty(values.background) || !isEmpty(values.backgroundHover) || !isEmpty(values.color) || !isEmpty(values.colorHover) || !isEmpty(values.textClip) || !isEmpty(values.textClipHover) || !isEmpty(values.typography) || !isEmpty(values.typographyHover),
        resetMethod: (index, values, onStyleChange, onValueChange, refreshStyle) => {
            values[index] = {
                ...values[index],
                background: {},
                backgroundHover: {},
                color: {},
                colorHover: {},
                margin: {},
                marginHover: {},
                padding: {},
                paddingHover: {},
                textClip: {},
                textClipHover: {},
                typography: {},
                typographyHover: {},
            };
            onStyleChange(values);
            onValueChange(values);
            refreshStyle();
        },
        infoMessage: {
            title: __('How to use HighLight', 'gutenverse-pro'),
            list: [
                {
                    title: __('Adding Child', 'gutenverse-pro'),
                    description: __('Use Gutenverse Highlight to your text that you want to make it a child', 'gutenverse-pro')
                },
                {
                    title: __('Removing Child', 'gutenverse-pro'),
                    description: __('Remove Gutenverse Highlight from your text', 'gutenverse-pro')
                }
            ]
        },
        booleanSwitcher: true,
        options: [
            {
                id: '__childHover',
                component: SwitchControl,
                show: true,
                options: [
                    {
                        value: 'normal',
                        label: 'Normal'
                    },
                    {
                        value: 'hover',
                        label: 'Hover'
                    }
                ],
                onChange: ({ __childHover }) => setSwitcher({ ...switcher, layout: __childHover })
            },
            {
                id: 'color',
                label: __('Text color', 'gutenverse-pro'),
                component: ColorControl,
                show: !switcher.layout || switcher.layout === 'normal',
                style: [
                    {
                        selector: (index, { props }) => {
                            return `.${elementId} #${props.id}`;
                        },
                        render: value => {
                            return handleColor(value, 'color');
                        }
                    }
                ]
            },
            {
                id: 'colorHover',
                label: __('Text color', 'gutenverse-pro'),
                component: ColorControl,
                show: switcher.layout === 'hover',
                style: [
                    {
                        selector: (index, { props }) => {
                            return `.${elementId} #${props.id}:hover`;
                        },
                        render: value => {
                            return handleColor(value, 'color');
                        }
                    }
                ]
            },
            {
                id: 'typography',
                label: __('Typography', 'gutenverse-pro'),
                component: TypographyControl,
                show: !switcher.layout || switcher.layout === 'normal',
                style: [
                    {
                        selector: (index, { props }) => {
                            return `.${elementId} #${props.id}`;
                        },
                        hasChild: true,
                        render: (value, id) => handleTypography(value, props, id)
                    }
                ]
            },
            {
                id: 'typographyHover',
                label: __('Typography', 'gutenverse-pro'),
                component: TypographyControl,
                show: switcher.layout === 'hover',
                style: [
                    {
                        selector: (index, { props }) => {
                            return `.${elementId} #${props.id}:hover`;
                        },
                        hasChild: true,
                        render: (value, id) => handleTypography(value, props, id)
                    }
                ]
            },
            {
                id: 'textClip',
                label: __('Text Clip', 'gutenverse-pro'),
                component: TextClipControl,
                show: (!switcher.layout || switcher.layout === 'normal'),
                style: [
                    {
                        selector: (index, { props }) => {
                            return `.${elementId} #${props.id}`;
                        },
                        hasChild: true,
                        render: value => handleTextClip(value)
                    }
                ]
            },
            {
                id: 'textClipHover',
                label: __('Text Clip', 'gutenverse-pro'),
                component: TextClipControl,
                show: switcher.layout === 'hover',
                style: [
                    {
                        selector: (index, { props }) => {
                            return `.${elementId} #${props.id}:hover`;
                        },
                        hasChild: true,
                        render: value => handleTextClip(value)
                    }
                ]
            },
            {
                id: 'background',
                label: __('Background', 'gutenverse-pro'),
                show: !switcher.layout || switcher.layout === 'normal',
                component: BackgroundControl,
                options: ['default', 'gradient'],
                style: [
                    {
                        selector: (index, { props }) => {
                            return `.${elementId} #${props.spanId}`;
                        },
                        hasChild: true,
                        render: value => {
                            return handleBackground(value);
                        }
                    }
                ]
            },
            {
                id: 'backgroundHover',
                label: __('Background', 'gutenverse-pro'),
                show: switcher.layout === 'hover',
                component: BackgroundControl,
                options: ['default', 'gradient'],
                style: [
                    {
                        selector: (index, { props }) => {
                            return `.${elementId} #${props.spanId}:hover`;
                        },
                        hasChild: true,
                        render: value => handleBackground(value)
                    }
                ]
            },
            {
                id: 'margin',
                label: __('Margin', '--gctd--'),
                component: DimensionControl,
                allowDeviceControl: true,
                show: (!switcher.layout || switcher.layout === 'normal'),
                position: ['top', 'right', 'bottom', 'left'],
                units: {
                    px: {
                        text: 'px',
                        unit: 'px'
                    },
                    em: {
                        text: 'em',
                        unit: 'em'
                    },
                    ['%']: {
                        text: '%',
                        unit: '%'
                    },
                    rem: {
                        text: 'rem',
                        unit: 'rem'
                    },
                },
                style: [
                    {
                        selector: (index, { props }) => {
                            return `.${elementId} #${props.spanId}`;
                        },
                        frontendSelector: (index, { props }) => {
                            return `.${elementId} #${props.spanId}`;
                        },
                        render: value => {
                            return handleDimension(value, 'margin');
                        }
                    }
                ]
            },
            {
                id: 'padding',
                label: __('Padding', '--gctd--'),
                component: DimensionControl,
                allowDeviceControl: true,
                show: (!switcher.layout || switcher.layout === 'normal'),
                position: ['top', 'right', 'bottom', 'left'],
                units: {
                    px: {
                        text: 'px',
                        unit: 'px'
                    },
                    em: {
                        text: 'em',
                        unit: 'em'
                    },
                    ['%']: {
                        text: '%',
                        unit: '%'
                    },
                    rem: {
                        text: 'rem',
                        unit: 'rem'
                    },
                },
                style: [
                    {
                        selector: (index, { props }) => {
                            return `.${elementId} #${props.id}`;
                        },
                        frontendSelector: (index, { props }) => {
                            return `.${elementId} #${props.id}`;
                        },
                        render: value => {
                            return handleDimension(value, 'padding');
                        }
                    }
                ]
            },
            {
                id: 'marginHover',
                label: __('Margin', '--gctd--'),
                component: DimensionControl,
                allowDeviceControl: true,
                show: switcher.layout === 'hover',
                position: ['top', 'right', 'bottom', 'left'],
                units: {
                    px: {
                        text: 'px',
                        unit: 'px'
                    },
                    em: {
                        text: 'em',
                        unit: 'em'
                    },
                    ['%']: {
                        text: '%',
                        unit: '%'
                    },
                    rem: {
                        text: 'rem',
                        unit: 'rem'
                    },
                },
                style: [
                    {
                        selector: (index, { props }) => {
                            return `.${elementId} #${props.spanId}:hover`;
                        },
                        frontendSelector: (index, { props }) => {
                            return `.${elementId} #${props.spanId}:hover`;
                        },
                        render: value => {
                            return handleDimension(value, 'margin');
                        }
                    }
                ]
            },
            {
                id: 'paddingHover',
                label: __('Padding', '--gctd--'),
                component: DimensionControl,
                allowDeviceControl: true,
                show: switcher.layout === 'hover',
                position: ['top', 'right', 'bottom', 'left'],
                units: {
                    px: {
                        text: 'px',
                        unit: 'px'
                    },
                    em: {
                        text: 'em',
                        unit: 'em'
                    },
                    ['%']: {
                        text: '%',
                        unit: '%'
                    },
                    rem: {
                        text: 'rem',
                        unit: 'rem'
                    },
                },
                style: [
                    {
                        selector: (index, { props }) => {
                            return `.${elementId} #${props.id}:hover`;
                        },
                        frontendSelector: (index, { props }) => {
                            return `.${elementId} #${props.id}:hover`;
                        },
                        render: value => {
                            return handleDimension(value, 'padding');
                        }
                    }
                ]
            },
            {
                id: 'borderNormal',
                show: (!switcher.layout || switcher.layout === 'normal'),
                label: __('Border Type', 'gutenverse-pro'),
                component: BorderResponsiveControl,
                allowDeviceControl: true,
                style: [
                    {
                        selector: (index, { props }) => {
                            return `.${elementId} #${props.id}`;
                        },
                        render: value => handleBorderResponsive(value)
                    }
                ]
            },
            {
                id: 'borderHover',
                show: switcher.layout === 'hover',
                label: __('Border Type', 'gutenverse-pro'),
                component: BorderResponsiveControl,
                allowDeviceControl: true,
                style: [
                    {
                        selector: (index, { props }) => {
                            return `.${elementId} #${props.id}:hover`;
                        },
                        render: value => handleBorderResponsive(value)
                    }
                ]
            },
        ],
    };
    const objectOfPanelSplitter = {
        component: HeadingControl,
    };
    let arrPanel = [];
    arrOfTextChilds.forEach(el => {
        let splitter = {...objectOfPanelSplitter};
        let repeater = {...objectOfPanelChilds};
        repeater.id = el;
        splitter.label = `${el.replace('Childs','')} Panel`;
        splitter.id = `${el}Panel`;
        if(arrOfTextChilds.length > 1){
            arrPanel = [...arrPanel,splitter];
        }
        arrPanel = [...arrPanel,repeater];
    });
    return arrPanel;
};