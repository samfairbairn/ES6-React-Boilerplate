import ExtractTextPlugin from "extract-text-webpack-plugin";
import ModernizrWebpackPlugin from "modernizr-webpack-plugin";
import path from 'path';
import webpack from 'webpack';
import modernizrConfig from './modernizr.config';

const ROOT_PATH = path.resolve(__dirname, '../');
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

const DEV = true;

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/app/index'
  ],
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    publicPath: DEV ? false : BUILD_PATH
  },
  plugins: [
    new ExtractTextPlugin('styles.css', {
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ModernizrWebpackPlugin(
      Object.assign(modernizrConfig, {
          filename: `./modernizr`,
          noChunk: true
      })
    ),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    //new ExtractTextPlugin(SETTINGS.production.styles_target + ".css", {allChunks: true})
  ],
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['babel'],
      include: APP_PATH
    },
    // for suit css base
    /*{
      test: /\.css$/,
      loader: 'style!css'
    },*/
    // for custom styles
    { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
    /*{
      test: /\.css$/,
      loader:
        'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer?browsers=last 3 version'
    },*/
    {
      test: /\.scss$/,
      loader:
        `style!css!autoprefixer?browsers=last 3 version!sass`
        //`style!css!autoprefixer?browsers=last 3 version!sass?includePaths[]=${APP_PATH}`
        //ExtractTextPlugin.extract("style-loader", `css-loader!autoprefixer-loader?browsers=last 3 version!sass-loader`)
        //ExtractTextPlugin.extract("style-loader", `css-loader!autoprefixer-loader?browsers=last 3 version!sass-loader?includePaths[]=${APP_PATH}`)
    },
    // Load images
    {
      test: /\.(jpe?g|png|svg)$/i,
      loaders: [
        //`url-loader?hash=sha512&digest=hex&limit=10000&name=${PUBLIC_PATH}[hash].[ext]`,
        `url-loader?hash=sha512&digest=hex&limit=10000`,
        `image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false`
      ]
    },
    {
      test: /\.gif/,
      //loader: `file-loader?name=${APP_PATH}[hash].[ext]`
      loader: `file-loader`
    },
    // Load fonts
    //{ test: /\.(woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: `url-loader?name=${PUBLIC_PATH}[hash].[ext]&limit=10000&mimetype=application/font-woff` },
    { test: /\.(woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: `url-loader?limit=10000&mimetype=application/font-woff` },
    //{ test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: `file-loader?name=${PUBLIC_PATH}[hash].[ext]` }]
    { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: `file-loader` }]
  },
  postcss: [
    require('autoprefixer-core')
  ]
};