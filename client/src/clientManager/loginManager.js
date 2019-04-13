import {
    BASE_URL
} from './constants';

import {
    addTokenToHeaders
} from './fetch';

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
            body: JSON.stringify(user)
        })
        .then((res) => res.json())
        .then((res) => {
            addTokenToHeaders(res.token);
            return res.user;
        });
}

export function login(user) {
    return fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then((res) => res.json())
        .then((res) => {
            addTokenToHeaders(res.token);
            return res.user;
        });
}