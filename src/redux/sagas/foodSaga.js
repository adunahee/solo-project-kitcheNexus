import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
    try {
        let response = yield axios.get(`/api/food/${action.payload}`);
        yield put({ type: 'SET_FOOD_SEARCH', payload: response.data });
    } catch (error) {
        console.log('Error with food saga:', error);
    }
}

function* foodSaga() {
    yield takeLatest('FETCH_FOODS', registerUser);
}

export default foodSaga;