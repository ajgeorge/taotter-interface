import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dashboardData: null,
  charts: {},
  metrics: {},
  reports: [],
  isLoading: false,
  error: null,
  
  // Filter and date range
  filters: {
    dateRange: {
      start: null,
      end: null,
      preset: '30d', // '7d' | '30d' | '90d' | '1y' | 'custom'
    },
    granularity: 'day', // 'hour' | 'day' | 'week' | 'month'
    timezone: 'UTC',
    includeWeekends: true,
  },
  
  // Chart configurations
  chartConfigs: {
    taskCompletion: {
      type: 'line',
      visible: true,
      colors: ['#3b82f6', '#10b981', '#f59e0b'],
    },
    sprintProgress: {
      type: 'bar',
      visible: true,
      colors: ['#6366f1', '#8b5cf6'],
    },
    teamPerformance: {
      type: 'radar',
      visible: true,
      colors: ['#ef4444', '#f97316', '#eab308'],
    },
    revenueGrowth: {
      type: 'area',
      visible: true,
      colors: ['#22c55e'],
    },
  },
  
  // Real-time metrics
  realTimeMetrics: {
    activeTasks: 0,
    activeUsers: 0,
    pendingQuestionnaires: 0,
    activeSprints: 0,
    lastUpdated: null,
  },
  
  // Performance metrics
  performanceMetrics: {
    taskCompletionRate: 0,
    averageTaskTime: 0,
    sprintSuccessRate: 0,
    clientSatisfaction: 0,
    teamEfficiency: 0,
    resourceUtilization: 0,
  },
  
  // Trend analysis
  trends: {
    taskCompletion: {
      direction: 'neutral', // 'up' | 'down' | 'neutral'
      percentage: 0,
      period: '30d',
    },
    sprintDelivery: {
      direction: 'neutral',
      percentage: 0,
      period: '30d',
    },
    clientSatisfaction: {
      direction: 'neutral',
      percentage: 0,
      period: '30d',
    },
  },
  
  // Comparative data
  comparativeData: {
    previousPeriod: null,
    benchmark: null,
    industry: null,
  },
  
  // Predictive analytics
  predictions: {
    taskCompletion: [],
    sprintDelivery: [],
    resourceNeeds: [],
    revenue: [],
  },
  
  // Export settings
  exportSettings: {
    format: 'pdf', // 'pdf' | 'excel' | 'csv' | 'png'
    includeCharts: true,
    includeRawData: false,
    dateRange: null,
  },
  
  // Custom analytics
  customQueries: [],
  savedReports: [],
  
  // UI state
  ui: {
    selectedChart: null,
    chartFullscreen: false,
    showFilters: false,
    activeTab: 'overview', // 'overview' | 'tasks' | 'sprints' | 'team' | 'revenue'
    dashboardLayout: 'default', // 'default' | 'compact' | 'detailed'
    refreshInterval: 30000, // 30 seconds
    autoRefresh: true,
  },
}

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    // Loading states
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    
    setError: (state, action) => {
      state.error = action.payload
    },
    
    clearError: (state) => {
      state.error = null
    },
    
    // Dashboard data
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload
    },
    
    updateDashboardSection: (state, action) => {
      const { section, data } = action.payload
      if (state.dashboardData) {
        state.dashboardData[section] = data
      }
    },
    
    // Charts
    setChartData: (state, action) => {
      const { chartId, data } = action.payload
      state.charts[chartId] = data
    },
    
    updateChartConfig: (state, action) => {
      const { chartId, config } = action.payload
      if (state.chartConfigs[chartId]) {
        state.chartConfigs[chartId] = { ...state.chartConfigs[chartId], ...config }
      }
    },
    
    toggleChartVisibility: (state, action) => {
      const chartId = action.payload
      if (state.chartConfigs[chartId]) {
        state.chartConfigs[chartId].visible = !state.chartConfigs[chartId].visible
      }
    },
    
    // Metrics
    setMetrics: (state, action) => {
      state.metrics = { ...state.metrics, ...action.payload }
    },
    
    setRealTimeMetrics: (state, action) => {
      state.realTimeMetrics = { 
        ...state.realTimeMetrics, 
        ...action.payload,
        lastUpdated: new Date().toISOString()
      }
    },
    
    setPerformanceMetrics: (state, action) => {
      state.performanceMetrics = { ...state.performanceMetrics, ...action.payload }
    },
    
    // Trends
    setTrends: (state, action) => {
      state.trends = { ...state.trends, ...action.payload }
    },
    
    updateTrend: (state, action) => {
      const { metric, trend } = action.payload
      if (state.trends[metric]) {
        state.trends[metric] = { ...state.trends[metric], ...trend }
      }
    },
    
    // Comparative data
    setComparativeData: (state, action) => {
      state.comparativeData = { ...state.comparativeData, ...action.payload }
    },
    
    // Predictions
    setPredictions: (state, action) => {
      state.predictions = { ...state.predictions, ...action.payload }
    },
    
    updatePrediction: (state, action) => {
      const { type, data } = action.payload
      state.predictions[type] = data
    },
    
    // Filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    
    setDateRange: (state, action) => {
      const { start, end, preset } = action.payload
      state.filters.dateRange = { start, end, preset }
    },
    
    setGranularity: (state, action) => {
      state.filters.granularity = action.payload
    },
    
    resetFilters: (state) => {
      state.filters = initialState.filters
    },
    
    // Reports
    setReports: (state, action) => {
      state.reports = action.payload
    },
    
    addReport: (state, action) => {
      state.reports.unshift(action.payload)
    },
    
    removeReport: (state, action) => {
      const reportId = action.payload
      state.reports = state.reports.filter(r => r._id !== reportId)
    },
    
    updateReport: (state, action) => {
      const index = state.reports.findIndex(r => r._id === action.payload._id)
      if (index !== -1) {
        state.reports[index] = action.payload
      }
    },
    
    // Custom queries
    setCustomQueries: (state, action) => {
      state.customQueries = action.payload
    },
    
    addCustomQuery: (state, action) => {
      state.customQueries.push(action.payload)
    },
    
    removeCustomQuery: (state, action) => {
      const queryId = action.payload
      state.customQueries = state.customQueries.filter(q => q.id !== queryId)
    },
    
    // Saved reports
    setSavedReports: (state, action) => {
      state.savedReports = action.payload
    },
    
    addSavedReport: (state, action) => {
      state.savedReports.unshift(action.payload)
    },
    
    removeSavedReport: (state, action) => {
      const reportId = action.payload
      state.savedReports = state.savedReports.filter(r => r._id !== reportId)
    },
    
    // Export settings
    setExportSettings: (state, action) => {
      state.exportSettings = { ...state.exportSettings, ...action.payload }
    },
    
    // UI state
    setSelectedChart: (state, action) => {
      state.ui.selectedChart = action.payload
    },
    
    toggleChartFullscreen: (state, action) => {
      state.ui.chartFullscreen = action.payload ?? !state.ui.chartFullscreen
    },
    
    toggleFilters: (state) => {
      state.ui.showFilters = !state.ui.showFilters
    },
    
    setActiveTab: (state, action) => {
      state.ui.activeTab = action.payload
    },
    
    setDashboardLayout: (state, action) => {
      state.ui.dashboardLayout = action.payload
    },
    
    setRefreshInterval: (state, action) => {
      state.ui.refreshInterval = action.payload
    },
    
    toggleAutoRefresh: (state) => {
      state.ui.autoRefresh = !state.ui.autoRefresh
    },
    
    // Data refresh
    refreshData: (state, action) => {
      const timestamp = new Date().toISOString()
      if (action.payload) {
        // Partial refresh
        const { section, data } = action.payload
        if (state.dashboardData) {
          state.dashboardData[section] = { ...data, lastUpdated: timestamp }
        }
      } else {
        // Full refresh - update all lastUpdated timestamps
        if (state.dashboardData) {
          Object.keys(state.dashboardData).forEach(key => {
            if (typeof state.dashboardData[key] === 'object') {
              state.dashboardData[key].lastUpdated = timestamp
            }
          })
        }
        state.realTimeMetrics.lastUpdated = timestamp
      }
    },
    
    // Reset state
    resetState: (state) => {
      Object.assign(state, initialState)
    },
  },
})

