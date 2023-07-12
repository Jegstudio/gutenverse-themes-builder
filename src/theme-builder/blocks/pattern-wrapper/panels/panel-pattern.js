import { __ } from '@wordpress/i18n';
import ButtonControl from '../../../controls/button/button-control';
import { dispatch } from '@wordpress/data';

export const panelPattern = (props) => {
    const {
        setAttributes,
        clientId,
    } = props;

    return [
        {
            id: 'reset',
            label: __('Reset Pattern Mode', 'gutenverse'),
            component: ButtonControl,
            onClick: () => {
                const { replaceInnerBlocks } = dispatch('core/block-editor');
                replaceInnerBlocks(clientId, []);
                setAttributes({
                    mode: '',
                    pattern: null
                });
            }
        }
    ];
};