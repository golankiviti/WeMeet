import {
    BASE_URL
} from './constants';

import fetch from './fetch';

export function createMeeting(meeting) {
    return fetch(`${BASE_URL}/api/meeting`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(meeting)
    });
}

export function updateMeeting(meeting) {
    return fetch(`${BASE_URL}/api/meeting`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(meeting)
    });
}

export function getMeetings(userId) {
    return fetch(`${BASE_URL}/api/meeting/${userId}`);
}