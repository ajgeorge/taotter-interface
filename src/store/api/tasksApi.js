import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Task', 'TaskComment', 'TaskTimeLog', 'TaskSubtask'],
  endpoints: (builder) => ({
    // Task Management
    getTasks: builder.query({
      query: (params = {}) => ({
        url: '/tasks',
        params,
      }),
      providesTags: ['Task'],
    }),
    
    getTaskById: builder.query({
      query: (id) => `/tasks/${id}`,
      providesTags: ['Task'],
    }),
    
    getBoardTasks: builder.query({
      query: ({ boardId, ...params }) => ({
        url: `/tasks/board/${boardId}`,
        params,
      }),
      providesTags: ['Task'],
    }),
    
    getMyTasks: builder.query({
      query: (params = {}) => ({
        url: '/tasks/my-tasks',
        params,
      }),
      providesTags: ['Task'],
    }),
    
    createTask: builder.mutation({
      query: (taskData) => ({
        url: '/tasks',
        method: 'POST',
        body: taskData,
      }),
      invalidatesTags: ['Task'],
    }),
    
    updateTask: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['Task'],
    }),
    
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
    
    archiveTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}/archive`,
        method: 'POST',
      }),
      invalidatesTags: ['Task'],
    }),
    
    restoreTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}/restore`,
        method: 'POST',
      }),
      invalidatesTags: ['Task'],
    }),
    
    // Task Status & Position
    updateTaskStatus: builder.mutation({
      query: ({ id, status, columnId }) => ({
        url: `/tasks/${id}/status`,
        method: 'PUT',
        body: { status, columnId },
      }),
      invalidatesTags: ['Task'],
    }),
    
    updateTaskPosition: builder.mutation({
      query: ({ id, position, columnId }) => ({
        url: `/tasks/${id}/position`,
        method: 'PUT',
        body: { position, columnId },
      }),
      invalidatesTags: ['Task'],
    }),
    
    bulkUpdateTaskPositions: builder.mutation({
      query: (updates) => ({
        url: '/tasks/bulk-update-positions',
        method: 'PUT',
        body: { updates },
      }),
      invalidatesTags: ['Task'],
    }),
    
    // Task Assignment
    assignTask: builder.mutation({
      query: ({ id, assigneeId, notes }) => ({
        url: `/tasks/${id}/assign`,
        method: 'POST',
        body: { assigneeId, notes },
      }),
      invalidatesTags: ['Task'],
    }),
    
    unassignTask: builder.mutation({
      query: ({ id, notes }) => ({
        url: `/tasks/${id}/unassign`,
        method: 'POST',
        body: { notes },
      }),
      invalidatesTags: ['Task'],
    }),
    
    // Comments
    addTaskComment: builder.mutation({
      query: ({ id, content, isInternal, mentions }) => ({
        url: `/tasks/${id}/comments`,
        method: 'POST',
        body: { content, isInternal, mentions },
      }),
      invalidatesTags: ['Task', 'TaskComment'],
    }),
    
    updateTaskComment: builder.mutation({
      query: ({ id, commentId, content }) => ({
        url: `/tasks/${id}/comments/${commentId}`,
        method: 'PUT',
        body: { content },
      }),
      invalidatesTags: ['Task', 'TaskComment'],
    }),
    
    deleteTaskComment: builder.mutation({
      query: ({ id, commentId }) => ({
        url: `/tasks/${id}/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task', 'TaskComment'],
    }),
    
    // Time Tracking
    logTime: builder.mutation({
      query: ({ id, hours, description, logDate }) => ({
        url: `/tasks/${id}/time-logs`,
        method: 'POST',
        body: { hours, description, logDate },
      }),
      invalidatesTags: ['Task', 'TaskTimeLog'],
    }),
    
    getTaskTimeLogs: builder.query({
      query: (id) => `/tasks/${id}/time-logs`,
      providesTags: ['TaskTimeLog'],
    }),
    
    deleteTimeLog: builder.mutation({
      query: ({ id, logId }) => ({
        url: `/tasks/${id}/time-logs/${logId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task', 'TaskTimeLog'],
    }),
    
    // Subtasks
    addSubtask: builder.mutation({
      query: ({ id, title, description, assigneeId, dueDate }) => ({
        url: `/tasks/${id}/subtasks`,
        method: 'POST',
        body: { title, description, assigneeId, dueDate },
      }),
      invalidatesTags: ['Task', 'TaskSubtask'],
    }),
    
    updateSubtask: builder.mutation({
      query: ({ id, subtaskId, ...updateData }) => ({
        url: `/tasks/${id}/subtasks/${subtaskId}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['Task', 'TaskSubtask'],
    }),
    
    deleteSubtask: builder.mutation({
      query: ({ id, subtaskId }) => ({
        url: `/tasks/${id}/subtasks/${subtaskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task', 'TaskSubtask'],
    }),
    
    // Watchers
    addTaskWatcher: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/tasks/${id}/watchers`,
        method: 'POST',
        body: { userId },
      }),
      invalidatesTags: ['Task'],
    }),
    
    removeTaskWatcher: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/tasks/${id}/watchers/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
    
    // Task Dependencies
    addTaskDependency: builder.mutation({
      query: ({ id, dependsOnTaskId, dependencyType }) => ({
        url: `/tasks/${id}/dependencies`,
        method: 'POST',
        body: { dependsOnTaskId, dependencyType },
      }),
      invalidatesTags: ['Task'],
    }),
    
    removeTaskDependency: builder.mutation({
      query: ({ id, dependencyId }) => ({
        url: `/tasks/${id}/dependencies/${dependencyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
    
    // Task Attachments
    uploadTaskAttachment: builder.mutation({
      query: ({ id, file, description }) => {
        const formData = new FormData()
        formData.append('file', file)
        if (description) formData.append('description', description)
        
        return {
          url: `/tasks/${id}/attachments`,
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['Task'],
    }),
    
    deleteTaskAttachment: builder.mutation({
      query: ({ id, attachmentId }) => ({
        url: `/tasks/${id}/attachments/${attachmentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
    
    // Task Labels/Tags
    addTaskLabel: builder.mutation({
      query: ({ id, label }) => ({
        url: `/tasks/${id}/labels`,
        method: 'POST',
        body: { label },
      }),
      invalidatesTags: ['Task'],
    }),
    
    removeTaskLabel: builder.mutation({
      query: ({ id, label }) => ({
        url: `/tasks/${id}/labels/${label}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
    
    // Task Templates
    getTaskTemplates: builder.query({
      query: () => '/tasks/templates',
      providesTags: ['Task'],
    }),
    
    createTaskFromTemplate: builder.mutation({
      query: ({ templateId, taskData }) => ({
        url: `/tasks/from-template/${templateId}`,
        method: 'POST',
        body: taskData,
      }),
      invalidatesTags: ['Task'],
    }),
    
    saveTaskAsTemplate: builder.mutation({
      query: ({ id, templateData }) => ({
        url: `/tasks/${id}/save-as-template`,
        method: 'POST',
        body: templateData,
      }),
      invalidatesTags: ['Task'],
    }),
    
    // Task Search & Filtering
    searchTasks: builder.query({
      query: (searchParams) => ({
        url: '/tasks/search',
        params: searchParams,
      }),
    }),
    
    getTasksByFilter: builder.query({
      query: (filters) => ({
        url: '/tasks/filter',
        params: filters,
      }),
      providesTags: ['Task'],
    }),
    
    // Task Analytics
    getTaskAnalytics: builder.query({
      query: (params = {}) => ({
        url: '/tasks/analytics',
        params,
      }),
    }),
    
    getMyTasksAnalytics: builder.query({
      query: (params = {}) => ({
        url: '/tasks/my-analytics',
        params,
      }),
    }),
    
    // Bulk Operations
    bulkUpdateTasks: builder.mutation({
      query: ({ taskIds, updates }) => ({
        url: '/tasks/bulk-update',
        method: 'PUT',
        body: { taskIds, updates },
      }),
      invalidatesTags: ['Task'],
    }),
    
    bulkDeleteTasks: builder.mutation({
      query: (taskIds) => ({
        url: '/tasks/bulk-delete',
        method: 'DELETE',
        body: { taskIds },
      }),
      invalidatesTags: ['Task'],
    }),
    
    bulkArchiveTasks: builder.mutation({
      query: (taskIds) => ({
        url: '/tasks/bulk-archive',
        method: 'POST',
        body: { taskIds },
      }),
      invalidatesTags: ['Task'],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useGetBoardTasksQuery,
  useGetMyTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useArchiveTaskMutation,
  useRestoreTaskMutation,
  useUpdateTaskStatusMutation,
  useUpdateTaskPositionMutation,
  useBulkUpdateTaskPositionsMutation,
  useAssignTaskMutation,
  useUnassignTaskMutation,
  useAddTaskCommentMutation,
  useUpdateTaskCommentMutation,
  useDeleteTaskCommentMutation,
  useLogTimeMutation,
  useGetTaskTimeLogsQuery,
  useDeleteTimeLogMutation,
  useAddSubtaskMutation,
  useUpdateSubtaskMutation,
  useDeleteSubtaskMutation,
  useAddTaskWatcherMutation,
  useRemoveTaskWatcherMutation,
  useAddTaskDependencyMutation,
  useRemoveTaskDependencyMutation,
  useUploadTaskAttachmentMutation,
  useDeleteTaskAttachmentMutation,
  useAddTaskLabelMutation,
  useRemoveTaskLabelMutation,
  useGetTaskTemplatesQuery,
  useCreateTaskFromTemplateMutation,
  useSaveTaskAsTemplateMutation,
  useSearchTasksQuery,
  useGetTasksByFilterQuery,
  useGetTaskAnalyticsQuery,
  useGetMyTasksAnalyticsQuery,
  useBulkUpdateTasksMutation,
  useBulkDeleteTasksMutation,
  useBulkArchiveTasksMutation,
} = tasksApi
