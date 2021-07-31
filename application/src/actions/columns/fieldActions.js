import axios from 'axios';
import {
    FETCH_FIELDS_REQUEST, 
    FETCH_FIELDS_SUCCESS, 
    FETCH_FIELDS_FAILURE
} from './fieldTypes';

const fetchFieldsRequest = () => {
    return {
        type: FETCH_FIELDS_REQUEST
    };
};

const fetchFieldsSuccess = fields => {
    return {
        type: FETCH_FIELDS_SUCCESS,
        payload: fields
    };
};

const fetchFieldsFailure = error => {
    return {
        type: FETCH_FIELDS_FAILURE,
        payload: error
    };
};

export const fetchFields = () => {
    return (dispatch) => {
        dispatch(fetchFieldsRequest());
        axios.get('/columns')
            .then(res => {
                dispatch(fetchFieldsSuccess(res.data))
            })
            .catch(err => {
                dispatch(fetchFieldsFailure(err.message))
            })
    }
}