/* eslint-disable no-tabs */
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { CURRENT_USER, FIND_USER_BY_ID } from '../../queries'
import UserImage from './UserImage'

const UserPage = ({ loggedUser }) => {
  const idParam = useParams().id
  const currUserData = useQuery(CURRENT_USER)
  const userData = useQuery(FIND_USER_BY_ID,
    { variables: { id: idParam } })

  if (currUserData.loading || userData.loading) {
    return <div>loading...</div>
  }

  const getStatus = (s) => {
    let status = s
    if (status === 'SINGLE') {
      status = 'Sinkku'
    } else if (status === 'TAKEN') {
      status = 'Parisuhteessa'
    } else if (status === 'MARRIED') {
      status = 'Naimisissa'
    } else if (status === 'DIVORCED') {
      status = 'Eronnut'
    } else if (status === 'WIDOWED') {
      status = 'Leski'
    }
    return status
  }

  const getGender = (g) => {
    let gender = g
    if (gender === 'FEMALE') {
      gender = 'Nainen'
    } else {
      gender = 'Mies'
    }
    return gender
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
        <h1>{user.username}:n deittiprofiili</h1>
        <h2>Perustiedot</h2>
        <ul>
          <li><b>Sukupuoli:</b> {getGender(user.userInfo.gender)}</li>
          <li><b>Sijanti:</b> {user.userInfo.location}</li>
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
        <h1>{user.username}</h1>
        <UserImage id={idParam} />
        <h2>Omat tiedot</h2>
        <ul>
          <li><b>Etunimi:</b> {user.firstname} </li>
          <li><b>Sukunimi:</b> {user.lastname} </li>
          <li><b>Nimimerkki:</b> {user.username} </li>
          <li><b>Sähköposti:</b> {user.email} </li>
        </ul>
        <p>Muokkaa tietojasi <a href={`/s/${loggedUser}`}>täällä</a></p>
      </div>
    )
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <h2>Deittiprofiilin tiedot</h2>
      <ul>
        <li><b>Sukupuoli:</b> {getGender(user.userInfo.gender)}</li>
        <li><b>Sijanti:</b> {user.userInfo.location}</li>
        <li><b>Siviilisääty:</b> {getStatus(user.userInfo.status)}</li>
        <li><b>Kuvaus:</b> {user.userInfo.bio}</li>
      </ul>
      <h2>Omat tiedot (näkyvät vain sinulle)</h2>
      <ul>
        <li><b>Etunimi:</b> {user.firstname} </li>
        <li><b>Sukunimi:</b> {user.lastname} </li>
        <li><b>Syntymäaika:</b> {user.userInfo.dateOfBirth} </li>
        <li><b>Ikä:</b> {getAge(user.userInfo.dateOfBirth)} </li>
        <li><b>Nimimerkki:</b> {user.username} </li>
        <li><b>Sähköposti:</b> {user.email} </li>
      </ul>
      <p>Muokkaa tietojasi <a href={`/s/${loggedUser}`}>täällä</a></p>
    </div>
  )
}

export default UserPage
