import * as types from './actionTypes';
import * as actions from './actions';
import { combineReducers } from 'redux';

const request = (state, action) => ({ ...state, ...{ requesting: true, error: null }});

const byUsername = (state= [], action) => {
    
    return state;
}

const uiReducer = (state= { visible : false}, action) => {
    switch(action.type){
        case types.TOGGLE_USER_DIALOG:  return { ...state, visible: !state.visible };
        default: return state;
    }
}


export default combineReducers( {
    byUsername: byUsername,
    ui: uiReducer
});