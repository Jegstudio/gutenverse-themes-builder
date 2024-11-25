const rules = require("../../../gutenverse-core/.config/rules");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, plugins } = require("../../../gutenverse-core/.config/config");
const { coreFrontendExternals } = require("../../../gutenverse-core/.config/externals");
const { proFrontendExternals } = require("../../externals");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

const frontend = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        frontend: path.resolve(process.cwd(), "src/essential/frontend/blocks/index.js"),
    },
    externals: {
        ...coreFrontendExternals,
        ...proFrontendExternals,
    },
    stats,
    output: {
        path: path.resolve(process.cwd(), 'build/essential'),
    },
    module: {
        strictExportPresence: true,
        rules,
    },
    plugins: [
        ...plugins,
        new DependencyExtractionWebpackPlugin(),
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {
                            source: "./build/essential/frontend.asset.php",
                            destination: "./gutenverse-themes-builder/lib/dependencies/essential/",
                        },
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/essential/frontend.js*" : "./build/essential/frontend.js",
                            destination: "./gutenverse-themes-builder/assets/js/essential/",
                        },
                    ],
                },
            },
            runTasksInSeries: true,
        }),
    ],
};

module.exports = {
    frontend,
};
