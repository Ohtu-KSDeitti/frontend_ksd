import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'
import Provider from './config/provider'

ReactDOM.render(
  <Provider>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
