import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
/* import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries' */
import { useHistory } from 'react-router-dom'
import Notification from './Notification'

const RegistrationForm = ({ testUsers, setUsers }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('Mies')
  const [age, setAge] = useState('')
  const [notification, setNotification] = useState('')
  const history = useHistory()

  // const [createUser, userData] = useMutation(CREATE_USER)

  /* useEffect(() => {
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
  }, [userData.data]) */

  const submit = async (event) => {
    event.preventDefault()

    if (password !== passwordConf) {
      setNotification('Salasana ei vastaa varmennusta')
      setTimeout(() => {
        setNotification('')
      }, 10000)
      return
    }

    console.log(gender)

    /* createUser({
      variables: {
        username, password, passwordConf, name, email, gender, age,
      },
    }) */
    const newUser = {
      username, password, name, email, gender, age: Number(age), id: testUsers.length + 1,
    }
    console.log('käyttäjä: ', newUser)

    setUsers(testUsers.concat(newUser))

    console.log('ja lista ', testUsers)
    history.push('/login')
  }

  return (
    <div>
      <h2>Luo uusi käyttäjä</h2>
      <Notification message={notification} />
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Käyttäjätunnus:</Form.Label>
          <Form.Control
            required
            type="text"
            minLength="3"
            maxLength="16"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>Oma nimi:</Form.Label>
          <Form.Control
            required
            type="text"
            maxLength="56"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <Form.Label>Salasana:</Form.Label>
          <Form.Control
            required
            type="password"
            minLength="8"
            maxLength="32"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Form.Label>Salasanan varmennus:</Form.Label>
          <Form.Control
            required
            type="password"
            minLength="8"
            maxLength="32"
            value={passwordConf}
            onChange={({ target }) => setPasswordConf(target.value)}
          />
          <Form.Label>Sähköposti:</Form.Label>
          <Form.Control
            required
            type="email"
            maxLength="56"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <Form.Label>Ikä:</Form.Label>
          <Form.Control
            required
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
          <Form.Check
            required
            label="Hyväksyn käyttöehdot"
          />
          <Button type="submit">Rekisteröidy</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default RegistrationForm
