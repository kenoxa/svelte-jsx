import h from 'svelte-hyperscript'

export { default as Fragment } from 'svelte-fragment-component'

export function jsx(type, { children = [], ...props } /* , maybeKey */) {
  if (!Array.isArray(children)) {
    children = [children]
  }

  return h(
    type,
    // Convert jsx like property names to svelte
    Object.keys(props).reduce((newProps, key) => {
      newProps[jsxKeyToSvelte(key)] = props[key]
      return newProps
    }, {}),
    ...children,
  )
}

// See https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md#always-pass-children-as-props
// For the moment we do not distinguish static children from dynamic ones
export const jsxs = jsx

// For the moment there is not special development handling
// function jsxDEV(type, props , maybeKey, isStaticChildren, source, self)
export const jsxDEV = jsx

function jsxKeyToSvelte(key) {
  if (key === 'className') return 'class'

  return (
    key
      // - on_eventname => on:eventname
      // - bind_name => bind:name
      // - ...
      // - let_name => let:name
      .replace(/^(on|bind|class|use|transition|in|animate|let)_/, '$1:')
      // - onEventname => on:eventname
      .replace(/^on([^:])/, (match, char) => `on:${char.toLowerCase()}`)
  )
}
