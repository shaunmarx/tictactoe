import { createSelector } from 'reselect';
import { name } from './constants';

export const getSessionState = state => state[name];
export const getCurrentSession = state => getSessionState(state).current;
export const getCurrentUser = state => getSessionState(state).user;

export const isAuthenticated = createSelector(getCurrentSession, (sessionState) => {
    return sessionState.authenticated 
});

export const getCurrentDomain = createSelector(getCurrentSession, (sessionState) => sessionState.domain);
export const getCurrentUserRole = state => {
    var user = getCurrentUser(state);
    return user === null ? null : user.role;
}

export const getToken = createSelector(getCurrentSession, (sessionState) => sessionState.token);