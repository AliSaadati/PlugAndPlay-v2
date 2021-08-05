import fieldReducer from './fieldReducer';
import viewReducer from './viewReducer';
import {combineReducers} from 'redux';
import columnReducer from './columnReducer';
import queryReducer from './queryReducer';

const allReducers = combineReducers({
    fields: fieldReducer,
    views: viewReducer,
    columns: columnReducer,
    querys: queryReducer,

})

export default allReducers;