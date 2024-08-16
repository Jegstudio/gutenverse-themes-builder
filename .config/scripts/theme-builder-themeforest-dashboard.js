const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        ['theme-dashboard']: './src/theme-builder/theme-data/themeforest-dashboard/index.js',
    },
    output: {
        path: path.resolve(process.cwd(), 'build/themeforest-dashboard'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'theme-dashboard.css',
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            }
        ]
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: [
                        "./gutenverse-themes-builder/includes/data/assets/js/theme-dashboard.js*",
                        "./gutenverse-themes-builder/includes/data/assets/css/theme-dashboard.css"
                    ]
                },
                onEnd: {
                    copy: [
                        {
                            source: process.env.NODE_ENV === 'development' ? './build/themeforest-dashboard/theme-dashboard.js*' : './build/themeforest-dashboard/theme-dashboard.js',                            
                            destination: './gutenverse-themes-builder/includes/data/assets/js/themeforest/',
                        },
                        {
                            source: './build/themeforest-dashboard/theme-dashboard.css',
                            destination: './gutenverse-themes-builder/includes/data/assets/css/themeforest/theme-dashboard.css',
                        },
                    ],
                },
            },
            runTasksInSeries: true,
        }),
    ]
};