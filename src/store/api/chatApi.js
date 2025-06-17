import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chatApi = createApi({
  reducerPath: 'chatApi',
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
  tagTypes: ['Chat', 'Message'],
  endpoints: (builder) => ({
    startChat: builder.mutation({
      query: ({ startupId }) => ({
        url: '/chat/start',
        method: 'POST',
        body: { startupId }
      }),
      invalidatesTags: ['Chat'],
    }),
    getChatList: builder.query({
      query: () => '/chat/list',
      providesTags: ['Chat'],
    }),
    getMessages: builder.query({
      query: (chatId) => `/chat/${chatId}/messages`,
      providesTags: (result, error, chatId) => [{ type: 'Message', id: chatId }],
    }),
    sendMessage: builder.mutation({
      query: ({ chatId, content, file }) => {
        if (file) {
          const formData = new FormData()
          formData.append('file', file)
          if (content) formData.append('content', content)
          return {
            url: `/chat/${chatId}/message`,
            method: 'POST',
            body: formData,
          }
        }
        return {
          url: `/chat/${chatId}/message`,
          method: 'POST',
          body: { content },
        }
      },
      invalidatesTags: (result, error, { chatId }) => [{ type: 'Message', id: chatId }],
    }),
  }),
})

export const {
  useStartChatMutation,
  useGetChatListQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApi
