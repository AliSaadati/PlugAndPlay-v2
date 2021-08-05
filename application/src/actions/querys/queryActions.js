import axios from 'axios';
import {
    FETCH_QUERYS_REQUEST, 
    FETCH_QUERYS_SUCCESS, 
    FETCH_QUERYS_FAILURE
} from './queryTypes';

const fetchQuerysRequest = () => {
    return {
        type: FETCH_QUERYS_REQUEST
    };
};

const fetchQuerysSuccess = querys => {
    return {
        type: FETCH_QUERYS_SUCCESS,
        payload: querys
    };
};

const fetchQuerysFailure = error => {
    return {
        type: FETCH_QUERYS_FAILURE,
        payload: error
    };
};

export const fetchQuerys = () => {
    return (dispatch) => {
        dispatch(fetchQuerysRequest());
        axios.get('/columns')
            .then(res => {
                dispatch(fetchQuerysSuccess(res.data))
            })
            .catch(err => {
                dispatch(fetchQuerysFailure(err.message))
            })
    }
}