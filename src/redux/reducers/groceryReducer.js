import { combineReducers } from 'redux';

const grocery = (state = [], action) => {
    switch (action.type) {
        case 'SET_GROCERY':
            return action.payload;
        default:
            return state;
    }
}

const pendingGroceryItems = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_PENDING_GROCERY':
            return [...state, action.payload];
        case 'CLEAR_PENDING_GROCERY':
            return [];
        default:
            return state;
    }
}

const groceryListNames = (state = [], action) => {
    switch(action.type) {
        case 'SET_GROCERY_LIST_NAMES':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    grocery,
    pendingGroceryItems,
    groceryListNames,
});