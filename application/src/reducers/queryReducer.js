import {
    FETCH_QUERYS_REQUEST, 
    FETCH_QUERYS_SUCCESS, 
    FETCH_QUERYS_FAILURE
} from '../actions/querys/queryTypes';

const initialState = {
    loading: true,
    queryList: [],
    error: ''
}

const QueryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_QUERYS_REQUEST:
            
            return {
                ...state,
                loading: true
            
        }

        case FETCH_QUERYS_SUCCESS:
            return {
                loading: false,
                queryList: action.payload,
                error: ''
            }

        case FETCH_QUERYS_FAILURE:
            return {
                loading: false,
                queryList: [],
                error: action.payload
            }

        default:
            return state;
    }
}

export default QueryReducer;