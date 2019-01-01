import { Map } from 'immutable';
import { UPDATE_USER, REMOVE_USER } from './actions';

export default function reducer(state = Map(), action) {
    switch (action.type) {
        case UPDATE_USER:
            return action.user;
        case REMOVE_USER:
            return Map();
        default:
            return state;
    }
}