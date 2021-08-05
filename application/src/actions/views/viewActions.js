import axios from 'axios';
import {
    FETCH_VIEWS_REQUEST, 
    FETCH_VIEWS_SUCCESS, 
    FETCH_VIEWS_FAILURE,
    SET_CURRENT_VIEW
} from './viewTypes';

export const fetchViewsRequest = () => {
    return {
        type: FETCH_VIEWS_REQUEST
    };
};

export const fetchViewsSuccess = fields => {
    return {
        type: FETCH_VIEWS_SUCCESS,
        payload: fields
    };
};

export const fetchViewsFailure = error => {
    return {
        type: FETCH_VIEWS_FAILURE,
        payload: error
    };
};


export const fetchViews = () => {
    return async (dispatch) => {
        dispatch(fetchViewsRequest());

        axios.get('/views')
            .then(res => {
                dispatch(fetchViewsSuccess(res.data))
                return res.data;
            })
            .catch(err => {
                dispatch(fetchViewsFailure(err.message))
            })
    }
}

export const setCurrentView = nextView => {
    return {
        type: SET_CURRENT_VIEW,
        payload: nextView
    }
}