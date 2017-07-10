import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import * as selectors from './selectors';
import * as types from './actionTypes';
import * as actions from './actions';
import session from '../session';
import api  from '../api';
import * as utils from './utils/board';
import uuid from 'uuid/v4';

export function* fetchGames(action){
    try{
        const state = yield select();
        var token = session.selectors.getToken(state);
        var { player } = action.payload;
        
        if(token === null || player === null){
            yield put(actions.requestGamesFailed("unknown", "Action did not include player detail or no token could be retrieved from store."));
            return;
        }

        let response = yield call(api.client.getGames, token, player);
        yield put(actions.requestGamesSuccess(player, response));

    }catch(e){
        yield put(actions.requestGamesFailed(player, e.message))
    }
}

export function* executeMove(action){
    const state = yield select();
    let { gameId, index, player } = action.payload; 

    try{
        var games = selectors.getGamesById(state);
        var game = games[gameId];
        var user = session.selectors.getCurrentUser(state);
        var userValue = game.turn;
        var nextPlayer = game.turn === 1 ? 2 : 1;
        
        var playerName = game.turn === 1 ? game.player1 : game.player2;

        if(!game.active)
        {
            yield put(actions.failMove(gameId, "This game has finished."));
            return;   
        }
        
        if(player !== playerName){
            yield put(actions.failMove(gameId, "Not your turn!"));
            return;
        }

        var board = game.board;
        if(board[index] !== 0){
            yield put(actions.failMove(gameId, "This positon is already taken."))
            return;
        }

        yield put(actions.moveSuccess(gameId, user.username, index, userValue, nextPlayer ));

    }catch(e){
        yield put(actions.failMove(gameId, e.message));
    }
}

export function* checkGame(action){
    
    const state = yield select();
    try{
        let { gameId } = action.payload; 

        var games = selectors.getGamesById(state);
        var game = games[gameId];
        var trail = game.trail;
        
        if(trail.length === game.board.length){
            yield put(actions.declareDraw(gameId));
            return;
        }

        var lastMove = trail[trail.length -1];
        var result = utils.checkMoveVictory(game.board, lastMove.move);

        if(result){
            
            yield put(actions.declareGameVictory(gameId, result.counts.player1 === 3 ? game.player1 : game.player2, result.positions));
        }
        
    }catch(e){

    }
}


export function* requestPracticeGame(action){
    const state = yield select();
    var user = session.selectors.getCurrentUser(state);

    try{
        var id = uuid();
        yield put(actions.createGame(id, utils.generateBoard(3), user.username, user.username));

    }catch(error){
    }

}




export function* gamesSaga(){
   yield takeLatest(types.FETCH_GAMES_REQUEST, fetchGames);
   yield takeEvery(types.EXECUTE_MOVE_REQUEST, executeMove);
   yield takeEvery(types.EXECUTE_MOVE_SUCCESS, checkGame);
   yield takeLatest(types.REQUEST_PRACTICE_GAME, requestPracticeGame)
}

