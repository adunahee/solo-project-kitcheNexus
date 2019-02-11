import { combineReducers } from 'redux';

const searchResults = (state = [], action) => {
    switch (action.type) {
        case 'SET_FOOD_SEARCH':
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    searchResults,
});