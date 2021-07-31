import axios from 'axios';
import {
    FETCH_VIEWS_REQUEST, 
    FETCH_VIEWS_SUCCESS, 
    FETCH_VIEWS_FAILURE,
    SET_CURRENT_VIEW
} from './fieldTypes';

const fetchViewsRequest = () => {
    return {
        type: FETCH_VIEWS_REQUEST
    };
};

const fetchViewsSuccess = fields => {
    return {
        type: FETCH_VIEWS_SUCCESS,
        payload: fields
    };
};

const fetchViewsFailure = error => {
    return {
        type: FETCH_VIEWS_FAILURE,
        payload: error
    };
};


export const fetchViews = () => {
    return (dispatch) => {
        dispatch(fetchViewsRequest());
        axios.get('/views')
            .then(res => {
                dispatch(fetchViewsSuccess(res.data))
            })
            .catch(err => {
                dispatch(fetchViewsFailure(err.message))
            })
    }
}

export const setCurrentView = view => {
    return {
        type: SET_CURRENT_VIEW,
        payload: view
    }
}