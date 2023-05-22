const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = () => ({
    devtool: "nosources-source-map",
    output: {
        filename: "production.js"
    },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.sa?css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            modules: {
                                auto: (resourcePath) => resourcePath.endsWith("settings.scss")
                            }
                        }
                    },
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [new MiniCssExtractPlugin()]
});