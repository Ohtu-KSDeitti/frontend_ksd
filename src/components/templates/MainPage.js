import React from 'react'

const MainPage = ({ token, loggedUser }) => {
  if (!token && !loggedUser) {
    return (
      <div>
        <p>Et ole kirjautunut</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Pääsivu</h2>
      <p>Tervetuloa!</p>
    </div>
  )
}

export default MainPage
