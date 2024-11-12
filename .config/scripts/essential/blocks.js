const fs = require("fs");
const rules = require("../../../gutenverse-core/.config/rules");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { stats, plugins } = require("../../../gutenverse-core/.config/config");
const { externals, coreExternals } = require("../../../gutenverse-core/.config/externals");
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

let copyPath = [];

const blockDir = path.resolve(process.cwd(), "src/essential/editor/blocks");

fs.readdirSync(blockDir).filter((file) => {
    const blockPath = `${blockDir}/${file}`;

    if (fs.statSync(blockPath).isDirectory()) {
        const jsonPath = `${blockPath}/block.json`;

        if (fs.existsSync(jsonPath)) {
            copyPath.push({
                source: jsonPath,
                destination: path.resolve(process.cwd(), `gutenverse-themes-builder/block/${file}/block.json`),
            });
        }
    }
});

const blocks = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        ['blocks']: {
            import: path.resolve(process.cwd(), "src/essential/editor/index.js"),
        },
    },
    externals: {
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
                        ...copyPath,
                        {
                            source: "./build/essential/blocks.asset.php",
                            destination: "./gutenverse-themes-builder/lib/dependencies/essential/",
                        },
                        {
                            source: "./build/essential/blocks.js",
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
    blocks,
};
