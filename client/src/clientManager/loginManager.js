import { BASE_URL } from './constants';

export function checkUser(email) {
    return fetch(`${BASE_URL}/checkUser`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({ email })
    });
}
