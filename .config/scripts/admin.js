const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        ['admin']: './src/backend/admin/index.js',
    },
    output: {
        path: path.resolve(process.cwd(), 'build/admin'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'admin.css',
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
                        "./gutenverse-themes-builder/assets/js/admin.js*",
                        "./gutenverse-themes-builder/assets/css/admin.css"
                    ]
                },
                onEnd: {
                    copy: [
                        {
                            source: process.env.NODE_ENV === 'development' ? './build/admin/admin.js*' : './build/admin/admin.js',
                            destination: './gutenverse-themes-builder/assets/js/',
                        },
                        {
                            source: './build/admin/admin.css',
                            destination: './gutenverse-themes-builder/assets/css/',
                        },
                    ],
                },
            },
            runTasksInSeries: true,
        }),
    ]
};