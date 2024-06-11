import { configureStore } from '@reduxjs/toolkit'
import { authListenerMiddleware } from './services/authMiddleware'
import { api } from './services/api'

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .prepend(authListenerMiddleware.middleware)
  .concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store