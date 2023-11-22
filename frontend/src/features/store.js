import { createSlice, configureStore} from '@reduxjs/toolkit'

// slice for state user datas
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

// slice for state display components
const isVisibleComponent = createSlice({
    name: 'isVisible',
    initialState:{
    editname : false,
    summary :true,
    checking :false,
    saving : false,
    credit :false
    },
    reducers : {
      setEditNameVisible : (state, action)=>{
        state.editname = action.payload
      },
      setSummaryVisible : (state, action)=>{
        state.summary = action.payload
      },
      setChecking: (state,action)=>{
        state.checking = action.payload
      },
      setSaving : (state,action)=>{
        state.saving = action.payload
      },
      setCredit :(state,action)=>{
        state.credit = action.payload
      }, 
      setAllClosed : (state,action)=>{
        state.checking = action.payload
        state.saving = action.payload
        state.credit = action.payload
      }
    }
  })

// export all actions from each slice
export const {setInfosUser, setUserConfigConnect, setIsAuthUser} = userDatasSlice.actions
export const {setEditNameVisible, setSummaryVisible, setChecking, setSaving, setCredit, setAllClosed} = isVisibleComponent.actions


// store configuration
export const store = configureStore({
    reducer : {
        userDatasSlice : userDatasSlice.reducer,
        isVisibleComponent :isVisibleComponent.reducer
    }
})
