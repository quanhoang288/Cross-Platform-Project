import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigator } from './src/routers';
import { RootModal } from './src/components/common';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from './src/redux/store';
import { RootSiblingParent } from 'react-native-root-siblings';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <App />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator />
        <RootModal />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppWrapper;
