import { handleTransform, handleTransformHover } from 'gutenverse-core/styling';
import { __ } from '@wordpress/i18n';
import { TransformControl } from '../../../controls/index';

export const transformOptions = (results, props) => {
    const {
        selector,
        hoverSelector,
        elementId
    } = props;

    return [
        {
            id: 'transform',
            label: __('Transform', 'gutenverse-pro'),
            component: TransformControl,
            proOptions: ['skew','opacity','perspective'],
            style: [
                {
                    selector: selector ? selector : `.${elementId}`,
                    hasChild: true,
                    render: value => handleTransform(value)
                },
                {
                    selector: hoverSelector ? hoverSelector : `.${elementId}:hover`,
                    hasChild: true,
                    render: value => handleTransformHover(value)
                }
            ]
        }
    ];
};