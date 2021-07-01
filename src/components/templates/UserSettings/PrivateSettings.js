import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useMutation, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'
import {
  CURRENT_USER, UPDATE_USER_ACCOUNT, UPDATE_USER_DATE,
} from '../../../queries'
import Notification from '../../utils/Notification'

import UpdateUserImage from '../UpdateUserImage'
import DateProfile from './DateProfile'

const PrivateSettings = ({ logout }) => {
  const [username, setUsername] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [notification, setNotification] = useState('')
  const [dateNotification, setDateNotification] = useState('')
  const history = useHistory()
  const [prefRegions, setPrefRegions] = useState('')
  const [gender, setGender] = useState('FEMALE')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [status, setStatus] = useState('SINGLE')
  const [location, setLocation] = useState('Ahvenanmaa')
  const [bio, setBio] = useState('')

  const userData = useQuery(CURRENT_USER)

  const [updateUserAccount, updatedUserData] = useMutation(UPDATE_USER_ACCOUNT, {
    onError: () => {
      setNotification('Tietojen päivittäminen ei onnistunut')
      setTimeout(() => {
        setNotification('')
      }, 10000)
    },
  })

  const [updateUserDate, userDate] = useMutation(UPDATE_USER_DATE, {
    onError: () => {
      setNotification('Deittiprofiilin päivittäminen ei onnistunut')
      setTimeout(() => {
        setNotification('')
      }, 10000)
    },
  })

  useEffect(() => {
    if (userData.data) {
      const user = userData.data.currentUser
      setUsername(user.username)
      setFirstName(user.firstname)
      setLastName(user.lastname)
      setEmail(user.email)
      setGender(user.userInfo.gender)
      setDateOfBirth(user.userInfo.dateOfBirth)
      setStatus(user.userInfo.status)
      setLocation(user.userInfo.location)
      setBio(user.userInfo.bio)
      setPrefRegions(user.userInfo.prefRegions)
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
    if (userDate.data) {
      setDateOfBirth('')
      setLocation('')
      setStatus('')
      setBio('')

      history.push('/')
    }
  }, [userDate.data])

  if (userData.loading) {
    return <div>loading...</div>
  }

  if (!userData.data) {
    setTimeout(() => {
      logout(false)
      history.push('/')
    }, 2000)
    return (
      <>
        <div>Kirjautuminen on vanhentunut! Ohjataan pääsivulle.</div>
      </>
    )
  }
  const tags = []
  const submitBasic = async (event) => {
    const basicData = userData.data.currentUser
    const id = basicData.id
    try {
      event.preventDefault()

      updateUserAccount({
        variables: {
          id, username, firstname, lastname, email,
        },
      })

      // history.push('/')
    } catch (e) {
      setNotification('Virhe!', e)
    }
  }

  const minorNotification = () => {
    setDateNotification('Deittiprofiilin luominen on sallittu ainoastaan 18 vuotta täyttäneille')
    setTimeout(() => {
      setDateNotification('')
    }, 10000)
  }

  const submitDateProfile = async (event) => {
    event.preventDefault()
    const dateData = userData.data.currentUser
    const id = dateData.id

    const birthday = new Date(dateOfBirth)
    const today = new Date()

    if (birthday.getFullYear() < 1900) {
      setDateNotification('Syntymävuoden on oltava vähintään 1900')
      setTimeout(() => {
        setDateNotification('')
      }, 10000)
      return
    }

    if (today.getFullYear() - birthday.getFullYear() < 18) {
      minorNotification()
      return
    }

    if (today.getFullYear() - birthday.getFullYear() === 18) {
      if (today.getMonth() < birthday.getMonth()) {
        minorNotification()
        return
      }
      if (today.getMonth() === birthday.getMonth()) {
        if (today.getDate() < birthday.getDate()) {
          minorNotification()
          return
        }
      }
    }

    try {
      updateUserDate({
        variables: {
          id, gender, dateOfBirth, status, location, bio, tags, prefRegions,
        },
      })
    } catch (e) {
      setNotification('Virhe!', e)
    }
  }

  const handleChange = (options) => {
    const optionValues = options.map((option) => option.value)
    setPrefRegions(optionValues)
  }

  const user = userData.data.currentUser

  return (
    <>
      <h2>Muokkaa perusasetuksia</h2>
      <Notification message={notification} />
      <ReactIsCapsLockActive>
        {(active) => <p style={{ color: 'blue' }}>{active ? 'Caps lock on päällä' : ''}</p>}
      </ReactIsCapsLockActive>
      <Form onSubmit={submitBasic}>
        <Form.Group>
          <Form.Label>Käyttäjätunnus:</Form.Label>
          <Form.Text id="usernameinfo" muted>
            Käyttäjätunnuksessa sallittuja merkkejä ovat Aa-Öö sekä -
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
          <Form.Label>Sähköposti:</Form.Label>
          <Form.Text id="emailinfo" muted>
            Sähköpostin tulee sisältää @-merkki ja toimiva pääte.
          </Form.Text>
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
      <UpdateUserImage id={userData.data.currentUser.id} />
      <DateProfile
        dateNotification={dateNotification}
        user={user}
        dateOfBirth={dateOfBirth}
        location={location}
        bio={bio}
        submitDateProfile={submitDateProfile}
        handleChange={handleChange}
        setGender={setGender}
        setDateOfBirth={setDateOfBirth}
        setStatus={setStatus}
        setLocation={setLocation}
        setBio={setBio}
      />
    </>
  )
}

export default PrivateSettings
