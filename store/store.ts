import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import spaceReducer from './spaceSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    spaces: spaceReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch