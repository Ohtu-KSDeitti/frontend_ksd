import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import UserPage from '../templates/UserPage'

test('renders content', () => {
  const component = render(
    <UserPage />,
  )
  expect(component.container).toHaveTextContent(
    'Oma Sivu',
  )
})
