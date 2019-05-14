import {
    BASE_API_URL
} from './constants';

import customFetch from './fetch';

export function createMeeting(meeting) {
    return customFetch(`${BASE_API_URL}/meeting`, {
        method: 'PUT',
        body: JSON.stringify(meeting)
    });
}

export function updateMeeting(meeting) {
    return customFetch(`${BASE_API_URL}/meeting`, {
        method: 'POST',
        body: JSON.stringify(meeting)
    });
}

export function getMeetings(userId) {
    return customFetch(`${BASE_API_URL}/meeting/${userId}`);
}

export function getMeetingsForApproval(userId) {
    return customFetch(`${BASE_API_URL}/meeting/waitingMeetings/${userId}`);
}

export function getFutureMeetings(userId) {
    return customFetch(`${BASE_API_URL}/meeting/futureMeetings/${userId}`);
}

export function responseToMeeting(response) {
    return customFetch(`${BASE_API_URL}/meeting/meetingResponse`, {
        method: 'POST',
        body: JSON.stringify(response)
    }, false)
}
