import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { modalReducer } from "./reducers"; 



const reducers = combineReducers({
    modal: modalReducer
});

const store = createStore(reducers);

export default store;