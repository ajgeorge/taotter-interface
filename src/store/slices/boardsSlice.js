import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentBoard: null,
  boards: [],
  myBoards: [],
  favoriteBoards: [],
  templates: [],
  columns: [],
  isLoading: false,
  isSaving: false,
  error: null,
  
  // Board creation/editing
  boardForm: {
    name: '',
    description: '',
    type: 'project',
    isPrivate: false,
    color: '#3b82f6',
    templateId: null,
  },
  
  // Column management
  columnForm: {
    name: '',
    color: '#6b7280',
    wipLimit: null,
    position: 0,
  },
  
  // Board permissions
  permissions: {
    canEdit: false,
    canDelete: false,
    canInvite: false,
    canManageColumns: false,
  },
  
  // Members and roles
  members: [],
  memberForm: {
    userId: '',
    role: 'member',
  },
  
  // Drag and drop state
  dragState: {
    isDragging: false,
    draggedItem: null,
    draggedType: null, // 'task' | 'column'
    dropTarget: null,
  },
  
  // Filters and search
  filters: {
    type: 'all',
    status: 'all',
    member: 'all',
    label: 'all',
    searchTerm: '',
    sortBy: 'name',
    sortOrder: 'asc',
    showArchived: false,
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
    showCreateModal: false,
    showEditModal: false,
    showDeleteModal: false,
    showMembersModal: false,
    showTemplateModal: false,
    showColumnModal: false,
    showPermissionsModal: false,
    selectedBoardId: null,
    selectedColumnId: null,
    viewMode: 'kanban', // 'kanban' | 'table' | 'timeline'
    sidebarCollapsed: false,
    showCompletedTasks: true,
    compactView: false,
    autoRefresh: true,
    refreshInterval: 30000,
  },
  
  // Activity and analytics
  activity: [],
  analytics: {
    taskCount: 0,
    completedTasks: 0,
    overdueTasks: 0,
    memberActivity: {},
    columnDistribution: {},
  },
}

