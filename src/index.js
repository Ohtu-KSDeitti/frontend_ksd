import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache,
} from '@apollo/client'
import { setContext } from 'apollo-link-context'
import App from './App'
import './index.css'

const URI = process.env.REACT_APP_GATEWAY_URI
console.log('URI:', URI)

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  }
})

const httpLink = new HttpLink({
  uri: URI,
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
