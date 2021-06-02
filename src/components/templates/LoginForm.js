import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
/* eslint-disable eol-last */
// import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import Notification from '../utils/Notification'
// import { LOGIN } from '../queries'
const LoginForm = ({ testUsers, login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')
  const history = useHistory()
  // console.log(testUsers)
  // const [login, loginResult] = useMutation(LOGIN)
  /* useEffect(() => {
  if (loginResult.data) {
  history.push('/')
  }
  }, [loginResult.data]) */

  const submit = async (event) => {
    try {
      event.preventDefault()
      // login({ variables: { username, password } })
      const user = testUsers.find((u) => u.username === username)
      if (!user || user.password !== password) {
        setNotification('Virheellinen käyttäjätunnus tai salasana')
        setTimeout(() => {
          setNotification('')
        }, 10000)
        return
      }

      localStorage.setItem('user-token', username)
      login(username)
      setUsername('')
      setPassword('')

      history.push('/')
    } catch (e) {
      <Notification message="Virhe!" />
    }
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