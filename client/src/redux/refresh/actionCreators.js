import {
    REGISTER_REFRESH,
    UPDATE_REFRESH,
    UNREGISTER_REFRESH
} from './actions';

export const registerRefresh = name => ({
    type: REGISTER_REFRESH,
    name
});

export const updateRefresh = name => ({
    type: UPDATE_REFRESH,
    name
});

export const unregisterRefresh = name => ({
    type: UNREGISTER_REFRESH,
    name
});