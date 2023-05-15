import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    clientId: null,
    userName: null,
    apiKey: null
  },
  reducers: {
    setConfig: (state, action) => {
      state.clientId = action.payload.clientId;
      state.userName = action.payload.userName;
      state.apiKey = action.payload.apiKey;
    }
  }, 
})

// Action creators are generated for each case reducer function
export const { setConfig } = configSlice.actions
export default configSlice.reducer
