const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MINICssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    configObj.minimizer = [
      new TerserPlugin()
    ];
  }

  return configObj;
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    main: path.resolve(__dirname, './src/js/main.js')
  },
  
  output: {
    filename: `./js/${filename('js')}`,
    assetModuleFilename: 'assets/[hash][ext]',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
      watch: true,
    },
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  devtool: isDev ? 'source-map' : false,
  optimization: optimization(),
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      esModule: false,
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './src/form.html'),
      filename: 'form.html',
      esModule: false,
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './src/rules.html'),
      filename: 'rules.html',
      esModule: false,
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new MINICssExtractPlugin({
      filename: `./css/${filename('css')}`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MINICssExtractPlugin.loader,
          },
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MINICssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ]
  }
}