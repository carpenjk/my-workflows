import {api} from './api';

export interface User {
  userID: string,
  name: string,
  email: string
}

export const workflowApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: `${process.env.REACT_APP_API_PATH}/user`,
        method: 'GET',
      })
    })
  })
})

export const { useGetUsersQuery } = workflowApi;