import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentSprint: null,
  sprints: [],
  packages: [],
  availableTimeSlots: [],
  isLoading: false,
  isSaving: false,
  error: null,
  
  // Sprint creation/editing
  sprintForm: {
    title: '',
    description: '',
    type: 'web_app',
    requirements: [],
    estimatedDuration: 30,
    budget: {
      allocated: 0,
      currency: 'USD'
    },
    priority: 'medium',
  },
  
  // Package selection
  selectedPackage: null,
  packageCustomizations: {},
  
  // Meeting scheduling
  meetingData: {
    timeSlot: null,
    meetingType: 'kickoff',
    agenda: '',
    attendees: [],
  },
  
  // Progress tracking
  milestones: [],
  progressData: {
    currentPhase: '',
    completedTasks: 0,
    totalTasks: 0,
    overallProgress: 0,
  },
  
  // Team assignment
  assignedTeam: {
    teamLead: null,
    members: [],
    roles: {},
  },
  
  // Client feedback
  feedback: [],
  feedbackForm: {
    category: 'general',
    rating: 5,
    comment: '',
    suggestions: '',
  },
  
  // Documents
  documents: [],
  uploadProgress: {},
  
  // Filters and search
  filters: {
    status: 'all',
    type: 'all',
    dateRange: null,
    teamLead: 'all',
    searchTerm: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  
  // Pagination
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
  
  // UI state
  ui: {
    showPackageModal: false,
    showMeetingModal: false,
    showProgressModal: false,
    showTeamModal: false,
    showFeedbackModal: false,
    showDocumentModal: false,
    activeTab: 'overview', // 'overview' | 'progress' | 'team' | 'documents' | 'feedback'
    viewMode: 'grid', // 'grid' | 'list' | 'kanban'
    expandedMilestones: [],
  },
}

