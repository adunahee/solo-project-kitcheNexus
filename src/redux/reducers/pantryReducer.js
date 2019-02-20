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
        case 'REMOVE_PENDING_PANTRY_ITEM':
            return state.filter( (c, i) => { return i !== action.payload });
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
        case 'CLEAR_BATCH_ITEMS':
            return [];
        default:
            return state;
    }
}

const batchAction = (state = '', action) => {
    switch(action.type) {
        case 'SET_ACTION':
            return action.payload;
        case 'CLEAR_BATCH_ACTION':
            return '';
        default:
            return state;
    }
}

export default combineReducers({
    pantry,
    pendingPantryItems,
    batchItems,
    batchAction
});