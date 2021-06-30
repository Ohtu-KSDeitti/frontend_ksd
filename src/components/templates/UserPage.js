import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Badge } from 'react-bootstrap'
import { CURRENT_USER, FIND_USER_BY_ID } from '../../queries'
import UserImage from './UserImage'
import regions, { statuslist } from '../utils/gqldata'

const UserPage = ({ loggedUser, logout }) => {
  const idParam = useParams().id
  const history = useHistory()

  const currUserData = useQuery(CURRENT_USER)

  const userData = useQuery(FIND_USER_BY_ID,
    { variables: { id: idParam } })

  if (currUserData.loading || userData.loading) {
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

  const getStatus = (s) => statuslist.filter((status) => s === status.value)[0].label
  const getRegion = (r) => regions.filter((reg) => reg.value === r)[0].label

  const getGender = (g) => {
    if (g === 'FEMALE') {
      return 'Nainen'
    }
    return 'Mies'
  }

  const getAge = (d) => {
    const today = new Date()
    const birthday = new Date(d)
    let age = today.getFullYear() - birthday.getFullYear()
    const month = today.getMonth() - birthday.getMonth()
    if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
      age -= 1
    }
    return age
  }

  if (!currUserData.data || currUserData.data.currentUser.id !== userData.data.findUserById.id) {
    const user = userData.data.findUserById

    return (
      <div>
        <h1>Käyttäjän <Badge variant="secondary">{user.username}</Badge> deittiprofiili</h1>
        <div>
          <UserImage id={idParam} />
        </div>
        <h2>Perustiedot</h2>
        <ul>
          <li><b>Sukupuoli:</b> {getGender(user.userInfo.gender)}</li>
          <li><b>Sijainti:</b> {getRegion(user.userInfo.location)}</li>
          <li><b>Siviilisääty:</b> {getStatus(user.userInfo.status)}</li>
          <li><b>Kuvaus:</b> {user.userInfo.bio}</li>
        </ul>
      </div>
    )
  }
  const user = currUserData.data.currentUser

  if (user.userInfo.dateOfBirth === '') {
    return (
      <div>
        <div>
          <UserImage id={idParam} />
        </div>
        <h2>Omat tiedot</h2>
        <ul>
          <li><b>Etunimi:</b> {user.firstname} </li>
          <li><b>Sukunimi:</b> {user.lastname} </li>
          <li><b>Nimimerkki:</b> {user.username} </li>
          <li><b>Sähköposti:</b> {user.email} </li>
        </ul>
        <p>Muokkaa tietojasi tai luo deittiprofiili <a href={`/s/${loggedUser}`}>täällä</a></p>
      </div>
    )
  }

  return (
    <div>
      <div>
        <UserImage id={idParam} />
      </div>
      <h2>Deittiprofiilisi tiedot</h2>
      <ul>
        <li><b>Nimimerkki:</b> {user.username} </li>
        <li><b>Sukupuoli:</b> {getGender(user.userInfo.gender)}</li>
        <li><b>Sijanti:</b> {getRegion(user.userInfo.location)}</li>
        <li><b>Siviilisääty:</b> {getStatus(user.userInfo.status)}</li>
        <li><b>Kuvaus:</b> {user.userInfo.bio}</li>
      </ul>
      <h2>Omat tiedot (näkyvät vain sinulle)</h2>
      <ul>
        <li><b>Etunimi:</b> {user.firstname} </li>
        <li><b>Sukunimi:</b> {user.lastname} </li>
        <li><b>Syntymäaika:</b> {user.userInfo.dateOfBirth} </li>
        <li><b>Ikä:</b> {getAge(user.userInfo.dateOfBirth)} </li>
        <li><b>Sähköposti:</b> {user.email} </li>
      </ul>
      <p>Muokkaa deittiprofiiliasi tai tietojasi <a href={`/s/${loggedUser}`}>täällä</a></p>
    </div>
  )
}

export default UserPage
