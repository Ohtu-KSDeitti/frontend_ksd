import React from 'react'
import {
  Switch, Route,
} from 'react-router-dom'
// import { useQuery } from '@apollo/client'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import Menu from './components/Menu'

const testUsers = [
  {
    username: 'Matti Meikalainen',
    password: 'kissakala123',
  },
  {
    username: 'Ulla Uliuli',
    password: 'kala123',
  },
]

const App = () => (
  <div className="container">
    <h1>Kristittyjen sinkkujen deitti</h1>
    <Menu />
    <Switch>
      <Route path="/login">
        <LoginForm testUsers={testUsers} />
      </Route>
      <Route path="/register">
        <RegistrationForm />
      </Route>
    </Switch>
    <div>
      {testUsers.map((p) => p.username).join(', ')}
    </div>
  </div>
)

export default App
