import React, { useState, useEffect } from 'react'
// import emailjs from 'emailjs-com'
import { Form, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'
import { ADD_NEW_USER } from '../../queries'
import Notification from '../utils/Notification'

const RegistrationForm = () => {
  const [username, setUsername] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordconf, setPasswordConf] = useState('')
  const [email, setEmail] = useState('')
  // const SERVICE_ID = process.env.REACT_APP_SERVICE_ID
  // const REGISTRATION_TEMPLATE = process.env.REACT_APP_REGISTRATION_TEMPLATE
  // const USER_KEY = process.env.REACT_APP_USER_KEY
  const [notification, setNotification] = useState('')
  const history = useHistory()

  const [addNewUser, userData] = useMutation(ADD_NEW_USER, {
    onError: () => {
      setNotification('Rekisteröityminen ei onnistunut')
      setTimeout(() => {
        setNotification('')
      }, 10000)
    },
  })

  useEffect(() => {
    if (userData.data) {
      setUsername('')
      setPassword('')
      setPasswordConf('')
      setFirstName('')
      setLastName('')
      setEmail('')
      history.push('/login')
    }
  }, [userData.data])

  const submit = async (event) => {
    try {
      event.preventDefault()

      if (password !== passwordconf) {
        setNotification('Salasana ei vastaa varmennusta')
        setTimeout(() => {
          setNotification('')
        }, 10000)
        return
      }

      addNewUser({
        variables: {
          username, password, passwordconf, firstname, lastname, email,
        },
      })
      // await emailjs.sendForm(SERVICE_ID, REGISTRATION_TEMPLATE, event.target, USER_KEY)
    } catch (e) {
      setNotification('Virhe!', e)
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
          <Form.Label>Sähköposti:</Form.Label>
          <Form.Text id="emailinfo" muted>
            Sähköpostin tulee sisältää @-merkki ja toimiva pääte. Sähköpostin tulee olla uniikki.
          </Form.Text>
          <Form.Control
            id="email"
            required
            type="email"
            maxLength="56"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            name="email"
          /><br />
          <Form.Label>Käyttäjätunnus:</Form.Label>
          <Form.Text id="info" muted>
            Käyttäjätunnuksen pituus tulee olla 3–16 merkkiä. Sallittuja merkkejä ovat Aa-Öö sekä -
          </Form.Text>
          <Form.Control
            id="username"
            required
            type="text"
            minLength="3"
            maxLength="16"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          /><br />
          <Form.Label>Etunimi:</Form.Label>
          <Form.Text id="firstnameinfo" muted>
            Etunimessä sallittuja merkkejä ovat Aa-Öö sekä -
          </Form.Text>
          <Form.Control
            id="firstname"
            required
            type="text"
            minLength="1"
            maxLength="50"
            value={firstname}
            onChange={({ target }) => setFirstName(target.value)}
            name="name"
          /><br />
          <Form.Label>Sukunimi:</Form.Label>
          <Form.Text id="lastnameinfo" muted>
            Sukunimessä sallittuja merkkejä ovat Aa-Öö sekä -
          </Form.Text>
          <Form.Control
            id="lastname"
            required
            type="text"
            minLength="1"
            maxLength="50"
            value={lastname}
            onChange={({ target }) => setLastName(target.value)}
          /><br />
          <Form.Label>Salasana:</Form.Label>
          <Form.Text id="passinfo" muted>
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
          /><br />
          <Form.Label>Salasanan varmennus:</Form.Label>
          <Form.Text id="passconfinfo" muted>
            Syötä salasana uudelleen.
          </Form.Text>
          <Form.Control
            id="passwordConf"
            required
            type="password"
            minLength="8"
            maxLength="32"
            value={passwordconf}
            onChange={({ target }) => setPasswordConf(target.value)}
          /><br />
          <Form.Check
            id="accept"
            required
            label="Hyväksyn käyttöehdot"
          /><br />
          <Button id="register-button" type="submit">Rekisteröidy</Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default RegistrationForm
