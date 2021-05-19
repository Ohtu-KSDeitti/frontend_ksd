import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import { 
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache
} from '@apollo/client' 

import {
  BrowserRouter as Router,
} from "react-router-dom"

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)