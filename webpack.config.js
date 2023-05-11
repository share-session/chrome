const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
    mode: "production",
    devtool: "inline-source-map",
    entry: {
        content: "./src/content.ts",
    },
    output: {
        path: path.resolve(__dirname, './dist'),
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
    ],
};

