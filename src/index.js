import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import { 
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache
} from '@apollo/client' 

import {
  BrowserRouter as Router,
} from "react-router-dom"

const ENV = process.REACT_APP_ENV || 'development'
const URI = (ENV !== 'development') ? process.REACT_APP_BACKEND : 'http://localhost:4000'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: URI
  })
})

ReactDOM.render(
  <ApolloProvider client={client}>
  <Router>
    <App />
  </Router>
  </ApolloProvider>,
  document.getElementById('root')
)