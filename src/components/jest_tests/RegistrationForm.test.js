import React from 'react'
import { render } from '@testing-library/react'
import RegistrationForm from '../RegistrationForm'
import '@testing-library/jest-dom/extend-expect'

const testUsers = [
  {
    id: 1,
    username: 'koticasanova95',
    password: 'kissakala123',
    name: 'Mare P',
    email: 'mare.ysiviis@gmail.com',
    gender: 'Mies',
    age: 26,
  },
  {
    id: 2,
    username: 'laila76',
    password: 'kala1234',
    name: 'Laila K',
    email: 'laila.koo@hotmail.com',
    gender: 'Nainen',
    age: 45,
  },
]

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
