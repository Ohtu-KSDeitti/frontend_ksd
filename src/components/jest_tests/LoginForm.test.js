import React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import LoginForm from '../templates/LoginForm'
import '@testing-library/jest-dom/extend-expect'
import testUsers from './testusers'
//  import { LOGIN } from '../../queries'

/* export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
login(
  username: $username,
  password: $password,
) {
  value
}
}
`
test('<NoteForm /> updates parent state and calls onSubmit', () => {
const createNote = jest.fn()

const component = render(
<NoteForm createNote={createNote} />,
)

const input = component.container.querySelector('input')
const form = component.container.querySelector('form')

fireEvent.change(input, {
target: { value: 'testing of forms could be easier' },
})
fireEvent.submit(form)

expect(createNote.mock.calls).toHaveLength(1)
expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier')
})
`
*/

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
/*
test('LoginForm posts correct data.', async () => {
  const testSubmit = jest.fn()

  const component = render(
    <MockedProvider addTypename={false}>
      <LoginForm submit={testSubmit} />
    </MockedProvider>,
  )

  const inputUsername = component.container.querySelector('#username')
  const inputPassword = component.container.querySelector('#password')
  const loginForm = component.container.querySelector('form')

  fireEvent.change(inputUsername, {
    target: { value: 'Buck' },
  })
  fireEvent.change(inputPassword, {
    target: { value: 'kissa123' },
  })
  fireEvent.submit(loginForm)

  expect(testSubmit.mock.calls).toHaveLength(1)
})

test('LoginForm with empty values.', async () => {
  const testSubmit = jest.fn(() => 'kutsuttu')

  const component = render(
    <MockedProvider addTypename={false}>
      <LoginForm submit={testSubmit} />
    </MockedProvider>,
  )

  const loginForm = component.container.querySelector('form')
  fireEvent.submit(loginForm)

  console.log(testSubmit.mock)
  expect(component.container.toHaveTextContent('Väärä käyttäjänimi tai salasana'))
}) */
