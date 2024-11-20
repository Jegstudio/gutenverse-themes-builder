const rules = require("../../../gutenverse-core/.config/rules");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, plugins } = require("../../../gutenverse-core/.config/config");
const { externals, coreExternals,coreFrontendExternals } = require("../../../gutenverse-core/.config/externals");

const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

const filter = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        filter: path.resolve(process.cwd(), "src/essential/filters/index.js"),
        ['filter-client'] : path.resolve(process.cwd(), "src/essential/filters/filter-client.js"),
    },
    externals: {
        ...coreFrontendExternals,
        ...externals,
        ...coreExternals,
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
                            source: "./build/essential/filter.asset.php",
                            destination: "./gutenverse-themes-builder/lib/dependencies/essential/",
                        },
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/essential/filter.js*" : "./build/essential/filter.js",
                            destination: "./gutenverse-themes-builder/assets/js/essential/",
                        },
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/essential/filter-client.js*" : "./build/essential/filter-client.js",
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
    filter
};
