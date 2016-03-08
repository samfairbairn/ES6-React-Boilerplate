import task from './run';
import webpack from 'webpack';
import config from './webpack.config.prod';
import del from 'del';
import fs from './lib/fs';
import cp from './lib/copy';
import modernizr from 'modernizr';
import modernizrConfig from './modernizr.config';

async function build() {

  await task( async ()=>{ del(['build/*', '!build/.git'], { dot: true }) } );

  await task( async ()=>{ fs.mkdir('build') } );

  await task( async ()=>{
    modernizr.build(
      modernizrConfig,
      (result) => {
        fs.writeFile('build/modernizr.js', result);
      }
    );
  });

  await task( async ()=>{
    return new Promise((resolve, reject) => {
      const bundler = webpack(config);
      const run = (err, stats) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      };
      bundler.run(run);
    });
  } );

  await task( async ()=>{
    cp('src/index.html', 'build/index.html');
    cp('static', 'build');
  } );

}

export default build;