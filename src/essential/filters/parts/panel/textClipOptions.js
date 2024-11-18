import { TextClipControl } from '../../../controls/index';
import { __ } from '@wordpress/i18n';
import { handleTextClip } from 'gutenverse-core/styling';

export const textClipOptions = (results, props) => {
    const {
        textClipId,
        textClipSelector,
    } = props;

    return [
        {
            id: textClipId,
            label: __('Text Clip', 'gutenverse-pro'),
            component: TextClipControl,
            style: [
                {
                    selector: textClipSelector,
                    hasChild: true,
                    render: value => handleTextClip(value)
                }
            ]
        }
    ];
};