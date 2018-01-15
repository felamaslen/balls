/* eslint-disable no-underscore-dangle, global-require */
import { applyMiddleware, createStore, compose } from 'redux';

import { createLogger } from 'redux-logger';

import rootReducer from '../reducers';

const SKIP_LOG_ACTIONS = (process.env.SKIP_LOG_ACTIONS || '').split('');

const logger = createLogger({
    collapsed: true,
    predicate: (getState, action) => SKIP_LOG_ACTIONS.indexOf(action.type) === -1
});

const newStore = initialState => {
    const createStoreWithMiddleware = compose(
        applyMiddleware(logger)
    )(createStore);

    const store = createStoreWithMiddleware(
        rootReducer,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
            actionsBlacklist: SKIP_LOG_ACTIONS
        })
    );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(require('../reducers').default);
        });
    }

    return store;
};

export default newStore;
