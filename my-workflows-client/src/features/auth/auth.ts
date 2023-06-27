import { createSlice } from '@reduxjs/toolkit'
import { authApi, User } from '../../app/services/auth'


  type AuthState = {
    user: User | null,
    token: string | null
  }


const initialState = {
  user: null,
  token: null,
} as AuthState;



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem('userToken', payload.token)
        state.token = payload.token
        state.user = payload.user
      }
    )
  },
})

export default authSlice.reducer
