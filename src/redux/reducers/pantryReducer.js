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

const batchItems = (state = [], action ) => {
    switch(action.type) {
        case 'ADD_TO_BATCH':
            return [...state, action.payload];
        case 'REMOVE_FROM_BATCH':
            return state.filter( (food, i) => {
                return action.payload !== food;
            });
        default:
            return state;
    }
}

export default combineReducers({
    pantry,
    pendingPantryItems,
    batchItems,
});