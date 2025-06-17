import { api } from "./api";

export const boardsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all boards (admin)
    getBoards: builder.query({
      query: (params) => ({
        url: "/boards",
        params,
      }),
      providesTags: ["Boards"],
    }),
    // Get a single board with tasks (admin or startup)
    getBoard: builder.query({
      query: (id) => `/boards/${id}`,
      providesTags: (result, error, id) => [{ type: "Board", id }],
    }),
    // Get board by sprint ID (admin)
    getBoardBySprint: builder.query({
      query: (sprintId) => `/boards/by-sprint/${sprintId}`,
      providesTags: (result, error, sprintId) => [{ type: "Board", id: `sprint-${sprintId}` }],
    }),
    // Get board by sprint ID (startup, readonly)
    getStartupBoardBySprint: builder.query({
      query: (sprintId) => `/boards/startup/by-sprint/${sprintId}`,
      providesTags: (result, error, sprintId) => [{ type: "Board", id: `startup-sprint-${sprintId}` }],
    }),
    // Create a board (admin)
    createBoard: builder.mutation({
      query: (body) => ({
        url: "/boards",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Boards"],
    }),
    // Update a board (admin)
    updateBoard: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/boards/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Boards",
        { type: "Board", id },
      ],
    }),
    // Delete (archive) a board (admin)
    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `/boards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Boards"],
    }),
    // Add column to board (admin)
    addColumn: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/boards/${id}/columns`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Boards",
        { type: "Board", id },
      ],
    }),
    // Update column (admin)
    updateColumn: builder.mutation({
      query: ({ id, columnId, ...body }) => ({
        url: `/boards/${id}/columns/${columnId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Boards",
        { type: "Board", id },
      ],
    }),
    // Delete column (admin)
    deleteColumn: builder.mutation({
      query: ({ id, columnId }) => ({
        url: `/boards/${id}/columns/${columnId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        "Boards",
        { type: "Board", id },
      ],
    }),
    // Get board analytics (admin)
    getBoardAnalytics: builder.query({
      query: (id) => `/boards/${id}/analytics`,
      providesTags: (result, error, id) => [{ type: "Board", id }],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useGetBoardQuery,
  useGetBoardBySprintQuery,
  useGetStartupBoardBySprintQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useAddColumnMutation,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
  useGetBoardAnalyticsQuery,
} = boardsApi;
