import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from './../base-qury-with-reauth.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks'],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
