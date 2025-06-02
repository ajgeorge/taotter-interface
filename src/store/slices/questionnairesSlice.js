import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentQuestionnaire: null,
  questionnaires: [],
  templates: [],
  currentStep: 0,
  totalSteps: 4,
  isLoading: false,
  isSaving: false,
  isSubmitting: false,
  error: null,
  validationErrors: {},
  isDirty: false,
  lastSaved: null,
  autoSaveEnabled: true,
  
  // Form data for current questionnaire
  formData: {
    basicInfo: {},
    technicalInfo: {},
    businessInfo: {},
    financialInfo: {},
  },
  
  // Review process
  reviewComments: [],
  reviewHistory: [],
  
  // Filters and search
  filters: {
    status: 'all',
    dateRange: null,
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
    showTemplateModal: false,
    showDeleteModal: false,
    selectedTemplateId: null,
    expandedSections: ['basicInfo'],
    viewMode: 'form', // 'form' | 'preview' | 'review'
  },
}

const questionnairesSlice = createSlice({
  name: 'questionnaires',
  initialState,
  reducers: {
    // Loading states
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    
    setSaving: (state, action) => {
      state.isSaving = action.payload
    },
    
    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload
    },
    
    // Error handling
    setError: (state, action) => {
      state.error = action.payload
    },
    
    clearError: (state) => {
      state.error = null
    },
    
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload
    },
    
    clearValidationErrors: (state) => {
      state.validationErrors = {}
    },
    
    // Questionnaire data
    setCurrentQuestionnaire: (state, action) => {
      state.currentQuestionnaire = action.payload
      if (action.payload) {
        state.formData = action.payload.sections || state.formData
        state.currentStep = action.payload.currentStep || 0
      }
    },
    
    setQuestionnaires: (state, action) => {
      state.questionnaires = action.payload
    },
    
    addQuestionnaire: (state, action) => {
      state.questionnaires.unshift(action.payload)
      state.pagination.total += 1
    },
    
    updateQuestionnaire: (state, action) => {
      const index = state.questionnaires.findIndex(q => q._id === action.payload._id)
      if (index !== -1) {
        state.questionnaires[index] = action.payload
      }
      if (state.currentQuestionnaire?._id === action.payload._id) {
        state.currentQuestionnaire = action.payload
      }
    },
    
    removeQuestionnaire: (state, action) => {
      state.questionnaires = state.questionnaires.filter(q => q._id !== action.payload)
      state.pagination.total -= 1
    },
    
    // Form data management
    updateFormData: (state, action) => {
      const { section, data } = action.payload
      state.formData[section] = { ...state.formData[section], ...data }
      state.isDirty = true
    },
    
    setFormData: (state, action) => {
      state.formData = action.payload
      state.isDirty = false
    },
    
    resetFormData: (state) => {
      state.formData = {
        basicInfo: {},
        technicalInfo: {},
        businessInfo: {},
        financialInfo: {},
      }
      state.isDirty = false
      state.validationErrors = {}
    },
    
    // Step navigation
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload
    },
    
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps - 1) {
        state.currentStep += 1
      }
    },
    
    previousStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1
      }
    },
    
    // Templates
    setTemplates: (state, action) => {
      state.templates = action.payload
    },
    
    addTemplate: (state, action) => {
      state.templates.unshift(action.payload)
    },
    
    updateTemplate: (state, action) => {
      const index = state.templates.findIndex(t => t._id === action.payload._id)
      if (index !== -1) {
        state.templates[index] = action.payload
      }
    },
    
    removeTemplate: (state, action) => {
      state.templates = state.templates.filter(t => t._id !== action.payload)
    },
    
    // Review process
    setReviewComments: (state, action) => {
      state.reviewComments = action.payload
    },
    
    addReviewComment: (state, action) => {
      state.reviewComments.unshift(action.payload)
    },
    
    updateReviewComment: (state, action) => {
      const index = state.reviewComments.findIndex(c => c._id === action.payload._id)
      if (index !== -1) {
        state.reviewComments[index] = action.payload
      }
    },
    
    removeReviewComment: (state, action) => {
      state.reviewComments = state.reviewComments.filter(c => c._id !== action.payload)
    },
    
    setReviewHistory: (state, action) => {
      state.reviewHistory = action.payload
    },
    
    // Filters and search
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    
    resetFilters: (state) => {
      state.filters = {
        status: 'all',
        dateRange: null,
        searchTerm: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
      }
    },
    
    // Pagination
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    
    // Auto-save
    setLastSaved: (state, action) => {
      state.lastSaved = action.payload
      state.isDirty = false
    },
    
    toggleAutoSave: (state) => {
      state.autoSaveEnabled = !state.autoSaveEnabled
    },
    
    // UI state
    setViewMode: (state, action) => {
      state.ui.viewMode = action.payload
    },
    
    toggleTemplateModal: (state, action) => {
      state.ui.showTemplateModal = action.payload ?? !state.ui.showTemplateModal
    },
    
    toggleDeleteModal: (state, action) => {
      state.ui.showDeleteModal = action.payload ?? !state.ui.showDeleteModal
    },
    
    setSelectedTemplateId: (state, action) => {
      state.ui.selectedTemplateId = action.payload
    },
    
    toggleExpandedSection: (state, action) => {
      const section = action.payload
      const isExpanded = state.ui.expandedSections.includes(section)
      if (isExpanded) {
        state.ui.expandedSections = state.ui.expandedSections.filter(s => s !== section)
      } else {
        state.ui.expandedSections.push(section)
      }
    },
    
    setExpandedSections: (state, action) => {
      state.ui.expandedSections = action.payload
    },
    
    // Bulk operations
    bulkUpdateQuestionnaires: (state, action) => {
      const { ids, updates } = action.payload
      state.questionnaires = state.questionnaires.map(q => 
        ids.includes(q._id) ? { ...q, ...updates } : q
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
  setSubmitting,
  setError,
  clearError,
  setValidationErrors,
  clearValidationErrors,
  setCurrentQuestionnaire,
  setQuestionnaires,
  addQuestionnaire,
  updateQuestionnaire,
  removeQuestionnaire,
  updateFormData,
  setFormData,
  resetFormData,
  setCurrentStep,
  nextStep,
  previousStep,
  setTemplates,
  addTemplate,
  updateTemplate,
  removeTemplate,
  setReviewComments,
  addReviewComment,
  updateReviewComment,
  removeReviewComment,
  setReviewHistory,
  setFilters,
  resetFilters,
  setPagination,
  setLastSaved,
  toggleAutoSave,
  setViewMode,
  toggleTemplateModal,
  toggleDeleteModal,
  setSelectedTemplateId,
  toggleExpandedSection,
  setExpandedSections,
  bulkUpdateQuestionnaires,
  resetState,
} = questionnairesSlice.actions

// Selectors
export const selectCurrentQuestionnaire = (state) => state.questionnaires.currentQuestionnaire
export const selectQuestionnaires = (state) => state.questionnaires.questionnaires
export const selectTemplates = (state) => state.questionnaires.templates
export const selectCurrentStep = (state) => state.questionnaires.currentStep
export const selectTotalSteps = (state) => state.questionnaires.totalSteps
export const selectFormData = (state) => state.questionnaires.formData
export const selectIsLoading = (state) => state.questionnaires.isLoading
export const selectIsSaving = (state) => state.questionnaires.isSaving
export const selectIsSubmitting = (state) => state.questionnaires.isSubmitting
export const selectError = (state) => state.questionnaires.error
export const selectValidationErrors = (state) => state.questionnaires.validationErrors
export const selectIsDirty = (state) => state.questionnaires.isDirty
export const selectLastSaved = (state) => state.questionnaires.lastSaved
export const selectAutoSaveEnabled = (state) => state.questionnaires.autoSaveEnabled
export const selectFilters = (state) => state.questionnaires.filters
export const selectPagination = (state) => state.questionnaires.pagination
export const selectReviewComments = (state) => state.questionnaires.reviewComments
export const selectReviewHistory = (state) => state.questionnaires.reviewHistory
export const selectUI = (state) => state.questionnaires.ui

// Complex selectors
export const selectFormProgress = (state) => {
  const { currentStep, totalSteps } = state.questionnaires
  return Math.round((currentStep / (totalSteps - 1)) * 100)
}

export const selectCanProceedToNextStep = (state) => {
  const { currentStep, formData, validationErrors } = state.questionnaires
  const sections = ['basicInfo', 'technicalInfo', 'businessInfo', 'financialInfo']
  const currentSection = sections[currentStep]
  
  // Check if current section has required fields filled and no validation errors
  const hasData = Object.keys(formData[currentSection] || {}).length > 0
  const hasErrors = Object.keys(validationErrors).some(key => key.startsWith(currentSection))
  
  return hasData && !hasErrors
}

export const selectIsFormComplete = (state) => {
  const { formData } = state.questionnaires
  return Object.values(formData).every(section => Object.keys(section).length > 0)
}

export default questionnairesSlice.reducer
