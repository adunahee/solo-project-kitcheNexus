import * as foodReducer from '../redux/reducers/foodReducer';

const searchResults = foodReducer.searchResults;
//tests for searchResults reducer
test('should return default state of empty array', ()=>{
    const action = {};
    const defaultState = searchResults(undefined, action);
    expect(Array.isArray(defaultState)).toBe(true);
    expect(defaultState.length).toBe(0);
})

test('SET_FOOD_SEARCH should receive an array and set state to it', () => {
    const action ={type: 'SET_FOOD_SEARCH', payload: ['taco', 'burrito', 'other server data']}
    expect(searchResults(undefined, action)).toEqual(['taco', 'burrito', 'other server data']);
})

test('search results should clear on CLEAR_SUGGESTION', ()=> {
    const action = {type: 'CLEAR_SUGGESTIONS'}
    const clearedState = searchResults(undefined, action);
    expect(Array.isArray(clearedState)).toBe(true);
    expect(clearedState.length).toBe(0);
})

test('ignores actions', ()=> {
    const action = {type: 'SE_OMELE_DU_FROMAGE', payload: ['hotcarl']}
    const ignoredState = searchResults(['a non zero array length'], action);
    expect(Array.isArray(ignoredState)).toBe(true);
    expect(ignoredState.length).toBe(1);
})

//other food reducer tests