import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useMutation, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'
import { CURRENT_USER, UPDATE_USER_ACCOUNT, UPDATE_USER_INFO } from '../../queries'
import Notification from '../utils/Notification'

const Settings = () => {
  const [username, setUsername] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [notification, setNotification] = useState('')
  const history = useHistory()

  const [gender, setGender] = useState('FEMALE')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [status, setStatus] = useState('SINGLE')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')

  const userData = useQuery(CURRENT_USER)
  const [updateUserAccount, updatedUserData] = useMutation(UPDATE_USER_ACCOUNT)
  const [updateUserInfo, userInfo] = useMutation(UPDATE_USER_INFO)

  useEffect(() => {
    if (userData.data) {
      const user = userData.data.currentUser
      setUsername(user.username)
      setFirstName(user.firstname)
      setLastName(user.lastname)
      setEmail(user.email)
    }
  }, [userData.data])

  useEffect(() => {
    if (updatedUserData.data) {
      setUsername('')
      setFirstName('')
      setLastName('')
      setEmail('')

      history.push('/')
    }
  }, [updatedUserData.data])

  useEffect(() => {
    if (userInfo.data) {
      setGender('')
      setDateOfBirth('')
      setStatus('')
      setLocation('')
      setBio('')

      history.push('/')
    }
  }, [userInfo.data])

  if (userData.loading) {
    return <div>loading...</div>
  }

  if (!userData.data) {
    return (
      <div>Et ole kirjautunut!</div>
    )
  }
  const tags = []
  const submitBasic = async (event) => {
    const user = userData.data.currentUser
    const id = user.id
    try {
      event.preventDefault()

      updateUserAccount({
        variables: {
          id, username, firstname, lastname, email,
        },
      })
      history.push('/')
    } catch (e) {
      setNotification('Virhe!')
    }
  }

  const submitDateProfile = async (event) => {
    const user = userData.data.currentUser
    console.log(user)
    const id = user.id
    console.log(id)
    try {
      event.preventDefault()
      updateUserInfo({
        variables: {
          id, gender, dateOfBirth, status, location, bio, tags,
        },
      })
      history.push('/')
    } catch (e) {
      setNotification('Virhe!')
    }
  }

  return (
    <>
      <h1>Muokkaa perusasetuksia</h1>
      <Notification message={notification} />
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
            <option value="FEMALE">Nainen</option>
            <option value="MALE">Mies</option>
          </Form.Control><br />
          <Form.Label>Syntymäaika</Form.Label>
          <Form.Control
            id="dateOfBirth"
            required
            type="date"
            value={dateOfBirth}
            onChange={({ target }) => setDateOfBirth(target.value)}
          /><br />
          <Form.Label>Siviilisääty:</Form.Label>
          <Form.Control id="status" as="select" onChange={({ target }) => setStatus(target.value)}>
            <option value="SINGLE">Sinkku</option>
            <option value="DIVORCED">Eronnut</option>
            <option value="WIDOWED">Leski</option>
            <option value="TAKEN">Parisuhteessa</option>
            <option value="MARRIED">Naimisissa</option>
          </Form.Control>
          <br />
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
          <Form.Text id="bio" muted>
            Kuvauksen maksimipituus on 500 merkkiä.
          </Form.Text>
          <Form.Control
            as="textarea"
            rows="3"
            id="bio"
            type="text"
            maxLength="500"
            value={bio}
            onChange={({ target }) => setBio(target.value)}
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
