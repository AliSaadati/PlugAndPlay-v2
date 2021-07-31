import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk'
import allReducer from '../reducers';

const store = createStore(allReducer, applyMiddleware(thunkMiddleware));

export default store;