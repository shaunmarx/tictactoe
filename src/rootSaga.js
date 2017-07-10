import { all } from 'redux-saga/effects'
import games from './games';
import session from './session';
import users from './users';

export default function* rootSaga()
{
    yield all([
        session.sagas.sessionSaga(),
        games.sagas.gamesSaga(),
        users.sagas.usersSaga()
    ])
}
