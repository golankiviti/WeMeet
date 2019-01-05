import { BASE_API_URL } from './constants';
import fetch from './fetch';

const BASE_URL = `${BASE_API_URL}/users`;

export function userLocations(id) {
    return fetch(`${BASE_URL}/${id}/preferences`);
}

export function addLocation(id, location) {
    return fetch(`${BASE_URL}/${id}/preference`, {
        method: 'PUT',
        body: JSON.stringify(location)
    }, false);
}

export function editLocation(id, locationId, location) {
    return fetch(`${BASE_URL}/${id}/preference/${locationId}`, {
        method: 'PUT',
        body: JSON.stringify(location)
    }, false)
}

export function getLocation(id, locationId) {
    return fetch(`${BASE_URL}/${id}/preferences/${locationId}`)
}