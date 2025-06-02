import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Theme and appearance
  theme: 'light', // 'light' | 'dark' | 'system'
  primaryColor: '#3b82f6',
  accentColor: '#10b981',
  
  // Layout
  sidebarCollapsed: false,
  sidebarWidth: 280,
  headerHeight: 64,
  footerVisible: true,
  
  // Navigation
  activeRoute: '/',
  breadcrumbs: [],
  navigationHistory: [],
  
  // Modals and overlays
  modals: {
    confirmDialog: {
      isOpen: false,
      title: '',
      message: '',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      variant: 'default', // 'default' | 'danger' | 'warning'
      onConfirm: null,
      onCancel: null,
    },
    globalModal: {
      isOpen: false,
      component: null,
      props: {},
      size: 'md', // 'sm' | 'md' | 'lg' | 'xl' | 'full'
    },
  },
  
  // Notifications
  notifications: [],
  notificationSettings: {
    position: 'top-right', // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    duration: 5000,
    maxVisible: 5,
    soundEnabled: true,
  },
  
  // Loading states
  globalLoading: false,
  loadingStates: {},
  
  // Page states
  pageTitle: '',
  pageSubtitle: '',
  pageActions: [],
  
  // Search
  globalSearch: {
    query: '',
    isOpen: false,
    results: [],
    isSearching: false,
    recentSearches: [],
  },
  
  // Responsive
  viewport: {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
  },
  
  // Preferences
  preferences: {
    language: 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dateFormat: 'MM/dd/yyyy',
    timeFormat: '12h', // '12h' | '24h'
    currency: 'USD',
    compactMode: false,
    animationsEnabled: true,
    soundEnabled: true,
  },
  
  // Keyboard shortcuts
  shortcuts: {
    enabled: true,
    combinations: {
      'cmd+k': 'globalSearch',
      'cmd+b': 'toggleSidebar',
      'cmd+/': 'showShortcuts',
      'esc': 'closeModal',
    },
  },
  
  // Tour and onboarding
  tour: {
    isActive: false,
    currentStep: 0,
    steps: [],
    completed: [],
  },
  
  // Performance monitoring
  performance: {
    loadTime: null,
    renderTime: null,
    apiResponseTimes: {},
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Theme and appearance
    setTheme: (state, action) => {
      state.theme = action.payload
      // Apply theme to document
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', action.payload)
      }
    },
    
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload
    },
    
    setAccentColor: (state, action) => {
      state.accentColor = action.payload
    },
    
    // Layout
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload
    },
    
    setSidebarWidth: (state, action) => {
      state.sidebarWidth = action.payload
    },
    
    setHeaderHeight: (state, action) => {
      state.headerHeight = action.payload
    },
    
    toggleFooter: (state) => {
      state.footerVisible = !state.footerVisible
    },
    
    // Navigation
    setActiveRoute: (state, action) => {
      state.activeRoute = action.payload
      
      // Add to navigation history
      if (!state.navigationHistory.includes(action.payload)) {
        state.navigationHistory.unshift(action.payload)
        // Keep only last 10 routes
        if (state.navigationHistory.length > 10) {
          state.navigationHistory = state.navigationHistory.slice(0, 10)
        }
      }
    },
    
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload
    },
    
    addBreadcrumb: (state, action) => {
      state.breadcrumbs.push(action.payload)
    },
    
    clearNavigationHistory: (state) => {
      state.navigationHistory = []
    },
    
    // Modals
    openConfirmDialog: (state, action) => {
      state.modals.confirmDialog = {
        isOpen: true,
        ...action.payload,
      }
    },
    
    closeConfirmDialog: (state) => {
      state.modals.confirmDialog = {
        ...initialState.modals.confirmDialog,
        isOpen: false,
      }
    },
    
    openGlobalModal: (state, action) => {
      state.modals.globalModal = {
        isOpen: true,
        ...action.payload,
      }
    },
    
    closeGlobalModal: (state) => {
      state.modals.globalModal = {
        ...initialState.modals.globalModal,
        isOpen: false,
      }
    },
    
    // Notifications
    addNotification: (state, action) => {
      const notification = {
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      }
      
      state.notifications.unshift(notification)
      
      // Limit visible notifications
      if (state.notifications.length > state.notificationSettings.maxVisible) {
        state.notifications = state.notifications.slice(0, state.notificationSettings.maxVisible)
      }
    },
    
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    
    clearNotifications: (state) => {
      state.notifications = []
    },
    
    updateNotificationSettings: (state, action) => {
      state.notificationSettings = { ...state.notificationSettings, ...action.payload }
    },
    
    // Loading states
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload
    },
    
    setLoadingState: (state, action) => {
      const { key, loading } = action.payload
      if (loading) {
        state.loadingStates[key] = true
      } else {
        delete state.loadingStates[key]
      }
    },
    
    clearLoadingStates: (state) => {
      state.loadingStates = {}
    },
    
    // Page states
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload
      
      // Update document title
      if (typeof document !== 'undefined') {
        document.title = action.payload ? `${action.payload} - Your App` : 'Your App'
      }
    },
    
    setPageSubtitle: (state, action) => {
      state.pageSubtitle = action.payload
    },
    
    setPageActions: (state, action) => {
      state.pageActions = action.payload
    },
    
    addPageAction: (state, action) => {
      state.pageActions.push(action.payload)
    },
    
    removePageAction: (state, action) => {
      state.pageActions = state.pageActions.filter(a => a.id !== action.payload)
    },
    
    // Global search
    setGlobalSearchQuery: (state, action) => {
      state.globalSearch.query = action.payload
    },
    
    toggleGlobalSearch: (state, action) => {
      state.globalSearch.isOpen = action.payload ?? !state.globalSearch.isOpen
    },
    
    setGlobalSearchResults: (state, action) => {
      state.globalSearch.results = action.payload
    },
    
    setGlobalSearching: (state, action) => {
      state.globalSearch.isSearching = action.payload
    },
    
    addRecentSearch: (state, action) => {
      const query = action.payload
      if (!state.globalSearch.recentSearches.includes(query)) {
        state.globalSearch.recentSearches.unshift(query)
        // Keep only last 10 searches
        if (state.globalSearch.recentSearches.length > 10) {
          state.globalSearch.recentSearches = state.globalSearch.recentSearches.slice(0, 10)
        }
      }
    },
    
    clearRecentSearches: (state) => {
      state.globalSearch.recentSearches = []
    },
    
    // Viewport
    updateViewport: (state, action) => {
      const { width, height } = action.payload
      state.viewport = {
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      }
    },
    
    // Preferences
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload }
    },
    
    setLanguage: (state, action) => {
      state.preferences.language = action.payload
    },
    
    setTimezone: (state, action) => {
      state.preferences.timezone = action.payload
    },
    
    toggleCompactMode: (state) => {
      state.preferences.compactMode = !state.preferences.compactMode
    },
    
    toggleAnimations: (state) => {
      state.preferences.animationsEnabled = !state.preferences.animationsEnabled
    },
    
    // Keyboard shortcuts
    setShortcutsEnabled: (state, action) => {
      state.shortcuts.enabled = action.payload
    },
    
    updateShortcut: (state, action) => {
      const { combination, action: shortcutAction } = action.payload
      state.shortcuts.combinations[combination] = shortcutAction
    },
    
    removeShortcut: (state, action) => {
      delete state.shortcuts.combinations[action.payload]
    },
    
    // Tour and onboarding
    startTour: (state, action) => {
      state.tour = {
        isActive: true,
        currentStep: 0,
        steps: action.payload,
        completed: [],
      }
    },
    
    nextTourStep: (state) => {
      if (state.tour.currentStep < state.tour.steps.length - 1) {
        state.tour.currentStep += 1
      }
    },
    
    previousTourStep: (state) => {
      if (state.tour.currentStep > 0) {
        state.tour.currentStep -= 1
      }
    },
    
    completeTourStep: (state, action) => {
      const stepIndex = action.payload
      if (!state.tour.completed.includes(stepIndex)) {
        state.tour.completed.push(stepIndex)
      }
    },
    
    endTour: (state) => {
      state.tour = {
        isActive: false,
        currentStep: 0,
        steps: [],
        completed: [],
      }
    },
    
    // Performance
    setLoadTime: (state, action) => {
      state.performance.loadTime = action.payload
    },
    
    setRenderTime: (state, action) => {
      state.performance.renderTime = action.payload
    },
    
    addApiResponseTime: (state, action) => {
      const { endpoint, time } = action.payload
      state.performance.apiResponseTimes[endpoint] = time
    },
    
    // Utility actions
    resetUI: (state) => {
      Object.assign(state, initialState)
    },
    
    // Batch updates
    batchUpdate: (state, action) => {
      Object.keys(action.payload).forEach(key => {
        if (state.hasOwnProperty(key)) {
          state[key] = { ...state[key], ...action.payload[key] }
        }
      })
    },
  },
})

