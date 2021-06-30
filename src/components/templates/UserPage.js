import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {
  Egg, Envelope, Tree, Geo, FilePerson, PersonBoundingBox, Shield, Pencil, AlignEnd, AlignStart,
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
          <li><b>Sukupuoli<PersonBoundingBox /></b> {getGender(user.userInfo.gender)} </li>
          <li><b>Sijainti <Geo /></b> {getRegion(user.userInfo.location)}</li>
          <li><b>Siviilisääty <Shield /></b> {getStatus(user.userInfo.status)}</li>
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
          <li><b>Nimimerkki <FilePerson /></b> {user.username} </li>
          <li><b>Sähköposti <Envelope /></b> {user.email} </li>
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
        <li><b>Nimimerkki <FilePerson /></b> {user.username} </li>
        <li><b>Ikä <Tree /></b> {getAge(user.userInfo.dateOfBirth)} </li>
        <li><b>Siviilisääty <Shield /></b> {getStatus(user.userInfo.status)}</li>
        <li><b>Sukupuoli <PersonBoundingBox /></b> {getGender(user.userInfo.gender)}</li>
        <li><b>Sijanti <Geo /></b> {getRegion(user.userInfo.location)}</li>
        <li><b>Kuvaus <Pencil /></b> {user.userInfo.bio}</li>
      </ul>
      <h2>Omat tiedot (näkyvät vain sinulle)</h2>
      <ul>
        <li><b>Etunimi <AlignStart /></b> {user.firstname} </li>
        <li><b>Sukunimi <AlignEnd /></b> {user.lastname} </li>
        <li><b>Syntymäaika <Egg /></b> {user.userInfo.dateOfBirth} </li>
        <li><b>Sähköposti <Envelope /></b> {user.email} </li>
      </ul>
      <p>Muokkaa deittiprofiiliasi tai tietojasi <a href={`/s/${loggedUser}`}>täällä</a></p>
    </div>
  )
}

export default UserPage
