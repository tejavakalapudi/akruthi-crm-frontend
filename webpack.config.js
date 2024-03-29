/* eslint-disable global-require */
const { resolve } = require('path');
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { config } = require('dotenv');

// eslint-disable-next-line import/no-dynamic-require
const modeConfiguration = (env) => require(`./webpack/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: 'production' }) => {
  console.log(`mode is: ${mode}`);
  const env = config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return merge(
    {
      mode,
      entry: './app/index.js',
      devServer: {
        open: true,
        hot: true,
        historyApiFallback: true,
      },
      output: {
        publicPath: '/',
        path: resolve(__dirname, 'build'),
        filename: 'bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.jpe?g|png|ico$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8000, // Convert images < 8kb to base64 strings
                  name: 'images/[contenthash]-[name][ext]',
                },
              },
            ],
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
          favicon: './public/favicon.ico',
        }),
        new HotModuleReplacementPlugin(),
        new DefinePlugin(envKeys),
      ],
    },
    modeConfiguration(mode)
  );
};
