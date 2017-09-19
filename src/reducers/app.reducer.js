/**
 * Reducers for the index page
 *
 * Each reducer is a pure function of the reduction, which is an ImmutableJS Record
 * containing the state of the entire app
 */

export function saySomething(appState, message = 'Clicked!') {
    return appState
        .set('message', message);
}

