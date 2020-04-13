const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        // Typescript
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        // CSS
        test: /\.css$/,
        use: [
              'vue-style-loader',
              'style-loader',
              MiniCssExtractPlugin.loader,
              'css-loader',
            ],
      },
      {
        // Images
        test: /\.(png|svg|jpg|gif)$/,
        use: [
              'file-loader',
             ],
      },
      {
        // Fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
             'file-loader',
             ],
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.vue' ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public')
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/index.html",
      filename: "index.html"
    }),
  ],
};