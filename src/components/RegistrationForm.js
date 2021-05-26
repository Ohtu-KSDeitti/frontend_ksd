import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries'

const RegistrationForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [createUser] = useMutation(CREATE_USER)

  const submit = async (event) => {
    event.preventDefault()

    createUser({ variables: { username, password, passwordConf } })

    setUsername('')
    setPassword('')
    setPasswordConf('')
  }

  return (
    <div>
      <h2>Create a new account</h2>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Käyttäjätunnus:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>Salasana:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Form.Label>Salasanan varmennus:</Form.Label>
          <Form.Control
            type="password"
            value={passwordConf}
            onChange={({ target }) => setPasswordConf(target.value)}
          />
          <Button type="submit">Rekisteröidy</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default RegistrationForm
