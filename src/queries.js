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
  mutation createUser($username: String!, $password: String!, $passwordConf: String!, $name: String!, $email: String!, $gender: String!, $age: Int!) {
    addUser(
      username: $username,
      password: $password,
      passwordConf: $passwordConf,
      name: $name,
      email: $email,
      gender: $gender,
      age: $age
    ) {
      username
      name
      email
      gender
      age
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
