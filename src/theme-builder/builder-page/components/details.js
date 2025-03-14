import { __ } from '@wordpress/i18n';
import SelectControl from '../controls/select-control';
import TextControl from '../controls/text-control';
import TextareaControl from '../controls/textarea-control';
import { TAGS, THEME_MODE } from '../data/default';
import { useEffect, useState } from '@wordpress/element';

const Details = ({ notice, backButton, actionButton, themeData, setThemeData }) => {
    const [isCore, setIsCore] = useState(false);

    const updateDetails = (key) => {
        return value => {
            setThemeData({
                ...themeData,
                info_details: {
                    ...themeData?.info_details,
                    [key]: value
                }
            });
        };
    };

    useEffect(() => {
        if ('core-only' === themeData?.info_details?.theme_mode || 'core-gutenverse' === themeData?.info_details?.theme_mode) {
            setIsCore(true);
        } else {
            setIsCore(false);
        }
    }, [themeData]);

    return (
        <div className="theme-data-wrapper">
            <div className="data-header">
                {backButton}
                <h3 className="subtitle">{__('Theme Details', 'gutenverse-themes-builder')}</h3>
            </div>
            <div className="data-notice">
                {notice}
            </div>
            <div className="data-body">
                <TextControl
                    id={'slug'}
                    title={__('Slug', 'gutenverse-themes-builder')}
                    description={__('Theme slug (use lowercase letter only)', 'gutenverse-themes-builder')}
                    value={themeData?.info_details?.slug}
                    onChange={updateDetails('slug')}
                    important={true}
                />
                <TextControl
                    id={'title'}
                    title={__('Theme Title', 'gutenverse-themes-builder')}
                    description={__('Theme name that will present on client', 'gutenverse-themes-builder')}
                    value={themeData?.info_details?.title}
                    onChange={updateDetails('title')}
                    important={true}
                />
                <TextControl
                    id={'author_name'}
                    title={__('Author Name', 'gutenverse-themes-builder')}
                    description={__('Name of the theme\'s author', 'gutenverse-themes-builder')}
                    value={themeData?.info_details?.author_name}
                    onChange={updateDetails('author_name')}
                    important={true}
                />
                <TextControl
                    id={'author_uri'}
                    title={__('Author URI', 'gutenverse-themes-builder')}
                    description={__('Author\'s website or profile link (optional)', 'gutenverse-themes-builder')}
                    value={themeData?.info_details?.author_uri}
                    onChange={updateDetails('author_uri')}
                />
                <TextControl
                    id={'theme_uri'}
                    title={__('Theme URI', 'gutenverse-themes-builder')}
                    description={__('URL to a page about the theme (optional)', 'gutenverse-themes-builder')}
                    value={themeData?.info_details?.theme_uri}
                    onChange={updateDetails('theme_uri')}
                />
                <TextControl
                    id={'theme_version'}
                    title={__('Theme Version', 'gutenverse-themes-builder')}
                    description={__('The current version of the theme', 'gutenverse-themes-builder')}
                    value={themeData?.info_details?.theme_version}
                    onChange={updateDetails('theme_version')}
                    important={true}
                />
                <TextControl
                    id={'wp_min_version'}
                    title={__('Minimum WP Version', 'gutenverse-themes-builder')}
                    value={themeData?.info_details?.wp_min_version}
                    onChange={updateDetails('wp_min_version')}
                    description={__('Minimum Compatible Version', 'gutenverse-themes-builder')}
                    important={true}
                />
                <TextControl
                    id={'wp_tested_version'}
                    title={__('Tested Up To WP', 'gutenverse-themes-builder')}
                    value={themeData?.info_details?.wp_tested_version}
                    onChange={updateDetails('wp_tested_version')}
                    description={__('Minimum Compatible Version', 'gutenverse-themes-builder')}
                    important={true}
                />
                <TextControl
                    id={'php_version'}
                    title={__('PHP Version', 'gutenverse-themes-builder')}
                    description={__('Minimum PHP version required', 'gutenverse-themes-builder')}
                    value={themeData?.info_details?.php_version}
                    onChange={updateDetails('php_version')}
                    important={true}
                />
                <SelectControl
                    id={'theme_mode'}
                    title={__('Theme Mode', 'gutenverse-themes-builder')}
                    value={themeData?.info_details?.theme_mode}
                    options={THEME_MODE}
                    onChange={updateDetails('theme_mode')}
                    description={__('Select the mode for the theme', 'gutenverse-themes-builder')}
                    important={true}
                />
                <TextControl
                    id={'core_content_width'}
                    title={__('Content Width', 'gutenverse-themes-builder')}
                    value={themeData?.info_details?.core_content_width}
                    onChange={updateDetails('core_content_width')}
                    description={__('Width of the content area (in pixels)', 'gutenverse-themes-builder')}
                />
                <TextControl
                    id={'core_wide_width'}
                    title={__('Wide Size', 'gutenverse-themes-builder')}
                    value={themeData?.info_details?.core_wide_width}
                    onChange={updateDetails('core_wide_width')}
                    description={__('Width for wide layouts or media (in pixels)', 'gutenverse-themes-builder')}
                />
                <SelectControl
                    id={'tags'}
                    title={__('Theme Tags', 'gutenverse-themes-builder')}
                    description={__('Tags for categorizing the theme', 'gutenverse-themes-builder')}
                    value={themeData?.info_details?.tags}
                    options={TAGS}
                    isMulti={true}
                    classNamePrefix={'tag-select'}
                    onChange={updateDetails('tags')}
                />
                <TextareaControl
                    id={'description'}
                    title={__('Description', 'gutenverse-themes-builder')}
                    description={__('A description of the theme and its features', 'gutenverse-themes-builder')}
                    value={themeData?.info_details?.description}
                    onChange={updateDetails('description')}
                />
            </div>
            <div className="data-footer">
                {actionButton}
            </div>
        </div>
    );
};

export default (props) => {
    return <Details {...props} />;
};