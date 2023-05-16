// src/components/root-element.js

import { Provider } from "react-redux"
import { store } from '../state/store';


import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from "./layout";

const queryClient = new QueryClient();


const RootElement = ({ children }) => {
  return <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Layout>
        {children}
      </Layout>
    </Provider>
  </QueryClientProvider>;
};

export default RootElement;
