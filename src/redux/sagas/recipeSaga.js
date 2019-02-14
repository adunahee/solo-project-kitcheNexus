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

function* fetchRecentRecipes() {
    try{
        const response = yield axios.get('/recipe/recent');
        yield put({type: 'SET_RECENT_RECIPES', payload: response.data});
    } catch(err) {
        console.log('Error with fetchRecentRecipes:', err);
        
    }
}

function* addRecentRecipe(action) {
    try {
        yield axios.post('/recipe/recent',
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
    yield takeLatest('FETCH_RECENT_RECIPES', fetchRecentRecipes);
}

export default recipeSaga;