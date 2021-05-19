import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Käyttäjätunnus:</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>Salasana:</Form.Label>
          <Form.Control           
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button type='submit'>Kirjaudu</Button>
        </Form.Group>
      </Form>
      <p>Pääset luomaan uuden käyttäjän <a href='/register'>täällä</a></p>
    </div>
  )

}

export default LoginForm