import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import RegistrationForm from '../templates/RegistrationForm'
import LoginForm from '../templates/LoginForm'
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
  expect(component.container).toHaveTextContent(
    'Salasanan varmennus',
  )
  expect(component.container).toHaveTextContent(
    'Sähköposti',
  )
  expect(component.container).toHaveTextContent(
    'Hyväksyn käyttöehdot',
  )
})

test('RegisterationForm posts correct data.', () => {
  const login = jest.fn()
  const component = render(
    <RegistrationForm testUsers={testUsers} login={login} />,
  )

  const inputUsername = component.container.querySelector('#username')
  const inputPassword = component.container.querySelector('#password')
  const loginbutton = component.container.querySelector('#register-button')
  const passwordConf = component.container.querySelector('#passwordConf')
  const email = component.container.querySelector('#email')

  fireEvent.change(inputUsername, {
    target: { username: 'laila76' },
  })
  fireEvent.change(inputPassword, {
    target: { password: 'kala1234' },
  })
  fireEvent.change(passwordConf, {
    target: { password: 'kala1234' },
  })
  fireEvent.change(email, {
    target: { email: 'laila.koo@hotmail.com' },
  })

  fireEvent.submit(loginbutton)

  expect(inputUsername.username).toBe('laila76')
  expect(inputPassword.password).toBe('kala1234')
  expect(passwordConf.password).toBe('kala1234')
  expect(email.email).toBe('laila.koo@hotmail.com')
})
test('Correct registeration works ', () => {
  const login = jest.fn()
  const registerComponent = render(
    <RegistrationForm testUsers={testUsers} login={login} />,
  )
  const inputUsername = registerComponent.container.querySelector('#username')
  const inputPassword = registerComponent.container.querySelector('#password')
  const loginbutton = registerComponent.container.querySelector('#register-button')
  const passwordConf = registerComponent.container.querySelector('#passwordConf')
  const email = registerComponent.container.querySelector('#email')

  fireEvent.change(inputUsername, {
    target: { username: 'laila76' },
  })
  fireEvent.change(inputPassword, {
    target: { password: 'kala1234' },
  })
  fireEvent.change(passwordConf, {
    target: { password: 'kala1234' },
  })
  fireEvent.change(email, {
    target: { email: 'laila.koo@hotmail.com' },
  })

  fireEvent.submit(loginbutton)

  expect(inputUsername.username).toBe('laila76')
  expect(inputPassword.password).toBe('kala1234')
  expect(passwordConf.password).toBe('kala1234')
  expect(email.email).toBe('laila.koo@hotmail.com')

  const loginComponent = render(
    <LoginForm testUsers={testUsers} login={login} />,
  )
  expect(loginComponent.container).toHaveTextContent(
    'Kirjaudu sisään',
  )
})

test('Less than 3 length username dont create a user.', () => {
  const login = jest.fn()
  const component = render(
    <RegistrationForm testUsers={testUsers} login={login} />,
  )

  const inputUsername = component.container.querySelector('#username')
  const inputPassword = component.container.querySelector('#password')
  const loginbutton = component.container.querySelector('#register-button')
  const passwordConf = component.container.querySelector('#passwordConf')
  const email = component.container.querySelector('#email')

  fireEvent.change(inputUsername, {
    target: { username: 'la' },
  })
  fireEvent.change(inputPassword, {
    target: { password: 'kala1234' },
  })
  fireEvent.change(passwordConf, {
    target: { password: 'kala1234' },
  })
  fireEvent.change(email, {
    target: { email: 'laila.koo@hotmail.com' },
  })

  fireEvent.submit(loginbutton)

  expect(component.container).toHaveTextContent(
    'Luo uusi käyttäjä',
  )
})
test('Less than 8 length password dont create a user.', () => {
  const login = jest.fn()
  const component = render(
    <RegistrationForm testUsers={testUsers} login={login} />,
  )

  const inputUsername = component.container.querySelector('#username')
  const inputPassword = component.container.querySelector('#password')
  const loginbutton = component.container.querySelector('#register-button')
  const passwordConf = component.container.querySelector('#passwordConf')
  const email = component.container.querySelector('#email')

  fireEvent.change(inputUsername, {
    target: { username: 'lai' },
  })
  fireEvent.change(inputPassword, {
    target: { password: 'ka' },
  })
  fireEvent.change(passwordConf, {
    target: { password: 'ka' },
  })
  fireEvent.change(email, {
    target: { email: 'laila.koo@hotmail.com' },
  })

  fireEvent.submit(loginbutton)

  expect(component.container).toHaveTextContent(
    'Luo uusi käyttäjä',
  )
})
test('Email without @ doesn create a new user.', () => {
  const login = jest.fn()
  const component = render(
    <RegistrationForm testUsers={testUsers} login={login} />,
  )

  const inputUsername = component.container.querySelector('#username')
  const inputPassword = component.container.querySelector('#password')
  const loginbutton = component.container.querySelector('#register-button')
  const passwordConf = component.container.querySelector('#passwordConf')
  const email = component.container.querySelector('#email')

  fireEvent.change(inputUsername, {
    target: { username: 'lai' },
  })
  fireEvent.change(inputPassword, {
    target: { password: 'kala1234' },
  })
  fireEvent.change(passwordConf, {
    target: { password: 'kala1234' },
  })
  fireEvent.change(email, {
    target: { email: 'laila.com' },
  })

  fireEvent.submit(loginbutton)

  expect(component.container).toHaveTextContent(
    'Luo uusi käyttäjä',
  )
})
