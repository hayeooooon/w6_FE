import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from '../modules/redux/user';
import haedal from '../modules/redux/haedal';
import comment from '../modules/redux/comment';
import {createBrowserHistory} from 'history';

const customHistory = createBrowserHistory();
const rootReducer = combineReducers({user, haedal, comment});
const enhancer = applyMiddleware(
  thunk.withExtraArgument({ history: customHistory }),
)
const store = createStore(rootReducer, enhancer)

export default store;