const sprintsSlice = createSlice({
  name: 'sprints',
  initialState,
  reducers: {
    // Loading states
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    
    setSaving: (state, action) => {
      state.isSaving = action.payload
    },
    
    setError: (state, action) => {
      state.error = action.payload
    },
    
    clearError: (state) => {
      state.error = null
    },
    
    // Sprint data
    setCurrentSprint: (state, action) => {
      state.currentSprint = action.payload
      if (action.payload) {
        state.selectedPackage = action.payload.selectedPackage
        state.packageCustomizations = action.payload.packageCustomizations || {}
        state.milestones = action.payload.milestones || []
        state.progressData = action.payload.progress || state.progressData
        state.assignedTeam = action.payload.assignedTeam || state.assignedTeam
        state.feedback = action.payload.clientFeedback || []
        state.documents = action.payload.documents || []
      }
    },
    
    setSprints: (state, action) => {
      state.sprints = action.payload
    },
    
    addSprint: (state, action) => {
      state.sprints.unshift(action.payload)
      state.pagination.total += 1
    },
    
    updateSprint: (state, action) => {
      const index = state.sprints.findIndex(s => s._id === action.payload._id)
      if (index !== -1) {
        state.sprints[index] = action.payload
      }
      if (state.currentSprint?._id === action.payload._id) {
        state.currentSprint = action.payload
      }
    },
    
    removeSprint: (state, action) => {
      state.sprints = state.sprints.filter(s => s._id !== action.payload)
      state.pagination.total -= 1
    },
    
    // Sprint form
    updateSprintForm: (state, action) => {
      state.sprintForm = { ...state.sprintForm, ...action.payload }
    },
    
    resetSprintForm: (state) => {
      state.sprintForm = initialState.sprintForm
    },
    
    // Packages
    setPackages: (state, action) => {
      state.packages = action.payload
    },
    
    setSelectedPackage: (state, action) => {
      state.selectedPackage = action.payload
    },
    
    updatePackageCustomizations: (state, action) => {
      state.packageCustomizations = { ...state.packageCustomizations, ...action.payload }
    },
    
    resetPackageSelection: (state) => {
      state.selectedPackage = null
      state.packageCustomizations = {}
    },
    
    // Meeting scheduling
    setAvailableTimeSlots: (state, action) => {
      state.availableTimeSlots = action.payload
    },
    
    updateMeetingData: (state, action) => {
      state.meetingData = { ...state.meetingData, ...action.payload }
    },
    
    resetMeetingData: (state) => {
      state.meetingData = initialState.meetingData
    },
    
    // Progress tracking
    setMilestones: (state, action) => {
      state.milestones = action.payload
    },
    
    addMilestone: (state, action) => {
      state.milestones.push(action.payload)
    },
    
    updateMilestone: (state, action) => {
      const index = state.milestones.findIndex(m => m._id === action.payload._id)
      if (index !== -1) {
        state.milestones[index] = action.payload
      }
    },
    
    removeMilestone: (state, action) => {
      state.milestones = state.milestones.filter(m => m._id !== action.payload)
    },
    
    updateProgressData: (state, action) => {
      state.progressData = { ...state.progressData, ...action.payload }
    },
    
    // Team assignment
    updateAssignedTeam: (state, action) => {
      state.assignedTeam = { ...state.assignedTeam, ...action.payload }
    },
    
    addTeamMember: (state, action) => {
      const { member, role } = action.payload
      if (!state.assignedTeam.members.find(m => m._id === member._id)) {
        state.assignedTeam.members.push(member)
        if (role) {
          state.assignedTeam.roles[member._id] = role
        }
      }
    },
    
    removeTeamMember: (state, action) => {
      const memberId = action.payload
      state.assignedTeam.members = state.assignedTeam.members.filter(m => m._id !== memberId)
      delete state.assignedTeam.roles[memberId]
    },
    
    updateTeamMemberRole: (state, action) => {
      const { memberId, role } = action.payload
      state.assignedTeam.roles[memberId] = role
    },
    
    // Client feedback
    setFeedback: (state, action) => {
      state.feedback = action.payload
    },
    
    addFeedback: (state, action) => {
      state.feedback.unshift(action.payload)
    },
    
    updateFeedback: (state, action) => {
      const index = state.feedback.findIndex(f => f._id === action.payload._id)
      if (index !== -1) {
        state.feedback[index] = action.payload
      }
    },
    
    updateFeedbackForm: (state, action) => {
      state.feedbackForm = { ...state.feedbackForm, ...action.payload }
    },
    
    resetFeedbackForm: (state) => {
      state.feedbackForm = initialState.feedbackForm
    },
    
    // Documents
    setDocuments: (state, action) => {
      state.documents = action.payload
    },
    
    addDocument: (state, action) => {
      state.documents.push(action.payload)
    },
    
    removeDocument: (state, action) => {
      state.documents = state.documents.filter(d => d._id !== action.payload)
    },
    
    updateDocument: (state, action) => {
      const index = state.documents.findIndex(d => d._id === action.payload._id)
      if (index !== -1) {
        state.documents[index] = action.payload
      }
    },
    
    setUploadProgress: (state, action) => {
      const { fileName, progress } = action.payload
      state.uploadProgress[fileName] = progress
    },
    
    clearUploadProgress: (state, action) => {
      if (action.payload) {
        delete state.uploadProgress[action.payload]
      } else {
        state.uploadProgress = {}
      }
    },
    
    // Filters and search
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    
    resetFilters: (state) => {
      state.filters = initialState.filters
    },
    
    // Pagination
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    
    // UI state
    setActiveTab: (state, action) => {
      state.ui.activeTab = action.payload
    },
    
    setViewMode: (state, action) => {
      state.ui.viewMode = action.payload
    },
    
    toggleModal: (state, action) => {
      const { modal, isOpen } = action.payload
      state.ui[modal] = isOpen ?? !state.ui[modal]
    },
    
    toggleExpandedMilestone: (state, action) => {
      const milestoneId = action.payload
      const isExpanded = state.ui.expandedMilestones.includes(milestoneId)
      if (isExpanded) {
        state.ui.expandedMilestones = state.ui.expandedMilestones.filter(id => id !== milestoneId)
      } else {
        state.ui.expandedMilestones.push(milestoneId)
      }
    },
    
    // Bulk operations
    bulkUpdateSprints: (state, action) => {
      const { ids, updates } = action.payload
      state.sprints = state.sprints.map(s => 
        ids.includes(s._id) ? { ...s, ...updates } : s
      )
    },
    
    // Reset state
    resetState: (state) => {
      Object.assign(state, initialState)
    },
  },
})

