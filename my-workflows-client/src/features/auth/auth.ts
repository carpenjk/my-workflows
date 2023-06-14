// import axios from 'axios'
// import { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
// import { registerUser, userLogin } from './authActions'
import { authApi, User } from '../../app/services/auth'

// initialize userToken from local storage
// const userToken = localStorage.getItem('userToken')
//   ? localStorage.getItem('userToken')
//   : null


  type AuthState = {
    user: User | null,
    token: string | null
  }


const initialState = {
  user: null,
  token: null,
} as AuthState;


// const backendURL =
//   process.env.NODE_ENV !== 'production'
//     ? 'http://127.0.0.1:5000'
//     : process.env.REACT_APP_SERVER_URL



// export const userLogin = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       // configure header's Content-Type as JSON
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }

//       const { data } = await axios.post(
//         `${backendURL}/api/user/login`,
//         { email, password },
//         config
//       )

//       // store user's token in local storage
//       localStorage.setItem('userToken', data.userToken)

//       return data
//     } catch (error) {
//       // return custom error message from API if any
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message)
//       } else {
//         return rejectWithValue(error.message)
//       }
//     }
//   }
// )

// export const registerUser = createAsyncThunk(
//   'auth/register',
//   async ({ firstName, email, password }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }

//       await axios.post(
//         `${backendURL}/api/user/register`,
//         { firstName, email, password },
//         config
//       )
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message)
//       } else {
//         return rejectWithValue(error.message)
//       }
//     }
//   }
// )


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // logout: (state) => {
    //   localStorage.removeItem('userToken') // delete token from storage
    //   state.loading = false
    //   state.userInfo = null
    //   state.userToken = null
    //   state.error = null
    // },
    // setCredentials: (
    //   state,
    //   { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    // ) => {
    //   state.user = user
    //   state.token = token
    // },
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
  // extraReducers: {
  //   // login user
  //   [userLogin.pending]: (state) => {
  //     state.loading = true
  //     state.error = null
  //   },
  //   [userLogin.fulfilled]: (state, { payload }) => {
  //     state.loading = false
  //     state.userInfo = payload
  //     state.userToken = payload.userToken
  //   },
  //   [userLogin.rejected]: (state, { payload }) => {
  //     state.loading = false
  //     state.error = payload
  //   },
  //   // register user
  //   [registerUser.pending]: (state) => {
  //     state.loading = true
  //     state.error = null
  //   },
  //   [registerUser.fulfilled]: (state, { payload }) => {
  //     state.loading = false
  //     state.success = true // registration successful
  //   },
  //   [registerUser.rejected]: (state, { payload }) => {
  //     state.loading = false
  //     state.error = payload
  //   },
  // },
})

// export const { logout, setCredentials } = authSlice.actions
// export const { setCredentials } = authSlice.actions

export default authSlice.reducer
