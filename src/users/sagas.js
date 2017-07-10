import { call, put, takeEvery, takeLatest, select} from 'redux-saga/effects'
import * as types from './actionTypes';
import * as actions from './actions';
import session from '../session';
import api  from '../api';

export function* createUser(action){
    const state = yield select();
    var token = session.selectors.getToken(state);

    try{
        var {username, password, domain} = action.payload;
        const response = yield call(api.client.createUser, token, username, password);
        yield put(actions.createUserSuccess(domain, username));
    }catch(error){
        let message;
        switch(error.status){
            case 500: message = "Oops. Something went wrong on the server."; break;
            case 401: message = "Invalid credentials provided."; break;
            default: message = "An unknown error occurred."
        }
        
        yield put(actions.createUserFailure(domain, message));
    }
}

export function* whenUserCreated(action){
    const state = yield select();
    yield put( actions.toggleUserDialog(false));
}



export function* usersSaga(){
    yield takeLatest(types.CREATE_USER_REQUEST, createUser);
    yield takeLatest(types.CREATE_USER_SUCCESS, whenUserCreated)
}

