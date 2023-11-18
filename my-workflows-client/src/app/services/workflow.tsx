import { createEntityAdapter } from '@reduxjs/toolkit';
import { api } from './api';
import * as yup from "yup"; 
import { Task } from './task';


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
});

export const EditWorkflowSchema = yup.object({
  workflowID: yup.number().integer().required(),
  name: yup.string().max(fieldSizes.workflow.name).required(),
  description: yup.string().max(fieldSizes.workflow.description).required(),
  ownerID: yup.number().integer().required().positive('A workflow owner must be selected.'),
})

export type CreateWorkflowRequest = yup.InferType<typeof CreateWorkflowSchema>;
export type EditWorkflowRequest = yup.InferType<typeof EditWorkflowSchema>;


export function transformTaskOwner(task: Task){
  const {taskOwner, ...copyProps} = task;
  return({ownerID: taskOwner.userID, ...copyProps})
}

export const workflowAdapter = createEntityAdapter<Workflow>({
  selectId: (workFlow) => workFlow.workflowID,
  // sortComparer: (a, b) => a.title.localeCompare(b.title),
})

export function transformWorkflow(workflow: Workflow){
  console.log('copy workflow:', workflow.workflowID);
  const {workflowID, createdAt, updatedAt, completedDate, workflowOwner, tasks, ...copyProps} = workflow;
  return({
    ownerID: workflowOwner.userID,
    tasks: tasks.map(task=> transformTaskOwner(task)),
    ...copyProps
  })
}

export function withDependencies(task: Task): Task{
  // no dependencies
  if(task.taskDependencies?.length < 1) return task;
  return ({...task, dependencies: task.taskDependencies.map(dependencies=> dependencies.taskID.toString())})
}

export const workflowApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWorkflows: builder.query<Workflow[], {limit: number} | void>({
      query: (params) => ({
        url: `${process.env.REACT_APP_API_PATH}/workflow`,
        method: 'GET',
        params: params ? { ...params } : undefined,
        transformResponse: (data: Workflow[]) => (data.map(
          workflow => ({
            ...workflow,
            tasks: workflow.tasks.map(task=> withDependencies(task))
          })
        ))
      }),
      providesTags: ['Workflow'],
      
    }),
    getWorkflow: builder.query<Workflow, string>({
      query: (workflow) => ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/${workflow}`,
        method: 'GET',
      }),
      transformResponse: (data: Workflow) => ({
          ...data,
          tasks: data.tasks.map(task=> withDependencies(task))
      }),
      providesTags: ['Workflow'],
    }),
    createWorkflow: builder.mutation<number , CreateWorkflowRequest>({
      query: (params)=> ({
        url: `${process.env.REACT_APP_API_PATH}/workflow`,
        method: 'POST',
        body: params
      }),
      invalidatesTags: ['Workflow'],
    }),
    editWorkflow: builder.mutation<void , EditWorkflowRequest>({
      query: (workflow)=> ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/${workflow.workflowID}`,
        method: 'PUT',
        body: workflow,
      }),
      invalidatesTags: ['Workflow'],
    }),
    deleteWorkflow: builder.mutation<void, number>({
      query: (workflowID)=> ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/${workflowID}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Workflow'],
    })
  })
})

export const { useGetWorkflowsQuery, useCreateWorkflowMutation, useEditWorkflowMutation, useDeleteWorkflowMutation, useGetWorkflowQuery }  = workflowApi;