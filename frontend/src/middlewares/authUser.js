import { createAsyncThunk } from "@reduxjs/toolkit"
import { selectAuth } from "../features/selectors"
import { fetchUserData } from "../services/api"

export const authUser = createAsyncThunk('authUser', async (_, { dispatch, getState }) => {
// récupération du redux state de l'authentification
  const isUserAuth = selectAuth(getState())
  console.log('isUserAuth:', isUserAuth)
  const token = sessionStorage.getItem('JWT')
  console.log('token:', token)
  try {
    const response = await fetchUserData({ token })
    console.log('response:', response)
  }catch (error) {
    return error.message
  }
})