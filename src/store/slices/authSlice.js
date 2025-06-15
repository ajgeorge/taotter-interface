import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: false,
  userType: null, // 'startup' or 'admin'
  permissions: [],
  isLoading: false,
  error: null,
  loginAttempts: 0,
  lastLoginAttempt: null,
  isAccountLocked: false,
  sessionExpiry: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    
    loginSuccess: (state, action) => {
      const { user, token, refreshToken, userType, permissions } = action.payload
      state.user = user
      state.token = token
      state.refreshToken = refreshToken
      state.userType = userType
      state.permissions = permissions || []
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
      state.loginAttempts = 0
      state.isAccountLocked = false
      state.sessionExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      
      // Store in localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('userType', userType)
      localStorage.setItem('user', JSON.stringify(user))
    },
    
    loginFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
      state.loginAttempts += 1
      state.lastLoginAttempt = new Date()
      
      // Lock account after 5 failed attempts
      if (state.loginAttempts >= 5) {
        state.isAccountLocked = true
      }
    },
    
    logout: (state) => {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.userType = null
      state.permissions = []
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
      state.loginAttempts = 0
      state.isAccountLocked = false
      state.sessionExpiry = null
      
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userType')
      localStorage.removeItem('user')
    },
    
    setCredentials: (state, action) => {
      const { user, token, refreshToken } = action.payload
      if (user) state.user = user
      if (token) {
        state.token = token
        localStorage.setItem('token', token)
      }
      if (refreshToken) {
        state.refreshToken = refreshToken
        localStorage.setItem('refreshToken', refreshToken)
      }
      state.isAuthenticated = true
    },
    
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },
    
    updatePermissions: (state, action) => {
      state.permissions = action.payload
    },
    
    clearError: (state) => {
      state.error = null
    },
    
    resetLoginAttempts: (state) => {
      state.loginAttempts = 0
      state.isAccountLocked = false
      state.lastLoginAttempt = null
    },
    
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    
    sessionExpired: (state) => {
      state.isAuthenticated = false
      state.error = 'Session expired. Please login again.'
    },
    
    refreshSession: (state) => {
      state.sessionExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000)
    },
    
    // Initialize auth state from localStorage
    initializeAuth: (state) => {
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      const storedUserType = localStorage.getItem('userType')
      
      if (storedToken && storedUser && storedUserType) {
        try {
          state.token = storedToken
          state.user = JSON.parse(storedUser)
          state.userType = storedUserType
          state.isAuthenticated = true
          state.refreshToken = localStorage.getItem('refreshToken')
        } catch (error) {
          // If parsing fails, clear localStorage
          localStorage.clear()
        }
      }
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setCredentials,
  updateUser,
  updatePermissions,
  clearError,
  resetLoginAttempts,
  setLoading,
  sessionExpired,
  refreshSession,
  initializeAuth,
} = authSlice.actions

// Selectors
export const selectCurrentUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.token
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectUserType = (state) => state.auth.userType
export const selectPermissions = (state) => state.auth.permissions
export const selectAuthLoading = (state) => state.auth.isLoading
export const selectAuthError = (state) => state.auth.error
export const selectIsAccountLocked = (state) => state.auth.isAccountLocked
export const selectLoginAttempts = (state) => state.auth.loginAttempts

// Permission check selectors
export const selectHasPermission = (permission) => (state) => {
  return state.auth.permissions.includes(permission)
}

export const selectIsAdmin = (state) => state.auth.userType === 'admin'
export const selectIsStartup = (state) => state.auth.userType === 'startup'

export const selectIsSuperAdmin = (state) => 
  state.auth.userType === 'admin' && state.auth.user?.role === 'super_admin'

export const selectIsSeniorAdmin = (state) => 
  state.auth.userType === 'admin' && ['super_admin', 'senior_admin'].includes(state.auth.user?.role)

export default authSlice.reducer
