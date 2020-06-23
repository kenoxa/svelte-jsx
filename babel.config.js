module.exports = (api) => {
  const isTest = api.env('test')

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage', // Load the same polyfill only once
          corejs: 3,
          bugfixes: true, // Compile the broken syntax to the closest non-broken modern syntax
          shippedProposals: true, // No transformation of feature proposals, if target env have native support
          loose: true,
          modules: isTest && 'commonjs',
          ignoreBrowserslistConfig: true,
          targets: isTest ? { node: 'current' } : `node ${require('./package.json').engines.node}`,
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          absoluteRuntime: false,
          corejs: false,
          helpers: true,
          regenerator: false,
          useESModules: !isTest,
          version: require('@babel/runtime-corejs3/package.json').version,
        },
      ],
      isTest && [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic', // Defaults to classic
          importSource: 'svelte-jsx', // Defaults to react (only in automatic runtime)
        },
      ],
    ],
  }
}
