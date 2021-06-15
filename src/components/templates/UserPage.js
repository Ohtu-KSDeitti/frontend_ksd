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
    return (
      <div>
        <h1>Tämä on käyttäjän {userData.data.findUserById.username} oma sivu</h1>
      </div>
    )
  }
  const user = currUserData.data.currentUser

  return (
    <div>
      <h1>Tämä on oma sivusi</h1>
      <h2>Tallentamasi tiedot</h2>
      <ul>
        <li>Etunimi: {user.firstname} </li>
        <li>Sukunimi: {user.lastname} </li>
        <li>Nimimerkki: {user.username} </li>
        <li>Sähköposti: {user.email} </li>
      </ul>
      <p>Muokkaa tietojasi tai luo deittiprofiili <a href={`/s/${loggedUser}`}>täällä</a></p>
    </div>
  )
}

export default UserPage
