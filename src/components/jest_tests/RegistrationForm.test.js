import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import RegistrationForm from '../templates/RegistrationForm'
import LoginForm from '../templates/LoginForm'
import '@testing-library/jest-dom/extend-expect'
import testUsers from './testusers'

let regComponent
let loginComponent

beforeEach(() => {
  const setUsers = jest.fn()
  const login = jest.fn()

  regComponent = render(
    <RegistrationForm testUsers={testUsers} setUsers={setUsers} />,
  )

  loginComponent = render(
    <LoginForm testUsers={testUsers} login={login} />,
  )
})
test('renders content', () => {
  expect(regComponent.container).toHaveTextContent(
    'Luo uusi käyttäjä',
  )
  expect(regComponent.container).toHaveTextContent(
    'Salasana',
  )
  expect(regComponent.container).toHaveTextContent(
    'Salasanan varmennus',
  )
})

test('Form input fields work properly ', () => {
  const inputUsername = regComponent.container.querySelector('#username')
  const inputPassword = regComponent.container.querySelector('#password')
  const registerButton = regComponent.container.querySelector('#register-button')
  const passwordConf = regComponent.container.querySelector('#passwordConf')
  const email = regComponent.container.querySelector('#email')

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

  fireEvent.submit(registerButton)

  expect(regComponent.setUsers.mock.calls).toHaveLength(1)
  expect(inputUsername.username).toBe('laila76')
  expect(inputPassword.password).toBe('kala1234')
  expect(passwordConf.password).toBe('kala1234')
  expect(email.email).toBe('laila.koo@hotmail.com')
})
describe('Validation tests', () => {
  test('Less than 3 length username dont create a user.', () => {
    const inputUsername = regComponent.container.querySelector('#username')
    const inputPassword = regComponent.container.querySelector('#password')
    const registerButton = regComponent.container.querySelector('#register-button')
    const passwordConf = regComponent.container.querySelector('#passwordConf')
    const email = regComponent.container.querySelector('#email')

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

    fireEvent.submit(registerButton)

    expect(regComponent.container).toHaveTextContent(
      'Luo uusi käyttäjä',
    )
  })
  test('Less than 8 length password dont create a user.', () => {
    const inputUsername = regComponent.container.querySelector('#username')
    const inputPassword = regComponent.container.querySelector('#password')
    const registerButton = regComponent.container.querySelector('#register-button')
    const passwordConf = regComponent.container.querySelector('#passwordConf')
    const email = regComponent.container.querySelector('#email')

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

    fireEvent.submit(registerButton)

    expect(regComponent.container).toHaveTextContent(
      'Luo uusi käyttäjä',
    )
  })

  test('Wrong password confirmation does not work.', () => {
    const inputUsername = regComponent.container.querySelector('#username')
    const inputPassword = regComponent.container.querySelector('#password')
    const registerButton = regComponent.container.querySelector('#register-button')
    const passwordConf = regComponent.container.querySelector('#passwordConf')
    const email = regComponent.container.querySelector('#email')

    fireEvent.change(inputUsername, {
      target: { username: 'laila' },
    })
    fireEvent.change(inputPassword, {
      target: { password: '123456789' },
    })
    fireEvent.change(passwordConf, {
      target: { password: '1234567890' },
    })
    fireEvent.change(email, {
      target: { email: 'laila.koo@hotmail.com' },
    })

    fireEvent.submit(registerButton)

    expect(regComponent.container).toHaveTextContent(
      'Luo uusi käyttäjä',
    )

    fireEvent.change(inputUsername, {
      target: { username: 'laila' },
    })
    fireEvent.change(inputPassword, {
      target: { password: '123456789' },
    })
    fireEvent.change(passwordConf, {
      target: { password: '123456789' },
    })
    fireEvent.change(email, {
      target: { email: 'laila.koo@hotmail.com' },
    })

    fireEvent.submit(registerButton)

    expect(loginComponent.container).toHaveTextContent(
      'Kirjaudu',
    )
  })

  test('Email without @ doesnt create a new user', () => {
    const inputUsername = regComponent.container.querySelector('#username')
    const inputPassword = regComponent.container.querySelector('#password')
    const registerButton = regComponent.container.querySelector('#register-button')
    const passwordConf = regComponent.container.querySelector('#passwordConf')
    const email = regComponent.container.querySelector('#email')

    fireEvent.change(inputUsername, {
      target: { username: 'lai' },
    })
    fireEvent.change(inputPassword, {
      target: { password: 'kala1234' },
    })
    fireEvent.change(passwordConf, {
      target: { password: 'kala12345' },
    })
    fireEvent.change(email, {
      target: { email: 'laila.com' },
    })

    fireEvent.submit(registerButton)

    expect(regComponent.container).toHaveTextContent(
      'Luo uusi käyttäjä',
    )
  })
})
