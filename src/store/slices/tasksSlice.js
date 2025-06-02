import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentTask: null,
  tasks: [],
  myTasks: [],
  templates: [],
  comments: [],
  timeLogs: [],
  subtasks: [],
  watchers: [],
  isLoading: false,
  isSaving: false,
  error: null,
  
  // Task creation/editing
  taskForm: {
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    assigneeId: null,
    boardId: null,
    columnId: null,
    dueDate: null,
    estimatedHours: null,
    labels: [],
    attachments: [],
  },
  
  // Comment form
  commentForm: {
    content: '',
    isInternal: false,
    mentions: [],
  },
  
  // Time tracking
  timeLogForm: {
    hours: '',
    description: '',
    logDate: new Date().toISOString().split('T')[0],
  },
  
  // Subtask form
  subtaskForm: {
    title: '',
    description: '',
    assigneeId: null,
    dueDate: null,
  },
  
  // Drag and drop state
  dragState: {
    isDragging: false,
    draggedTask: null,
    sourceColumnId: null,
    targetColumnId: null,
    position: null,
  },
  
  // Filters and search
  filters: {
    status: 'all',
    priority: 'all',
    assignee: 'all',
    dueDate: 'all',
    labels: [],
    searchTerm: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    showCompleted: true,
    showArchived: false,
  },
  
  // Bulk selection
  selectedTasks: [],
  selectAll: false,
  
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
    showDetailModal: false,
    showTimeLogModal: false,
    showSubtaskModal: false,
    showBulkActionsModal: false,
    selectedTaskId: null,
    activeTab: 'details', // 'details' | 'comments' | 'subtasks' | 'time' | 'activity'
    viewMode: 'list', // 'list' | 'grid' | 'calendar'
    groupBy: 'none', // 'none' | 'status' | 'priority' | 'assignee' | 'dueDate'
    expandedTasks: [],
    showFilters: false,
    sidebarWidth: 300,
  },
  
  // Real-time updates
  realtimeUpdates: {
    enabled: true,
    lastUpdate: null,
    pendingUpdates: [],
  },
}

