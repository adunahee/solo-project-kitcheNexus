import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchRecipes(action) {
    try {
        let response = yield axios.get(`/api/recipe/search/${action.payload}`);
        yield put({ type: 'SET_RECIPE_HITS', payload: response.data });
        yield put({ type: 'CLEAR_SEARCH_VALUE'});
    } catch (error) {
        console.log('Error with fetchRecipes saga:', error);
    }
}

function* recipeSaga() {
    yield takeLatest('FETCH_RECIPES', fetchRecipes);
}

export default recipeSaga;