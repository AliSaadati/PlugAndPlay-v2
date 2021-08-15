import {
    FETCH_VIEWS_REQUEST, 
    FETCH_VIEWS_SUCCESS, 
    FETCH_VIEWS_FAILURE,
    SET_CURRENT_VIEW
} from '../actions/views/viewTypes';

const initialState = {
    loading: true,
    viewList: [],
    currentView: {id: 1, name: "default", type: "default"},
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
                ...state,
                loading: false,
                viewList: action.payload,
                error: ''
            }

        case FETCH_VIEWS_FAILURE:
            return {
                ...state,
                loading: false,
                viewList: [],
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