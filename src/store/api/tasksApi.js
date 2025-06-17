import { api } from "./api";

// Task types for admin
export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new task (admin)
    createTask: builder.mutation({
      query: (body) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Board", "Boards"],
    }),
    // Move a task (admin)
    moveTask: builder.mutation({
      query: ({ taskId, columnId, position }) => ({
        url: `/tasks/${taskId}/move`,
        method: "POST",
        body: { columnId, position },
      }),
      invalidatesTags: ["Board", "Boards"],
    }),
    // ...other endpoints
  }),
});

export const {
  useCreateTaskMutation,
  useMoveTaskMutation,
} = tasksApi;
