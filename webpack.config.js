const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

let entry;
let includeAssets = [];

 if (process.env.WEBPACK_MODE === "benchmark") {
    entry = "./benchmark/index.ts";
    includeAssets = [
          ];
}

module.exports = {
    devServer: {
        client: {
            overlay: true,
        },
    },
    entry,
    output: {
        filename: "[name].js",
    },
    mode: "development",
    resolve: {
        extensions: [".ts", ".js", ".wasm"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
        ],
    },
    experiments: {
        syncWebAssembly: true,
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new HtmlWebpackTagsPlugin({
            tags: includeAssets,
            append: false,
        }),
        new webpack.ProvidePlugin({
            TextDecoder: ["text-encoding", "TextDecoder"],
            TextEncoder: ["text-encoding", "TextEncoder"],
        }),
    ],
};