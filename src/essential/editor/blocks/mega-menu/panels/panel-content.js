import { __ } from '@wordpress/i18n';
import React from 'react';
import { IconControl, IconRadioControl, SelectControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'react-feather';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const contentPanel = (props) => {
    const {
        elementId,
        orientation,
        breakpoint,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'alignment',
            label: __('Alignment', 'gutenverse-pro'),
            show: orientation === 'horizontal',
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse-pro'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse-pro'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse-pro'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
                {
                    label: __('Align Right', 'gutenverse-pro'),
                    value: 'space-between',
                    icon: <AlignJustify />,
                },
            ],
            style: [
                {
                    selector: `.${elementId}.horizontal .mega-menu-item-panel`,
                    render: value => `justify-content: ${value};`,
                },
            ]
        },
        {
            id: 'alignmentVertical',
            label: __('Alignment', 'gutenverse-pro'),
            show: orientation === 'vertical',
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse-pro'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Right', 'gutenverse-pro'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
            ],
            style: [
                {
                    selector: `.${elementId}.vertical, .${elementId}.vertical .mega-menu-heading`,
                    render: value => `justify-content: ${value};`,
                },
            ]
        },
        {
            id: 'breakpoint',
            label: __('Responsive Breakpoint', 'gutenverse-pro'),
            component: SelectControl,
            options: [
                {
                    label: __('Tablet', 'gutenverse-pro'),
                    value: 'tablet',
                },
                {
                    label: __('Mobile', 'gutenverse-pro'),
                    value: 'mobile',
                },
            ],
        },
        {
            id: 'orientation',
            label: __('Orientation', 'gutenverse-pro'),
            component: SelectControl,
            options: [
                {
                    label: __('Horizontal'),
                    value: 'horizontal'
                },
                {
                    label: __('Vertical'),
                    value: 'vertical'
                },
            ],
        },
        {
            id: 'verticalItemPosition',
            label: __('Vertical Item Position', 'gutenverse-pro'),
            component: SelectControl,
            show: orientation === 'vertical',
            allowDeviceControl: true,
            options: [
                {
                    label: __('Left'),
                    value: 'left'
                },
                {
                    label: __('Right'),
                    value: 'right'
                },
            ],
            style: [
                {
                    selector: `.${elementId}.guten-mega-menu.vertical .mega-menu-body`,
                    render: (value) => {
                        let style;

                        if (! breakpoint
                            || ( breakpoint === 'mobile' && device.toLowerCase() !== 'mobile' )
							|| ( breakpoint === 'tablet' && device.toLowerCase() !== 'tablet' && device.toLowerCase() !== 'mobile' )
                        ) {
                            if (value === 'left') {
                                style = 'left: unset; right: 100%;';
                            } else if (value === 'right') {
                                style = 'left: 100%; right: unset;';
                            }
                        } else {
                            style = 'top: 100%; left: 0; right: unset;';
                        }

                        return style;
                    }
                }
            ]
        },
        {
            id: 'indicator',
            label: __('Indicator', 'gutenverse-pro'),
            component: IconControl,
        },
    ];
};