const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const ImageminMozjpeg = require('imagemin-mozjpeg');
const imageminWebp = require('imagemin-webp');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/,
          options: {
            quality: 45,
          },
          lossless: true,
        },
      ],
      overrideExtension: true,
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 42,
          progressive: true,
        }),
      ],
    }),
  ],
});
