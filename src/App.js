import React, { useState } from 'react'
import {
  Switch, Route,
} from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
// import { useQuery } from '@apollo/client'
import LoginForm from './components/templates/LoginForm'
import RegistrationForm from './components/templates/RegistrationForm'
import Menu from './components/templates/Menu'
import MainPage from './components/templates/MainPage'
import UserPage from './components/templates/UserPage'
import Footer from './components/utils/Footer'

const App = ({ testUsers }) => {
  const [users, setUsers] = useState(testUsers)
  const [loggedUser, setLoggedUser] = useState(localStorage.getItem('user-token'))
  const client = useApolloClient()
  console.log('user list: ', users)
  console.log(loggedUser, ' logged in')

  const logout = () => {
    setLoggedUser(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div className="container">
      <h1>Kristittyjen sinkkujen deitti</h1>
      <Menu loggedUser={loggedUser} logout={logout} />
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
      <Route path="/userpage">
        <UserPage loggedUser={loggedUser} />
      </Route>
      <Footer />
    </div>
  )
}

export default App
