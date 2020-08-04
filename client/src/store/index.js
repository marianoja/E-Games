import {createStore, applyMiddleware} from 'redux';
import mainReducer from './reducers/main';
import thunk from 'redux-thunk';

export default createStore(
    mainReducer,
    applyMiddleware(thunk)
    );