import React from 'react'
import {
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache,
} from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import { setContext } from 'apollo-link-context'
import mocks from './mocks'

const URI = process.env.REACT_APP_GATEWAY_URI
const ENV = process.env.REACT_APP_ENV

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
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

const Provider = ({ children }) => {
  if (ENV === 'test') {
    return (
      <MockedProvider
        mocks={mocks}
        defaultOptions={{
          watchQuery: { fetchPolicy: 'no-cache' },
          query: { fetchPolicy: 'no-cache' },
        }}
      >
        <>{children}</>
      </MockedProvider>
    )
  }

  return (
    <ApolloProvider client={client}>
      <>{children}</>
    </ApolloProvider>
  )
}

export default Provider
