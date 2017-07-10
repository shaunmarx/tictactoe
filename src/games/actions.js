import * as types from "./actionTypes";


export const createGame = (gameId, board, player1, player2) => ({
    type: types.CREATE_GAME,
    payload: {
        gameId,
        board,
        player1,
        player2
    }
});

export const requestPracticeGame = () => ({
    type: types.REQUEST_PRACTICE_GAME
});


export const requestPlayerTurn = (gameId, player) => ({
    type: types.PLAYER_TURN_REQUEST,
    payload: {  gameId, player }
});

export const failPlayerTurnRequest = (gameId, reason) => ({
    type: types.PLAYER_TURN_FAILURE,
    payload: {  gameId, reason }
});

export const requestMove = (gameId, player, index) => ({
    type: types.EXECUTE_MOVE_REQUEST,
    payload: {  gameId, player, index }
});

export const moveSuccess = (gameId, player, index, value, nextPlayer) => ({
    type: types.EXECUTE_MOVE_SUCCESS,
    payload: { gameId, player, index, value, nextPlayer }
})

export const failMove = (gameId, reason) => ({
    type: types.EXECUTE_MOVE_FAILURE,
    payload: { gameId, reason }
});

export const declareDraw = (gameId) => ({
    type: types.DECLARE_GAME_DRAW,
    payload: { gameId }
});

export const declareGameVictory = (gameId, user, positions) => ({
    type: types.DECLARE_GAME_VICTORY,
    payload: { gameId, user, positions }
})

export const requestGames = (player) => ({
    type: types.FETCH_GAMES_REQUEST,
    payload :{ player }
});

export const requestGamesFailed = ( player, reason) => ({
    type: types.FETCH_GAMES_FAILURE,
    payload :{ player, reason }
});

export const requestGamesSuccess = (player, result) => ({
    type: types.FETCH_GAMES_SUCCESS,
    payload :{ player, result }
});

export const endGame = ( type, victor) => ({
    type: types.END_GAME,
    payload: { type, victor }
});