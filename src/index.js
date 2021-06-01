import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache,
} from '@apollo/client'
import { setContext } from 'apollo-link-context'
import App from './App'
import './index.css'

const testUsers = [
  {
    id: 1,
    username: 'koticasanova95',
    password: 'kissakala123',
    name: 'Mare P',
    email: 'mare.ysiviis@gmail.com',
    gender: 'Mies',
    age: 26,
  },
  {
    id: 2,
    username: 'laila76',
    password: 'kala1234',
    name: 'Laila K',
    email: 'laila.koo@hotmail.com',
    gender: 'Nainen',
    age: 45,
  },
]

const ENV = process.REACT_APP_ENV || 'development'
const URI = (ENV !== 'development') ? process.REACT_APP_BACKEND : 'http://localhost:4000'

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
      <App testUsers={testUsers} />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
