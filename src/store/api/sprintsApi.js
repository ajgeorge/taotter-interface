import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sprintsApi = createApi({
  reducerPath: 'sprintsApi',
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
  tagTypes: ['Sprint', 'SprintPackage', 'SprintMeeting'],
  endpoints: (builder) => ({
    // Sprint Management
    getSprints: builder.query({
      query: (params = {}) => ({
        url: '/sprints',
        params,
      }),
      providesTags: ['Sprint'],
    }),
    
    getSprintById: builder.query({
      query: (id) => `/sprints/${id}`,
      providesTags: ['Sprint'],
    }),
    
    getMySprint: builder.query({
      query: () => '/sprints/my-sprint',
      providesTags: ['Sprint'],
    }),
    
    createSprint: builder.mutation({
      query: (sprintData) => ({
        url: '/sprints',
        method: 'POST',
        body: sprintData,
      }),
      invalidatesTags: ['Sprint'],
    }),
    
    updateSprint: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/sprints/${id}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['Sprint'],
    }),
    
    updateSprintStatus: builder.mutation({
      query: ({ id, status, notes }) => ({
        url: `/sprints/${id}/status`,
        method: 'PUT',
        body: { status, notes },
      }),
      invalidatesTags: ['Sprint'],
    }),
    
    // Package Selection
    getSprintPackages: builder.query({
      query: () => '/sprints/packages',
      providesTags: ['SprintPackage'],
    }),
    
    selectPackage: builder.mutation({
      query: ({ sprintId, packageId, customizations }) => ({
        url: `/sprints/${sprintId}/select-package`,
        method: 'POST',
        body: { packageId, customizations },
      }),
      invalidatesTags: ['Sprint'],
    }),
    
    updatePackageCustomizations: builder.mutation({
      query: ({ sprintId, customizations }) => ({
        url: `/sprints/${sprintId}/package-customizations`,
        method: 'PUT',
        body: { customizations },
      }),
      invalidatesTags: ['Sprint'],
    }),
    
    // Document Management
    uploadSprintDocuments: builder.mutation({
      query: ({ sprintId, files, documentType }) => {
        const formData = new FormData()
        files.forEach(file => formData.append('documents', file))
        formData.append('documentType', documentType)
        
        return {
          url: `/sprints/${sprintId}/documents`,
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['Sprint'],
    }),
    
    deleteSprintDocument: builder.mutation({
      query: ({ sprintId, documentId }) => ({
        url: `/sprints/${sprintId}/documents/${documentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Sprint'],
    }),
    
    approveSprintDocuments: builder.mutation({
      query: ({ sprintId, documentIds, notes }) => ({
        url: `/sprints/${sprintId}/documents/approve`,
        method: 'POST',
        body: { documentIds, notes },
      }),
      invalidatesTags: ['Sprint'],
    }),
    
    // Meeting Management
    getAvailableTimeSlots: builder.query({
      query: ({ sprintId, date }) => ({
        url: `/sprints/${sprintId}/available-slots`,
        params: { date },
      }),
    }),
    
    scheduleMeeting: builder.mutation({
      query: ({ sprintId, timeSlot, meetingType, agenda }) => ({
        url: `/sprints/${sprintId}/schedule-meeting`,
        method: 'POST',
        body: { timeSlot, meetingType, agenda },
      }),
      invalidatesTags: ['Sprint', 'SprintMeeting'],
    }),
    
    updateMeeting: builder.mutation({
      query: ({ sprintId, meetingId, ...updateData }) => ({
        url: `/sprints/${sprintId}/meetings/${meetingId}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['Sprint', 'SprintMeeting'],
    }),
    
    cancelMeeting: builder.mutation({
      query: ({ sprintId, meetingId, reason }) => ({
        url: `/sprints/${sprintId}/meetings/${meetingId}/cancel`,
        method: 'POST',
        body: { reason },
      }),
      invalidatesTags: ['Sprint', 'SprintMeeting'],
    }),
    
    // Progress Tracking
    updateSprintProgress: builder.mutation({
      query: ({ sprintId, milestone, progress, notes }) => ({
        url: `/sprints/${sprintId}/progress`,
        method: 'PUT',
        body: { milestone, progress, notes },
      }),
      invalidatesTags: ['Sprint'],
    }),
    
    addSprintMilestone: builder.mutation({
      query: ({ sprintId, milestone }) => ({
        url: `/sprints/${sprintId}/milestones`,
        method: 'POST',
        body: milestone,
      }),
      invalidatesTags: ['Sprint'],
    }),
    
    updateSprintMilestone: builder.mutation({
      query: ({ sprintId, milestoneId, ...updateData }) => ({
        url: `/sprints/${sprintId}/milestones/${milestoneId}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['Sprint'],
    }),
    
    // Team Assignment
    assignTeamToSprint: builder.mutation({
      query: ({ sprintId, teamMembers, teamLead }) => ({
        url: `/sprints/${sprintId}/assign-team`,
        method: 'POST',
        body: { teamMembers, teamLead },
      }),
      invalidatesTags: ['Sprint'],
    }),
    
    updateTeamAssignment: builder.mutation({
      query: ({ sprintId, teamMembers, teamLead }) => ({
        url: `/sprints/${sprintId}/team`,
        method: 'PUT',
        body: { teamMembers, teamLead },
      }),
      invalidatesTags: ['Sprint'],
    }),
    
    // Client Feedback
    addClientFeedback: builder.mutation({
      query: ({ sprintId, feedback }) => ({
        url: `/sprints/${sprintId}/feedback`,
        method: 'POST',
        body: feedback,
      }),
      invalidatesTags: ['Sprint'],
    }),
    
    respondToFeedback: builder.mutation({
      query: ({ sprintId, feedbackId, response }) => ({
        url: `/sprints/${sprintId}/feedback/${feedbackId}/respond`,
        method: 'POST',
        body: { response },
      }),
      invalidatesTags: ['Sprint'],
    }),
    
    // Completion & Delivery
    markSprintComplete: builder.mutation({
      query: ({ sprintId, deliverables, notes }) => ({
        url: `/sprints/${sprintId}/complete`,
        method: 'POST',
        body: { deliverables, notes },
      }),
      invalidatesTags: ['Sprint'],
    }),
    
    uploadDeliverables: builder.mutation({
      query: ({ sprintId, files, description }) => {
        const formData = new FormData()
        files.forEach(file => formData.append('deliverables', file))
        formData.append('description', description)
        
        return {
          url: `/sprints/${sprintId}/deliverables`,
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['Sprint'],
    }),
    
    // Analytics
    getSprintAnalytics: builder.query({
      query: (params = {}) => ({
        url: '/sprints/analytics',
        params,
      }),
    }),
  }),
})

export const {
  useGetSprintsQuery,
  useGetSprintByIdQuery,
  useGetMySprintQuery,
  useCreateSprintMutation,
  useUpdateSprintMutation,
  useUpdateSprintStatusMutation,
  useGetSprintPackagesQuery,
  useSelectPackageMutation,
  useUpdatePackageCustomizationsMutation,
  useUploadSprintDocumentsMutation,
  useDeleteSprintDocumentMutation,
  useApproveSprintDocumentsMutation,
  useGetAvailableTimeSlotsQuery,
  useScheduleMeetingMutation,
  useUpdateMeetingMutation,
  useCancelMeetingMutation,
  useUpdateSprintProgressMutation,
  useAddSprintMilestoneMutation,
  useUpdateSprintMilestoneMutation,
  useAssignTeamToSprintMutation,
  useUpdateTeamAssignmentMutation,
  useAddClientFeedbackMutation,
  useRespondToFeedbackMutation,
  useMarkSprintCompleteMutation,
  useUploadDeliverablesMutation,
  useGetSprintAnalyticsQuery,
} = sprintsApi
