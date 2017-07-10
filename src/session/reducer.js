import * as types from './actionTypes';
import * as actions from './actions';
import { combineReducers } from 'redux';

const request = (state, action) => ({ ...state, ...{ requesting: true, error: null }});

const userReducer = (state={}, action) => {
    switch(action.type){
         case types.TOKEN_SUCCESS: return { ...state,  ...{ username: action.payload.username, role: action.payload.role } };
         case types.LOGOUT_REQUEST: return { ...state, ...{ username: null, role: null } };
         default: return state;
    }
}

const initialCurrentSesion = {
    domain: null,
    token: null,
    authenticated: false
};

const currentSessionReducer = (state=initialCurrentSesion, action) => {
     
     switch(action.type){
        case types.TOKEN_REQUEST: 
            return request(state, action);

        case types.LOGOUT_REQUEST:
            return initialCurrentSesion;

        case types.TOKEN_FAILURE: {
            return { ...state, ...{ error : action.payload.reason} }
        }
        case types.TOKEN_SUCCESS: {
            return  { ...state, ...{ token : action.payload.token, authenticated: true, requesting: true, error: null, domain: action.payload.domain }  };
        }
        default : return state;
    }
}

export default combineReducers( {
    current: currentSessionReducer,
    user: userReducer
});