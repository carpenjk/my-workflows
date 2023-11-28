import { api } from './api';
import { yup } from 'features/validation';

export const DependenciesSchema = yup.object({
  workflowID: yup.number().integer().required(),
  taskID: yup.number().integer().positive('Invalid task.').required(),
  dependencies: yup.array().of(
    yup.string().integer()
  ),
}).required();

export const BulkDependenciesSchema = yup.object({tasks: yup.array().of(DependenciesSchema).required()}).required();

export type TaskDependenciesRequest = yup.InferType<typeof DependenciesSchema>;
export type TasksDependenciesRequest = yup.InferType<typeof BulkDependenciesSchema>;

export const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createDependencies: builder.mutation<void , TaskDependenciesRequest | TasksDependenciesRequest>({
      query: (params)=> ({
        url: `${process.env.REACT_APP_API_PATH}/dependencies`,
        method: 'POST',
        body: params
      }),
      invalidatesTags: ['Dependencies'],
    }),
    UpdateDependencies: builder.mutation<void , TaskDependenciesRequest | TasksDependenciesRequest>({
      query: (params)=> ({
        url: `${process.env.REACT_APP_API_PATH}/dependencies`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['Dependencies'],
    }),
    deleteDependencies: builder.mutation<void, {workflowID: number, taskID: number}>({
      query: (params)=> ({
        url: `${process.env.REACT_APP_API_PATH}/dependencies/`,
        method: 'DELETE',
        body: params
      }),
      invalidatesTags: ['Dependencies'],
    })
  })
})

export const { useCreateDependenciesMutation, useUpdateDependenciesMutation, useDeleteDependenciesMutation }  = taskApi;