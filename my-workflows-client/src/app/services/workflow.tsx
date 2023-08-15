import { api } from './api';


export interface Task {
  taskID: string,
  name: string,
  description: string,
  dueDay: number,
  workflowID: string,
  updatedAt: Date,
  taskOwner: {
    userID: string,
    name: string,
    email: string,
  }
}

export interface Workflow{
  workflowID: string,
  name: string,
  description: string,
  createdAt: Date,
  completedDate: Date | null,
  duration: string,
  workflowOwner: {
    userID: string,
    name: string,
    email: string,
  }
  status: string,
  updatedAt: Date,
  tasks: Task[]
}

export const workflowApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWorkflows: builder.query<Workflow[], {limit: number} | void>({
      query: (params) => ({
        url: `${process.env.REACT_APP_API_PATH}/workflow`,
        method: 'GET',
        params: params ? { ...params } : undefined,
      }),
      providesTags: ['Workflow'],
    }),
    createWorkflow: builder.mutation<void , Workflow>({
      query: (params)=> ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/new`,
        method: 'POST',
        body: params
      })
    })
  })
})

export const { useGetWorkflowsQuery, useCreateWorkflowMutation }  = workflowApi;