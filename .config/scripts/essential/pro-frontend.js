const path = require("path");
const rules = require("../../../gutenverse-core/.config/rules");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, plugins } = require("../../../gutenverse-core/.config/config");
const { externals, coreFrontendExternals } = require("../../../gutenverse-core/.config/externals");

const profrontend = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        profrontend: {
            import: path.resolve(process.cwd(), "src/essential/frontend/index.js"),
            library: {
                name: "gutenverseProFrontend",
                type: "window",
            },
        },
    },
    stats,
    output: {
        path: path.resolve(process.cwd(), 'build/essential'),
    },
    externals: {
        ...coreFrontendExternals,
        ...externals
    },
    resolve: {
        alias: {
            "gutenverse-pro-frontend": path.resolve(process.cwd(), "src/essential/frontend"),
            "gutenverse-core-frontend": path.resolve(process.cwd(), "gutenverse-core/src/frontend"),
        },
    },
    module: {
        strictExportPresence: true,
        rules,
    },
    plugins: [
        ...plugins,
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: [
                        "./gutenverse-themes-builder/assets/js/essential/profrontend.js*",
                    ]
                },
                onEnd: {
                    copy: [
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/essential/profrontend.js*" : "./build/essential/profrontend.js",
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
    profrontend,
};
