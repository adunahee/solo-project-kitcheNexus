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

export default combineReducers({
    searchResults,
});