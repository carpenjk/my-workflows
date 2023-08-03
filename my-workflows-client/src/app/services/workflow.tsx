import { api } from './api';

export interface Workflow{
  workflowID: string,
  name: string,
  description: string,
  createdAt: Date,
  completedDate: Date | null,
  duration: string,
  owner: string,
  status: string,
  updatedAt: Date
}

export const workflowApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWorkflows: builder.query<Workflow[], void>({
      query: () => ({
        url: `${process.env.REACT_APP_API_PATH}/workflow`,
        method: 'GET',
      }),
      providesTags: ['Workflow']
    }),
  })
})

export const {useGetWorkflowsQuery}  = workflowApi;