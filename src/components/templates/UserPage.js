/* eslint-disable no-tabs */
import React from 'react'

const UserPage = ({ loggedUser, testUsers }) => {
  if (loggedUser) {
    const thisuser = testUsers.find((u) => u.username === loggedUser)
    console.log(thisuser)
    return (
      <div>
        <h1>Oma Sivu</h1>
        <p>Tämä on käyttäjän {thisuser.username} oma sivu</p>
        <h2>Tallentamasi tiedot</h2>
        <ul>
          <li>Nimi: {thisuser.name} <button type="submit">Muokkaa</button></li>
          <li>Nimimerkki: {thisuser.username} <button type="submit">Muokkaa</button></li>
          <li>Sähköposti: {thisuser.email} <button type="submit">Muokkaa</button></li>
        </ul>
        <p>Täydennä tietojasi ja luo deittiprofiili <a href="url">täällä</a></p>
      </div>
    )
  } return (
    <div>
      <h1>Oma Sivu</h1>
    </div>
  )
}

export default UserPage
