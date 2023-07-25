import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'features/auth/auth'
import { authApi } from './services/auth'
import { authListenerMiddleware } from './services/authMiddleware'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(authListenerMiddleware.middleware).concat(authApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store