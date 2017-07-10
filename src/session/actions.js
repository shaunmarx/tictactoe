import * as types from "./actionTypes";

export const requestToken = (domain, username, password) => ({
    type : types.TOKEN_REQUEST,
    payload: {
        domain,
        username,
        password
    }
});

export const tokenSuccess = (domain, username, token, role) => ({
    type: types.TOKEN_SUCCESS,
    payload: {
        domain,
        username,
        token,
        role
    }
});

export const tokenFailure = (domain, reason) => ({
    type: types.TOKEN_FAILURE,
    payload: {
        reason
    }
});


export const logout = () => ({
    type: types.LOGOUT_REQUEST
})