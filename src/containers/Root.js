import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';

export default function Root({ store, history }) {
  return (
    <MuiThemeProvider theme= {createMuiTheme()}>
        <Provider store={store}>
        <ConnectedRouter history={history}>
            <Routes />
        </ConnectedRouter>
        </Provider>
    </MuiThemeProvider>
  );
}