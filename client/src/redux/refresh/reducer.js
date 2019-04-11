import {
    REGISTER_REFRESH,
    UPDATE_REFRESH,
    UNREGISTER_REFRESH
} from './actions';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case REGISTER_REFRESH:
            return Object.assign({}, state, { [action.name]: Date.now() });
        case UPDATE_REFRESH:
            return Object.assign({}, state, { [action.name]: Date.now() });
        case UNREGISTER_REFRESH:
            const newObj = Object.assign({}, state);
            delete newObj[action.name]
            return newObj
        default:
            return state;
    }
}