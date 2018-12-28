import {
    BASE_URL
} from './constants';

export function checkUser(email) {
    return fetch(`${BASE_URL}/checkUser`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            email
        })
    });
}

export function createUser(user) {
    return fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password
        })
    });
}

export function login(user) {
    return fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}