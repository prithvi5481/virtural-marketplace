import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '@lib/api'

interface AuthState {
  user: null | { id: string; name: string; email: string }
  token: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle'
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.status = 'loading'
    },
    loginSuccess: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.status = 'succeeded'
      api.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.status = 'idle'
      delete api.defaults.headers.common['Authorization']
    }
  }
})

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(authSlice.actions.loginStart())
      const response = await api.post('/auth/login', credentials)
      dispatch(authSlice.actions.loginSuccess({ user: response.data.user, token: response.data.token }))
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

// Async thunk for signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (
    credentials: { name: string; email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(authSlice.actions.loginStart())
      const response = await api.post('/auth/signup', credentials)
      dispatch(authSlice.actions.loginSuccess({ user: response.data.user, token: response.data.token }))
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed')
    }
  }
)

export const { loginStart, loginSuccess, logout } = authSlice.actions
export default authSlice.reducer