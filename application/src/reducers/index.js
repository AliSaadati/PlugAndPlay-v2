import fieldReducer from './fieldReducer';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    fields: fieldReducer
})

export default allReducers;