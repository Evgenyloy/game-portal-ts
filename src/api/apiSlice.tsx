import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mmo-games.p.rapidapi.com',
    method: 'GET',
    headers: {
      'x-rapidapi-key': '91b58b67a8msh2bd4b616724fea5p1339a3jsn28cd7698ccec',
      'x-rapidapi-host': 'mmo-games.p.rapidapi.com',
    },
  }),
  endpoints: (builder) => ({
    getNewsList: builder.query({
      query: () => ({
        url: '/latestnews',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetNewsListQuery } = apiSlice;
