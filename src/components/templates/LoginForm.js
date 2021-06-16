import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useMutation, useLazyQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import Notification from '../utils/Notification'
import { LOGIN, CURRENT_USER } from '../../queries'

const LoginForm = ({ setLoggedUser, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')
  const history = useHistory()
  const [getLoggedUser, result] = useLazyQuery(CURRENT_USER)
  const [login, loginResult] = useMutation(LOGIN, {
    onError: () => {
      setUsername('')
      setPassword('')
      setNotification('Väärä käyttäjänimi tai salasana')
      setTimeout(() => {
        setNotification('')
      }, 10000)
    },
  })
  useEffect(() => {
    if (loginResult.data) {
      const token = loginResult.data.login.value
      localStorage.setItem('user-token', token)
      localStorage.setItem('username', username)
      setToken(localStorage.getItem('user-token'))
      setUsername('')
      setPassword('')
      getLoggedUser()
    }
  }, [loginResult.data])

  useEffect(() => {
    if (result.data) {
      localStorage.setItem('user', result.data.currentUser.id)
      setLoggedUser(localStorage.getItem('user'))
      history.push('/')
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setNotification('')
  }

  return (
    <div>
      <h2>Kirjaudu sisään</h2>
      <Notification message={notification} />
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Käyttäjätunnus:</Form.Label>
          <Form.Control
            id="username"
            required
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>Salasana:</Form.Label>
          <Form.Control
            id="password"
            required
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button id="login-button" type="submit">Kirjaudu</Button>
        </Form.Group>
      </Form>
      <p>
        Pääset luomaan uuden käyttäjän
        <a href="/register"> täällä</a>
      </p>
    </div>
  )
}

export default LoginForm
