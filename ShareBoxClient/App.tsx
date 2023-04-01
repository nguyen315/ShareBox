import React from 'react';
import type {ReactNode} from 'react';
import {Provider} from 'react-redux';
import store from './app/state/store';
import RootNavigator from './app/navigation/root-navigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: () => ReactNode = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
