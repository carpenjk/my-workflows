import { createEntityAdapter } from '@reduxjs/toolkit';
import { api } from './api';
import * as yup from "yup";


export interface Task {
  taskID: number,
  name: string,
  description: string,
  dependencies?: string[],
  dueDay: number,
  workflowID: number,
  updatedAt: Date,
  taskDependencies: Task[];
  taskOwner: {
    userID: number,
    name: string,
    email: string,
  }
}

export const fieldSizes = {
  task: {
    name: 30,
    description: 50,
    dueDay: 4,
    taskOwner: {
      name: 30
    }
  }
}

export const EditTaskSchema = yup.object({
  workflowID: yup.number().integer().required(),
  taskID: yup.number().integer().positive('Invalid task.').required(),
  name: yup.string().max(fieldSizes.task.name).required(),
  description: yup.string().max(fieldSizes.task.description).required(),
  dependencies: yup.array().of(
    yup.string().integer()
  ),
  dueDay: yup.number().integer().required().positive('A due day must be selected.'),
  // dueDay: yup.string().required(),
  ownerID: yup.number().integer().required(),
}).required();

export const NewTaskSchema = yup.object({
  workflowID: yup.number().integer().required(),
  taskID: yup.number().integer().positive('Invalid task.'),
  name: yup.string().max(fieldSizes.task.name).required(),
  description: yup.string().max(fieldSizes.task.description).required(),
  dependencies: yup.array().of(
    yup.string().integer().required()
  ),
  dueDay: yup.number().integer().required().positive('A due day must be selected.'),
  // dueDay: yup.string().required(),
  ownerID: yup.number().integer().required(),
}).required();

export const EditTasksSchema = yup.object({tasks: yup.array().of(EditTaskSchema).required()}).required();
export const NewTasksSchema = yup.object({tasks: yup.array().of(NewTaskSchema).required()}).required();

export type EditTaskRequest = yup.InferType<typeof EditTaskSchema>;
export type EditTasksRequest = yup.InferType<typeof EditTasksSchema>;
export type NewTaskRequest = yup.InferType<typeof NewTaskSchema>;
export type NewTasksRequest = yup.InferType<typeof NewTasksSchema>;


export function transformTaskOwner(task: Task){
  const {taskOwner, ...copyProps} = task;
  return({ownerID: taskOwner.userID, ...copyProps})
}

export const taskAdapter = createEntityAdapter<Task>({
  selectId: (task) => task.taskID,
  // sortComparer: (a, b) => a.title.localeCompare(b.title),
})

export const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], {limit: number} | void>({
      query: (params) => ({
        url: `${process.env.REACT_APP_API_PATH}/workflow`,
        method: 'GET',
        params: params ? { ...params } : undefined,
      }),
      providesTags: ['Task'],
    }),
    // getTask: builder.query<Task, {workflowID: string, taskID: string }>({
    //   query: (workflow) => ({
    //     url: `${process.env.REACT_APP_API_PATH}/workflow/${workflow}`,
    //     method: 'GET',
    //   }),
    //   transformResponse: (response: Workflow, meta,arg ) => {
    //     //! transform for dependencies field used by select dropdown
    //     return response;
    //   },
    //   providesTags: ['Workflow'],
    // }),
    createTask: builder.mutation<Task[] , NewTaskRequest | NewTasksRequest>({
      query: (params)=> ({
        url: `${process.env.REACT_APP_API_PATH}/workflow`,
        method: 'POST',
        body: params
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation<number , EditTaskRequest | EditTasksRequest>({
      query: (params)=> ({
        url: `${process.env.REACT_APP_API_PATH}/workflow`,
        method: 'POST',
        body: params
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation<void, number>({
      query: (taskID)=> ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/${taskID}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Task'],
    })
  })
})

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation }  = taskApi;