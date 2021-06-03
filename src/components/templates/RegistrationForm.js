import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
/* import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries' */
import { useHistory } from 'react-router-dom'
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'
import Notification from '../utils/Notification'

const RegistrationForm = ({ testUsers, setUsers }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [email, setEmail] = useState('')
  /*
  const [name, setName] = useState('')
  const [gender, setGender] = useState('Mies')
  const [age, setAge] = useState('')
  */
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
    try {
      event.preventDefault()

      if (password !== passwordConf) {
        setNotification('Salasana ei vastaa varmennusta')
        setTimeout(() => {
          setNotification('')
        }, 10000)
        return
      }

      /* createUser({
      variables: {
        username, password, passwordConf, name, email, gender, age,
      },
    }) */
      const newUser = {
        username, password, email, id: testUsers.length + 1,
      }

      setUsers(testUsers.concat(newUser))
      history.push('/login')
    } catch (e) {
      setNotification('Virhe!')
    }
  }

  return (
    <>
      <h2>Luo uusi käyttäjä</h2>
      <Notification message={notification} />
      <ReactIsCapsLockActive>
        {(active) => <p style={{ color: 'red' }}>{active ? 'Caps lock on päällä' : ''}</p>}
      </ReactIsCapsLockActive>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Käyttäjätunnus:</Form.Label>
          <Form.Text id="username" muted>
            Käyttäjätunnuksen pituus tulee olla 3–16 merkkiä.
          </Form.Text>
          <Form.Control
            id="username"
            required
            type="text"
            minLength="3"
            maxLength="16"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          {/*
          <Form.Label>Oma nimi:</Form.Label>
          <Form.Control
            id="name"
            required
            type="text"
            maxLength="56"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          */}
          <Form.Label>Salasana:</Form.Label>
          <Form.Text id="username" muted>
            Salasanan pituus tulee olla 8–32 merkkiä.
          </Form.Text>
          <Form.Control
            id="password"
            required
            type="password"
            minLength="8"
            maxLength="32"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Form.Label>Salasanan varmennus:</Form.Label>
          <Form.Text id="username" muted>
            Syötä salasana uudelleen.
          </Form.Text>
          <Form.Control
            id="passwordConf"
            required
            type="password"
            minLength="8"
            maxLength="32"
            value={passwordConf}
            onChange={({ target }) => setPasswordConf(target.value)}
          />
          <Form.Text id="username" muted>
            Sähköpostin tulee sisältää @ merkki ja toimiva pääte.
          </Form.Text>
          <Form.Label>Sähköposti:</Form.Label>
          <Form.Control
            id="email"
            required
            type="email"
            maxLength="56"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          {/*
          <Form.Label>Ikä:</Form.Label>
          <Form.Control
            id="age"
            required
            type="number"
            value={age}
            min="18"
            max="120"
            onChange={({ target }) => setAge(target.value)}
          />
          <Form.Label>Sukupuoli:</Form.Label>
          <Form.Control id="gender" as="select" onChange={({ target }) => setGender(target.value)}>
            <option value="Mies">Mies</option>
            <option value="Nainen">Nainen</option>
            <option value="Muu">Muu</option>
          </Form.Control>
          */}
          <Form.Check
            id="accept"
            required
            label="Hyväksyn käyttöehdot"
          />
          <Button id="register-button" type="submit">Rekisteröidy</Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default RegistrationForm
