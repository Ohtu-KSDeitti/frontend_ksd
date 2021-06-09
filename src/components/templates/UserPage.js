/* eslint-disable no-tabs */
import React from 'react'
import { useQuery } from '@apollo/client'
import { CURRENT_USER } from '../../queries'

const UserPage = ({ loggedUser }) => {
  const userData = useQuery(CURRENT_USER)

  if (userData.loading) {
    return <div>loading...</div>
  }

  if (!userData.data) {
    return (
      <div>Kirjaudu sisään</div>
    )
  }
  const user = userData.data.currentUser

  return (
    <div>
      <h1>Oma Sivu</h1>
      <p>Tämä on käyttäjän {user.username} oma sivu</p>
      <h2>Tallentamasi tiedot</h2>
      <ul>
        <li>Etunimi: {user.firstname} <button type="submit">Muokkaa</button></li>
        <li>Sukunimi: {user.lastname} <button type="submit">Muokkaa</button></li>
        <li>Nimimerkki: {user.username} <button type="submit">Muokkaa</button></li>
        <li>Sähköposti: {user.email} <button type="submit">Muokkaa</button></li>
      </ul>
      <p>Muokkaa tietojasi tai luo deittiprofiili <a href={`/s/${loggedUser}`}>täällä</a></p>
    </div>
  )
}

export default UserPage
