import * as foodReducer from '../redux/reducers/foodReducer';

//destructuring foodReducers
const { searchResults, foodSearchValue,
    recipeHits, recipeSearchValue,
    recentRecipes, recipeFavorites } = foodReducer;
//tests for searchResults reducer
test('searchResults: default return state of empty array', () => {
    const action = {};
    const defaultState = searchResults(undefined, action);
    expect(Array.isArray(defaultState)).toBe(true);
    expect(defaultState.length).toBe(0);
})

test('SET_FOOD_SEARCH should receive an array and set state to it', () => {
    const action = { type: 'SET_FOOD_SEARCH', payload: ['taco', 'burrito', 'other server data'] }
    expect(searchResults(undefined, action)).toEqual(['taco', 'burrito', 'other server data']);
})

test('search results should clear on CLEAR_SUGGESTION', () => {
    const action = { type: 'CLEAR_SUGGESTIONS' }
    const clearedState = searchResults(undefined, action);
    expect(Array.isArray(clearedState)).toBe(true);
    expect(clearedState.length).toBe(0);
})

test('ignores actions', () => {
    const action = { type: 'SE_OMELE_DU_FROMAGE', payload: ['hotcarl'] }
    const ignoredState = searchResults(['a non zero array length'], action);
    expect(Array.isArray(ignoredState)).toBe(true);
    expect(ignoredState.length).toBe(1);
})

//recentRecipes reducer tests
test('default state should be an empty array', () => {
    const action = {};
    const defaultState = recentRecipes(undefined, action);
    expect(Array.isArray(defaultState)).toBe(true);
    expect(defaultState.length).toBe(0);
});

test('SET_RECENT_RECIPES should be set a new state equal to users recent recipes', () => {
    const action = {
        type: 'SET_RECENT_RECIPES', 
        payload: [
            {key: 'recipe one Name'}, 
            {key: 'recipe two Name'}, 
            {key: 'recipe three Name'}
        ]
    };
    const recentRecipeState = recentRecipes([], action);
    expect(Array.isArray(recentRecipeState)).toBe(true);
    expect(recentRecipeState.length).toBe(3);
    expect(recentRecipeState).toEqual([
        { key: 'recipe one Name' },
        { key: 'recipe two Name' },
        { key: 'recipe three Name' }
    ]);
});

test('recentRecipes should ignore actions by default and return default state', () => {
    const action = {type: 'PASTA_MASTACCIOLI', payload: [{key: "a cool new object"}]};
    const currentState = [
        { key: 'recipe one Name' },
        { key: 'recipe two Name' },
        { key: 'recipe three Name' }
    ];
    const ignoredActionState = recentRecipes(currentState, action);
    expect(ignoredActionState.length).toBe(3);
    expect(Array.isArray(ignoredActionState)).toBe(true);
    expect(ignoredActionState).toEqual(currentState);
});
