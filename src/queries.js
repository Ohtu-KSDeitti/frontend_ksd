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

export const ADD_NEW_USER = gql`
  mutation addNewUser($username: String!, $password: String!, $passwordconf: String!, $firstname: String!, $lastname: String!, $email: String!) {
    addNewUser(
      username: $username,
      password: $password,
      passwordconf: $passwordconf,
      firstname: $firstname,
      lastname: $lastname,
      email: $email,
    ) {
      username
      firstname
      lastname
      email
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password,
    ) {
      value
    }
  }
`

export const CURRENT_USER = gql`
  query {
    currentUser {
      username,
      firstname,
      lastname,
    }
  }
`
