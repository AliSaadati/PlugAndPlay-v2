import {
    FETCH_VIEWS_REQUEST, 
    FETCH_VIEWS_SUCCESS, 
    FETCH_VIEWS_FAILURE
} from '../actions/views/viewTypes';

const initialState = {
    loading: false,
    views: [],
    currentView: {},
    error: ''
}

const ViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_VIEWS_REQUEST:
            
            return {
                ...state,
                loading: true
            
        }

        case FETCH_VIEWS_SUCCESS:
            return {
                loading: false,
                views: action.payload,
                error: ''
            }

        case FETCH_VIEWS_FAILURE:
            return {
                loading: false,
                views: [],
                error: action.payload
            }

        case SET_CURRENT_VIEW:
            return {
                ...state,
                currentView: action.payload
            }
        default:
            return state;
        
    }
}

export default ViewReducer;