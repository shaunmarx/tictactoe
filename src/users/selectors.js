import { name } from './constants';


export const getUsersState = state => state[name];
export const getUiState = state => getUsersState(state).ui;
export const getCreateDialogVisible= state => getUiState(state).visible;