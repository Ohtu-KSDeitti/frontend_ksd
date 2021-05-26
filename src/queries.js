import { gql } from '@apollo/client'

export const ALL_USERS = gql`
  query {
    allUsers  {
      username
      password
      id
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!, $passwordConf: String!) {
    addUser(
      username: $username,
      password: $password,
      passwordConf: $passwordConf
    ) {
      username
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username
    ) {
      value
    }
  }
`
