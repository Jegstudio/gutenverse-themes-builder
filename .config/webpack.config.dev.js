const themeBuilderBlocks = require("./scripts/theme-builder-blocks");
const themeBuilderDefaultDashboard = require("./scripts/theme-builder-default-dashboard");
const themeBuilderThemeforestDashboard = require("./scripts/theme-builder-themeforest-dashboard");
const themeBuilderLiteDashboard = require("./scripts/theme-builder-lite-dashboard");
const themeBuilderEditor = require("./scripts/theme-builder-editor");
const themeBuilderPage = require("./scripts/theme-builder-page");
const { dashboard } = require("./scripts/dashboard");

module.exports = [
    themeBuilderBlocks,
    themeBuilderDefaultDashboard,
    themeBuilderEditor,
    themeBuilderPage,
    themeBuilderThemeforestDashboard,
    themeBuilderLiteDashboard,
    dashboard
];