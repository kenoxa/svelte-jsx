import h from 'svelte-hyperscript'

export { default as Fragment } from 'svelte-fragment-component'

export function jsx(type, { children = [], ...props } /* , maybeKey */) {
  if (!Array.isArray(children)) {
    children = [children]
  }

  // Convert jsx like property names to svelte
  const newProps = {}
  for (const key of Object.keys(props)) {
    newProps[jsxKeyToSvelte(key)] = props[key]
  }

  return h(type, newProps, ...children)
}

// See https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md#always-pass-children-as-props
// For the moment we do not distinguish static children from dynamic ones
export const jsxs = jsx

// For the moment there is not special development handling
// function jsxDEV(type, props , maybeKey, isStaticChildren, source, self)
export const jsxDEV = jsx

// Somne special jsx attribute handling: https://reactjs.org/docs/dom-elements.html
const MAPPED_ATTRIBUTES = new Map([
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['tabIndex', 'tabindex'],
  ['readOnly', 'readonly'],
  ['autoComplete', 'autocomplete'],
  ['autoFocus', 'autofocus'],
  ['contentEditable', 'contenteditable'],
  ['noValidate', 'novalidate'],
])

function jsxKeyToSvelte(key) {
  return (
    MAPPED_ATTRIBUTES.get(key) ||
    key
      // - on_eventname => on:eventname
      // - bind_name => bind:name
      // - ...
      // - let_name => let:name
      .replace(/^(on|bind|class|use|transition|in|animate|let)_/, '$1:')
  )
}
