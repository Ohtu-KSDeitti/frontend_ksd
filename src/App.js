import React from 'react'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import Menu from './components/Menu'
import {
  Switch, Route
} from "react-router-dom"

const App = () => (
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

export default App