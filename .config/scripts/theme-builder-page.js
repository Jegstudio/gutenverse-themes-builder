const path = require("path");
const rules = require("../rules");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");
const { externals, editorExternals } = require("../externals");
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        builder: {
            import: path.resolve(__dirname, '../../src/theme-builder/builder-page/index.js'),
        },
    },
    stats,
    output,
    externals: {
        ...externals,
        ...editorExternals,
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
                            source: './build/builder.asset.php',
                            destination: './gutenverse-themes-builder/lib/dependencies/builder.asset.php',
                        },
                        {
                            source: './build/builder.js',
                            destination: './gutenverse-themes-builder/assets/js/builder.js',
                        },
                    ],
                },
            },
            runTasksInSeries: true,
        }),
    ],
};