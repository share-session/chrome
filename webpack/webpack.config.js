const CopyPlugin = require('copy-webpack-plugin');
const DownloadWebpackPlugin = require('./plugins/download-webpack-plugin');

const path = require('path');

module.exports = {
    mode: "production",
    devtool: "inline-source-map",
    entry: {
        start: "./src/start.ts",
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: ".", context: "public" }]
        }),
        new DownloadWebpackPlugin({
            cache: '.cache',
            files: [{
                name: "content.js",
                url: "https://cdn.jsdelivr.net/gh/share-session/browser@1.3.0/dist/content.js",
                cache: true,
            }]
        })
    ],
};

