import React from "react"
import { Provider } from "react-redux"

import { store } from './store'

import { CssBaseline } from "@mui/material";


export default ({ element }) => {
  return <>
    <CssBaseline />
    <Provider store={store}>{element}</Provider>
  </>
}
