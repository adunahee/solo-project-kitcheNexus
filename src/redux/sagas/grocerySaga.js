import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchGrocery() {
    try {
        const response = yield axios.get('/api/grocery/groceries');
        yield put({ type: 'SET_GROCERY', payload: response.data })
    }
    catch (err) {
        console.log('error in fetchGrocery saga:', err);
        yield alert('Unable to fetch grocery list at this time.');
    }
}

function* addToList(action) {
    try {
        yield axios.post(`/api/grocery`, action.payload);
        yield put({ type: 'FETCH_GROCERY' })
    } catch (err) {
        console.log('error in addToList saga:', err);
        yield alert('Unable to add to grocery list at this time.');
    }
}

function* grocerySaga() {
    yield takeEvery('FETCH_GROCERY', fetchGrocery);
    yield takeLatest('ADD_FOOD_TO_GROCERY', addToList);
}

export default grocerySaga;