const tasksSlice = createSlice({
  name: 'tasks',
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
    
    // Task data
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload
      if (action.payload) {
        state.comments = action.payload.comments || []
        state.timeLogs = action.payload.timeLogs || []
        state.subtasks = action.payload.subtasks || []
        state.watchers = action.payload.watchers || []
      }
    },
    
    setTasks: (state, action) => {
      state.tasks = action.payload
    },
    
    setMyTasks: (state, action) => {
      state.myTasks = action.payload
    },
    
    addTask: (state, action) => {
      state.tasks.unshift(action.payload)
      state.pagination.total += 1
    },
    
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(t => t._id === action.payload._id)
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
      
      const myTaskIndex = state.myTasks.findIndex(t => t._id === action.payload._id)
      if (myTaskIndex !== -1) {
        state.myTasks[myTaskIndex] = action.payload
      }
      
      if (state.currentTask?._id === action.payload._id) {
        state.currentTask = action.payload
      }
    },
    
    removeTask: (state, action) => {
      const taskId = action.payload
      state.tasks = state.tasks.filter(t => t._id !== taskId)
      state.myTasks = state.myTasks.filter(t => t._id !== taskId)
      state.selectedTasks = state.selectedTasks.filter(id => id !== taskId)
      state.pagination.total -= 1
      
      if (state.currentTask?._id === taskId) {
        state.currentTask = null
      }
    },
    
    // Task form
    updateTaskForm: (state, action) => {
      state.taskForm = { ...state.taskForm, ...action.payload }
    },
    
    resetTaskForm: (state) => {
      state.taskForm = initialState.taskForm
    },
    
    // Task status and position
    updateTaskStatus: (state, action) => {
      const { taskId, status, columnId } = action.payload
      const task = state.tasks.find(t => t._id === taskId)
      if (task) {
        task.status = status
        if (columnId) task.columnId = columnId
      }
      
      if (state.currentTask?._id === taskId) {
        state.currentTask.status = status
        if (columnId) state.currentTask.columnId = columnId
      }
    },
    
    updateTaskPosition: (state, action) => {
      const { taskId, position, columnId } = action.payload
      const task = state.tasks.find(t => t._id === taskId)
      if (task) {
        task.position = position
        if (columnId) task.columnId = columnId
      }
    },
    
    // Comments
    setComments: (state, action) => {
      state.comments = action.payload
    },
    
    addComment: (state, action) => {
      state.comments.unshift(action.payload)
      if (state.currentTask) {
        state.currentTask.comments = state.comments
      }
    },
    
    updateComment: (state, action) => {
      const index = state.comments.findIndex(c => c._id === action.payload._id)
      if (index !== -1) {
        state.comments[index] = action.payload
      }
    },
    
    removeComment: (state, action) => {
      const commentId = action.payload
      state.comments = state.comments.filter(c => c._id !== commentId)
      if (state.currentTask) {
        state.currentTask.comments = state.comments
      }
    },
    
    updateCommentForm: (state, action) => {
      state.commentForm = { ...state.commentForm, ...action.payload }
    },
    
    resetCommentForm: (state) => {
      state.commentForm = initialState.commentForm
    },
    
    // Time tracking
    setTimeLogs: (state, action) => {
      state.timeLogs = action.payload
    },
    
    addTimeLog: (state, action) => {
      state.timeLogs.unshift(action.payload)
      if (state.currentTask) {
        state.currentTask.timeLogs = state.timeLogs
      }
    },
    
    removeTimeLog: (state, action) => {
      const logId = action.payload
      state.timeLogs = state.timeLogs.filter(l => l._id !== logId)
      if (state.currentTask) {
        state.currentTask.timeLogs = state.timeLogs
      }
    },
    
    updateTimeLogForm: (state, action) => {
      state.timeLogForm = { ...state.timeLogForm, ...action.payload }
    },
    
    resetTimeLogForm: (state) => {
      state.timeLogForm = initialState.timeLogForm
    },
    
    // Subtasks
    setSubtasks: (state, action) => {
      state.subtasks = action.payload
    },
    
    addSubtask: (state, action) => {
      state.subtasks.push(action.payload)
      if (state.currentTask) {
        state.currentTask.subtasks = state.subtasks
      }
    },
    
    updateSubtask: (state, action) => {
      const index = state.subtasks.findIndex(s => s._id === action.payload._id)
      if (index !== -1) {
        state.subtasks[index] = action.payload
      }
    },
    
    removeSubtask: (state, action) => {
      const subtaskId = action.payload
      state.subtasks = state.subtasks.filter(s => s._id !== subtaskId)
      if (state.currentTask) {
        state.currentTask.subtasks = state.subtasks
      }
    },
    
    updateSubtaskForm: (state, action) => {
      state.subtaskForm = { ...state.subtaskForm, ...action.payload }
    },
    
    resetSubtaskForm: (state) => {
      state.subtaskForm = initialState.subtaskForm
    },
    
    // Watchers
    setWatchers: (state, action) => {
      state.watchers = action.payload
    },
    
    addWatcher: (state, action) => {
      state.watchers.push(action.payload)
    },
    
    removeWatcher: (state, action) => {
      const userId = action.payload
      state.watchers = state.watchers.filter(w => w._id !== userId)
    },
    
    // Labels
    addTaskLabel: (state, action) => {
      const { taskId, label } = action.payload
      const task = state.tasks.find(t => t._id === taskId)
      if (task && !task.labels.includes(label)) {
        task.labels.push(label)
      }
      
      if (state.currentTask?._id === taskId && !state.currentTask.labels.includes(label)) {
        state.currentTask.labels.push(label)
      }
    },
    
    removeTaskLabel: (state, action) => {
      const { taskId, label } = action.payload
      const task = state.tasks.find(t => t._id === taskId)
      if (task) {
        task.labels = task.labels.filter(l => l !== label)
      }
      
      if (state.currentTask?._id === taskId) {
        state.currentTask.labels = state.currentTask.labels.filter(l => l !== label)
      }
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
    
    // Drag and drop
    setDragState: (state, action) => {
      state.dragState = { ...state.dragState, ...action.payload }
    },
    
    startTaskDrag: (state, action) => {
      const { task, sourceColumnId } = action.payload
      state.dragState = {
        isDragging: true,
        draggedTask: task,
        sourceColumnId,
        targetColumnId: null,
        position: null,
      }
    },
    
    setDropTarget: (state, action) => {
      const { columnId, position } = action.payload
      state.dragState.targetColumnId = columnId
      state.dragState.position = position
    },
    
    endTaskDrag: (state) => {
      state.dragState = initialState.dragState
    },
    
    // Bulk selection
    toggleTaskSelection: (state, action) => {
      const taskId = action.payload
      const isSelected = state.selectedTasks.includes(taskId)
      if (isSelected) {
        state.selectedTasks = state.selectedTasks.filter(id => id !== taskId)
      } else {
        state.selectedTasks.push(taskId)
      }
      
      state.selectAll = state.selectedTasks.length === state.tasks.length
    },
    
    selectAllTasks: (state, action) => {
      const selectAll = action.payload
      if (selectAll) {
        state.selectedTasks = state.tasks.map(t => t._id)
      } else {
        state.selectedTasks = []
      }
      state.selectAll = selectAll
    },
    
    clearTaskSelection: (state) => {
      state.selectedTasks = []
      state.selectAll = false
    },
    
    // Filters and search
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    
    resetFilters: (state) => {
      state.filters = initialState.filters
    },
    
    addLabelFilter: (state, action) => {
      const label = action.payload
      if (!state.filters.labels.includes(label)) {
        state.filters.labels.push(label)
      }
    },
    
    removeLabelFilter: (state, action) => {
      const label = action.payload
      state.filters.labels = state.filters.labels.filter(l => l !== label)
    },
    
    // Pagination
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    
    // UI state
    setSelectedTaskId: (state, action) => {
      state.ui.selectedTaskId = action.payload
    },
    
    setActiveTab: (state, action) => {
      state.ui.activeTab = action.payload
    },
    
    setViewMode: (state, action) => {
      state.ui.viewMode = action.payload
    },
    
    setGroupBy: (state, action) => {
      state.ui.groupBy = action.payload
    },
    
    toggleModal: (state, action) => {
      const { modal, isOpen } = action.payload
      state.ui[modal] = isOpen ?? !state.ui[modal]
    },
    
    toggleExpandedTask: (state, action) => {
      const taskId = action.payload
      const isExpanded = state.ui.expandedTasks.includes(taskId)
      if (isExpanded) {
        state.ui.expandedTasks = state.ui.expandedTasks.filter(id => id !== taskId)
      } else {
        state.ui.expandedTasks.push(taskId)
      }
    },
    
    toggleFilters: (state) => {
      state.ui.showFilters = !state.ui.showFilters
    },
    
    setSidebarWidth: (state, action) => {
      state.ui.sidebarWidth = action.payload
    },
    
    // Real-time updates
    setRealtimeEnabled: (state, action) => {
      state.realtimeUpdates.enabled = action.payload
    },
    
    addPendingUpdate: (state, action) => {
      state.realtimeUpdates.pendingUpdates.push(action.payload)
    },
    
    clearPendingUpdates: (state) => {
      state.realtimeUpdates.pendingUpdates = []
      state.realtimeUpdates.lastUpdate = new Date().toISOString()
    },
    
    // Bulk operations
    bulkUpdateTasks: (state, action) => {
      const { taskIds, updates } = action.payload
      state.tasks = state.tasks.map(task => 
        taskIds.includes(task._id) ? { ...task, ...updates } : task
      )
      state.myTasks = state.myTasks.map(task => 
        taskIds.includes(task._id) ? { ...task, ...updates } : task
      )
    },
    
    bulkDeleteTasks: (state, action) => {
      const taskIds = action.payload
      state.tasks = state.tasks.filter(t => !taskIds.includes(t._id))
      state.myTasks = state.myTasks.filter(t => !taskIds.includes(t._id))
      state.selectedTasks = state.selectedTasks.filter(id => !taskIds.includes(id))
      state.pagination.total -= taskIds.length
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
  setCurrentTask,
  setTasks,
  setMyTasks,
  addTask,
  updateTask,
  removeTask,
  updateTaskForm,
  resetTaskForm,
  updateTaskStatus,
  updateTaskPosition,
  setComments,
  addComment,
  updateComment,
  removeComment,
  updateCommentForm,
  resetCommentForm,
  setTimeLogs,
  addTimeLog,
  removeTimeLog,
  updateTimeLogForm,
  resetTimeLogForm,
  setSubtasks,
  addSubtask,
  updateSubtask,
  removeSubtask,
  updateSubtaskForm,
  resetSubtaskForm,
  setWatchers,
  addWatcher,
  removeWatcher,
  addTaskLabel,
  removeTaskLabel,
  setTemplates,
  addTemplate,
  removeTemplate,
  setDragState,
  startTaskDrag,
  setDropTarget,
  endTaskDrag,
  toggleTaskSelection,
  selectAllTasks,
  clearTaskSelection,
  setFilters,
  resetFilters,
  addLabelFilter,
  removeLabelFilter,
  setPagination,
  setSelectedTaskId,
  setActiveTab,
  setViewMode,
  setGroupBy,
  toggleModal,
  toggleExpandedTask,
  toggleFilters,
  setSidebarWidth,
  setRealtimeEnabled,
  addPendingUpdate,
  clearPendingUpdates,
  bulkUpdateTasks,
  bulkDeleteTasks,
  resetState,
} = tasksSlice.actions

// Selectors
export const selectCurrentTask = (state) => state.tasks.currentTask
export const selectTasks = (state) => state.tasks.tasks
export const selectMyTasks = (state) => state.tasks.myTasks
export const selectTemplates = (state) => state.tasks.templates
export const selectComments = (state) => state.tasks.comments
export const selectTimeLogs = (state) => state.tasks.timeLogs
export const selectSubtasks = (state) => state.tasks.subtasks
export const selectWatchers = (state) => state.tasks.watchers
export const selectDragState = (state) => state.tasks.dragState
export const selectSelectedTasks = (state) => state.tasks.selectedTasks
export const selectSelectAll = (state) => state.tasks.selectAll
export const selectFilters = (state) => state.tasks.filters
export const selectPagination = (state) => state.tasks.pagination
export const selectIsLoading = (state) => state.tasks.isLoading
export const selectIsSaving = (state) => state.tasks.isSaving
export const selectError = (state) => state.tasks.error
export const selectTaskForm = (state) => state.tasks.taskForm
export const selectCommentForm = (state) => state.tasks.commentForm
export const selectTimeLogForm = (state) => state.tasks.timeLogForm
export const selectSubtaskForm = (state) => state.tasks.subtaskForm
export const selectUI = (state) => state.tasks.ui
export const selectRealtimeUpdates = (state) => state.tasks.realtimeUpdates

// Complex selectors
export const selectTaskById = (taskId) => (state) => {
  return state.tasks.tasks.find(task => task._id === taskId)
}

export const selectTasksByStatus = (status) => (state) => {
  return state.tasks.tasks.filter(task => task.status === status)
}

export const selectTasksByPriority = (priority) => (state) => {
  return state.tasks.tasks.filter(task => task.priority === priority)
}

export const selectOverdueTasks = (state) => {
  const now = new Date()
  return state.tasks.tasks.filter(task => 
    task.dueDate && new Date(task.dueDate) < now && task.status !== 'completed'
  )
}

export const selectTasksAssignedToMe = (state) => {
  const currentUserId = state.auth.user?._id
  return state.tasks.tasks.filter(task => task.assigneeId === currentUserId)
}

export const selectTasksByColumn = (columnId) => (state) => {
  return state.tasks.tasks
    .filter(task => task.columnId === columnId)
    .sort((a, b) => a.position - b.position)
}

export const selectTotalTimeLogged = (state) => {
  return state.tasks.timeLogs.reduce((total, log) => total + log.hours, 0)
}

export const selectCompletedSubtasks = (state) => {
  return state.tasks.subtasks.filter(subtask => subtask.status === 'completed')
}

export const selectTaskProgress = (state) => {
  const { subtasks } = state.tasks
  if (subtasks.length === 0) return 0
  const completed = subtasks.filter(s => s.status === 'completed').length
  return Math.round((completed / subtasks.length) * 100)
}

export const selectFilteredTasks = (state) => {
  const { tasks, filters } = state.tasks
  
  return tasks.filter(task => {
    // Status filter
    if (filters.status !== 'all' && task.status !== filters.status) return false
    
    // Priority filter
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false
    
    // Assignee filter
    if (filters.assignee !== 'all' && task.assigneeId !== filters.assignee) return false
    
    // Labels filter
    if (filters.labels.length > 0 && !filters.labels.some(label => task.labels.includes(label))) return false
    
    // Search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase()
      if (!task.title.toLowerCase().includes(searchLower) && 
          !task.description.toLowerCase().includes(searchLower)) return false
    }
    
    // Show completed
    if (!filters.showCompleted && task.status === 'completed') return false
    
    // Show archived
    if (!filters.showArchived && task.archived) return false
    
    return true
  })
}

export const selectHasSelectedTasks = (state) => {
  return state.tasks.selectedTasks.length > 0
}

export default tasksSlice.reducer
