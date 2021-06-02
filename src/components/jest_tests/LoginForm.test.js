import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import LoginForm from '../templates/LoginForm'
import '@testing-library/jest-dom/extend-expect'
import testUsers from './testusers'

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
  const loginForm = component.container.querySelector('form')

  fireEvent.change(inputUsername, {
    target: { username: 'laila76' },
  })
  fireEvent.change(inputPassword, {
    target: { password: 'kala1234' },
  })

  fireEvent.submit(loginForm)

  expect(login.mock.calls).toHaveLength(1)
  expect(inputUsername.username).toBe('laila76')
  expect(inputPassword.password).toBe('kala1234')
})
