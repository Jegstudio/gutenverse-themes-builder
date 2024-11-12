import { BackgroundEffectControl } from '../../../controls/';
import { __ } from '@wordpress/i18n';
import { handleBackgroundEffect, handleInnerBackgroundEffect } from 'gutenverse-core/styling';

export const backgroundEffectOption = (result, props) => {
    const {
        selector,
        elementId
    } = props;

    return [
        {
            id: 'backgroundEffect',
            label: __('Background Effect', 'gutenverse-pro'),
            component: BackgroundEffectControl,
            style: [
                {
                    selector: selector ? selector : `.${elementId}> .guten-background-effect`,
                    hasChild: true,
                    render: (value) => handleBackgroundEffect(value)
                },
                {
                    selector: selector ? selector + ' .inner-background-container .child-effect' : `.${elementId}> .guten-background-effect .inner-background-container .child-effect`,
                    hasChild: true,
                    render: (value) => handleInnerBackgroundEffect(value)
                }
            ]
        }
    ];
};