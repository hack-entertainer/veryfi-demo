import React from "react"
import { Provider } from "react-redux"

import { store } from './store'

import { CssBaseline } from "@mui/material";

//react query
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

export default ({ element }) => {
  return <>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{element}</Provider>
    </QueryClientProvider>
  </>
}
