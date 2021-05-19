import React, { useState, useEffect } from 'react'
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
          <Form.Label>username:</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control           
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button type='submit'>login</Button>
        </Form.Group>
      </Form>
      <p>New user? Register <a href='/register'>here</a></p>
    </div>
  )

}

export default LoginForm