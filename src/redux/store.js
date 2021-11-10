import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer, modalReducer, registerReducer } from "./reducers"; 



const reducers = combineReducers({
    modal: modalReducer,
    auth: authReducer,
    register: registerReducer,
});

const store = createStore(reducers);

export default store;