import React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import RegistrationForm from '../templates/RegistrationForm'
import '@testing-library/jest-dom/extend-expect'

let component

beforeEach(() => {
  component = render(
    <MockedProvider addTypename={false}>
      <RegistrationForm />
    </MockedProvider>,
  )
})

test('renders content', () => {
  expect(component.container).toHaveTextContent(
    'Luo uusi käyttäjä',
  )
  expect(component.container).toHaveTextContent(
    'Salasana',
  )
  expect(component.container).toHaveTextContent(
    'Salasanan varmennus',
  )
})
/*
test('Form posts data ', () => {
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

  expect(inputUsername.username).toBe('laila76')
  expect(inputPassword.password).toBe('kala1234')
  expect(passwordConf.password).toBe('kala1234')
  expect(email.email).toBe('laila.koo@hotmail.com')
  /*
  expect(loginComponent.container).toHaveTextContent(
    'Kirjaudu sisään',
  )
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
}) */
