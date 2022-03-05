const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin}  = require('vue-loader')

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
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname,'src'),
      'components': path.resolve(__dirname,'src/components'),
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
      // esModule: false,
      // experimentalUseImportModule: true,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      hash: false,
      template: "./src/index.html",
      filename: "index.html"
    }),
  ],
};
