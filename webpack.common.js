const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname,'src'),
      'components': path.resolve(__dirname,'src/components'),
    }
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
      inject: true,
      hash: false,
      template: "./src/index.html",
      filename: "index.html"
    }),
  ],
};