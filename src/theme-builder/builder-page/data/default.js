import { __ } from '@wordpress/i18n';

export const DEFAULT_DATA = {
    info_details: {
        theme_version: '1.0.0',
        wp_min_version: '6.5',
        wp_tested_version: '6.5',
        php_version: '7.0',
        core_content_width: '1140px',
        core_wide_width: '1200px',
    }
};

export const CATEGORIES = [
    {
        id: 'core',
        name: __('Core Templates', 'gutenverse-themes-builder')
    },
    {
        id: 'gutenverse',
        name: __('Gutenverse Templates', 'gutenverse-themes-builder')
    },
    {
        id: 'pro',
        name: __('Gutenverse PRO Templates', 'gutenverse-themes-builder')
    }
];

export const TEMPLATE_TYPES = [
    {
        value: 'index',
        label: __('Index', 'gutenverse-themes-builder')
    },
    {
        value: 'front-page',
        label: __('Front Page', 'gutenverse-themes-builder')
    },
    {
        value: 'home',
        label: __('Home', 'gutenverse-themes-builder')
    },
    {
        value: 'page',
        label: __('Page', 'gutenverse-themes-builder')
    },
    {
        value: 'single',
        label: __('Single', 'gutenverse-themes-builder')
    },
    {
        value: 'archive',
        label: __('Archive', 'gutenverse-themes-builder')
    },
    {
        value: 'author',
        label: __('Author', 'gutenverse-themes-builder')
    },
    {
        value: 'category',
        label: __('Category', 'gutenverse-themes-builder')
    },
    {
        value: 'date',
        label: __('Date', 'gutenverse-themes-builder')
    },
    {
        value: 'tag',
        label: __('Tag', 'gutenverse-themes-builder')
    },
    {
        value: 'taxonomy',
        label: __('Taxonomy', 'gutenverse-themes-builder')
    },
    {
        value: 'search',
        label: __('Search', 'gutenverse-themes-builder')
    },
    {
        value: '404',
        label: __('404', 'gutenverse-themes-builder')
    },
    {
        value: 'custom_template',
        label: __('Custom Template', 'gutenverse-themes-builder')
    },
    {
        value: 'header',
        label: __('Header', 'gutenverse-themes-builder')
    },
    {
        value: 'footer',
        label: __('Footer', 'gutenverse-themes-builder')
    },
    {
        value: 'template_part',
        label: __('Template Part', 'gutenverse-themes-builder')
    }
];

export const NAMABLE_TEMPLATES = [
    'custom_template',
    'header',
    'footer',
    'template_part',
];

export const THEME_MODE = [
    {
        value: 'core-gutenverse',
        label: 'Core and Gutenverse'
    },
    {
        value: 'gutenverse-pro',
        label: 'Gutenverse and PRO version'
    },
    {
        value: 'core-only',
        label: 'Core Only'
    },
    {
        value: 'gutenverse-only',
        label: 'Gutenverse Only'
    },
    {
        value: 'pro-only',
        label: 'Pro Only'
    },
];

export const TAGS = [
    {
        value: 'grid-layout',
        label: 'grid-layout'
    },
    {
        value: 'one-column',
        label: 'one-column'
    },
    {
        value: 'two-columns',
        label: 'two-columns'
    },
    {
        value: 'three-columns',
        label: 'three-columns'
    },
    {
        value: 'four-columns',
        label: 'four-columns'
    },
    {
        value: 'left-sidebar',
        label: 'left-sidebar'
    },
    {
        value: 'right-sidebar',
        label: 'right-sidebar'
    },
    {
        value: 'wide-blocks',
        label: 'wide-blocks'
    },
    {
        value: 'accessibility-ready',
        label: 'accessibility-ready'
    },
    {
        value: 'block-patterns',
        label: 'block-patterns'
    },
    {
        value: 'block-styles',
        label: 'block-styles'
    },
    {
        value: 'buddypress',
        label: 'buddypress'
    },
    {
        value: 'custom-background',
        label: 'custom-background'
    },
    {
        value: 'custom-colors',
        label: 'custom-colors'
    },
    {
        value: 'custom-header',
        label: 'custom-header'
    },
    {
        value: 'custom-logo',
        label: 'custom-logo'
    },
    {
        value: 'custom-menu',
        label: 'custom-menu'
    },
    {
        value: 'editor-style',
        label: 'editor-style'
    },
    {
        value: 'featured-image-header',
        label: 'featured-image-header'
    },
    {
        value: 'featured-images',
        label: 'featured-images'
    },
    {
        value: 'flexible-header',
        label: 'flexible-header'
    },
    {
        value: 'footer-widgets',
        label: 'footer-widgets'
    },
    {
        value: 'front-page-post-form',
        label: 'front-page-post-form'
    },
    {
        value: 'full-site-editing',
        label: 'full-site-editing'
    },
    {
        value: 'full-width-template',
        label: 'full-width-template'
    },
    {
        value: 'microformats',
        label: 'microformats'
    },
    {
        value: 'post-formats',
        label: 'post-formats'
    },
    {
        value: 'rtl-language-support',
        label: 'rtl-language-support'
    },
    {
        value: 'sticky-post',
        label: 'sticky-post'
    },
    {
        value: 'style-variations',
        label: 'style-variations'
    },
    {
        value: 'template-editing',
        label: 'template-editing'
    },
    {
        value: 'theme-options',
        label: 'theme-options'
    },
    {
        value: 'threaded-comments',
        label: 'threaded-comments'
    },
    {
        value: 'translation-ready',
        label: 'translation-ready'
    },
    {
        value: 'blog',
        label: 'blog'
    },
    {
        value: 'e-commerce',
        label: 'e-commerce'
    },
    {
        value: 'education',
        label: 'education'
    },
    {
        value: 'entertainment',
        label: 'entertainment'
    },
    {
        value: 'food-and-drink',
        label: 'food-and-drink'
    },
    {
        value: 'holiday',
        label: 'holiday'
    },
    {
        value: 'news',
        label: 'news'
    },
    {
        value: 'photography',
        label: 'photography'
    },
    {
        value: 'portfolio',
        label: 'portfolio'
    },
];
