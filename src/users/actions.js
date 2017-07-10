import * as types from "./actionTypes";

export const toggleUserDialog = (visible) => ({
    type: types.TOGGLE_USER_DIALOG,
    payload: { visible }
});

export const createUser = (domain, username, password) => ({
    type: types.CREATE_USER_REQUEST,
    payload: { domain, username, password }
});

export const createUserSuccess = (domain, username) => ({
    type: types.CREATE_USER_SUCCESS,
    payload: { domain, username  }
})

export const createUserFailure = (domain, username, reason) => ({
    type: types.CREATE_USER_FAILURE,
    payload: { domain, username, reason  }
})