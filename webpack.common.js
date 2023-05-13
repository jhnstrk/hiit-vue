const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin}  = require('vue-loader')
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
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
        // SASS and CSS files from Vue Single File Components:
        test: /\.vue\.(s?[ac]ss)$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
       // SASS and CSS files (standalone):
       test: /(?<!\.vue)\.(s?[ac]ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
      {
        // Audio
        test: /\.(mp3|ogg|wav)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        },
        exclude: /node_modules/,
      },
      ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.vue' ],
    // Vue3 : https://stackoverflow.com/questions/50805384/module-not-found-error-cant-resolve-vue-path-not-correct
    alias: {
        // Ref: https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags
        'vue': 'vue/dist/vue.esm-bundler.js',
    }
  },
  devServer: {
    static: path.join(__dirname, 'public')  // Previously contentBase:
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: false,
      template: "./src/index.html",
      filename: "index.html"
    }),
    new webpack.DefinePlugin({
      // https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags
      __VUE_OPTIONS_API__: true,  // enable/disable Options API support, default: true)
      __VUE_PROD_DEVTOOLS__: false, // enable/disable devtools support in production, default: false)
    }),
  ],
};
