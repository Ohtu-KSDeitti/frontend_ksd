import React from 'react'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import Menu from './components/Menu'
import {
  Switch, Route
} from "react-router-dom"
import { useQuery, gql } from '@apollo/client'

const GET_PING = gql`
  query {
    pings {
      ping
    }
  }
`

const App = () => {
  const result = useQuery(GET_PING)
  console.log(result.data)
  return (
      <div className="container">
        <h1>Kristittyjen sinkkujen deitti</h1>
        <Menu />
        <Switch>
          <Route path= "/login">
            <LoginForm
            />      
          </Route>
          <Route path= "/register">
            <RegistrationForm
            />
          </Route>
        </Switch>
      </div>
  )
}

export default App