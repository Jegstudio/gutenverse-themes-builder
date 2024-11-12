const themeBuilderBlocks = require("./scripts/theme-builder-blocks");
const themeBuilderDefaultDashboard = require("./scripts/theme-builder-default-dashboard");
const themeBuilderThemeforestDashboard = require("./scripts/theme-builder-themeforest-dashboard");
const themeBuilderLiteDashboard = require("./scripts/theme-builder-lite-dashboard");
const themeBuilderEditor = require("./scripts/theme-builder-editor");
const themeBuilderPage = require("./scripts/theme-builder-page");
const { dashboard } = require("./scripts/dashboard");
const admin = require("./scripts/admin");
const {filter} = require('./scripts/essential/filter');
const {blocksHelper} = require('./scripts/essential/block-helper');
const {blocks} = require('./scripts/essential/blocks');
const {frontend} = require('./scripts/essential/frontend');
const {profrontend} = require('./scripts/essential/pro-frontend');

module.exports = [
    themeBuilderBlocks,
    themeBuilderDefaultDashboard,
    themeBuilderEditor,
    themeBuilderPage,
    themeBuilderThemeforestDashboard,
    themeBuilderLiteDashboard,
    dashboard,
    admin,
    filter,
    blocksHelper,
    blocks,
    frontend,
    profrontend
];