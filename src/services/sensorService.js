import { authHeader } from '../helpers/auth-header';
import { userService } from '.';
import { getApiOrigin } from '../helpers/api-origin';

export const sensorService = {
    getAll,
    getOne,
    add,
    update,
    deleteOne
};

function getAll() {
    console.log('get all')
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(getApiOrigin() + `/api_auth/sensors`, requestOptions).then(handleResponse);
}

function getOne(id) {
    console.log('get one')
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(getApiOrigin() + `/api_auth/sensors/` + id, requestOptions).then(handleResponse);
}

function add(sensor) {
    console.log('add sensor')
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(sensor)
    };
    return fetch(getApiOrigin() + `/api_auth/sensors`, requestOptions);
}

function update(id, sensor) {
    console.log('update')
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(sensor)
    };
    return fetch(getApiOrigin() + `/api_auth/sensors/` + id, requestOptions);
}

function deleteOne(id) {
    console.log('delete')
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return fetch(getApiOrigin() + `/api_auth/sensors/` + id, requestOptions);
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