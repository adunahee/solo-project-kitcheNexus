import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment';

function* fetchRecipes(action) {
    try {
        let response = yield axios.get(`/api/recipe/search/${action.payload}`);
        yield put({ type: 'SET_RECIPE_HITS', payload: response.data });
        yield put({ type: 'CLEAR_SEARCH_VALUE' });
    } catch (error) {
        console.log('Error with fetchRecipes saga:', error);
    }
}

function* addRecentRecipe(action) {
    try {
        yield axios.post('/api/recipe/recent',
            {
                timeStamp: moment().format(),
                url: encodeURIComponent(action.payload)
            });
    } catch (err) {
        console.log('error adding recent recipe:', err);
    }
}

function* recipeSaga() {
    yield takeLatest('FETCH_RECIPES', fetchRecipes);
    yield takeLatest('ADD_RECENT_RECIPE', addRecentRecipe);
}

export default recipeSaga;