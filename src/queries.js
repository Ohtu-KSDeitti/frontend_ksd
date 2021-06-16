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
mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    value
  }
}
`

export const CURRENT_USER = gql`
  query {
    currentUser {
      id,
      username,
      firstname,
      lastname,
      email,
      userInfo {
        location,
        gender,
        dateOfBirth,
        profileLikes,
        bio,
        tags,
      }
    }
  }
`
export const FIND_USER_BY_ID = gql`
  query ($id: ID!){
    findUserById(id: $id) {
      id,
      username,
      userInfo {
        location,
        gender,
        dateOfBirth,
        profileLikes,
        bio,
        tags,
      }
    }
  }
`

export const UPDATE_USER_ACCOUNT = gql`
  mutation updateUserAccount($id: ID!, $username: String, $firstname: String, $lastname: String, $email: String) {    
    updateUserAccount(
      id: $id,
      username: $username, 
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

export const UPDATE_USER_DATE = gql`
  mutation updateUserInfo($id: ID!, $location: String, $gender: Gender, $dateOfBirth: String, $status: Status,  $bio: String, $tags: [String]) {
    updateUserInfo(
      id: $id,
      location: $location,
      gender: $gender,
      dateOfBirth: $dateOfBirth,
      status: $status,
      bio: $bio,
      tags: $tags,
    ) {
      location
      gender
      dateOfBirth
      status
      bio
      tags
    }
  }
`
