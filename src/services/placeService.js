import { authHeader } from '../helpers/auth-header';
import { userService } from '.';

export const placeService = {
    getAll,
    getOne,
    update,
    deleteOne
};

function getAll() {
    console.log('get all')
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    // return fetch(`http://192.168.0.102:8080/api_auth/places`, requestOptions).then(handleResponse);
    return fetch(`http://192.168.0.18:8080/api_auth/places`, requestOptions).then(handleResponse);
}

function getOne(id) {
    console.log('get one')
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    // return fetch(`http://192.168.0.102:8080/api_auth/sensors/` + id, requestOptions).then(handleResponse);
    return fetch(`http://192.168.0.18:8080/api_auth/places/` + id, requestOptions).then(handleResponse);
}

function update(id, place) {
    console.log('update')
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(place)
    };
    // return fetch(`http://192.168.0.102:8080/api_auth/places/` + id, requestOptions);
    return fetch(`http://192.168.0.18:8080/api_auth/places/` + id, requestOptions);
}

function deleteOne(id) {
    console.log('delete')
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    // return fetch(`http://192.168.0.102:8080/api_auth/places/` + id, requestOptions);
    return fetch(`http://192.168.0.18:8080/api_auth/places/` + id, requestOptions);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                userService.logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}