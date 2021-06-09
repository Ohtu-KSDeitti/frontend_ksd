import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import MainPage from '../templates/LoginForm'

test('renders content', () => {
  const component = render(
    <MockedProvider addTypename={false}>
      <MainPage />
    </MockedProvider>,
  )
  expect(component.container).toHaveTextContent(
    'Kirjaudu sisään',
  )
  expect(component.container).toHaveTextContent(
    'Salasana',
  )
})
