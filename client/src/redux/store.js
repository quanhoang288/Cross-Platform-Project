import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer, mediaReducer, modalReducer, registerReducer, uploadReducer } from "./reducers"; 
import thunk from "redux-thunk";


const reducers = combineReducers({
    modal: modalReducer,
    auth: authReducer,
    register: registerReducer,
    media: mediaReducer,
    upload: uploadReducer
});

const store = createStore(
    reducers
    // applyMiddleware(thunk)
);

export default store;