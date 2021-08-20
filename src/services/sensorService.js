import { authHeader } from '../helpers/auth-header';
import { userService } from '.';

export const sensorService = {
    getAll
};

function getAll() {
    console.log('get all')
    const requestOptions = {
        method: 'GET',
        host: 'http://localhost:80',
        headers: authHeader()
    };
    return fetch(`http://localhost:8080/api_auth/sensors`, requestOptions).then(handleResponse);
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