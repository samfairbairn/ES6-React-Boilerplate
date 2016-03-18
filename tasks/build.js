import task from './run';
import webpack from 'webpack';
import webpackConfig from './webpack.config.prod';
import del from 'del';
import fs from './lib/fs';
import cp from './lib/copy';
import modernizr from 'modernizr';
import modernizrConfig from './modernizr.config';
import replace from 'replace';

import config from './config';

async function build() {

  await task ( async function clean(){ del(['build/*', '!build/.git'], { dot: true }) });

  await task( async function makeBuild(){ fs.mkdir('build') });

  await task( async function buildWebpack(){
    return new Promise((resolve, reject) => {
      const bundler = webpack(webpackConfig);
      const run = (err, stats) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      };
      bundler.run(run);
    });
  });

  await task( async function createModernizr(){
    modernizr.build(
      modernizrConfig,
      (result) => {
        fs.writeFile('build/modernizr.js', result);
      }
    );
  });

  await task( async function copyFiles(){
    cp('src/index.html', 'build/index.html').then( replaceCSS );
    cp('src/.htaccess', 'build/.htaccess');
    cp('static', 'build');
  });

  function replaceCSS(){

    if(config.build.base) {
      replace({
        regex: '<!-- insert:base -->',
        replacement: `<base href="${config.build.base}">`,
        paths: ['./build/index.html'],
        recursive: false,
        silent: true
      });
    }

    replace({
      regex: '<!-- insert:styles -->',
      replacement: '<link rel="stylesheet" href="styles.css">',
      paths: ['./build/index.html'],
      recursive: false,
      silent: true
    });
  }

}

export default build;