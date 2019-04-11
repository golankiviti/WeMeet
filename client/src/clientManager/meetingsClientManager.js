import {
    BASE_API_URL
} from './constants';

import customFetch from './fetch';

export function createMeeting(meeting) {
    return fetch(`${BASE_API_URL}/meeting`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(meeting)
    });
}

export function updateMeeting(meeting) {
    return fetch(`${BASE_API_URL}/meeting`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(meeting)
    });
}

export function getMeetings(userId) {
    return fetch(`${BASE_API_URL}/meeting/${userId}`);
}

export function getMeetingsForApproval(userId) {
    return customFetch(`${BASE_API_URL}/meeting/waitingMeetings/${userId}`,);
}

export function responseToMeeting(response) {
    return customFetch(`${BASE_API_URL}/meeting/meetingResponse`, {
        method: 'POST',
        body: JSON.stringify(response)
    }, false)
}
