import React from 'react'
import { render } from '@testing-library/react'
import RegistrationForm from '../templates/RegistrationForm'
import '@testing-library/jest-dom/extend-expect'
import testUsers from './testusers'

test('renders content', () => {
  const setUsers = jest.fn()

  const component = render(
    <RegistrationForm testUsers={testUsers} setUsers={setUsers} />,
  )

  expect(component.container).toHaveTextContent(
    'Luo uusi käyttäjä',
  )

  expect(component.container).toHaveTextContent(
    'Salasana',
  )
})
