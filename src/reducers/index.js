import { createReducer } from 'redux-create-reducer';

import * as actions from '../constants/actions';

import * as app from './app.reducer';

import initialState from '../initialState';

function createReducerObject(array) {
    return array.reduce((last, [type, reducer]) => ({
        ...last,
        [type]: (state, action) => reducer(state, action)
    }), {});
}

const reducers = createReducerObject([
    [actions.SOMETHING_SAID, app.saySomething]
]);

export default createReducer(initialState, reducers);

