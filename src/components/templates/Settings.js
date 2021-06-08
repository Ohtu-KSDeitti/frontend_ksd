// import React, { useState, useEffect } from 'react'
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
// import { useMutation } from '@apollo/client'
// import { useHistory } from 'react-router-dom'
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'
// import { UPDATE_USER } from '../../queries' // TARKISTA QUERYN MUOTO
// import Notification from '../utils/Notification'

const Settings = ({ loggedUser, testUsers }) => {
  if (!loggedUser) {
    return (
      <div>
        <p>Et ole kirjautunut</p>
      </div>
    )
  }

  const thisuser = testUsers.find((u) => u.username === loggedUser)
  console.log(thisuser)

  const [username, setUsername] = useState(thisuser.username)
  const [firstname, setFirstName] = useState(thisuser.firstname)
  const [lastname, setLastName] = useState(thisuser.lastname)
  const [password, setPassword] = useState(thisuser.password)
  const [passwordconf, setPasswordConf] = useState(thisuser.password)
  const [email, setEmail] = useState(thisuser.email)
  // const [notification, setNotification] = useState('')
  // const history = useHistory()
  // const [updateUser, userData] = useMutation(UPDATE_USER)

  // const [gender, setGender] = useState('')
  // const [location, setLocation] = useState('')

  /* useEffect(() => {
    if (userData.data) {
      setUsername('')
      setPassword('')
      setPasswordConf('')
      setFirstName('')
      setLastName('')
      setEmail('')

      history.push('/')
    }
  }, [userData.data])

  const submitBasic = async (event) => {
    try {
      event.preventDefault()

      if (password !== passwordconf) {
        setNotification('Salasana ei vastaa varmennusta')
        setTimeout(() => {
          setNotification('')
        }, 10000)
        return
      }

      updateUser({
        variables: {
          username, password, passwordconf, firstname, lastname, email,
        },
      })
      history.push('/login')
    } catch (e) {
      setNotification('Virhe!')
    }
  } */

  // NÄMÄ VOI POISTAA KUN YLEMMÄT FUNKTIOT PALAUTETTU JA PUUTTUVAT TOTEUTETTU:
  const submitBasic = async () => {}
  const submitDateProfile = async () => {}
  const setGender = async () => {}
  const location = ''
  const setLocation = async () => {}
  const description = ''
  const setDescription = async () => {}
  const setStatus = async () => {}
  const birthday = ''
  const setBirthday = async () => {}

  return (
    <>
      <h1>Muokkaa perusasetuksia</h1>
      { /* <Notification message={notification} /> */ }
      <ReactIsCapsLockActive>
        {(active) => <p style={{ color: 'red' }}>{active ? 'Caps lock on päällä' : ''}</p>}
      </ReactIsCapsLockActive>
      <Form onSubmit={submitBasic}>
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
          /><br />
          <Form.Label>Etunimi:</Form.Label>
          <Form.Control
            id="firstname"
            required
            type="text"
            minLength="1"
            maxLength="50"
            value={firstname}
            onChange={({ target }) => setFirstName(target.value)}
          /><br />
          <Form.Label>Sukunimi:</Form.Label>
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
          /><br />
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
            value={passwordconf}
            onChange={({ target }) => setPasswordConf(target.value)}
          /><br />
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
          /><br />
          <Button id="update-button" type="submit">Tallenna muutokset</Button>
        </Form.Group>
      </Form>
      <h1>Luo deittiprofiili</h1>
      <Form onSubmit={submitDateProfile}>
        <Form.Group>
          <Form.Label>Sukupuoli:</Form.Label>
          <Form.Control id="gender" as="select" onChange={({ target }) => setGender(target.value)}>
            <option value="Nainen">Nainen</option>
            <option value="Mies">Mies</option>
          </Form.Control><br />
          <Form.Label>Syntymäaika</Form.Label>
          <Form.Control
            id="birthday"
            required
            type="date"
            value={birthday}
            onChange={({ target }) => setBirthday(target.value)}
          /><br />
          <Form.Label>Siviilisääty:</Form.Label>
          <Form.Control id="status" as="select" onChange={({ target }) => setStatus(target.value)}>
            <option value="single">Sinkku</option>
            <option value="divorced">Eronnut</option>
            <option value="widow">Leski</option>
            <option value="taken">Parisuhteessa</option>
            <option value="married">Naimisissa</option>
          </Form.Control><br />
          <Form.Label>Paikkakunta:</Form.Label>
          <Form.Control
            id="location"
            required
            type="text"
            maxLength="100"
            value={location}
            onChange={({ target }) => setLocation(target.value)}
          /><br />
          <Form.Label>Vapaa kuvaus itsestäsi:</Form.Label>
          <Form.Text id="username" muted>
            Kuvauksen maksimipituus on 500 merkkiä.
          </Form.Text>
          <Form.Control
            as="textarea"
            rows="3"
            id="description"
            type="text"
            maxLength="500"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          /><br />
          <Form.Check
            id="christianAndSingle"
            required
            label="Olen täysi-ikäinen ja kristitty sinkku"
          /><br />
          <Button id="dateprofile-button" type="submit">Luo deittiprofiili</Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default Settings
