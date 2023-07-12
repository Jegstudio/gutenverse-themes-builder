/**
 * Given a string, returns a new string with dash separators converted to
 * camel-case equivalent. This is not as aggressive as `_.camelCase`, which
 * which would also upper-case letters following numbers.
 *
 * @param {string} string Input dash-delimited string.
 *
 * @return {string} Camel-cased string.
 */
const camelCaseDash = string => string.replace(
	/-([a-z])/g,
	( match, letter ) => letter.toUpperCase()
);

/**
 * Define externals to load components through the wp global.
 */
const wpExternals = [
	'api',
	'api-fetch',
	'block-editor',
	'blocks',
	'components',
	'compose',
	'data',
	'date',
	'html-entities',
	'hooks',
    'editor',
	'element',
	'i18n',
	'plugins',
	'viewport',
	'ajax',
	'codeEditor',
	'rich-text',
	'url',
	'keyboard-shortcuts',
	'token-list',
	'keycodes',
	'escape-html',
    'core-data'
].reduce( ( externals, name ) => ( {
	...externals,
	[ `@wordpress/${ name }` ]: `wp.${ camelCaseDash( name ) }`,
} ), {} );

const editorExternals = [
    'animation',
    'components',
    'controls',
    'hoc',
    'hooks',
    'toolbars',
    'icons',
    'store',
    'requests',
	'router',
    'config',
    'frontend',
    'helper',
    'editor-helper'
].reduce( ( externals, name ) => ( {
	...externals,
	[ `gutenverse-core/${ name }` ]: `gutenverseCore.${ camelCaseDash( name ) }`,
} ), {} );

const frontendExternals = [
    'frontend',
    'helper',
	'components',
].reduce( ( externals, name ) => ( {
	...externals,
	[ `gutenverse-core/${ name }` ]: `gutenverseCore.${ camelCaseDash( name ) }`,
} ), {} );

const backendExternals = [
    'icons',
	'config',
    'store',
    'requests',
    'backend',
    'components',
    'controls',
    'hoc',
    'helper',
    'frontend',
	'router',
	'editor-helper',
].reduce( ( externals, name ) => ( {
	...externals,
	[ `gutenverse-core/${ name }` ]: `gutenverseCore.${ camelCaseDash( name ) }`,
} ), {} );

const externals = {
	wp: 'wp',
	lodash: 'lodash', // WP loads lodash already.
	fetch: 'fetch', // Used in our debugger sidebar.
	// react: 'wp.element', // Use the bundled React in Gutenberg. (not working see https://github.com/WordPress/gutenberg/issues/33674)
	'react-dom': 'wp.element', // Use the bundled ReactDom in Gutenberg.
	...wpExternals,
}

module.exports = {
	externals,
    editorExternals,
    frontendExternals,
    backendExternals
};
