import { api } from './api';
import { yup } from 'features/validation';

export const DependenciesSchema = yup.object({
  taskID: yup.number().integer().positive('Invalid task.').required(),
  dependencies: yup.string().integer().required(),
}).required();

export const BulkDependenciesSchema = yup.object({tasks: yup.array().of(DependenciesSchema).required()}).required();

export type TaskDependenciesRequest = yup.InferType<typeof DependenciesSchema>;
export type TasksDependenciesRequest = yup.InferType<typeof BulkDependenciesSchema>;



export const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createDependencies: builder.mutation<void , {workflowID: number, depencies: TaskDependenciesRequest | TaskDependenciesRequest[]}>({
      query: (params)=> ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/${params.workflowID}/dependencies`,
        method: 'POST',
        body: params
      }),
      invalidatesTags: ['Dependencies'],
    }),
    updateDependencies: builder.mutation<void , ({workflowID: number, dependencies: TaskDependenciesRequest | TaskDependenciesRequest[]})>({
      query: (params)=> ({
        url: `${process.env.REACT_APP_API_PATH}/workflow/${params.workflowID}/dependencies`,
        method: 'PUT',
        body: params.dependencies
      }),
      invalidatesTags: ['Dependencies'],
    }),
    deleteDependencies: builder.mutation<void, {workflowID: number, taskID: number, dependencies: number}>({
      query: (params)=> ({
        url: `${process.env.REACT_APP_API_PATH}/dependencies`,
        method: 'DELETE',
        body: params
      }),
      invalidatesTags: ['Dependencies'],
    })
  })
})

export const { useCreateDependenciesMutation, useUpdateDependenciesMutation, useDeleteDependenciesMutation }  = taskApi;