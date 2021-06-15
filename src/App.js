import React, { useState } from 'react'
import {
  Switch, Route,
} from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import LoginForm from './components/templates/LoginForm'
import RegistrationForm from './components/templates/RegistrationForm'
import Menu from './components/templates/Menu'
import MainPage from './components/templates/MainPage'
import UserPage from './components/templates/UserPage'
import Settings from './components/templates/Settings'
import Footer from './components/utils/Footer'
import KDLOGO from './logos/KDLOGO.png'

const App = () => {
  const [loggedUser, setLoggedUser] = useState(localStorage.getItem('username'))
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const client = useApolloClient()

  const logout = () => {
    setLoggedUser(null)
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div className="container">
      <div className="header">
        <h1><img src={KDLOGO} alt="Logo" width="150" height="150" /> Kristittyjen sinkkujen deitti</h1>
      </div>
      <Menu loggedUser={loggedUser} logout={logout} />
      <Switch>
        <Route path="/login">
          <LoginForm setLoggedUser={setLoggedUser} setToken={setToken} />
        </Route>
        <Route path="/register">
          <RegistrationForm />
        </Route>
        <Route path="/s/:username">
          <Settings />
        </Route>
        <Route path="/:username">
          <UserPage loggedUser={loggedUser} />
        </Route>
        <Route path="/">
          <MainPage loggedUser={loggedUser} token={token} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
