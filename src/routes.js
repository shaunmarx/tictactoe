import React from 'react';
import { Switch, Route } from 'react-router';
import GamesPage from './games/containers/GamesPage';
import LoginPage from './session/containers/LoginPage';

export default () => (
    <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={ GamesPage } />
    </Switch>
);