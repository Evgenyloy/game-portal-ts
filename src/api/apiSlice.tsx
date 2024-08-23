import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGame, IGamesList, INews } from '../types/types';

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
    getOneGame: builder.query<IGame, string>({
      query: (id) => ({
        url: `/game?id=${id}`,
        method: 'GET',
      }),
    }),
    getFilteredGames: builder.query<IGamesList, IFilteredGamesArgs>({
      query: ({ platform, category, sort }) => ({
        url: `/games?platform=${platform}&category=${category}&sort-by=${sort}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetNewsListQuery,
  useGetMmoGamesQuery,
  useGetCategoryQuery,
  useGetOneGameQuery,
  useGetFilteredGamesQuery,
} = apiSlice;

interface IFilteredGamesArgs {
  platform: string;
  category: string;
  sort: string;
}