export const {
  setTheme,
  setPrimaryColor,
  setAccentColor,
  toggleSidebar,
  setSidebarCollapsed,
  setSidebarWidth,
  setHeaderHeight,
  toggleFooter,
  setActiveRoute,
  setBreadcrumbs,
  addBreadcrumb,
  clearNavigationHistory,
  openConfirmDialog,
  closeConfirmDialog,
  openGlobalModal,
  closeGlobalModal,
  addNotification,
  removeNotification,
  clearNotifications,
  updateNotificationSettings,
  setGlobalLoading,
  setLoadingState,
  clearLoadingStates,
  setPageTitle,
  setPageSubtitle,
  setPageActions,
  addPageAction,
  removePageAction,
  setGlobalSearchQuery,
  toggleGlobalSearch,
  setGlobalSearchResults,
  setGlobalSearching,
  addRecentSearch,
  clearRecentSearches,
  updateViewport,
  updatePreferences,
  setLanguage,
  setTimezone,
  toggleCompactMode,
  toggleAnimations,
  setShortcutsEnabled,
  updateShortcut,
  removeShortcut,
  startTour,
  nextTourStep,
  previousTourStep,
  completeTourStep,
  endTour,
  setLoadTime,
  setRenderTime,
  addApiResponseTime,
  resetUI,
  batchUpdate,
} = uiSlice.actions

