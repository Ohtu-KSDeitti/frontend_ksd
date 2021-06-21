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

  const getRegion = (r) => {
    let region = r
    if (region === 'AHVENANMAA') {
      region = 'Ahvenanmaa'
    } else if (region === 'ETELAKARJALA') {
      region = 'Etelä-Karjala'
    } else if (region === 'ETELAPOHJANMAA') {
      region = 'Etelä-Pohjanmaa'
    } else if (region === 'ETELASAVO') {
      region = 'Etelä-Savo'
    } else if (region === 'KAINUU') {
      region = 'Kainuu'
    } else if (region === 'KANTAHAME') {
      region = 'Kanta-Häme'
    } else if (region === 'KESKIPOHJANMAA') {
      region = 'Keski-Pohjanmaa'
    } else if (region === 'KESKISUOMI') {
      region = 'Keski-Suomi'
    } else if (region === 'KYMENLAAKSO') {
      region = 'Kymenlaakso'
    } else if (region === 'LAPPI') {
      region = 'Lappi'
    } else if (region === 'PIRKANMAA') {
      region = 'Pirkanmaa'
    } else if (region === 'POHJANMAA') {
      region = 'Pohjanmaa'
    } else if (region === 'POHJOISKARJALA') {
      region = 'Pohjois-Karjala'
    } else if (region === 'POHJOISPOHJANMAA') {
      region = 'Pohjois-Pohjanmaa'
    } else if (region === 'POHJOISSAVO') {
      region = 'Pohjois-Savo'
    } else if (region === 'PAIJATHAME') {
      region = 'Päijät-Häme'
    } else if (region === 'SATAKUNTA') {
      region = 'Satakunta'
    } else if (region === 'UUSIMAA') {
      region = 'Uusimaa'
    } else if (region === 'VARSINAISSUOMI') {
      region = 'Varsinais-Suomi'
    }

    return region
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
