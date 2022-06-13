import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk"
import haedal from './modules/haedal';
import comment from './modules/comment';
import {createBrowserHistory} from"history";

export const history = createBrowserHistory();

const middlewares = [thunk]

const rootReducer = combineReducers({haedal, comment});

const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;