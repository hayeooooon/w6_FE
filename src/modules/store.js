import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk"
import haedal from './modules/redux/haedal';
import comment from './modules/redux/comment';
import {createBrowserHistory} from"history";

export const history = createBrowserHistory();

const middlewares = [thunk]

const rootReducer = combineReducers({haedal, comment});

const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;