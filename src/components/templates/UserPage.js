import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {
  Envelope,
  Tree,
  Geo,
  Pencil,
  AlignEnd,
  AlignStart, GenderMale, GenderFemale, People, Person, Calendar2Event,
} from 'react-bootstrap-icons'
import { CURRENT_USER, FIND_USER_BY_ID } from '../../queries'
import UserImage from './UserImage'
import regions, { statuslist } from '../utils/lists'

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
        <h2>Käyttäjän {user.username} deittiprofiili</h2>
        <div>
          <UserImage id={idParam} />
        </div>
        <h3>Perustiedot</h3>
        <ul>
          <GenderFemale /><GenderMale /><b> Sukupuoli </b> {getGender(user.userInfo.gender)}<br />
          <Geo /> <b> Sijainti: </b> {getRegion(user.userInfo.location)}<br />
          <People /><b> Siviilisääty: </b> {getStatus(user.userInfo.status)}<br />
          <Pencil /><b> Kuvaus:</b> {user.userInfo.bio}
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
          <AlignStart /><b>Etunimi:</b> {user.firstname}<br />
          <AlignEnd /><b>Sukunimi:</b> {user.lastname}<br />
          <Person /><b>Nimimerkki </b> {user.username}<br />
          <Envelope /><b>Sähköposti </b> {user.email}
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
        <Person /> <b>Nimimerkki: </b> {user.username}<br />
        <Tree /> <b>Ikä: </b> {getAge(user.userInfo.dateOfBirth)}<br />
        <People /> <b>Siviilisääty: </b> {getStatus(user.userInfo.status)}<br />
        <GenderFemale /><GenderMale /> <b>Sukupuoli: </b> {getGender(user.userInfo.gender)}<br />
        <Geo /> <b>Sijanti: </b> {getRegion(user.userInfo.location)}<br />
        <Pencil /> <b>Kuvaus: </b> {user.userInfo.bio}
      </ul>
      <h2>Omat tiedot (näkyvät vain sinulle)</h2>
      <ul>
        <AlignStart /> <b>Etunimi: </b> {user.firstname}<br />
        <AlignEnd /> <b>Sukunimi: </b> {user.lastname}<br />
        <Calendar2Event /> <b>Syntymäaika: </b> {user.userInfo.dateOfBirth}<br />
        <Envelope /> <b>Sähköposti: </b> {user.email}
      </ul>
      <p>Muokkaa deittiprofiiliasi tai tietojasi <a href={`/s/${loggedUser}`}>täällä</a></p>
    </div>
  )
}

export default UserPage