export const {
  setLoading,
  setSaving,
  setError,
  clearError,
  setCurrentSprint,
  setSprints,
  addSprint,
  updateSprint,
  removeSprint,
  updateSprintForm,
  resetSprintForm,
  setPackages,
  setSelectedPackage,
  updatePackageCustomizations,
  resetPackageSelection,
  setAvailableTimeSlots,
  updateMeetingData,
  resetMeetingData,
  setMilestones,
  addMilestone,
  updateMilestone,
  removeMilestone,
  updateProgressData,
  updateAssignedTeam,
  addTeamMember,
  removeTeamMember,
  updateTeamMemberRole,
  setFeedback,
  addFeedback,
  updateFeedback,
  updateFeedbackForm,
  resetFeedbackForm,
  setDocuments,
  addDocument,
  removeDocument,
  updateDocument,
  setUploadProgress,
  clearUploadProgress,
  setFilters,
  resetFilters,
  setPagination,
  setActiveTab,
  setViewMode,
  toggleModal,
  toggleExpandedMilestone,
  bulkUpdateSprints,
  resetState,
} = sprintsSlice.actions

// Selectors
export const selectCurrentSprint = (state) => state.sprints.currentSprint
export const selectSprints = (state) => state.sprints.sprints
export const selectPackages = (state) => state.sprints.packages
export const selectSelectedPackage = (state) => state.sprints.selectedPackage
export const selectPackageCustomizations = (state) => state.sprints.packageCustomizations
export const selectAvailableTimeSlots = (state) => state.sprints.availableTimeSlots
export const selectMeetingData = (state) => state.sprints.meetingData
export const selectMilestones = (state) => state.sprints.milestones
export const selectProgressData = (state) => state.sprints.progressData
export const selectAssignedTeam = (state) => state.sprints.assignedTeam
export const selectFeedback = (state) => state.sprints.feedback
export const selectFeedbackForm = (state) => state.sprints.feedbackForm
export const selectDocuments = (state) => state.sprints.documents
export const selectUploadProgress = (state) => state.sprints.uploadProgress
export const selectFilters = (state) => state.sprints.filters
export const selectPagination = (state) => state.sprints.pagination
export const selectIsLoading = (state) => state.sprints.isLoading
export const selectIsSaving = (state) => state.sprints.isSaving
export const selectError = (state) => state.sprints.error
export const selectSprintForm = (state) => state.sprints.sprintForm
export const selectUI = (state) => state.sprints.ui

// Complex selectors
export const selectSprintProgress = (state) => {
  const { progressData } = state.sprints
  if (progressData.totalTasks === 0) return 0
  return Math.round((progressData.completedTasks / progressData.totalTasks) * 100)
}

export const selectCompletedMilestones = (state) => {
  return state.sprints.milestones.filter(m => m.status === 'completed')
}

export const selectPendingMilestones = (state) => {
  return state.sprints.milestones.filter(m => m.status === 'pending')
}

export const selectOverdueMilestones = (state) => {
  const now = new Date()
  return state.sprints.milestones.filter(m => 
    m.status !== 'completed' && new Date(m.dueDate) < now
  )
}

export const selectTeamMembersByRole = (state) => {
  const { members, roles } = state.sprints.assignedTeam
  return members.reduce((acc, member) => {
    const role = roles[member._id] || 'member'
    if (!acc[role]) acc[role] = []
    acc[role].push(member)
    return acc
  }, {})
}

export const selectRecentFeedback = (state) => {
  return state.sprints.feedback
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
}

export default sprintsSlice.reducer
