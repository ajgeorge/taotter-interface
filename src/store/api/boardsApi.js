import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
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
  tagTypes: ['Board', 'BoardColumn'],
  endpoints: (builder) => ({
    // Board Management
    getBoards: builder.query({
      query: (params = {}) => ({
        url: '/boards',
        params,
      }),
      providesTags: ['Board'],
    }),
    
    getBoardById: builder.query({
      query: (id) => `/boards/${id}`,
      providesTags: ['Board'],
    }),
    
    getMyBoards: builder.query({
      query: (params = {}) => ({
        url: '/boards/my-boards',
        params,
      }),
      providesTags: ['Board'],
    }),
    
    createBoard: builder.mutation({
      query: (boardData) => ({
        url: '/boards',
        method: 'POST',
        body: boardData,
      }),
      invalidatesTags: ['Board'],
    }),
    
    updateBoard: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/boards/${id}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['Board'],
    }),
    
    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board'],
    }),
    
    archiveBoard: builder.mutation({
      query: (id) => ({
        url: `/boards/${id}/archive`,
        method: 'POST',
      }),
      invalidatesTags: ['Board'],
    }),
    
    restoreBoard: builder.mutation({
      query: (id) => ({
        url: `/boards/${id}/restore`,
        method: 'POST',
      }),
      invalidatesTags: ['Board'],
    }),
    
    // Column Management
    addBoardColumn: builder.mutation({
      query: ({ boardId, column }) => ({
        url: `/boards/${boardId}/columns`,
        method: 'POST',
        body: column,
      }),
      invalidatesTags: ['Board', 'BoardColumn'],
    }),
    
    updateBoardColumn: builder.mutation({
      query: ({ boardId, columnId, ...updateData }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['Board', 'BoardColumn'],
    }),
    
    deleteBoardColumn: builder.mutation({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board', 'BoardColumn'],
    }),
    
    reorderBoardColumns: builder.mutation({
      query: ({ boardId, columnOrder }) => ({
        url: `/boards/${boardId}/columns/reorder`,
        method: 'PUT',
        body: { columnOrder },
      }),
      invalidatesTags: ['Board', 'BoardColumn'],
    }),
    
    // Board Templates
    getBoardTemplates: builder.query({
      query: () => '/boards/templates',
      providesTags: ['Board'],
    }),
    
    createBoardFromTemplate: builder.mutation({
      query: ({ templateId, boardData }) => ({
        url: `/boards/from-template/${templateId}`,
        method: 'POST',
        body: boardData,
      }),
      invalidatesTags: ['Board'],
    }),
    
    saveBoardAsTemplate: builder.mutation({
      query: ({ boardId, templateData }) => ({
        url: `/boards/${boardId}/save-as-template`,
        method: 'POST',
        body: templateData,
      }),
      invalidatesTags: ['Board'],
    }),
    
    // Board Permissions
    getBoardPermissions: builder.query({
      query: (boardId) => `/boards/${boardId}/permissions`,
      providesTags: ['Board'],
    }),
    
    updateBoardPermissions: builder.mutation({
      query: ({ boardId, permissions }) => ({
        url: `/boards/${boardId}/permissions`,
        method: 'PUT',
        body: { permissions },
      }),
      invalidatesTags: ['Board'],
    }),
    
    addBoardMember: builder.mutation({
      query: ({ boardId, userId, role }) => ({
        url: `/boards/${boardId}/members`,
        method: 'POST',
        body: { userId, role },
      }),
      invalidatesTags: ['Board'],
    }),
    
    removeBoardMember: builder.mutation({
      query: ({ boardId, userId }) => ({
        url: `/boards/${boardId}/members/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board'],
    }),
    
    updateBoardMemberRole: builder.mutation({
      query: ({ boardId, userId, role }) => ({
        url: `/boards/${boardId}/members/${userId}/role`,
        method: 'PUT',
        body: { role },
      }),
      invalidatesTags: ['Board'],
    }),
    
    // Board Analytics
    getBoardAnalytics: builder.query({
      query: ({ boardId, period = '30d' }) => ({
        url: `/boards/${boardId}/analytics`,
        params: { period },
      }),
    }),
    
    getBoardTasksOverview: builder.query({
      query: (boardId) => `/boards/${boardId}/tasks-overview`,
      providesTags: ['Board'],
    }),
    
    getBoardTeamPerformance: builder.query({
      query: ({ boardId, period = '30d' }) => ({
        url: `/boards/${boardId}/team-performance`,
        params: { period },
      }),
    }),
    
    // Board Activity
    getBoardActivity: builder.query({
      query: ({ boardId, limit = 50, offset = 0 }) => ({
        url: `/boards/${boardId}/activity`,
        params: { limit, offset },
      }),
    }),
    
    // Board Export/Import
    exportBoard: builder.mutation({
      query: ({ boardId, format = 'json' }) => ({
        url: `/boards/${boardId}/export`,
        method: 'POST',
        body: { format },
      }),
    }),
    
    importBoard: builder.mutation({
      query: ({ file, boardName }) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('boardName', boardName)
        
        return {
          url: '/boards/import',
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['Board'],
    }),
    
    // Board Search
    searchBoards: builder.query({
      query: (searchParams) => ({
        url: '/boards/search',
        params: searchParams,
      }),
    }),
    
    // Board Favorites
    toggleBoardFavorite: builder.mutation({
      query: (boardId) => ({
        url: `/boards/${boardId}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['Board'],
    }),
    
    getFavoriteBoards: builder.query({
      query: () => '/boards/favorites',
      providesTags: ['Board'],
    }),
  }),
})

export const {
  useGetBoardsQuery,
  useGetBoardByIdQuery,
  useGetMyBoardsQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useArchiveBoardMutation,
  useRestoreBoardMutation,
  useAddBoardColumnMutation,
  useUpdateBoardColumnMutation,
  useDeleteBoardColumnMutation,
  useReorderBoardColumnsMutation,
  useGetBoardTemplatesQuery,
  useCreateBoardFromTemplateMutation,
  useSaveBoardAsTemplateMutation,
  useGetBoardPermissionsQuery,
  useUpdateBoardPermissionsMutation,
  useAddBoardMemberMutation,
  useRemoveBoardMemberMutation,
  useUpdateBoardMemberRoleMutation,
  useGetBoardAnalyticsQuery,
  useGetBoardTasksOverviewQuery,
  useGetBoardTeamPerformanceQuery,
  useGetBoardActivityQuery,
  useExportBoardMutation,
  useImportBoardMutation,
  useSearchBoardsQuery,
  useToggleBoardFavoriteMutation,
  useGetFavoriteBoardsQuery,
} = boardsApi
