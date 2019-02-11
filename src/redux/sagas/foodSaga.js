import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchFoods(action) {
    try {
        let response = yield axios.get(`/api/food/${action.payload}`);
        yield put({ type: 'SET_FOOD_SEARCH', payload: response.data });
    } catch (error) {
        console.log('Error with fetchFoods saga:', error);
    }
}

function* addToPantry(action) {
    try{
        yield axios.post(`/api/food/${action.payload}`);
        yield put({type: 'FETCH_PANTRY'});
    } catch(err) {
        console.log('Error with addToPantry saga', err);
        yield alert('Unable to add food to pantry at this time.');
    }
}

function* fetchPantry() {
    try{
        const response = yield axios.get('/api/pantry');
        yield put({type: 'SET_PANTRY', payload: response.data})
    }
    catch(err){
        console.log('error with fetchPantry saga', err);
        yield alert('Unable to fetch pantry at this time.');
    }
}

function* foodSaga() {
    yield takeLatest('FETCH_FOODS', fetchFoods);
    yield takeLatest('ADD_FOOD_TO_PANTRY', addToPantry);
    yield takeLatest('FETCH_PANTRY', fetchPantry);
}

export default foodSaga;