/* eslint-disable no-tabs */
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { CURRENT_USER, FIND_USER_BY_ID } from '../../queries'

const UserPage = ({ loggedUser }) => {
  const idParam = useParams().id
  const currUserData = useQuery(CURRENT_USER)
  const userData = useQuery(FIND_USER_BY_ID,
    { variables: { id: idParam } })

  if (currUserData.loading || userData.loading) {
    return <div>loading...</div>
  }

  if (!currUserData.data || currUserData.data.currentUser.id !== userData.data.findUserById.id) {
    const user = userData.data.findUserById

    let sex = 'Nainen'
    if ((user.userInfo.gender) === 'MALE') {
      sex = 'Mies'
    }
    console.log(sex)

    return (
      <div>
        <h1>{user.username}:n deittiprofiili</h1>
        <h2>Perustiedot</h2>
        <ul>
          <li><b>Sukupuoli:</b> {sex}</li>
          <li><b>Sijanti:</b> {user.userInfo.location}</li>
          <li><b>Siviilisääty:</b> {user.userInfo.status}</li>
          <li><b>Kuvaus:</b> {user.userInfo.bio}</li>
        </ul>
      </div>
    )
  }
  const user = currUserData.data.currentUser
  let sex = 'Nainen'
  if ((user.userInfo.gender) === 'MALE') {
    sex = 'Mies'
  }
  console.log(sex)
  console.log(user.userInfo.status)

  if (user.userInfo.dateOfBirth === '') {
    return (
      <div>
        <h1>{user.username}</h1>
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
      <h2>Omat tiedot</h2>
      <ul>
        <li><b>Etunimi:</b> {user.firstname} </li>
        <li><b>Sukunimi:</b> {user.lastname} </li>
        <li><b>Syntymäaika:</b> {user.userInfo.dateOfBirth} </li>
        <li><b>Nimimerkki:</b> {user.username} </li>
        <li><b>Sähköposti:</b> {user.email} </li>
      </ul>
      <h2>Deittiprofiilin tiedot</h2>
      <ul>
        <li><b>Sukupuoli:</b> {sex}</li>
        <li><b>Sijanti:</b> {user.userInfo.location}</li>
        <li><b>Siviilisääty:</b> {user.userInfo.status}</li>
        <li><b>Kuvaus:</b> {user.userInfo.bio}</li>
      </ul>
      <p>Muokkaa tietojasi <a href={`/s/${loggedUser}`}>täällä</a></p>
    </div>
  )
}

export default UserPage
