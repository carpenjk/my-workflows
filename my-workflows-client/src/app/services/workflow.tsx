import { api } from './api';
import * as yup from "yup"; 


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

export const CreateWorkflowSchema = yup.object({
  name: yup.string().length(50).required(),
  description: yup.string().length(60).required(),
  ownerID: yup.number().integer().required(),
  tasks: yup.array().of(
    yup.object().shape({
        name: yup.string().length(50).required(),
        description: yup.string().length(60).required(),
        dueDay: yup.number().integer().required(),
        taskOwner: yup.number().integer().required()
      })
    ).required(),
})

export type CreateWorkflowRequest = yup.InferType<typeof CreateWorkflowSchema>;


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
    createWorkflow: builder.mutation<void , CreateWorkflowRequest>({
      query: (params)=> ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/new`,
        method: 'POST',
        body: params
      })
    })
  })
})

export const { useGetWorkflowsQuery, useCreateWorkflowMutation }  = workflowApi;