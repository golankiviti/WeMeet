import {
    Map
} from 'immutable';
import {
    UPDATE_USER,
    REMOVE_USER,
    CREATE_USER
} from './actions';

export default function reducer(state = Map(), action) {
    switch (action.type) {
        case UPDATE_USER:
            return action.user;
        case REMOVE_USER:
            return Map();
        case CREATE_USER:
            return state.set('user', action.user);
        default:
            return state;
    }
}