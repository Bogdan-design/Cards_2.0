import { baseApi } from '../../services/base.api'

import { CreateDeckArgs, Deck, DecksResponse, GetDecksArg } from './type'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, GetDecksArg>({
        query: args => {
          return {
            url: 'v1/decks',
            method: 'GET',
            params: args,
          }
        },
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        query: ({ name }) => {
          return {
            url: 'v1/decks',
            method: 'POST',
            body: { name },
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useCreateDeckMutation } = decksApi
