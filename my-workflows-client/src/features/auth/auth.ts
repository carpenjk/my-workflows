import { createSlice } from '@reduxjs/toolkit'
import { authApi, User } from '../../app/services/auth'
import { RootState } from '../../app/store';


  type AuthState = {
    user: User | null,
    token: string | null
  }

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.token = payload.token
      state.user = payload.user
    },
    logout: (state) => {
      state = initialState;
    } 
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        console.log('matchfulfilled')
        state.token = payload.token
        state.user = payload.user
      },
    )
  },
})

// type SelectorFn = <Selected>(state: RootState) => Selected

export const {setCredentials} = authSlice.actions;

export const getUser = (state: RootState) => state.auth.user;
export const getToken = (state: RootState): string | null => state.auth.token;

export default authSlice.reducer
