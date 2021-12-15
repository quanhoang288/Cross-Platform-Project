import { createStore, combineReducers, applyMiddleware } from 'redux';
import {
  refreshReducer,
  authReducer,
  mediaReducer,
  modalReducer,
  registerReducer,
  uploadReducer,
} from './reducers';

const reducers = combineReducers({
  modal: modalReducer,
  auth: authReducer,
  register: registerReducer,
  media: mediaReducer,
  upload: uploadReducer,
  refresh: refreshReducer,
});

const store = createStore(reducers);

export default store;
