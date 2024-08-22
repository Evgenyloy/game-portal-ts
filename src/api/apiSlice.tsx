import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGamesList, INews } from '../types/types';
import { url } from 'inspector';

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
    getNewsList: builder.query<INews[], void>({
      query: () => ({
        url: '/latestnews',
        method: 'GET',
      }),
    }),
    getMmoGames: builder.query<IGamesList[], void>({
      query: () => ({
        url: '/games?category=mmorpg',
        method: 'GET',
      }),
    }),
    getCategory: builder.query<IGamesList[], string>({
      query: (category) => ({
        url: `/games?category=${category}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetNewsListQuery, useGetMmoGamesQuery, useGetCategoryQuery } =
  apiSlice;
