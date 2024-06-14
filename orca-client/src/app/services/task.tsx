import { api } from './api';
import { yup } from 'features/validation';

export interface Task {
  taskID: number,
  name: string,
  description: string,
  dependencies?: string[],
  dueDay: number,
  workflowID: number,
  updatedAt: Date,
  createdAt: Date,
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
  name: yup.string().max(fieldSizes.task.name),
  description: yup.string().max(fieldSizes.task.description),
  dependencies: yup.array().of(
    yup.string().integer()
  ),
  dueDay: yup.number().integer().positive('A due day must be selected.'),
  ownerID: yup.number().integer(),
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

export function withDependencies(task: Task): Task{
  // no dependencies
  if(task.taskDependencies?.length < 1) return task;
  return ({...task, dependencies: task.taskDependencies.map(dependencies=> dependencies.taskID.toString())})
}

export const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query< Task[], string>({
      query: (workflowID) => ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/${workflowID}/task`,
        method: 'GET',
      }),
      transformResponse: (data: Task[]) => data ? data.map((task) => withDependencies(task)) : [],
      providesTags: ['Task'],
    }),
    createTask: builder.mutation<Task[] , NewTaskRequest>({
      query: (params)=> ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/${params.workflowID}/task`,
        method: 'POST',
        body: params
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation<number , EditTaskRequest>({
      query: (params)=> ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/${params.workflowID}/task/${params.taskID}`,
        method: 'PATCH',
        body: params
      }),
      invalidatesTags: ['Task'],
    }),
    saveTasks: builder.mutation<Task[] ,  {workflowID: number} & NewTasksRequest>({
      query: (params)=> ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/${params.workflowID}/task`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTasks: builder.mutation<void, {workflowID: number, taskID: number[]}>({
      query: (params)=> ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/${params.workflowID}/task/`,
        method: 'DELETE',
        body: params
      }),
      invalidatesTags: ['Task'],
    })
  })
})

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useSaveTasksMutation, useDeleteTasksMutation }  = taskApi;