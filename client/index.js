import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import {name as appName} from './app.json';
import AppWrapper from './App'; 

AppRegistry.registerComponent(appName, () => AppWrapper);
 

