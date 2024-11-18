const rules = require("../../../gutenverse-core/.config/rules");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, plugins } = require("../../../gutenverse-core/.config/config");
const { externals, coreExternals, coreFrontendExternals } = require("../../../gutenverse-core/.config/externals");
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

const blocksHelper = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        ["editor.sticky"]: {
            import: path.resolve(process.cwd(), "src/essential/editor/scripts/sticky.js")
        },
    },
    externals: {
        ...externals,
        ...coreExternals,
        ...coreFrontendExternals,
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
                            source: "./build/essential/editor.sticky.asset.php",
                            destination: "./gutenverse-themes-builder/lib/dependencies/essential/editor.sticky.asset.php",
                        },
                        {
                            source: "./build/essential/editor.sticky.js",
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
    blocksHelper,
};
