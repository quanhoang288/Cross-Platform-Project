import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigator } from './src/routers';

const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
      <SafeAreaProvider>
        <NavigationContainer>
            <StackNavigator/>
        </NavigationContainer>
      </SafeAreaProvider>
  );
}


export default App;
