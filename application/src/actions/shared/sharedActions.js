import { fetchFields } from '../fields/fieldActions';
import { fetchViews } from '../views/viewActions';

export const initializeState = () => {
    return (dispatch) => {
        dispatch(fetchViews()); 
        dispatch(fetchFields());
    }
}