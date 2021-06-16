import { CURRENT_USER, LOGIN, ADD_NEW_USER } from '../queries'

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
      query: ADD_NEW_USER,
      variables: {
        username: 'testailija',
        password: 'testailijakoira',
        passwordconf: 'testailijakora',
        firstname: 'testailija',
        lastname: 'koira',
        email: 'testailija@koira.fi',
      },
    },
    result: {
      data: {
        addNewUser: {
          username: 'testailija',
          firstname: 'testailija',
          lastname: 'koira',
          email: 'testailija@koira.fi',
        },
      },
    },
  },
  {
    request: {
      query: LOGIN,
      variables: {
        email: 'testailija@koira.fi',
        password: 'testailijakoira',
      },
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
      variables: {
        email: 'hehe@hehe.fi',
        password: 'bigsikret',
      },
    },
    result: {
      data: {
        login: {
          value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1NjFjNWE2LTc1NjYtNDA5Ny04NDUzLWM5MjU0NDE0ZTM5NyIsImVtYWlsIjoiaGVoZUBoZWhlLmZpIiwiaWF0IjoxNjIzNzY1NjkwLCJleHAiOjE2MjM3NjkyOTB9.WMQnhKrWbjqPxiieWsVMY4x5GA6pi91DM9zo5eo0GFY',
        },
      },
    },
  },
]

export default mocks
