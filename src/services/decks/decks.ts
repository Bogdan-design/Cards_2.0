import {
  CreateDeckArgs,
  Deck,
  DecksResponse,
  DeleteDeckMutationResult,
  DeleteType,
  GetDecksArg,
} from './type'

import { baseApi } from '@/app/base.api'
import { RootState } from '@/app/store'

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
        query: ({ name, cover, isPrivate }) => {
          return {
            url: 'v1/decks',
            method: 'POST',
            body: { name, cover, isPrivate },
          }
        },
        onQueryStarted: async (_, { getState, dispatch, queryFulfilled }) => {
          const state = getState() as RootState
          const { searchByName, currentPage } = state.decksSlice

          try {
            const result = await queryFulfilled

            dispatch(
              decksApi.util.updateQueryData(
                'getDecks',
                { currentPage, name: searchByName },
                draft => {
                  draft?.items?.unshift(result.data)
                }
              )
            )
          } catch (e) {
            console.error(e)
          }
        },
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<DeleteDeckMutationResult, DeleteType>({
        query: ({ id }) => ({
          url: `/v1/decks/${id}`,
          method: 'DELETE',
        }),
        onQueryStarted: async ({ id }, { getState, dispatch, queryFulfilled }) => {
          const state = getState() as RootState
          const { searchByName, currentPage, itemsPerPage } = state.decksSlice
          const patchResult = dispatch(
            decksApi.util.updateQueryData(
              'getDecks',
              { currentPage, name: searchByName, itemsPerPage },
              draft => {
                draft?.items?.splice(draft?.items.findIndex(deck => deck.id === id), 1)
              }
            )
          )

          try {
            await queryFulfilled
          } catch (e) {
            patchResult.undo()
          }
        },
        invalidatesTags: ['Decks'],
      }),
      getDeckById: builder.query<Deck, string>({
        query: id => ({
          url: `/v1/decks/${id}`,
        }),
      }),
      updateDeck: builder.mutation<Deck, { id: string; name: string; isPrivate: boolean }>({
        query: ({ id, ...body }) => ({
          url: `/v1/decks/${id}`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const {
  useUpdateDeckMutation,
  useGetDecksQuery,
  useGetDeckByIdQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
} = decksApi
