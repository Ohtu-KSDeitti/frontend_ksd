import React, { useState, useEffect } from 'react'
import {
  Switch, Route,
} from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import { Image } from 'react-bootstrap'
import LoginForm from './components/templates/LoginForm'
import RegistrationForm from './components/templates/RegistrationForm'
import Menu from './components/templates/Menu'
import MainPage from './components/templates/MainPage'
import UserPage from './components/templates/UserPage'
import Footer from './components/utils/Footer'
import PrivateSettings from './components/templates/UserSettings/PrivateSettings'

const App = () => {
  const [loggedUser, setLoggedUser] = useState(localStorage.getItem('user'))
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const client = useApolloClient()

  useEffect(() => {
    document.title = 'Kristittyjen sinkkujen deitti'
  }, [])

  const logout = (useClient = true) => {
    setLoggedUser(null)
    setToken(null)
    localStorage.clear()
    if (useClient) {
      client.clearStore()
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Kristittyjen sinkkujen deitti</h1>
        <Image width="90" height="90" src="/KDLOGO.png" roundedCircle />
      </div>
      <Menu loggedUser={loggedUser} logout={logout} />
      <Switch>
        <Route path="/login">
          <LoginForm setLoggedUser={setLoggedUser} setToken={setToken} />
        </Route>
        <Route path="/register">
          <RegistrationForm />
        </Route>
        <Route path="/s/:id">
          <PrivateSettings logout={logout} />
        </Route>
        <Route path="/:id">
          <UserPage logout={logout} loggedUser={loggedUser} />
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