export const {
  setLoading,
  setError,
  clearError,
  setDashboardData,
  updateDashboardSection,
  setChartData,
  updateChartConfig,
  toggleChartVisibility,
  setMetrics,
  setRealTimeMetrics,
  setPerformanceMetrics,
  setTrends,
  updateTrend,
  setComparativeData,
  setPredictions,
  updatePrediction,
  setFilters,
  setDateRange,
  setGranularity,
  resetFilters,
  setReports,
  addReport,
  removeReport,
  updateReport,
  setCustomQueries,
  addCustomQuery,
  removeCustomQuery,
  setSavedReports,
  addSavedReport,
  removeSavedReport,
  setExportSettings,
  setSelectedChart,
  toggleChartFullscreen,
  toggleFilters,
  setActiveTab,
  setDashboardLayout,
  setRefreshInterval,
  toggleAutoRefresh,
  refreshData,
  resetState,
} = analyticsSlice.actions

// Selectors
export const selectDashboardData = (state) => state.analytics.dashboardData
export const selectCharts = (state) => state.analytics.charts
export const selectMetrics = (state) => state.analytics.metrics
export const selectRealTimeMetrics = (state) => state.analytics.realTimeMetrics
export const selectPerformanceMetrics = (state) => state.analytics.performanceMetrics
export const selectTrends = (state) => state.analytics.trends
export const selectComparativeData = (state) => state.analytics.comparativeData
export const selectPredictions = (state) => state.analytics.predictions
export const selectFilters = (state) => state.analytics.filters
export const selectReports = (state) => state.analytics.reports
export const selectCustomQueries = (state) => state.analytics.customQueries
export const selectSavedReports = (state) => state.analytics.savedReports
export const selectExportSettings = (state) => state.analytics.exportSettings
export const selectChartConfigs = (state) => state.analytics.chartConfigs
export const selectIsLoading = (state) => state.analytics.isLoading
export const selectError = (state) => state.analytics.error
export const selectUI = (state) => state.analytics.ui

