import { setInfosUser, setIsAuthUser } from "../features/store"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { selectAuth } from "../features/selectors"
import { fetchUserData } from "../services/api"

/**
 * Middleware Thunk to check if the session token is valid
 */
export const authUser = createAsyncThunk('authUser', async (_, { dispatch, getState }) => {
// Recovery of redux state of authentication
  const isUserAuth = selectAuth(getState())
  const token = sessionStorage.getItem('JWT')
  try {
    const response = await fetchUserData({ token })
    if(response && response!=='Failed to fetch' && isUserAuth===false){
    // If recovery of the email by sending the token
      if (response.body.email) {
        dispatch(setInfosUser({ email:response.body.email, firstname:response.body.firstName, lastname:response.body.lastName, id:response.body.id}))
        dispatch(setIsAuthUser(true))
        return true
      } else {
        dispatch(setIsAuthUser(false))
        return false
      }
    }
    return response
  } catch (error) {
    dispatch(setIsAuthUser(false))
    return error.message
  }
})