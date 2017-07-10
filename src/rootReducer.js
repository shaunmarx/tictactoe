import { combineReducers } from 'redux';
import games from './games';
import session from './session';
import users from './users';
import { routerReducer as router } from 'react-router-redux';

export default combineReducers({
    [games.constants.name]: games.reducer,
    [session.constants.name] : session.reducer,
    [users.constants.name] : users.reducer,
    router,
})
