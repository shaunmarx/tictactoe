import { createSelector } from 'reselect';
import {  props, prop } from 'ramda';
import { name } from './constants';

export const getGamesState = state => state[name];
export const getGamesById = createSelector(getGamesState, (gameState) => gameState.byId);
export const getGameIds = createSelector(getGamesState, (gameState) => gameState.allIds);
export const getAuxiliarySlice = createSelector(getGamesState, (gameState) => gameState.auxiliary);
export const getActiveGamesSlice = createSelector(getGamesState, (gameState) => gameState.activeGames);

export const getCurrentActiveGame = (state) => {
    const gameState = getGamesState(state)
    const { byId : gamesById, activeGames } = gameState;
    return activeGames.current === null ? null : prop(activeGames.current, gamesById);
};

export const getActiveGames = (state) => {
    const gameState = getGamesState(state)
    const { byId : gamesById, activeGames } = gameState;
    
   // var { byId : activeGamesById = {} } = getActiveGamesSlice(state);

    return props(activeGames.allIds, gamesById);
};

