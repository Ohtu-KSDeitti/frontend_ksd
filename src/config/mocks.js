import {
  CURRENT_USER, LOGIN, ADD_NEW_USER, UPDATE_USER_ACCOUNT, UPDATE_USER_DATE,
} from '../queries'

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
            prefRegions: [],
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
        username: 'Tenuteppo',
        password: 'bigsikret',
        passwordconf: 'bigsikret',
        firstname: 'Teppo',
        lastname: 'Tenuttaja',
        email: 'hehe@hehe.fi',
      },
    },
    result: {
      data: {
        addNewUser: {
          username: 'Tenuteppo',
          firstname: 'Teppo',
          lastname: 'Tenuttaja',
          email: 'hehe@hehe.fi',
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_USER_ACCOUNT,
      variables: {
        id: '7561c5a6-7566-4097-8453-c9254414e397',
        username: 'testailija',
        firstname: 'testailija',
        lastname: 'koira',
        email: 'test@gmail.com',
      },
    },
    result: {
      data: {
        updateUserAccount: {
          username: 'testailija',
          firstname: 'Teppo',
          lastname: 'koira',
          email: 'test@gmail.com',
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_USER_DATE,
      variables: {
        id: '7561c5a6-7566-4097-8453-c9254414e397',
        location: 'UUSIMAA',
        gender: 'MALE',
        dateOfBirth: '1917-12-06',
        status: 'SINGLE',
        bio: 'Jee jee jee',
        tags: [],
        prefRegions: ['AHVENANMAA', 'SATAKUNTA'],
      },
    },
    result: {
      data: {
        updateUserInfo: {
          location: 'UUSIMAA',
          gender: 'MALE',
          dateOfBirth: '1917-12-06',
          status: 'SINGLE',
          bio: 'Jee jee jee',
          tags: [],
          prefRegions: ['AHVENANMAA', 'SATAKUNTA'],
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
