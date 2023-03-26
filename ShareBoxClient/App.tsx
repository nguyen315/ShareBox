import React from 'react';
import type {ReactNode} from 'react';
import {Provider} from 'react-redux';
import store from './app/state/store';
import RootNavigator from './app/navigation/root-navigator';

const App: () => ReactNode = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
