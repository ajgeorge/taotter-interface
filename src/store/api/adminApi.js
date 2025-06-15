import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminApi = createApi({
  reducerPath: 'adminApi',
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
  tagTypes: ['Admin', 'AdminProfile', 'StartupManagement'],
  endpoints: (builder) => ({
    // Profile Management
    getAdminProfile: builder.query({
      query: () => '/admin/auth/profile',
      providesTags: ['AdminProfile'],
    }),
    
    updateAdminProfile: builder.mutation({
      query: (profileData) => ({
        url: '/admin/auth/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['AdminProfile'],
    }),
    
    // Password Management
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/admin/auth/change-password',
        method: 'PUT',
        body: passwordData,
      }),
    }),
    
    // User Management (Super Admin only)
    getAdmins: builder.query({
      query: (params = {}) => ({
        url: '/admin/auth/users',
        params,
      }),
      providesTags: ['Admin'],
    }),
    
    createAdmin: builder.mutation({
      query: (adminData) => ({
        url: '/admin/auth/create-admin',
        method: 'POST',
        body: adminData,
      }),
      invalidatesTags: ['Admin'],
    }),
    
    updateAdmin: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/admin/auth/users/${id}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['Admin'],
    }),
    
    deactivateAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/auth/users/${id}/deactivate`,
        method: 'PUT',
      }),
      invalidatesTags: ['Admin'],
    }),
    
    reactivateAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/auth/users/${id}/reactivate`,
        method: 'PUT',
      }),
      invalidatesTags: ['Admin'],
    }),
    
    // Startup Management
    getStartups: builder.query({
      query: (params = {}) => ({
        url: '/admin/startups',
        params,
      }),
      providesTags: ['StartupManagement'],
    }),
    
    getStartupDetails: builder.query({
      query: (id) => `/admin/startups/${id}`,
      providesTags: ['StartupManagement'],
    }),
    
    updateStartupStatus: builder.mutation({
      query: ({ id, status, notes }) => ({
        url: `/admin/startups/${id}/status`,
        method: 'PUT',
        body: { status, notes },
      }),
      invalidatesTags: ['StartupManagement'],
    }),
    
    // Dashboard Data
    getAdminDashboard: builder.query({
      query: () => '/admin/dashboard',
      providesTags: ['Admin'],
    }),
    
    // Team Management
    getTeamMembers: builder.query({
      query: (params = {}) => ({
        url: '/admin/team',
        params,
      }),
      providesTags: ['Admin'],
    }),
    
    updateTeamMemberRole: builder.mutation({
      query: ({ id, role, permissions }) => ({
        url: `/admin/team/${id}/role`,
        method: 'PUT',
        body: { role, permissions },
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
})

export const {
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useChangePasswordMutation,
  useGetAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeactivateAdminMutation,
  useReactivateAdminMutation,
  useGetStartupsQuery,
  useGetStartupDetailsQuery,
  useUpdateStartupStatusMutation,
  useGetAdminDashboardQuery,
  useGetTeamMembersQuery,
  useUpdateTeamMemberRoleMutation,
} = adminApi

// Export aliases for store.js compatibility
export const useGetAdminUsersQuery = useGetAdminsQuery
export const useCreateAdminUserMutation = useCreateAdminMutation
export const useUpdateAdminUserMutation = useUpdateAdminMutation
export const useDeleteAdminUserMutation = useDeactivateAdminMutation
export const useGetSystemSettingsQuery = () => {
  throw new Error('useGetSystemSettingsQuery not implemented')
}
export const useUpdateSystemSettingsMutation = () => {
  throw new Error('useUpdateSystemSettingsMutation not implemented')
}
export const useGetAuditLogsQuery = () => {
  throw new Error('useGetAuditLogsQuery not implemented')
}
export const useGetSystemStatsQuery = () => {
  throw new Error('useGetSystemStatsQuery not implemented')
}
export const useBackupSystemMutation = () => {
  throw new Error('useBackupSystemMutation not implemented')
}
export const useRestoreSystemMutation = () => {
  throw new Error('useRestoreSystemMutation not implemented')
}
