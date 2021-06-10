import React, { useState } from 'react'
import {
  Switch, Route,
} from 'react-router-dom'
import { useApolloClient, useQuery } from '@apollo/client'
import LoginForm from './components/templates/LoginForm'
import RegistrationForm from './components/templates/RegistrationForm'
import Menu from './components/templates/Menu'
import MainPage from './components/templates/MainPage'
import UserPage from './components/templates/UserPage'
import Settings from './components/templates/Settings'
import Footer from './components/utils/Footer'
import { CURRENT_USER } from './queries'

const App = () => {
  const result = useQuery(CURRENT_USER)
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const client = useApolloClient()
  console.log(token)

  if (result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!result.data) {
    return (
      <div className="container">
        <h1>Kristittyjen sinkkujen deitti</h1>
        <Menu logout={logout} />
        <Switch>
          <Route path="/login">
            <LoginForm setToken={setToken} />
          </Route>
          <Route path="/register">
            <RegistrationForm />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    )
  }

  const username = result.data.currentUser.username

  return (
    <div className="container">
      <h1>Kristittyjen sinkkujen deitti</h1>
      <Menu loggedUser={username} logout={logout} />
      <Switch>
        <Route path="/login">
          <LoginForm setToken={setToken} />
        </Route>
        <Route path="/register">
          <RegistrationForm />
        </Route>
        <Route path="/s/:username">
          <Settings />
        </Route>
        <Route path="/:username">
          <UserPage loggedUser={username} />
        </Route>
        <Route path="/">
          <MainPage loggedUser={username} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
