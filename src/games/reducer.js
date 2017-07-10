import * as types from './actionTypes';
import * as utils from './utils/board';
import { combineReducers } from 'redux';
import uuid from "uuid/v4";

/*
const initialState = {
    gamesById : {
        1 : { 
            id : 1, 
            player1: "shaun",
            player2: "shaun",
            turn: 1,
            board: [ 0, 0, 0 ,0 ,0 ,0 ,0 ,0, 0],
            status: "active",
            trail: []
        }
    }
}

const activeGamesInitialState = {
    current: 1,
    allIds: [1]
}

const allIdsInitialState = {
    allIds: [1]
}*/


const request = (state, action) => ({ ...state, ...{ requesting: true, error: null }});
const requestFailure = (state, action) => ({ ...state, ...{ requesting: false, error: action.payload.reason }});
const generalFailure = (state, action) => ({ ...state, ...{ error: action.payload.reason }});



const uiReducer = (state= { visible : false}, action) => {
    switch(action.type){
        case types.TOGGLE_CREATE_GAME_DIALOG:  return { ...state, visible: !state.visible };
        default: return state;
    }
}

const updateGameMove = (state, action) =>{
    const {payload} = action;
    const {gameId, value, index } = payload;
    
    const game = state[gameId];

    return {
        ...state,
        [gameId] : {
            ...game,
             turn : action.payload.nextPlayer,
            board: game.board.map((currentValue, index) => 
                index === action.payload.index ? value : currentValue),
            trail: [ ...game.trail, { move: index, value, player: action.payload.player } ]
        }
    }
}

const initGameBoard = (state, action) =>{
    const { payload } = action;
    const { gameId, board, player1, player2 } = payload;

    return updateGame(state, gameId, { 
        id: gameId, 
        turn: 1, 
        board: board ? board: utils.generateBoard(3), 
        trail: [], 
        active: true, 
        player1: player1, 
        player2: player2
    });
}


const updateGame = (state, gameId, updates) =>
{
    const game = state[gameId] || {};

    return {
        ...state,
        [gameId] : {
            ...game,
            ...updates
        }
    };
}

const handleGameVictory = (state, action) => {

    const { payload } = action;
    const { gameId,  user, positions } = payload;

    return updateGame(state, gameId, { active: false, status: "WIN", winner: { user, positions }});
}

const handleGameDraw = (state, action) =>{
    const { payload } = action;
    const { gameId } = payload;

    return updateGame(state, gameId, { active: false, status: "DRAW" })
}

const gamesById= (state= {}, action) => {
    switch(action.type){
        case types.EXECUTE_MOVE_SUCCESS: return updateGameMove(state, action)
        case types.CREATE_GAME: return initGameBoard(state, action)
        case types.DECLARE_GAME_VICTORY: return handleGameVictory(state, action)
        case types.DECLARE_GAME_DRAW: return handleGameDraw(state, action)
        default: return state;
    }
}

const activeGames= (state={  allIds: {}, current: null }, action) => {
    switch(action.type){
        case types.CREATE_GAME: {
            return { ...state, current: action.payload.gameId, allIds: [ ...(state.allIds || []), action.payload.gameId] }
        } 
    }
    return state;
}

const auxiliary= (state= {}, action) => {
    switch(action.type){
        case types.FETCH_GAMES_REQUEST: return request(state, action)
        case types.FETCH_GAMES_FAILURE: return requestFailure(state, action)
        case types.EXECUTE_MOVE_FAILURE: return generalFailure(state, action)
        default: return state;
    }
}  

const allGameIds = (state=[], action) => {
     switch(action.type){
        case types.CREATE_GAME: return [...state, action.payload.gameId];

        default: return state;
     }
}


export default combineReducers({
    byId: gamesById,
    allIds: allGameIds,
    auxiliary,
    activeGames,
    uiReducer 
})
