import { useEffect, useState, createPortal } from '@wordpress/element';
import { Link } from 'gutenverse-core/router';
import { __ } from '@wordpress/i18n';

const Navigation = ({ location }) => {
    const {
        pageSlug,
    } = window['GutenverseThemeBuilder'];

    const [injectLocation, setInjectLocation] = useState(null);
    const { pathname, search } = location;
    const query = new URLSearchParams(search);
    const path = query.get('path') ? query.get('path') : 'theme-list';

    const menus = [
        {
            name: __('Theme List', 'gutenverse'),
            slug: pageSlug,
            path: 'theme-list',
        },
        {
            name: __('Templates', 'gutenverse'),
            slug: pageSlug,
            path: 'manage-templates',
        },
        {
            name: __('Patterns', 'gutenverse'),
            slug: pageSlug,
            path: 'manage-patterns',
        },
        {
            name: __('Global Style', 'gutenverse'),
            slug: pageSlug,
            path: 'manage-global',
        },
        {
            name: __('Assets', 'gutenverse'),
            slug: pageSlug,
            path: 'manage-assets',
        },
        {
            name: __('Core Fonts', 'gutenverse'),
            slug: pageSlug,
            path: 'manage-fonts',
        },
        {
            name: __('Core Font Size', 'gutenverse'),
            slug: pageSlug,
            path: 'manage-font-sizes',
        },
        {
            name: __('Plugins', 'gutenverse'),
            slug: pageSlug,
            path: 'manage-plugins',
        },
        {
            name: __('Screenshots', 'gutenverse'),
            slug: pageSlug,
            path: 'manage-screenshots',
        },
        {
            name: __('Readme Editor', 'gutenverse'),
            slug: pageSlug,
            path: 'readme-editor',
        },
        {
            name: __('Export Theme', 'gutenverse'),
            slug: pageSlug,
            path: 'export-theme',
        },
    ];

    useEffect(() => {
        const submenu = document.querySelector('#toplevel_page_gutenverse-theme-builder > ul');
        const list = submenu.getElementsByTagName('li');
        Array.from(list).forEach(item => {
            item.remove();
        });
    }, []);

    setTimeout(() => {
        let injectLocation = document.querySelector('#toplevel_page_gutenverse-theme-builder .wp-submenu');
        setInjectLocation(injectLocation);
    }, 1);

    const navigationButton = <>
        <li className="wp-submenu-head" aria-hidden="true">Gutenverse</li>
        {menus.map((menu) => {
            let param = `?page=${menu.slug}`;

            if ('' !== menu.path) {
                param += `&path=${menu.path}`;
            }

            if (menu.pathDetail) {
                param += menu.pathDetail;
            }

            return <li key={menu.path} className={`${menu.path === path ? 'current' : ''}`}>
                <Link
                    index={`${menu.path}`}
                    to={{
                        pathname: pathname,
                        search: param,
                    }}
                >
                    {menu.name}
                </Link>
            </li>;
        })}
    </>;

    return <>
        <div className="navigation-wrapper">
            <div className="navigation-items">
                {menus.map((menu) => {
                    let param = `?page=${menu.slug}`;

                    if ('' !== menu.path) {
                        param += `&path=${menu.path}`;
                    }

                    if (menu.pathDetail) {
                        param += menu.pathDetail;
                    }

                    return <Link
                        index={menu.path}
                        key={menu.path}
                        to={{
                            pathname: pathname,
                            search: param,
                        }}
                        className={`navigation-item ${menu.path === path ? 'active' : ''}`}
                    >
                        {menu.name}
                    </Link>;
                })}
            </div>
            <div className="whats-new"></div>
        </div>
        {injectLocation && createPortal(navigationButton, injectLocation)}
    </>;
};

export default Navigation;
