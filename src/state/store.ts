import { configureStore } from '@reduxjs/toolkit';
import configSliceReducer from './slices/configSlice';

export const store = configureStore({
  reducer: {
    config: configSliceReducer
  },
})
