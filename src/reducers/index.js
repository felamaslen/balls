import { createReducer } from 'redux-create-reducer';

import {
    SOMETHING_SAID
} from '../constants/actions';

// import all your reducer functions here
// the reducers are what carry out application logic, and they are
// all pure functions of the immutable application state (which is global)
import {
    saySomething
} from './app.reducer';

import initialReduction from '../reduction';

function createReducerObject(array) {
    return array.reduce((last, item) => {
        last[item[0]] = (reduction, action) => item[1](reduction, action.payload);

        return last;
    }, {});
}

const reducers = createReducerObject([
    [SOMETHING_SAID, saySomething]
]);

export default createReducer(initialReduction, reducers);

