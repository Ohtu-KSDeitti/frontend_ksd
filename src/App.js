import React, { useState } from 'react'
import {
  Switch, Route,
} from 'react-router-dom'
// import { useQuery } from '@apollo/client'
import LoginForm from './components/templates/LoginForm'
import RegistrationForm from './components/templates/RegistrationForm'
import Menu from './components/templates/Menu'
import MainPage from './components/templates/MainPage'
import Footer from './components/utils/Footer'

const App = ({ testUsers }) => {
  const [users, setUsers] = useState(testUsers)
  const [loggedUser, setLoggedUser] = useState(null)
  console.log(users)

  return (
    <div className="container">
      <h1>Kristittyjen sinkkujen deitti</h1>
      <Menu loggedUser={loggedUser} logout={setLoggedUser} />
      <Switch>
        <Route path="/login">
          <LoginForm testUsers={users} login={setLoggedUser} />
        </Route>
        <Route path="/register">
          <RegistrationForm testUsers={users} setUsers={setUsers} />
        </Route>
        <Route path="/">
          <MainPage loggedUser={loggedUser} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
