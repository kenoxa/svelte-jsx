/** @jsxImportSource . */

import { describe, expect, jest, it } from '@jest/globals'
import { render, fireEvent } from '@testing-library/svelte'

describe('jsx', () => {
  it('supports nested html', () => {
    const { getByRole } = render(
      <h1 className="large">
        Hello <strong>World</strong>!
      </h1>,
    )
    const heading = getByRole('heading')

    expect(heading.outerHTML).toMatch('<h1 class="large">Hello <strong>World</strong>!</h1>')
  })

  it('supports multiple root elements (fragments)', () => {
    const { container } = render(
      <>
        <span>a</span>
        <span>b</span>
      </>,
    )

    expect(container.innerHTML).toMatch('<div><span>a</span><span>b</span></div>')
  })

  it('supports click listener', async () => {
    const handleClick = jest.fn()

    const { getByRole } = render(
      <button type="button" onClick={handleClick}>
        Hello <strong>World</strong>!
      </button>,
    )
    const button = getByRole('button')

    // Using await when firing events is unique to the svelte testing library because
    // we have to wait for the next `tick` so that Svelte flushes all pending state changes.
    await fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('increments count when button is clicked', async () => {
    const { getByText } = render(<Counter />)
    const button = getByText('Count is 0')

    await fireEvent.click(button)
    expect(button).toHaveTextContent('Count is 1')

    await fireEvent.click(button)
    expect(button).toHaveTextContent('Count is 2')
  })

  it('increments count when button is clicked (initialized)', async () => {
    const { getByText } = render(<Counter initialCount={5} />)
    const button = getByText('Count is 5')

    await fireEvent.click(button)
    expect(button).toHaveTextContent('Count is 6')
  })

  it('forwards click event', async () => {
    const handleClick = jest.fn()

    const { getByRole } = render(<Counter on_click={handleClick} />)

    const button = getByRole('button')

    await fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(button).toHaveTextContent('Count is 1')
  })

  it('allows to provide default slot content', () => {
    const { getByRole } = render(<Counter>New default slot content</Counter>)

    const button = getByRole('button')

    expect(button).toHaveTextContent('New default slot content')
  })

  it('allows to access default slot values', async () => {
    const countSetter = jest.fn()
    const { getByRole } = render(<Counter let_count={countSetter}>slot content</Counter>)
    const button = getByRole('button')

    await fireEvent.click(button)
    expect(countSetter).toHaveBeenCalledWith(0, 'count')

    await fireEvent.click(button)
    expect(countSetter).toHaveBeenCalledWith(1, 'count')
  })

  it('allows to provide named slot content', () => {
    const itemSetter = jest.fn()
    const itemsSetter = jest.fn()
    const items = ['a', 'b', 'c']

    const { container } = render(
      <List items={items} let_item={itemSetter}>
        <div>each item</div>
        <p slot="footer" let_items={itemsSetter}>
          That&apos;s all...
        </p>
      </List>,
    )

    expect(container.innerHTML).toMatch(
      `<div> <ul><li><div>each item</div> </li><li><div>each item</div> </li><li><div>each item</div> </li></ul> <p>That's all...</p></div>`,
    )

    expect(itemSetter.mock.calls).toMatchObject([
      ['a', 'item'],
      ['b', 'item'],
      ['c', 'item'],
    ])

    expect(itemsSetter).toHaveBeenCalledTimes(1)
    expect(itemsSetter).toHaveBeenCalledWith(items, 'items')
  })
})
