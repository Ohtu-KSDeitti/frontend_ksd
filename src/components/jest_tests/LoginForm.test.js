import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import LoginForm from '../LoginForm'
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
    username: 'lail76',
    password: 'kala1234',
    name: 'Laila K',
    email: 'laila.koo@hotmail.com',
    gender: 'Nainen',
    age: 45,
  },
]

test('renders content', () => {
  const login = jest.fn()

  const component = render(
    <LoginForm testUsers={testUsers} login={login} />,
  )
  expect(component.container).toHaveTextContent(
    'Kirjaudu sisään',
  )
  expect(component.container).toHaveTextContent(
    'Salasana',
  )
})

test('LoginForm posts correct data.', () => {
  const login = jest.fn()
  const component = render(
    <LoginForm testUsers={testUsers} login={login} />,
  )

  const inputUsername = component.container.querySelector('#username')
  const inputPassword = component.container.querySelector('#password')
  const loginbutton = component.container.querySelector('#login-button')

  fireEvent.change(inputUsername, {
    target: { username: 'laila76' },
  })
  fireEvent.change(inputPassword, {
    target: { username: 'kala1234' },
  })

  fireEvent.submit(loginbutton)

  expect(inputUsername.username).toBe('laila76')
  expect(inputPassword.username).toBe('kala1234')
})
