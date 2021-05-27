import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { CREATE_USER } from '../queries'

const RegistrationForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const history = useHistory()

  const [createUser, userData] = useMutation(CREATE_USER)

  useEffect(() => {
    if (userData.data) {
      setUsername('')
      setPassword('')
      setPasswordConf('')
      setName('')
      setEmail('')
      setGender('')
      setAge('')

      history.push('/')
    }
  }, [userData.data])

  const submit = async (event) => {
    event.preventDefault()
    console.log(gender)

    createUser({ variables: { username, password, passwordConf } })
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
          <Form.Label>Oma nimi:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
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
          <Form.Label>Sähköposti:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <Form.Label>Ikä:</Form.Label>
          <Form.Control
            type="number"
            value={age}
            min="18"
            max="120"
            onChange={({ target }) => setAge(target.value)}
          />
          <Form.Label>Sukupuoli:</Form.Label>
          <Form.Control as="select" onChange={({ target }) => setGender(target.value)}>
            <option value="Mies">Mies</option>
            <option value="Nainen">Nainen</option>
            <option value="Muu">Muu</option>
          </Form.Control>
          <Button type="submit">Rekisteröidy</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default RegistrationForm
