import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as types from './actionTypes';
import * as actions from './actions';
import api  from '../api';

export function* fetchToken(action){
    try{
        var {username, password, domain} = action.payload;

        const response = yield call(api.client.requestToken, username, password);
        yield put(actions.tokenSuccess(domain, response.username, response.access_token, response.role ));
    }catch(error){
        let message;
        switch(error.status){
            case 500: message = "Oops. Something went wrong on the server."; break;
            case 401: message = "Invalid credentials provided."; break;
            default: message = "An unknown error occurred."
        }
        
        yield put(actions.tokenFailure(domain, message));
    }
}


export function* sessionSaga(){
    yield takeLatest(types.TOKEN_REQUEST, fetchToken);

}

