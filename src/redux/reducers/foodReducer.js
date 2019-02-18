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

const foodSearchValue = (state = '', action) => {
    switch(action.type) {
        case 'SET_VALUE':
            return action.payload;
        case 'CLEAR_VALUE':
            return '';
        default:
            return state;
    }
}

const recipeHits = ( state = [], action) => {
    switch(action.type) {
        case 'SET_RECIPE_HITS':
            return action.payload;
        case 'CLEAR_RECIPE_HITS':
            return [];
        default:
            return state;
    }
}

const recipeSearchValue = (state = '', action ) => {
    switch(action.type) {
        case 'RECIPE_SEARCH_VALUE':
            return action.payload;
        case 'CLEAR_SEARCH_VALUE':
            return '';
        default:
            return state;
    }
}

const recentRecipes = (state = [], action) => {
    switch(action.type) {
        case 'SET_RECENT_RECIPES':
            return action.payload;
        default:
            return state;
    }
}

const recipeFavorites = (state=[], action) => {
    switch(action.type) {
        case 'SET_FAVORITES':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    searchResults,
    foodSearchValue,
    recipeHits,
    recipeSearchValue,
    recentRecipes,
    recipeFavorites
});