import React from 'react'
/* eslint-disable eol-last */

const MainPage = ({ loggedUser }) => {
  if (!loggedUser) {
    return (
      <div>
        <p>Et ole kirjautunut</p>
      </div>
    )
  }

  return (
    <div>
      <p>Tervetuloa, {loggedUser}!</p>
    </div>
  )
}

export default MainPage