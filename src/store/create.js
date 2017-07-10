import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createHashHistory } from 'history';
import rootReducer from '../rootReducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../rootSaga';
import {persistStore, autoRehydrate} from 'redux-persist'


const history = createHashHistory();

const create = (initialState) => {
    const middleware = [];
    const enhancers = [];

    middleware.push(thunk);
    const sagaMiddleware = createSagaMiddleware();
    middleware.push(sagaMiddleware);

    const logger = createLogger({
        level: 'info',
        collapsed: true
    });

    middleware.push(logger);
    
    enhancers.push(applyMiddleware(...middleware));
    enhancers.push(autoRehydrate());
    
    const enhancer = compose(...enhancers);
    const store = createStore(rootReducer, initialState, enhancer);

    sagaMiddleware.run(rootSaga);
    persistStore(store);
    return store;
}

export { create, history };
export default create;