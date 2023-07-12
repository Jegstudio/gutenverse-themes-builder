import { __ } from '@wordpress/i18n';
import { panelPattern } from './panel-pattern';

export const panelList = () => {
    return [
        {
            title: __('Pattern Wrapper', 'gutenverse'),
            panelArray: panelPattern
        }
    ];
};