import { NumberControl, SelectControl, TextControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';

export const popupOptions = (props, result) => {
    const {
        openTrigger,
    } = props;

    result = [
        ...result,
        {
            id: 'openAnchor',
            show: openTrigger === 'click' || openTrigger === 'hover',
            label: __('Anchor', 'gutenverse-pro'),
            description: __('Anchor text without "#"', 'gutenverse-pro'),
            component: TextControl,
        },
        {
            id: 'openMaxClick',
            label: __('Maximum Click', 'gutenverse-pro'),
            show: openTrigger === 'click' || openTrigger === 'hover',
            component: NumberControl,
            description: __('Leave empty if you want popup to open every click', 'gutenverse-pro'),
            min: 1,
            max: 9999,
            step: 1,
        }
    ];

    const openTriggerIndex = result.findIndex(value => {
        return value.id === 'openTrigger';
    });

    result[openTriggerIndex] = {
        id: 'openTrigger',
        label: __('Open Trigger'),
        component: SelectControl,
        options: [
            {
                label: __('On Load', 'gutenverse-pro'),
                value: 'load'
            },
            {
                label: __('On Anchor Click', 'gutenverse-pro'),
                value: 'click',
            },
            {
                label: __('On Anchor Hover', 'gutenverse'),
                value: 'anchorHover',
                pro: true,
                description: __('When a user hover on an anchor link, a pop-up can appear on the screen to display additional content or provide a specific call to action. ', 'gutenverse')
            },
            {
                label: __('On Scroll', 'gutenverse'),
                value: 'scroll',
                pro: true,
                description: __('Pop-ups that appear when a user scrolls down a web page can be an effective way to grab their attention and encourage engagement.', 'gutenverse')
            },
            {
                label: __('On Exit Intent', 'gutenverse'),
                value: 'exit',
                pro: true,
                description: __('Pop-ups that appear on exit intent are a type of pop-up that is triggered when a user attempts to leave a web page.', 'gutenverse')
            },
        ],
    };

    return result;
};