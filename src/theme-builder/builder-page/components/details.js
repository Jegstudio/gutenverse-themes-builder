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
                <h3 className="subtitle">{__('Theme Details', 'gtb')}</h3>
            </div>
            <div className="data-notice">
                {notice}
            </div>
            <div className="data-body">
                <TextControl
                    id={'slug'}
                    title={__('Slug', 'gtb')}
                    value={themeData?.info_details?.slug}
                    onChange={updateDetails('slug')}
                    important={true}
                />
                <TextControl
                    id={'title'}
                    title={__('Title', 'gtb')}
                    value={themeData?.info_details?.title}
                    onChange={updateDetails('title')}
                    important={true}
                />
                <TextControl
                    id={'author_name'}
                    title={__('Author Name', 'gtb')}
                    value={themeData?.info_details?.author_name}
                    onChange={updateDetails('author_name')}
                    important={true}
                />
                <TextControl
                    id={'author_uri'}
                    title={__('Author URI', 'gtb')}
                    value={themeData?.info_details?.author_uri}
                    onChange={updateDetails('author_uri')}
                />
                <TextControl
                    id={'theme_uri'}
                    title={__('Theme URI', 'gtb')}
                    value={themeData?.info_details?.theme_uri}
                    onChange={updateDetails('theme_uri')}
                />
                <TextControl
                    id={'theme_version'}
                    title={__('Theme Version', 'gtb')}
                    value={themeData?.info_details?.theme_version}
                    onChange={updateDetails('theme_version')}
                    important={true}
                />
                <TextControl
                    id={'wp_min_version'}
                    title={__('Minimum WP Version', 'gtb')}
                    value={themeData?.info_details?.wp_min_version}
                    onChange={updateDetails('wp_min_version')}
                    important={true}
                />
                <TextControl
                    id={'wp_tested_version'}
                    title={__('Tested Up To WP', 'gtb')}
                    value={themeData?.info_details?.wp_tested_version}
                    onChange={updateDetails('wp_tested_version')}
                    important={true}
                />
                <TextControl
                    id={'php_version'}
                    title={__('PHP Version', 'gtb')}
                    value={themeData?.info_details?.php_version}
                    onChange={updateDetails('php_version')}
                    important={true}
                />
                <SelectControl
                    id={'theme_mode'}
                    title={__('Theme Mode', 'gtb')}
                    value={themeData?.info_details?.theme_mode}
                    options={THEME_MODE}
                    onChange={updateDetails('theme_mode')}
                    important={true}
                />
                <TextControl
                    id={'core_content_width'}
                    title={__('Content Width', 'gtb')}
                    value={themeData?.info_details?.core_content_width}
                    onChange={updateDetails('core_content_width')}
                />
                <TextControl
                    id={'core_wide_width'}
                    title={__('Wide Size', 'gtb')}
                    value={themeData?.info_details?.core_wide_width}
                    onChange={updateDetails('core_wide_width')}
                />
                <SelectControl
                    id={'tags'}
                    title={__('Theme Tags', 'gtb')}
                    value={themeData?.info_details?.tags}
                    options={TAGS}
                    isMulti={true}
                    onChange={updateDetails('tags')}
                />
                <TextareaControl
                    id={'description'}
                    title={__('Description', 'gtb')}
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