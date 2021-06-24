import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useMutation, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'
import {
  CURRENT_USER, UPDATE_USER_ACCOUNT, UPDATE_USER_DATE,
} from '../../queries'
import Notification from '../utils/Notification'
import regions from '../utils/regions'
import UpdateUserImage from './UpdateUserImage'

const Settings = ({ logout }) => {
  const [username, setUsername] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [notification, setNotification] = useState('')
  const history = useHistory()
  const [prefRegions, setPrefRegions] = useState([])
  const [gender, setGender] = useState('FEMALE')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [status, setStatus] = useState('SINGLE')
  const [location, setLocation] = useState('Ahvenanmaa')
  const [bio, setBio] = useState('')

  const userData = useQuery(CURRENT_USER)

  const [updateUserAccount, updatedUserData] = useMutation(UPDATE_USER_ACCOUNT)
  const [updateUserDate, userDate] = useMutation(UPDATE_USER_DATE)

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
    console.log('ALUEET ', prefRegions)
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
      history.push('/')
    } catch (e) {
      setNotification('Virhe!')
    }
  }

  const submitDateProfile = async (event) => {
    const dateData = userData.data.currentUser
    const id = dateData.id

    console.log(dateData)
    try {
      event.preventDefault()
      updateUserDate({
        variables: {
          id, gender, dateOfBirth, status, location, bio, tags, prefRegions,
        },
      })
      history.push('/')
    } catch (e) {
      setNotification('Virhe!')
    }
  }

  const handleChange = (options) => {
    const optionValues = options.map((option) => option.value)
    setPrefRegions(optionValues)
    console.log('ALUEET ', prefRegions)
  }

  const createDate = () => (
    <>
      <h1>Luo deittiprofiili</h1>
      <Form onSubmit={submitDateProfile}>
        <Form.Group>
          <Form.Label>Sukupuoli:</Form.Label>
          <Form.Control id="gender" as="select" defaultValue="FEMALE" onChange={({ target }) => setGender(target.value)}>
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
          <Form.Control id="status" as="select" defaultValue="SINGLE" onChange={({ target }) => setStatus(target.value)}>
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
            as="select"
            defaultValue="AHVENANMAA"
            required
            value={location}
            onChange={({ target }) => setLocation(target.value)}
          >
            <option value="AHVENANMAA">Ahvenanmaa</option>
            <option value="ETELAKARJALA">Etelä-Karjala</option>
            <option value="ETELAPOHJANMAA">Etelä-Pohjanmaa</option>
            <option value="ETELASAVO">Etelä-Savo</option>
            <option value="KAINUU">Kainuu</option>
            <option value="KANTAHAME">Kanta-Häme</option>
            <option value="KESKIPOHJANMAA">Keski-Pohjanmaa</option>
            <option value="KESKISUOMI">Keski-Suomi</option>
            <option value="KYMENLAAKSO">Kymenlaakso</option>
            <option value="LAPPI">Lappi</option>
            <option value="PIRKANMAA">Pirkanmaa</option>
            <option value="POHJANMAA">Pohjanmaa</option>
            <option value="POHJOISKARJALA">Pohjois-Karjala</option>
            <option value="POHJOISPOHJANMAA">Pohjois-Pohjanmaa</option>
            <option value="POHJOISSAVO">Pohjois-Savo</option>
            <option value="PAIJATHAME">Päijät-Häme</option>
            <option value="SATAKUNTA">Satakunta</option>
            <option value="UUSIMAA">Uusimaa</option>
            <option value="VARSINAIS-SUOMI">Varsinais-Suomi</option>
          </Form.Control><br />
          <Form.Label>Etsin seuraa maakunnista:</Form.Label>
          <Select
            id="regions"
            as="select"
            isMulti
            options={regions}
            defaultValue={regions[0]}
            // eslint-disable-next-line react/no-this-in-sfc
            onChange={handleChange}
          />
          <Form.Label>Vapaa kuvaus itsestäsi:</Form.Label>
          <Form.Text id="bioInfo" muted>
            Kuvauksen maksimipituus on 500 merkkiä.
          </Form.Text>
          <Form.Control
            as="textarea"
            required
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

  const editDate = () => (
    <>
      <h1> Muokkaa deittiprofiiliasi </h1>
      <Form onSubmit={submitDateProfile}>
        <Form.Group>
          <Form.Label>Sukupuoli:</Form.Label>
          <Form.Control id="gender" as="select" value={gender} onChange={({ target }) => setGender(target.value)}>
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
          <Form.Control id="status" as="select" value={status} onChange={({ target }) => setStatus(target.value)}>
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
            as="select"
            required
            defaultValue="AHVENANMAA"
            value={location}
            onChange={({ target }) => setLocation(target.value)}
          >
            <option value="AHVENANMAA">Ahvenanmaa</option>
            <option value="ETELAKARJALA">Etelä-Karjala</option>
            <option value="ETELAPOHJANMAA">Etelä-Pohjanmaa</option>
            <option value="ETELASAVO">Etelä-Savo</option>
            <option value="KAINUU">Kainuu</option>
            <option value="KANTAHAME">Kanta-Häme</option>
            <option value="KESKIPOHJANMAA">Keski-Pohjanmaa</option>
            <option value="KESKISUOMI">Keski-Suomi</option>
            <option value="KYMENLAAKSO">Kymenlaakso</option>
            <option value="LAPPI">Lappi</option>
            <option value="PIRKANMAA">Pirkanmaa</option>
            <option value="POHJANMAA">Pohjanmaa</option>
            <option value="POHJOISKARJALA">Pohjois-Karjala</option>
            <option value="POHJOISPOHJANMAA">Pohjois-Pohjanmaa</option>
            <option value="POHJOISSAVO">Pohjois-Savo</option>
            <option value="PAIJATHAME">Päijät-Häme</option>
            <option value="SATAKUNTA">Satakunta</option>
            <option value="UUSIMAA">Uusimaa</option>
            <option value="VARSINAISSUOMI">Varsinais-Suomi</option>
          </Form.Control><br />
          <Form.Label>Etsin seuraa maakunnista:</Form.Label>
          <Select
            id="regions"
            as="select"
            isMulti
            options={regions}
            defaultValue={regions[0]}
            classNamePrefix="react-select"
            // eslint-disable-next-line react/no-this-in-sfc
            onChange={handleChange}
          />
          <Form.Label>Vapaa kuvaus itsestäsi:</Form.Label>
          <Form.Text id="bio">
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
          <Button id="dateprofile-button" type="submit">Muokkaa</Button>
        </Form.Group>
      </Form>
    </>
  )

  const user = userData.data.currentUser
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
            Sähköpostin tulee sisältää @-merkki ja toimiva pääte.
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
      <UpdateUserImage id={userData.data.currentUser.id} />
      {user.userInfo.dateOfBirth === '' ? createDate() : editDate()}
    </>
  )
}

export default Settings
