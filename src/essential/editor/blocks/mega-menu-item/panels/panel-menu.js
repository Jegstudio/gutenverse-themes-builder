import { __ } from '@wordpress/i18n';
import { CheckboxControl, SelectControl } from 'gutenverse-core/controls';

export const menuPanel = (props) => {
    const {
        menus,
        subMenuType
    } = props;
    return [
        {
            id: 'subMenuType',
            label: __('Sub Menu Type', 'gutenverse-pro'),
            component: SelectControl,
            options: [
                {
                    label: __('None'),
                    value: 'none'
                },
                {
                    label: __('List'),
                    value: 'list'
                },
                {
                    label: __('Mega Menu'),
                    value: 'mega-menu'
                },
            ],
        },
        {
            id: 'subMenuList',
            label: __('Sub Menu List', 'gutenverse-pro'),
            component: SelectControl,
            options: menus,
            show: subMenuType === 'list'
        },
        {
            id: 'menuLinkDisable',
            label: __('Disable Link on Menu Item', 'gutenverse-pro'),
            component: CheckboxControl,
        },
    ];
};