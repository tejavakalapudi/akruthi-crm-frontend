// const { resolve } = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = () => ({
    module: {
        rules: [
            {
                test: /\.sa?css$/,
                use: [
                    "style-loader", 
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
            },
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: 'babel-loader',
                    options: {
                      plugins: [require.resolve('react-refresh/babel')]
                    },
                  },
                ],
            },
        ]
    },
    plugins: [new ReactRefreshWebpackPlugin()],
});