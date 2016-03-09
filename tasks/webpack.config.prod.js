import ExtractTextPlugin from "extract-text-webpack-plugin";
//import ModernizrWebpackPlugin from "modernizr-webpack-plugin";
var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname, '../');
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

export default {
  entry: [
    './src/app/index'
  ],
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    //publicPath: "/build/"
  },
  plugins: [
    new ExtractTextPlugin('styles.css', {
      allChunks: true,
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: APP_PATH
    },
    {
      test: /\.scss$/,
      loader:
      //`style!css!autoprefixer?browsers=last 3 version!sass`
      //`style!css!autoprefixer?browsers=last 3 version!sass?includePaths[]=${APP_PATH}`
      ExtractTextPlugin.extract("style-loader", `css-loader!autoprefixer-loader?browsers=last 3 version!sass-loader`)
      //ExtractTextPlugin.extract("style-loader", `css-loader!autoprefixer-loader?browsers=last 3 version!sass-loader?includePaths[]=${APP_PATH}`)
    },
    // Load images
    {
      test: /\.(jpe?g|png|svg)$/i,
      loaders: [
        `url-loader?hash=sha512&digest=hex&limit=10000&name=/[hash].[ext]`,
        `image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false`
      ]
    },
    {
      test: /\.gif/,
      loader: `file-loader?name=/[hash].[ext]`
    },
    // Load fonts
    //{ test: /\.(woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: `url-loader?name=${PUBLIC_PATH}[hash].[ext]&limit=10000&mimetype=application/font-woff` },
    { test: /\.(woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: `url-loader?limit=10000&mimetype=application/font-woff` },
    //{ test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: `file-loader?name=${PUBLIC_PATH}[hash].[ext]` }]
    { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: `file-loader` }
    ]
  }
};