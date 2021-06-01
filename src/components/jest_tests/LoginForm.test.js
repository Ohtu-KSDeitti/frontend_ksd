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
