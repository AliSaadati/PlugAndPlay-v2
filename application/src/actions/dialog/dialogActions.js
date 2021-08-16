import axios from 'axios';
import {
    CLOSE_DIALOG, 
    OPEN_DIALOG, 
    SAVE_DIALOG
} from './dialogTypes';

const openDialog = ({helperText, value}) => {
    return {
        type: OPEN_DIALOG,
        payload: {
            open: true,
            helperText,
            value
        }
    };
};

const closeDialog = () => {
    return {
        type: CLOSE_DIALOG
    };
};

const saveDialog = (saveType = "new") => {

    if (saveType === "new") {
        
    }
    return {
        type: FETCH_COLUMNS_FAILURE,
        payload: error
    };
};

export const fetchColumns = currentViewId => {
    return (dispatch) => {
        dispatch(fetchColumnsRequest());
        axios.get(`/columns/${currentViewId}`)
            .then(res => {
                dispatch(fetchColumnsSuccess(res.data))
            })
            .catch(err => {
                dispatch(fetchColumnsFailure(err.message))
            })
    }
}

export const setColumns = columnList => {
    return {
        type: SET_COLUMNS,
        payload: columnList
    }
}