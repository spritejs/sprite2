import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import {string} from 'rollup-plugin-string';
import globals from 'rollup-plugin-node-globals';
import {terser} from 'rollup-plugin-terser';

const pkg = require('./package.json');

/** @type {import('rollup').RollupOptions} */
const config = {
  input: './src/index',
  output: [
    {
      format: 'es',
      sourcemap: true,
      file: pkg.module,
    },
    {
      format: 'umd',
      name: 'spritejs',
      sourcemap: true,
      file: pkg.main,
    },
    {
      format: 'umd',
      name: 'spritejs',
      sourcemap: true,
      file: 'dist/spritejs.min.js',
      plugins: [terser()],
    },
  ],
  plugins: [
    babel({
      babelHelpers: 'runtime',
      skipPreflightCheck: true,
      exclude: /node_modules/,
    }),
    json(),
    resolve(),
    commonjs({
      transformMixedEsModules: true,
    }),
    string({
      include: ['**/*.frag', '**/*.vert', '**/*.glsl'],
    }),
    globals({
      process: false,
      buffer: false,
      dirname: false,
      filename: false,
    }),
  ],
};

/** @type {import('rollup').RollupOptions} */
const workerConfig = {
  ...config,
  input: './src/index.worker',
  output: config.output.map(item => {
    return {
      ...item,
      file: item.file.replace('spritejs', 'spritejs.worker'),
    };
  }),
};

export default [config, workerConfig];
