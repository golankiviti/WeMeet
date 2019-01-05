import {
    BASE_URL
} from './constants';

export function upsertMeeting(meeting) {
    return fetch(`${BASE_URL}/meeting`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(meeting)
    });
}

export function getMeetings(userId) {
    return fetch(`${BASE_URL}/meeting/:${userId}`);
}

