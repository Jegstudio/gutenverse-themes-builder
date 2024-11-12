import { SelectControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import isEmpty from 'lodash/isEmpty';

export const contentPanel = (props) => {
    const {
        elementId,
        selector,
    } = props;
    const checkSelector = !isEmpty(selector) ? selector : `.${elementId}.guten-element`;

    return [
        {
            id: 'orientation',
            label: __('Tab Orientation', 'gutenverse-pro'),
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
            style: [
                {
                    selector: checkSelector,
                    allowRender: value => value,
                    render: value => {
                        if (value === 'horizontal') {
                            return 'display: block';
                        } else if (value === 'vertical') {
                            return 'display: flex;';
                        }
                    }
                },
                {
                    selector: `${checkSelector} .advace-tab-heading-wrapper`,
                    allowRender: value => value,
                    render: value => {
                        if (value === 'vertical') {
                            return 'display: block';
                        } else if (value === 'horizontal') {
                            return 'display: flex;';
                        }
                    }
                },
            ]
        },
        {
            id: 'tabHorizontalHeader',
            label: __('Horizontal Header', 'gutenverse-pro'),
            show: props.orientation === 'horizontal',
            component: SelectControl,
            options: [
                {
                    label: __('Start'),
                    value: 'start'
                },
                {
                    label: __('Center'),
                    value: 'center'
                },
                {
                    label: __('End'),
                    value: 'end'
                },

            ],
            style: [
                {
                    selector: `${checkSelector} .advance-tab-heading-wrapper`,
                    allowRender: value => value,
                    render: value => {
                        return `justify-content: ${value};`;
                    }
                },
                {
                    selector: `${checkSelector} .advance-tab-heading-wrapper .advance-tab-heading`,
                    allowRender: value => value,
                    render: value => {
                        return `justify-content: ${value};`;
                    }
                },
            ]
        },
    ];
};