// Complex selectors
export const selectChartById = (chartId) => (state) => {
  return state.analytics.charts[chartId]
}

export const selectVisibleCharts = (state) => {
  const { charts, chartConfigs } = state.analytics
  return Object.keys(chartConfigs)
    .filter(chartId => chartConfigs[chartId].visible)
    .reduce((acc, chartId) => {
      if (charts[chartId]) {
        acc[chartId] = charts[chartId]
      }
      return acc
    }, {})
}

export const selectTrendDirection = (metric) => (state) => {
  return state.analytics.trends[metric]?.direction || 'neutral'
}

export const selectMetricTrend = (metric) => (state) => {
  const trend = state.analytics.trends[metric]
  if (!trend) return null
  
  return {
    direction: trend.direction,
    percentage: trend.percentage,
    isPositive: trend.direction === 'up',
    isNegative: trend.direction === 'down',
  }
}

export const selectDateRangeText = (state) => {
  const { dateRange } = state.analytics.filters
  
  if (dateRange.preset !== 'custom') {
    const presets = {
      '7d': 'Last 7 days',
      '30d': 'Last 30 days',
      '90d': 'Last 90 days',
      '1y': 'Last year',
    }
    return presets[dateRange.preset] || 'Unknown period'
  }
  
  if (dateRange.start && dateRange.end) {
    const start = new Date(dateRange.start).toLocaleDateString()
    const end = new Date(dateRange.end).toLocaleDateString()
    return `${start} - ${end}`
  }
  
  return 'Custom range'
}

export const selectKPIs = (state) => {
  const { performanceMetrics, realTimeMetrics } = state.analytics
  
  return [
    {
      label: 'Task Completion Rate',
      value: `${Math.round(performanceMetrics.taskCompletionRate)}%`,
      trend: state.analytics.trends.taskCompletion,
    },
    {
      label: 'Active Tasks',
      value: realTimeMetrics.activeTasks,
      isRealTime: true,
    },
    {
      label: 'Sprint Success Rate',
      value: `${Math.round(performanceMetrics.sprintSuccessRate)}%`,
      trend: state.analytics.trends.sprintDelivery,
    },
    {
      label: 'Client Satisfaction',
      value: `${Math.round(performanceMetrics.clientSatisfaction)}/5`,
      trend: state.analytics.trends.clientSatisfaction,
    },
    {
      label: 'Team Efficiency',
      value: `${Math.round(performanceMetrics.teamEfficiency)}%`,
    },
    {
      label: 'Resource Utilization',
      value: `${Math.round(performanceMetrics.resourceUtilization)}%`,
    },
  ]
}

export const selectRecentReports = (state) => {
  return state.analytics.reports
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
}

export const selectIsDataStale = (state) => {
  const { lastUpdated } = state.analytics.realTimeMetrics
  if (!lastUpdated) return true
  
  const now = new Date()
  const updated = new Date(lastUpdated)
  const diffMinutes = (now - updated) / (1000 * 60)
  
  return diffMinutes > 5 // Data is stale if older than 5 minutes
}

export const selectDashboardSummary = (state) => {
  const { dashboardData, realTimeMetrics, performanceMetrics } = state.analytics
  
  return {
    totalTasks: realTimeMetrics.activeTasks,
    completionRate: Math.round(performanceMetrics.taskCompletionRate),
    activeSprints: realTimeMetrics.activeSprints,
    teamEfficiency: Math.round(performanceMetrics.teamEfficiency),
    lastUpdated: realTimeMetrics.lastUpdated,
  }
}

export default analyticsSlice.reducer
