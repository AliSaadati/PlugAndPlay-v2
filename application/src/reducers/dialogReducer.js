import {
    OPEN_DIALOG,
    SAVE_DIALOG,
    CLOSE_DIALOG
} from '../actions/dialog/dialogTypes';

const initialState = {
    open: false,
    title: "",
    value: {name:"", type: "default"}
}

const DialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DIALOG:
            return {
                open: true,
                title: action.payload.title,
                value: {name: action.payload.value.name, type: action.payload.value.type}
        }

        case CLOSE_DIALOG:
            return {
                open: false,
                title: "",
                value: {name: "", type: ""}
            }

        // case SAVE_DIALOG:
        //     return {
        //         loading: false,
        //         columnList: [],
        //         error: action.payload
        //     }
        default:
            return state;
    }
}

export default DialogReducer;