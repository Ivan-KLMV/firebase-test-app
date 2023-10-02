import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = 'AIzaSyCQFdnibRCPcBR8NFLGYgpELQvbgHNeJcs'; // Замініть це на свій API ключ Firebase

export const userFirebaseApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://identitytoolkit.googleapis.com/v1/accounts',
  }),
  endpoints: builder => ({
    signUp: builder.mutation({
      query: ({ email, password }) => ({
        url: `:signInWithPassword?key=${apiKey}`,
        method: 'POST',
        body: { email, password, returnSecureToken: true },
      }),
    }),
  }),
});

export const { useSignUpMutation } = userFirebaseApi;
