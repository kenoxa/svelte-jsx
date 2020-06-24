import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import externals from 'rollup-plugin-node-externals'

import pkg from './package.json'

const plugins = [
  svelte(),
  resolve({
    dedupe: ['svelte'],
    extensions: ['.svelte', '.mjs', '.js', '.cjs', '.json', '.node'],
  }),
  babel({
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
  }),
]

export default [
  {
    input: pkg.source,
    output: [
      {
        format: 'esm',
        file: pkg.module,
        sourcemap: true,
      },
      {
        format: 'cjs',
        file: pkg.main,
        sourcemap: true,
      },
    ],
    plugins: [externals({ deps: true }), ...plugins],
  },
]
