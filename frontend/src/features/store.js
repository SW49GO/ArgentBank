import { createSlice, configureStore} from '@reduxjs/toolkit'

const userDatasSlice = createSlice({
    name : 'userDatas',
    initialState:{
      id : null,
      email : '',
      firstname : '',
      lastname : '',
      password : '',
      rememberMe : false,
      authentified: false
    },
    reducers : {
      setInfosUser: (state, action)=>{
        const { id, firstname, lastname, email } = action.payload
        state.id = id || state.id
        state.firstname = firstname || state.firstname
        state.lastname = lastname || state.lastname
        state.email = email || state.email
      },
      setUserConfigConnect : (state, action) => {
        const {email, password, rememberMe} = action.payload
          state.email = email || state.email
          state.password = password || state.password
          state.rememberMe = rememberMe || state.rememberMe
      },
      setIsAuthUser :  (state, action)=>{
        state.authentified = action.payload
      }
    }
})

export const {setInfosUser, setUserConfigConnect, setIsAuthUser} = userDatasSlice.actions

export const store = configureStore({
    reducer : {
        userDatasSlice : userDatasSlice.reducer
    }
})
