import buildAction from './actionBuilder';
import { SOMETHING_SAID } from '../constants/actions';

export function somethingSaid(message) {
    return dispatch => {
        setTimeout(() => {
            dispatch(buildAction(SOMETHING_SAID, 'Hello. Click the button!'));
        }, 1000);

        return dispatch(buildAction(SOMETHING_SAID, message));
    };
}

