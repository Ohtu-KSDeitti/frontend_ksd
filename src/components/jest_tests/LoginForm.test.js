import React from 'react'
import { render, wait, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import LoginForm from '../templates/LoginForm'
import '@testing-library/jest-dom/extend-expect'
import testUsers from './testusers'
import { LOGIN } from '../../queries'

test('renders content', () => {
  const component = render(
    <MockedProvider addTypename={false}>
      <LoginForm testUsers={testUsers} />
    </MockedProvider>,
  )
  expect(component.container).toHaveTextContent(
    'Kirjaudu sisään',
  )
  expect(component.container).toHaveTextContent(
    'Salasana',
  )
})

test('LoginForm posts correct data.', async () => {
  const mocks = [
    {
      request: {
        query: LOGIN,
        variables: {
          username: 'Buck', password: 'kissa123',
        },
      },
      newData: jest.fn(() => ({
        data: {
          loggedUser: {
            value: 'xxxx',
          },
        },
      })),
    },
  ]

  const component = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LoginForm testUsers={testUsers} />
    </MockedProvider>,
  )

  const inputUsername = component.container.querySelector('#username')
  const inputPassword = component.container.querySelector('#password')
  const loginbutton = component.container.querySelector('#login-button')

  fireEvent.change(inputUsername, {
    target: { username: 'laila76' },
  })
  fireEvent.change(inputPassword, {
    target: { password: 'kala1234' },
  })

  fireEvent.submit(loginbutton)

  const loginMock = mocks[0].newData
  await wait(() => expect(loginMock).toHaveBeenCalled())
})
