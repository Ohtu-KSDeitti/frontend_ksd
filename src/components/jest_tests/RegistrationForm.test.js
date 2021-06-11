import React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import TestRenderer from 'react-test-renderer'
import RegistrationForm from '../templates/RegistrationForm'
import '@testing-library/jest-dom/extend-expect'
import { ADD_NEW_USER } from '../../queries'

const { act } = TestRenderer

const values = {
  username: 'kal',
  password: 'kallekalle',
  passwordconf: 'kallekalle',
  firstname: 'kal',
  lastname: 'kal',
  email: 'kalle@kal.fi',
}

test('Create user', async () => {
  // const mockCallBack = jest.fn()
  const mockReg = [
    {
      request: {
        query: ADD_NEW_USER,
        variables: {
          values,
        },
      },
      result: {
        data: {
          addNewUser: {
            username: 'kal',
            firstname: 'kal',
            lastname: 'kal',
            email: 'kalle@kal.fi',
          },
        },
      },
    },
  ]
  // onClick={mockClick}
  const wrapper = TestRenderer.create(
    <MockedProvider mocks={mockReg} addTypename={false}>
      <RegistrationForm />
    </MockedProvider>,
  )

  const button = wrapper.root.findByType('form')
  act(() => {
    button.props.onSubmit()
  })

  await new Promise((resolve) => setTimeout(resolve, 0))

  const tree = wrapper.toJSON()
  // expect(mockReg).toBeCalledWith(expect.anything())
  // expect(tree).toEqual(expect.arrayContaining('Virhe!'))

  console.log(tree[1].children)
  expect(tree[1].children).toContain('Virhe!')
  // expect(wrapper).toBeTruthy()
})

test('renders content', () => {
  const component = render(
    <MockedProvider addTypename={false}>
      <RegistrationForm />
    </MockedProvider>,
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