// Selectors
export const selectTheme = (state) => state.ui.theme
export const selectPrimaryColor = (state) => state.ui.primaryColor
export const selectAccentColor = (state) => state.ui.accentColor
export const selectSidebarCollapsed = (state) => state.ui.sidebarCollapsed
export const selectSidebarWidth = (state) => state.ui.sidebarWidth
export const selectHeaderHeight = (state) => state.ui.headerHeight
export const selectFooterVisible = (state) => state.ui.footerVisible
export const selectActiveRoute = (state) => state.ui.activeRoute
export const selectBreadcrumbs = (state) => state.ui.breadcrumbs
export const selectNavigationHistory = (state) => state.ui.navigationHistory
export const selectModals = (state) => state.ui.modals
export const selectNotifications = (state) => state.ui.notifications
export const selectNotificationSettings = (state) => state.ui.notificationSettings
export const selectGlobalLoading = (state) => state.ui.globalLoading
export const selectLoadingStates = (state) => state.ui.loadingStates
export const selectPageTitle = (state) => state.ui.pageTitle
export const selectPageSubtitle = (state) => state.ui.pageSubtitle
export const selectPageActions = (state) => state.ui.pageActions
export const selectGlobalSearch = (state) => state.ui.globalSearch
export const selectViewport = (state) => state.ui.viewport
export const selectPreferences = (state) => state.ui.preferences
export const selectShortcuts = (state) => state.ui.shortcuts
export const selectTour = (state) => state.ui.tour
export const selectPerformance = (state) => state.ui.performance

// Complex selectors
export const selectIsLoading = (key) => (state) => {
  return state.ui.loadingStates[key] || false
}

export const selectHasLoadingStates = (state) => {
  return Object.keys(state.ui.loadingStates).length > 0
}

export const selectIsDarkMode = (state) => {
  if (state.ui.theme === 'system') {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return state.ui.theme === 'dark'
}

export const selectResponsiveBreakpoint = (state) => {
  const { viewport } = state.ui
  if (viewport.isMobile) return 'mobile'
  if (viewport.isTablet) return 'tablet'
  return 'desktop'
}

export const selectUnreadNotifications = (state) => {
  return state.ui.notifications.filter(n => !n.read)
}

export const selectRecentNotifications = (state) => {
  return state.ui.notifications.slice(0, 5)
}

export const selectTourProgress = (state) => {
  const { tour } = state.ui
  if (!tour.isActive || tour.steps.length === 0) return 0
  return Math.round((tour.completed.length / tour.steps.length) * 100)
}

export const selectCurrentTourStep = (state) => {
  const { tour } = state.ui
  if (!tour.isActive || !tour.steps[tour.currentStep]) return null
  return tour.steps[tour.currentStep]
}

export const selectAverageApiResponseTime = (state) => {
  const times = Object.values(state.ui.performance.apiResponseTimes)
  if (times.length === 0) return 0
  return times.reduce((sum, time) => sum + time, 0) / times.length
}

export default uiSlice.reducer
