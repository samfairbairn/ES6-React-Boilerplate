import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import connectRewrite from "connect-modrewrite";
import webpackConfig from './webpack.config.dev';

var compiler = webpack(webpackConfig);

browserSync({
  server: {
    baseDir: 'src',

    middleware: [
      webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true },
        noInfo: true
      }),

      webpackHotMiddleware(compiler),

      connectRewrite([
        '^[^\\.]*$ /index.html [L]'
      ])
    ]
  },

  files: [
    'src/*.html'
  ]
});

