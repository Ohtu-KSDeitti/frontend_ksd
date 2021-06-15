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
    return (
      <div>
        <h1>{user.username}n deittiprofiili</h1>
        <h2>Perustiedot</h2>
        <ul>
          <li>Sukupuoli: {user.userInfo.gender}</li>
          <li>Sijanti: {user.userInfo.location}</li>
          <li>Siviilisääty: {user.status}</li>
          <li>Kuvaus: {user.userInfo.bio}</li>
        </ul>
      </div>
    )
  }
  const user = currUserData.data.currentUser

  return (
    <div>
      <h1>{user.username}</h1>
      <h2>Omat tiedot</h2>
      <ul>
        <li>Etunimi: {user.firstname} </li>
        <li>Sukunimi: {user.lastname} </li>
        <li>Nimimerkki: {user.username} </li>
        <li>Sähköposti: {user.email} </li>
      </ul>
      <h2>Deittiprofiilin tiedot</h2>
      <ul>
        <li>Sukupuoli: {user.userInfo.gender}</li>
        <li>Sijanti: {user.userInfo.location}</li>
        <li>Siviilisääty: {user.status}</li>
        <li>Kuvaus: {user.userInfo.bio}</li>
      </ul>
      <p>Muokkaa tietojasi <a href={`/s/${loggedUser}`}>täällä</a></p>
    </div>
  )
}

export default UserPage
