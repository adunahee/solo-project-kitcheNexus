import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addToPantry(action) {
    try {
        yield axios.post(`/api/pantry`, action.payload);
        yield put({ type: 'FETCH_PANTRY' });
        yield put({ type: "CLEAR_PENDING_PANTRY" })
    } catch (err) {
        console.log('Error with addToPantry saga', err);
        yield alert('Unable to add food to pantry at this time.');
    }
}

function* removeFromPantry(action) {
    try {
        yield axios.delete(`/api/pantry/${action.payload}`)
        yield alert('Removed from pantry.');
        yield put({ type: 'FETCH_PANTRY' })
    } catch (err) {
        console.log('Error with removeFromPantry saga:', err);
        yield alert('Unable to remove from pantry.');
    }
}

function* fetchPantry() {
    try {
        const response = yield axios.get('/api/pantry');
        yield put({ type: 'SET_PANTRY', payload: response.data })
    }
    catch (err) {
        console.log('error with fetchPantry saga', err);
        yield alert('Unable to fetch pantry at this time.');
    }
}

function* pantrySaga() {
    yield takeLatest('ADD_FOOD_TO_PANTRY', addToPantry);
    yield takeEvery('FETCH_PANTRY', fetchPantry);
    yield takeLatest('REMOVE_FROM_PANTRY', removeFromPantry);
}

export default pantrySaga;