const boardsSlice = createSlice({
  name: 'boards',
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
    
    // Board data
    setCurrentBoard: (state, action) => {
      state.currentBoard = action.payload
      if (action.payload) {
        state.columns = action.payload.columns || []
        state.members = action.payload.members || []
        state.permissions = action.payload.permissions || state.permissions
      }
    },
    
    setBoards: (state, action) => {
      state.boards = action.payload
    },
    
    setMyBoards: (state, action) => {
      state.myBoards = action.payload
    },
    
    setFavoriteBoards: (state, action) => {
      state.favoriteBoards = action.payload
    },
    
    addBoard: (state, action) => {
      state.boards.unshift(action.payload)
      state.myBoards.unshift(action.payload)
      state.pagination.total += 1
    },
    
    updateBoard: (state, action) => {
      const updateBoardInArray = (boards) => {
        const index = boards.findIndex(b => b._id === action.payload._id)
        if (index !== -1) {
          boards[index] = action.payload
        }
      }
      
      updateBoardInArray(state.boards)
      updateBoardInArray(state.myBoards)
      updateBoardInArray(state.favoriteBoards)
      
      if (state.currentBoard?._id === action.payload._id) {
        state.currentBoard = action.payload
      }
    },
    
    removeBoard: (state, action) => {
      const boardId = action.payload
      state.boards = state.boards.filter(b => b._id !== boardId)
      state.myBoards = state.myBoards.filter(b => b._id !== boardId)
      state.favoriteBoards = state.favoriteBoards.filter(b => b._id !== boardId)
      state.pagination.total -= 1
      
      if (state.currentBoard?._id === boardId) {
        state.currentBoard = null
      }
    },
    
    toggleFavoriteBoard: (state, action) => {
      const boardId = action.payload
      const board = state.boards.find(b => b._id === boardId)
      
      if (board) {
        const isFavorite = state.favoriteBoards.some(b => b._id === boardId)
        if (isFavorite) {
          state.favoriteBoards = state.favoriteBoards.filter(b => b._id !== boardId)
        } else {
          state.favoriteBoards.push(board)
        }
        
        // Update the board's favorite status
        board.isFavorite = !isFavorite
        if (state.currentBoard?._id === boardId) {
          state.currentBoard.isFavorite = !isFavorite
        }
      }
    },
    
    // Board form
    updateBoardForm: (state, action) => {
      state.boardForm = { ...state.boardForm, ...action.payload }
    },
    
    resetBoardForm: (state) => {
      state.boardForm = initialState.boardForm
    },
    
    // Column management
    setColumns: (state, action) => {
      state.columns = action.payload
    },
    
    addColumn: (state, action) => {
      state.columns.push(action.payload)
      if (state.currentBoard) {
        state.currentBoard.columns = state.columns
      }
    },
    
    updateColumn: (state, action) => {
      const index = state.columns.findIndex(c => c._id === action.payload._id)
      if (index !== -1) {
        state.columns[index] = action.payload
        if (state.currentBoard) {
          state.currentBoard.columns = state.columns
        }
      }
    },
    
    removeColumn: (state, action) => {
      const columnId = action.payload
      state.columns = state.columns.filter(c => c._id !== columnId)
      if (state.currentBoard) {
        state.currentBoard.columns = state.columns
      }
    },
    
    reorderColumns: (state, action) => {
      state.columns = action.payload
      if (state.currentBoard) {
        state.currentBoard.columns = state.columns
      }
    },
    
    updateColumnForm: (state, action) => {
      state.columnForm = { ...state.columnForm, ...action.payload }
    },
    
    resetColumnForm: (state) => {
      state.columnForm = initialState.columnForm
    },
    
    // Templates
    setTemplates: (state, action) => {
      state.templates = action.payload
    },
    
    addTemplate: (state, action) => {
      state.templates.unshift(action.payload)
    },
    
    removeTemplate: (state, action) => {
      state.templates = state.templates.filter(t => t._id !== action.payload)
    },
    
    // Members and permissions
    setMembers: (state, action) => {
      state.members = action.payload
    },
    
    addMember: (state, action) => {
      state.members.push(action.payload)
    },
    
    removeMember: (state, action) => {
      const userId = action.payload
      state.members = state.members.filter(m => m.user._id !== userId)
    },
    
    updateMemberRole: (state, action) => {
      const { userId, role } = action.payload
      const member = state.members.find(m => m.user._id === userId)
      if (member) {
        member.role = role
      }
    },
    
    updateMemberForm: (state, action) => {
      state.memberForm = { ...state.memberForm, ...action.payload }
    },
    
    resetMemberForm: (state) => {
      state.memberForm = initialState.memberForm
    },
    
    setPermissions: (state, action) => {
      state.permissions = { ...state.permissions, ...action.payload }
    },
    
    // Drag and drop
    setDragState: (state, action) => {
      state.dragState = { ...state.dragState, ...action.payload }
    },
    
    startDrag: (state, action) => {
      const { item, type } = action.payload
      state.dragState = {
        isDragging: true,
        draggedItem: item,
        draggedType: type,
        dropTarget: null,
      }
    },
    
    setDropTarget: (state, action) => {
      state.dragState.dropTarget = action.payload
    },
    
    endDrag: (state) => {
      state.dragState = {
        isDragging: false,
        draggedItem: null,
        draggedType: null,
        dropTarget: null,
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
    setSelectedBoardId: (state, action) => {
      state.ui.selectedBoardId = action.payload
    },
    
    setSelectedColumnId: (state, action) => {
      state.ui.selectedColumnId = action.payload
    },
    
    setViewMode: (state, action) => {
      state.ui.viewMode = action.payload
    },
    
    toggleModal: (state, action) => {
      const { modal, isOpen } = action.payload
      state.ui[modal] = isOpen ?? !state.ui[modal]
    },
    
    toggleSidebar: (state) => {
      state.ui.sidebarCollapsed = !state.ui.sidebarCollapsed
    },
    
    toggleCompletedTasks: (state) => {
      state.ui.showCompletedTasks = !state.ui.showCompletedTasks
    },
    
    toggleCompactView: (state) => {
      state.ui.compactView = !state.ui.compactView
    },
    
    toggleAutoRefresh: (state) => {
      state.ui.autoRefresh = !state.ui.autoRefresh
    },
    
    setRefreshInterval: (state, action) => {
      state.ui.refreshInterval = action.payload
    },
    
    // Activity and analytics
    setActivity: (state, action) => {
      state.activity = action.payload
    },
    
    addActivity: (state, action) => {
      state.activity.unshift(action.payload)
      // Keep only the last 50 activities
      if (state.activity.length > 50) {
        state.activity = state.activity.slice(0, 50)
      }
    },
    
    setAnalytics: (state, action) => {
      state.analytics = { ...state.analytics, ...action.payload }
    },
    
    // Bulk operations
    bulkUpdateBoards: (state, action) => {
      const { ids, updates } = action.payload
      
      const updateBoards = (boards) => {
        return boards.map(b => 
          ids.includes(b._id) ? { ...b, ...updates } : b
        )
      }
      
      state.boards = updateBoards(state.boards)
      state.myBoards = updateBoards(state.myBoards)
      state.favoriteBoards = updateBoards(state.favoriteBoards)
    },
    
    bulkDeleteBoards: (state, action) => {
      const ids = action.payload
      state.boards = state.boards.filter(b => !ids.includes(b._id))
      state.myBoards = state.myBoards.filter(b => !ids.includes(b._id))
      state.favoriteBoards = state.favoriteBoards.filter(b => !ids.includes(b._id))
      state.pagination.total -= ids.length
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
  setCurrentBoard,
  setBoards,
  setMyBoards,
  setFavoriteBoards,
  addBoard,
  updateBoard,
  removeBoard,
  toggleFavoriteBoard,
  updateBoardForm,
  resetBoardForm,
  setColumns,
  addColumn,
  updateColumn,
  removeColumn,
  reorderColumns,
  updateColumnForm,
  resetColumnForm,
  setTemplates,
  addTemplate,
  removeTemplate,
  setMembers,
  addMember,
  removeMember,
  updateMemberRole,
  updateMemberForm,
  resetMemberForm,
  setPermissions,
  setDragState,
  startDrag,
  setDropTarget,
  endDrag,
  setFilters,
  resetFilters,
  setPagination,
  setSelectedBoardId,
  setSelectedColumnId,
  setViewMode,
  toggleModal,
  toggleSidebar,
  toggleCompletedTasks,
  toggleCompactView,
  toggleAutoRefresh,
  setRefreshInterval,
  setActivity,
  addActivity,
  setAnalytics,
  bulkUpdateBoards,
  bulkDeleteBoards,
  resetState,
} = boardsSlice.actions

// Selectors
export const selectCurrentBoard = (state) => state.boards.currentBoard
export const selectBoards = (state) => state.boards.boards
export const selectMyBoards = (state) => state.boards.myBoards
export const selectFavoriteBoards = (state) => state.boards.favoriteBoards
export const selectTemplates = (state) => state.boards.templates
export const selectColumns = (state) => state.boards.columns
export const selectMembers = (state) => state.boards.members
export const selectPermissions = (state) => state.boards.permissions
export const selectDragState = (state) => state.boards.dragState
export const selectFilters = (state) => state.boards.filters
export const selectPagination = (state) => state.boards.pagination
export const selectIsLoading = (state) => state.boards.isLoading
export const selectIsSaving = (state) => state.boards.isSaving
export const selectError = (state) => state.boards.error
export const selectBoardForm = (state) => state.boards.boardForm
export const selectColumnForm = (state) => state.boards.columnForm
export const selectMemberForm = (state) => state.boards.memberForm
export const selectActivity = (state) => state.boards.activity
export const selectAnalytics = (state) => state.boards.analytics
export const selectUI = (state) => state.boards.ui

// Complex selectors
export const selectBoardsByType = (type) => (state) => {
  return state.boards.boards.filter(board => board.type === type)
}

export const selectRecentBoards = (state) => {
  return state.boards.myBoards
    .slice()
    .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))
    .slice(0, 5)
}

export const selectBoardPermissions = (action) => (state) => {
  return state.boards.permissions[action] || false
}

export const selectColumnById = (columnId) => (state) => {
  return state.boards.columns.find(column => column._id === columnId)
}

export const selectColumnTasks = (columnId) => (state) => {
  const column = state.boards.columns.find(c => c._id === columnId)
  return column?.tasks || []
}

export const selectBoardStats = (state) => {
  const { analytics } = state.boards
  return {
    totalTasks: analytics.taskCount,
    completedTasks: analytics.completedTasks,
    overdueTasks: analytics.overdueTasks,
    completionRate: analytics.taskCount > 0 
      ? Math.round((analytics.completedTasks / analytics.taskCount) * 100)
      : 0,
  }
}

export const selectActiveMembers = (state) => {
  return state.boards.members.filter(member => member.status === 'active')
}

export const selectCanPerformAction = (action) => (state) => {
  const permissions = state.boards.permissions
  return permissions[action] || false
}

export default boardsSlice.reducer
