const fs = require('fs');
const path = require("path");
const rules = require("../rules");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, output, plugins } = require("../config");
const { externals, editorExternals } = require("../externals");
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
let copyPath = [];

fs.readdirSync('./src/theme-builder/blocks/').filter(function (file) {
    const path = './src/theme-builder/blocks/' + file;

    if (fs.statSync(path).isDirectory()) {
        const jsonPath = path + '/block.json';
        if (fs.existsSync(jsonPath)) {
            copyPath.push({
                source: jsonPath,
                destination: './gutenverse-themes-builder/block/' + file + '/block.json',
            });
        }
    }
});

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        blocks: {
            import: path.resolve(__dirname, '../../src/theme-builder/blocks/index.js'),
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
                        "./gutenverse-themes-builder/assets/js/blocks.js*",
                        "./gutenverse-themes-builder/lib/dependencies/blocks.asset.php"
                    ]
                },
                onEnd: {
                    copy: [
                        ...copyPath,
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/blocks.js*" : "./build/blocks.js",
                            destination: './gutenverse-themes-builder/assets/js/',
                        },
                        {
                            source: './build/blocks.asset.php',
                            destination: './gutenverse-themes-builder/lib/dependencies/blocks.asset.php',
                        },
                    ],
                },
            },
            runTasksInSeries: true,
        }),
    ],
};