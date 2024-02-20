const fs = require('fs');
const path = require("path");
const rules = require("../rules");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");
const { externals, editorExternals } = require("../externals");
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
let copyPath = [];

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        editor: {
            import: path.resolve(__dirname, '../../src/theme-builder/editor/index.js'),
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
                onStart: {
                    delete: [
                        "./gutenverse-themes-builder/assets/js/editor.js*",
                        "./gutenverse-themes-builder/lib/dependencies/editor.asset.php"
                    ]
                },
                onEnd: {
                    copy: [
                        ...copyPath,
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/editor.js*" : "./build/editor.js",
                            destination: './gutenverse-themes-builder/assets/js/',
                        },
                        {
                            source: './build/editor.asset.php',
                            destination: './gutenverse-themes-builder/lib/dependencies/editor.asset.php',
                        },
                    ],
                },
            },
            runTasksInSeries: true,
        }),
    ],
};