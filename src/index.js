import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache,
} from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import { setContext } from 'apollo-link-context'
import App from './App'
import './index.css'
import { CURRENT_USER, LOGIN } from './queries'

const URI = process.env.REACT_APP_GATEWAY_URI
const ENV = process.env.REACT_APP_ENV

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

const mocks = [
  {
    request: {
      query: CURRENT_USER,
    },
    result: {
      data: {
        currentUser: {
          id: '7561c5a6-7566-4097-8453-c9254414e397',
          username: 'testiteppo',
          firstname: 'Teppo',
          lastname: 'Taalasmaa',
          email: 'hehe@hehe.fi',
          userInfo: {
            location: '',
            status: 'SINGLE',
            gender: 'FEMALE',
            dateOfBirth: '',
            profileLikes: 0,
            bio: '',
            tags: [],
          },
          friendList: [],
        },
      },
    },
  },
  {
    request: {
      query: LOGIN,
    },
    variables: {
      email: 'hehe@hehe.fi',
      password: 'bigsikret',
    },
    result: {
      data: {
        login: {
          value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1NjFjNWE2LTc1NjYtNDA5Ny04NDUzLWM5MjU0NDE0ZTM5NyIsImVtYWlsIjoiaGVoZUBoZWhlLmZpIiwiaWF0IjoxNjIzNzY1NjkwLCJleHAiOjE2MjM3NjkyOTB9.WMQnhKrWbjqPxiieWsVMY4x5GA6pi91DM9zo5eo0GFY',
        },
      },
    },
  },
  {
    request: {
      query: LOGIN,
    },
    variables: {
      email: 'hehe@hehe.fi',
      password: 'hehehehe',
    },
    error: new Error('Invalid email or password!'),
  },
]

const mockProvider = () => {
  if (ENV === 'test') {
    console.log('Using MockedProvider')
    return (
      <MockedProvider mocks={mocks}>
        <Router>
          <App />
        </Router>
      </MockedProvider>
    )
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(
  mockProvider(),
  document.getElementById('root'),
)
