//import path from 'path';
import browserSync from 'browser-sync';
//import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import connectRewrite from "connect-modrewrite";
import config from './webpack.config.dev';

var compiler = webpack(config);

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  server: {
    baseDir: 'src',

    middleware: [
      webpackDevMiddleware(compiler, {
        // Dev middleware can't access config, so we provide publicPath
        publicPath: config.output.publicPath,

        // pretty colored output
        stats: { colors: true },

        // Set to false to display a list of each file that is being bundled.
        noInfo: true

        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // bundler should be the same as above
      webpackHotMiddleware(compiler),

      connectRewrite([
        '^[^\\.]*$ /index.html [L]'
      ])
    ]
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'src/*.html'
  ]
});
