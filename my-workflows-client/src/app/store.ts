import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'features/auth/auth'
import { authListenerMiddleware } from './services/authMiddleware'
import { api } from './services/api'

const store = configureStore({
  reducer: {
    auth: authReducer,
    // [authApi.reducerPath]: authApi.reducer,
    // [workflowApi.reducerPath]: workflowApi.reducer
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(authListenerMiddleware.middleware).concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store