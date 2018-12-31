import {
    UPDATE_USER,
    REMOVE_USER,
    CREATE_USER
} from './actions';

export const updateUser = user => ({
    type: UPDATE_USER,
    user
});

export const removeUser = () => ({
    type: REMOVE_USER
});

export const createUser = user => ({
    type: CREATE_USER,
    user
});