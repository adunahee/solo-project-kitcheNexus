import { combineReducers } from 'redux';

const pantry = (state = [], action) => {
    switch (action.type) {
        case 'SET_PANTRY':
            return action.payload;
        default:
            return state;
    }
}

const pendingPantryItems = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_PENDING_PANTRY':
            return [...state, action.payload];
        case 'CLEAR_PENDING_PANTRY':
            return [];
        default:
            return state;
    }
}

export default combineReducers({
    pantry,
    pendingPantryItems,
});