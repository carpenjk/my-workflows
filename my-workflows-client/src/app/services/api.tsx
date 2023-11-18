// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/`;

// initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
  baseQuery: fetchBaseQuery({
     baseUrl: baseUrl,
     credentials: "include"
    }),
    tagTypes: ['User', 'Workflow', 'Task'],
  endpoints: () => ({}),
})