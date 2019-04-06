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
        // console.log(action.payload.groceries);
        yield axios.post(`/api/grocery/${action.payload.listName}`, action.payload.groceries);
        yield alert('Grocery list updated.');
        // these could be replaced with a single action "AFTER_ADD" and another case added to each reducer 
        yield put({ type: 'FETCH_GROCERY' });
        yield put({ type: `CLEAR_PENDING_GROCERY` });
        yield put({ type: 'CLEAR_BATCH_ITEMS' });
        yield put({ type: 'CLEAR_BATCH_ACTION' });
    } catch (err) {
        console.log('error in addToList saga:', err);
        yield alert('Unable to add to grocery list at this time.');
    }
}

function* createGroceryList(action) {
    try {
        yield axios.post(`/api/grocery/new-list/${action.payload}`);
        yield put({ type: 'FETCH_LIST_NAMES' })
    } catch (err) {
        console.log('error in createGroceryList saga:', err);
        yield alert('Unable to create new grocery list at this time.')
    }
}

function* fetchListNames() {
    try {
        const response = yield axios.get('/api/grocery/list/names');
        yield put({ type: 'SET_GROCERY_LIST_NAMES', payload: response.data });
    } catch (err) {
        console.log('error in fetchListNames:', err);
        yield alert('Unable to fetch grocery list names at this time.');
    }
}

function* deleteList(action) {
    try {
        yield axios.delete(`/api/grocery/list/${action.payload}`);
        yield put({ type: "FETCH_LIST_NAMES" });
    } catch (e) {
        console.log('error in deleteList saga:', e);
        yield alert('Unable to delete list at this time.');
    }
}

function* deleteGroceryItem(action) {
    try {
        const p = action.payload;
        yield axios.delete(`/api/grocery/item/${p.grocery_list_id}/${p.id}`);
        yield put({ type: 'FETCH_GROCERY' });
    } catch (e) {
        console.log('error in deleteGroceryItem saga:', e);
        yield alert('Unable to delete grocery item at this time.');
    }
}

function* grocerySaga() {
    yield takeEvery('FETCH_GROCERY', fetchGrocery);
    yield takeLatest('ADD_FOOD_TO_GROCERY', addToList);
    yield takeLatest('CREATE_NEW_GROCERY_LIST', createGroceryList);
    yield takeLatest('FETCH_LIST_NAMES', fetchListNames);
    yield takeLatest('DELETE_LIST', deleteList);
    yield takeLatest('DELETE_GROCERY_ITEM', deleteGroceryItem);
}



export default grocerySaga;