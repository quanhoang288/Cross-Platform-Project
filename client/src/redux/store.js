import { createStore, combineReducers, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import {
  refreshReducer,
  authReducer,
  chatReducer,
  mediaReducer,
  modalReducer,
  registerReducer,
  uploadReducer,
} from './reducers';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const reducers = combineReducers({
  modal: modalReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  chat: chatReducer,
  register: registerReducer,
  media: mediaReducer,
  upload: uploadReducer,
  refresh: refreshReducer,
});

const store = createStore(reducers);

export const persistor = persistStore(store);
export default store;
