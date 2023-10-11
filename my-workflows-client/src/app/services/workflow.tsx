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
  taskDependencies: Task[];
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
        // dueDay: yup.string().required(),
        ownerID: yup.number().integer().required(),
      })
    ).required(),
});

export const EditWorkflowSchema = yup.object({
  workflowID: yup.number().integer().required(),
  name: yup.string().max(fieldSizes.workflow.name).required(),
  description: yup.string().max(fieldSizes.workflow.description).required(),
  ownerID: yup.number().integer().required().positive('A workflow owner must be selected.'),
  tasks: yup.array().of(
    yup.object().shape({
        taskID: yup.number().integer().positive('Invalid task.'),
        name: yup.string().max(fieldSizes.task.name).required(),
        description: yup.string().max(fieldSizes.task.description).required(),
        dependencies: yup.array().of(
          yup.number().integer().required()
        ),
        dueDay: yup.number().integer().required().positive('A due day must be selected.'),
        // dueDay: yup.string().required(),
        ownerID: yup.number().integer().required(),
      }).required()
    ).required(),
})

export type CreateWorkflowRequest = yup.InferType<typeof CreateWorkflowSchema>;
export type EditWorkflowRequest = yup.InferType<typeof EditWorkflowSchema>;


export function transformTaskOwner(task: Task){
  const {taskOwner, ...copyProps} = task;
  return({ownerID: taskOwner.userID, ...copyProps})
}

export function transformWorkflow(workflow: Workflow){
  console.log('copy workflow:', workflow.workflowID);
  const {workflowID, createdAt, updatedAt, completedDate, workflowOwner, tasks, ...copyProps} = workflow;
  return({
    ownerID: workflowOwner.userID,
    tasks: tasks.map(task=> transformTaskOwner(task)),
    ...copyProps
  })
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
    getWorkflow: builder.query<Workflow, string>({
      query: (workflow) => ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/${workflow}`,
        method: 'GET',
      }),
      transformResponse: (response: Workflow, meta,arg ) => {
        //! transform for dependencies field used by select dropdown
        return response;
      },
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