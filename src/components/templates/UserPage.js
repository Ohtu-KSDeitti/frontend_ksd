/* eslint-disable no-tabs */
import React from 'react'

const UserPage = ({ loggedUser, testUsers }) => {
  if (!loggedUser) {
    return (
      <div>
        <p>Et ole kirjautunut</p>
      </div>
    )
  } const thisuser = testUsers.find((u) => u.username === loggedUser)
  console.log(thisuser)
  return (
    <div>
      <h1>Oma Sivu</h1>
      <p>Tämä on oma sivusi, {thisuser.username}</p>
      <h2>Tallentamasi tiedot</h2>
      <ul>
        <li>Nimi: {thisuser.firstname} {thisuser.lastname}</li>
        <li>Nimimerkki: {thisuser.username}</li>
        <li>Sähköposti: {thisuser.email}</li>
      </ul>
      <p>Muokkaa tietojasi tai luo deittiprofiili <a href={`/s/${loggedUser}`}>täällä</a></p>
    </div>
  )
}

export default UserPage
