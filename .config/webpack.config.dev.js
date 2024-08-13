const themeBuilderBlocks = require("./scripts/theme-builder-blocks");
const themeBuilderDashboard = require("./scripts/theme-builder-dashboard");
const themeBuilderEditor = require("./scripts/theme-builder-editor");
const themeBuilderPage = require("./scripts/theme-builder-page");
const { dashboard } = require("./scripts/dashboard");

module.exports = [
    themeBuilderBlocks,
    themeBuilderDashboard,
    themeBuilderEditor,
    themeBuilderPage,
    dashboard
];