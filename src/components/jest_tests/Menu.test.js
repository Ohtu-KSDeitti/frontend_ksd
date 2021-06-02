import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Menu from '../templates/Menu'

let menuComponent
const logout = jest.fn()

test('renders content', () => {
  menuComponent = render(
    <Menu logout={logout} />,
  )

  expect(menuComponent.container).toHaveTextContent(
    'Pääsivu',
  )
  expect(menuComponent.container).toHaveTextContent(
    'Kirjaudu sisään',
  )
  expect(menuComponent.container).toHaveTextContent(
    'Rekisteröidy',
  )
})
/* test('renders content when logged in', () => {
  menuComponent = render(
    <Menu logout={logout} />,
  )

  expect(menuComponent.container).toHaveTextContent(
    'Pääsivu',
  )
  expect(menuComponent.container).toHaveTextContent(
    'Oma sivu',
  )
  expect(menuComponent.container).toHaveTextContent(
    'Kirjaudu ulos',
  )
})
*/
