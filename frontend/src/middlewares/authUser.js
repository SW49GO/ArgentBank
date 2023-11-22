import { setInfosUser, setIsAuthUser } from "../features/store"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { selectAuth } from "../features/selectors"
import { fetchUserData } from "../services/api"


export const authUser = createAsyncThunk('authUser', async (_, { dispatch, getState }) => {
// récupération du redux state de l'authentification
  const isUserAuth = selectAuth(getState())
  const token = sessionStorage.getItem('JWT')
  try {
    console.log('AUTH en Cours')
    const response = await fetchUserData({ token })
    if(response && response!=='Failed to fetch' && isUserAuth===false){
    // si récupération de l'email par l'envoi du token
      if (response.body.email) {
        dispatch(setInfosUser({ email:response.body.email, firstname:response.body.firstName, lastname:response.body.lastName, id:response.body.id}))
        dispatch(setIsAuthUser(true))
        return true
      } else {
        dispatch(setIsAuthUser(false))
        return false
      }
    }
  } catch (error) {
    dispatch(setIsAuthUser(false))
    return error.message
  }
})