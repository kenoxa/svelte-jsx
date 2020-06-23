# svelte-jsx

> [jsx] for [svelte](https://svelte.dev/)

[![License](https://badgen.net/npm/license/svelte-jsx)](https://github.com/sastan/svelte-jsx/blob/main/LICENSE)
[![Latest Release](https://badgen.net/npm/v/svelte-jsx)](https://www.npmjs.com/package/svelte-jsx)
[![View changelog](https://badgen.net/badge/%E2%80%8B/Explore%20Changelog/green?icon=awesome)](https://changelogs.xyz/svelte-jsx)

[![CI](https://github.com/sastan/svelte-jsx/workflows/CI/badge.svg)](https://github.com/sastan/svelte-jsx/actions?query=branch%3Amain+workflow%3ACI)
[![Coverage Status](https://badgen.net/coveralls/c/github/sastan/svelte-jsx/main)](https://coveralls.io/github/sastan/svelte-jsx?branch=main)
[![PRs Welcome](https://badgen.net/badge/PRs/welcome/purple)](http://makeapullrequest.com)
[![Conventional Commits](https://badgen.net/badge/Conventional%20Commits/1.0.0/cyan)](https://conventionalcommits.org)

> If your are not using [babel](https://babeljs.io/) take a look at [svelte-htm].

## What?

Write svelte components in [jsx].

## Why?

This is especially useful for [testing svelte components](https://github.com/svelte-society/recipes-mvp/blob/master/testing.md).

## Installation

```sh
npm install --save-dev svelte-jsx
```

### Babel Configuration

This packages allows to use svelte with [jsx] (see [@babel/plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)). A [working babel](https://babeljs.io/setup) is therefore required.

In your [babel configuration file](https://babeljs.io/docs/en/configuration) add:

```json
{
  "plugins": [
    ["@babel/plugin-transform-react-jsx", { "runtime": "automatic", "importSource": "svelte-jsx" }]
  ]
}
```

If you already use [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react) make sure `runtime` is set to `automatic`:

```json
{
  "presets": [["@babel/preset-react", { "runtime": "automatic", "importSource": "svelte-jsx" }]]
}
```

If this not an option to use `svelte-jsx` as an `importSource` globally for the project, it is possible to use the [@jsxImportSource](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#customizing-the-automatic-runtime-import) pragma within a file:

```js
/** @jsxImportSource svelte-jsx */

render(
  <SomeComponent>
    <SomeChild />
  </SomeComponent>,
)
```

## Usage

> Please note the differences to svelte component syntax [outlined below](#api).

```js
import { render, fireEvent } from '@testing-library/svelte'
import html from 'svelte-jsx'

import Button from '../src/Button.svelte'

test('should render', () => {
  let clicked = 0
  const { getByRole } = render(<Button onClick={() => (clicked += 1)}>Click Me!</Button>)

  const button = getByRole('button')

  await fireEvent.click(button)

  expect(clicked).toBe(1)
})
```

## API

[jsx] currently does not allow to use `:` in attribute/property names. As a workaround every `:` can be replaced be `_` (for example `bind_value` is converted to `bind:value` for svelte). For event listeners we support the standard jsx naming convention `onEventname` (this is converted to `on:eventname` in svelte) as well.

For the sake of best compatibility we convert the `className` attribute to `class`.

We [aim to support](https://github.com/sastan/svelte-hyperscript#feature-set) all svelte features. In some cases this is not possible. For those cases we provided feasible workarounds. See [svelte-hyperscript] for further details.

Some notable differences are:

- Using [stores](https://svelte.dev/docs#svelte_store) to allow reactivity

  ```js
  import { render } from '@testing-library/svelte'
  import userEvent from '@testing-library/user-event'
  import { writable, get } from 'svelte/store'

  test('write into an input', () => {
    const text = writable()
    const { getByRole } = render(<input bind_value={text}>)

    const input = getByRole('textbox')

    await userEvent.type(input, 'some text')

    expect(get(text)).toBe('some text')
  })
  ```

- Action properties lack the possibility to pass parameters to the action

  ```js
  import action from 'some-action-module'

  const Div = <div use_action={(node) => action(node, parameters)}></div>
  ```

## Related Projects

- [svelte-htm]: [**H**yperscript **T**agged **M**arkup](https://www.npmjs.com/package/htm) for svelte; a jsx-like [syntax](https://www.npmjs.com/package/htm#syntax-like-jsx-but-also-lit) using [Tagged Templates]
- [svelte-hyperscript]: the core of this implementation
- [svelte-fragment-component]: a utility component
- [@testing-library/svelte](https://testing-library.com/docs/svelte-testing-library/intro): helps to test UI components in a user-centric way
- [reactjs/rfcs/0000-create-element-changes](https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md)

## Support

This project is free and open-source, so if you think this project can help you or anyone else, you may [star it on GitHub](https://github.com/sastan/svelte-jsx). Feel free to [open an issue](https://github.com/sastan/svelte-jsx/issues) if you have any idea, question, or you've found a bug.

## Contribute

Thanks for being willing to contribute!

**Working on your first Pull Request?** You can learn how from this _free_ series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

We are following the [Conventional Commits](https://www.conventionalcommits.org) convention.

### Develop

- `npm test`: Run test suite
- `npm run build`: Generate bundles
- `npm run lint`: Lints code

## NPM Statistics

[![NPM](https://nodei.co/npm/svelte-jsx.png)](https://nodei.co/npm/svelte-jsx/)

## License

`svelte-jsx` is open source software [licensed as MIT](https://github.com/sastan/svelte-jsx/blob/main/LICENSE).

[tagged templates]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates
[all modern browsers]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Browser_compatibility
[jsx]: https://reactjs.org/docs/introducing-jsx.html
[svelte-htm]: https://www.npmjs.com/package/svelte-htm
[svelte-hyperscript]: https://www.npmjs.com/package/svelte-hyperscript
[svelte-fragment-component]: https://www.npmjs.com/package/svelte-fragment-component
