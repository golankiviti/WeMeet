import { BASE_API_URL } from './constants';
import fetch from './fetch';

const BASE_URL = `${BASE_API_URL}/users`;

export function userLocations(id) {
    return fetch(`${BASE_URL}/${id}/preferences`);
}

export function getAllUsers(id) {
    return fetch(BASE_URL);
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

export function deleteLocation(locationId) {
    return fetch(`${BASE_URL}/preference`, {
        method: 'DELETE',
        body: JSON.stringify({
            prefId: locationId
        })
    }, false)
}

export function addRestriction(id, restriction) {
    return fetch(`${BASE_URL}/${id}/restriction`, {
        method: 'PUT',
        body: JSON.stringify(restriction)
    }, false);
}

export function getRestrictions(id) {
    return fetch(`${BASE_URL}/${id}/restrictions`);
}