import {
    UPDATE_USER,
    REMOVE_USER
} from './actions';

export const updateUser = user => ({
    type: UPDATE_USER,
    user
});

export const removeUser = () => ({
    type: REMOVE_USER
});