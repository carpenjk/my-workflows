import { api } from './api';
import * as yup from "yup"; 


export interface Task {
  taskID: number,
  name: string,
  description: string,
  dependencies?: number[]
  dueDay: number,
  workflowID: string,
  updatedAt: Date,
  taskOwner: {
    userID: number,
    name: string,
    email: string,
  }
}

export interface Workflow{
  workflowID: number,
  name: string,
  description: string,
  createdAt: Date,
  completedDate: Date | null,
  duration: string,
  workflowOwner: {
    userID: number,
    name: string,
    email: string,
  }
  status: string,
  updatedAt: Date,
  tasks: Task[]
}

export const fieldSizes = {
  workflow: {
    name: 30,
    description: 50,
  },
  task: {
    name: 30,
    description: 50,
    dueDay: 4,
    taskOwner: {
      name: 30
    }
  }
}

export const CreateWorkflowSchema = yup.object({
  name: yup.string().length(fieldSizes.workflow.name).required(),
  description: yup.string().length(fieldSizes.workflow.description).required(),
  ownerID: yup.number().integer().required(),
  tasks: yup.array().of(
    yup.object().shape({
        name: yup.string().length(fieldSizes.task.name).required(),
        description: yup.string().length(fieldSizes.task.description).required(),
        dependencies: yup.array().of(
          yup.number().integer().required()
        ),
        dueDay: yup.number().integer().required(),
        taskOwner: yup.object().shape({
          userID: yup.number().integer().required(),
          name: yup.string().length(fieldSizes.task.taskOwner.name), // only used to match data format. Not used sent or used by server
          email: yup.string().email()  // only used to match data format. Not used sent or used by server
        })
      })
    ).required(),
});

export const EditWorkflowSchema = yup.object({
  workflowID: yup.number().integer().required(),
  name: yup.string().length(fieldSizes.workflow.name).required(),
  description: yup.string().length(fieldSizes.workflow.description).required(),
  ownerID: yup.number().integer().required(),
  tasks: yup.array().of(
    yup.object().shape({
        taskID: yup.number().integer().required(),
        name: yup.string().length(fieldSizes.task.name).required(),
        description: yup.string().length(fieldSizes.task.description).required(),
        dependencies: yup.array().of(
          yup.number().integer().required()
        ),
        dueDay: yup.number().integer().required(),
        taskOwner: yup.object().shape({
          userID: yup.number().integer().required(),
          name: yup.string().length(30), // only used to match data format. Not used sent or used by server
          email: yup.string().email() // only used to match data format. Not used sent or used by server
        })
      }).required()
    ).required(),
})

export type CreateWorkflowRequest = yup.InferType<typeof CreateWorkflowSchema>;
export type EditWorkflowRequest = yup.InferType<typeof EditWorkflowSchema>;


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
    getWorkflow: builder.query<Workflow, string>({
      query: (workflow) => ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/${workflow}`,
        method: 'GET',
      }),
      providesTags: ['Workflow'],
    }),
    createWorkflow: builder.mutation<void , CreateWorkflowRequest>({
      query: (params)=> ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/new`,
        method: 'POST',
        body: params
      })
    }),
    editWorkflow: builder.mutation<void , EditWorkflowRequest>({
      query: (workflow)=> ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/${workflow.workflowID}`,
        method: 'PUT',
        body: workflow
      })
    })
  })
})

export const { useGetWorkflowsQuery, useCreateWorkflowMutation, useGetWorkflowQuery }  = workflowApi;