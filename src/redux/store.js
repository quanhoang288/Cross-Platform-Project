import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer, mediaReducer, modalReducer, registerReducer, uploadReducer } from "./reducers"; 



const reducers = combineReducers({
    modal: modalReducer,
    auth: authReducer,
    register: registerReducer,
    media: mediaReducer,
    upload: uploadReducer
});

const store = createStore(reducers);

export default store;