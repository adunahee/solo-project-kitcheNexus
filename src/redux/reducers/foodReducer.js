import { combineReducers } from 'redux';

const searchResults = (state = [], action) => {
    switch (action.type) {
        case 'SET_FOOD_SEARCH':
            return action.payload;
        case 'CLEAR_SUGGESTIONS':
            return [];
        default:
            return state;
    }
};

const pantry = (state = [], action) => {
    switch (action.type) {
        case 'SET_PANTRY':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    searchResults,
    pantry,
});