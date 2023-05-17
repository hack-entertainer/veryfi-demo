import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    clientId: 'vrfGZkf0WuI4v61YTbsOEUinJ3YSrCEfffF1keo',
    userName: 'hack.entertainer',
    apiKey: '96c027d3756dcbb4614c47bf984c5d7a',
    startDate: '1900-01-01',
  },
  reducers: {
    setConfig: (state, action) => {
      state.clientId = action.payload.clientId;
      state.userName = action.payload.userName;
      state.apiKey = action.payload.apiKey;
      state.startDate = action.payload.startDate;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setConfig } = configSlice.actions
export default configSlice.reducer
