// src/components/root-element.js

import { Provider } from "react-redux"
import { store } from '../state/store';


import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


const RootElement = ({ children }) => {
  return <QueryClientProvider client={queryClient}>
    <Provider store={store}>{children}</Provider>
  </QueryClientProvider>;
};

export default RootElement;
