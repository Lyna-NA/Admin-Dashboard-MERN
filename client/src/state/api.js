// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  tagTypes: ['User', 'Products', 'Customers', 'Transactions'],
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => `general/user/${id}`,
      providesTags: ['User'],
    }),
    getProducts: builder.query({
      query: () => 'client/products',
      providesTags: ['Products'],
    }),
    getCustomers: builder.query({
      query: () => 'client/customers',
      providesTags: ['Customers'],
    }),
    getTransactions: builder.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: 'client/transactions',
        method: 'GET',
        params: { page, pageSize, sort, search },
      }),
      providesTags: ['Transactions'],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserByIdQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery
} = api;
