import axios from 'axios';
import {
    FETCH_VIEWS_REQUEST,
    FETCH_VIEWS_SUCCESS,
    FETCH_VIEWS_FAILURE,
    SET_CURRENT_VIEW,
    SAVE_VIEW_REQUEST,
    SAVE_VIEW_SUCCESS,
    SAVE_VIEW_FAILURE
} from './viewTypes';
import { fetchQuerys } from '../querys/queryActions';

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

        try {
            const res = await axios.get('https://wagkjuaokk.execute-api.us-west-1.amazonaws.com/prod/getviews');
            dispatch(fetchViewsSuccess(res.data));
        } catch (error) {
            dispatch(fetchViewsFailure(error.message));
        }
    }
}

export const setCurrentView = currentView => {
    return {
        type: SET_CURRENT_VIEW,
        payload: currentView
    }
}

export const saveViewRequest = () => {
    return {
        type: SAVE_VIEW_REQUEST
    };
};

const saveViewSuccess = fields => {
    return {
        type: SAVE_VIEW_SUCCESS,
        payload: fields
    };
};

const saveViewFailure = error => {
    return {
        type: SAVE_VIEW_FAILURE,
        payload: error
    };
};

export const saveView = () => {
    return async (dispatch, setState) => {

        const state = setState();

        const body = {
            view: state.views.currentView,
            columns: state.columns.columnList,
            querys: state.querys.queryList
        }

        // dispatch(saveViewRequest())

        try {
            const res = await axios.post('/save', body)
            if (state.querys.queryList.some(value => value.id < 0)) {
                dispatch(fetchQuerys(state.currentView.id));
            }

        } catch (error) {
            console.log(error)
        }
    }
}