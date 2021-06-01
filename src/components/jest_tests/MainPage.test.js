import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import MainPage from '../templates/MainPage'

test('renders content', () => {
  const component = render(
    <MainPage />,
  )
  expect(component.container).toHaveTextContent(
    'Et ole kirjautunut',
  )
})
