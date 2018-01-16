/**
 * Entry point to the web app
 */

/* eslint-disable global-require */

import 'babel-polyfill';

import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';

import store from './store';
import Root from './containers/root';

import './sass/index.scss';
import './sass/fonts.scss';
import './images/favicon.png';

const history = createHistory();

function renderApp(RootComponent = Root) {
    render(
        <AppContainer>
            <RootComponent store={store} history={history} />
        </AppContainer>,
        document.getElementById('root')
    );
}

renderApp();

if (module.hot) {
    module.hot.accept(
        './containers/root',
        () => renderApp(require('./containers/root').default)
    );
}

