import { authHeader } from '../helpers/auth-header';
import { userService } from '.';
import { getApiOrigin } from '../helpers/api-origin';

export const statsService = {
    getAllStats
};

function getAllStats() {
    console.log('get all stats')
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(getApiOrigin() + `/api_auth/stats`, requestOptions).then(handleResponse);
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