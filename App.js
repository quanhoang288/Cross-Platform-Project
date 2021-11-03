import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigator } from './src/routers';
import { RootModal } from './src/components/common';
import { useDispatch, useSelector, Provider } from 'react-redux';
import store from './src/redux/store';


const AppWrapper = () => {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
}


const App = () => {
  
  
  return (
      <SafeAreaProvider>
        <NavigationContainer>
            <StackNavigator/>            
        </NavigationContainer>
        <RootModal/>
      </SafeAreaProvider>
  );
}


export default AppWrapper;
