import { authHeader } from '../helpers/auth-header';
import { userService } from '.';
import { getApiOrigin } from '../helpers/api-origin';

export const measurementService = {
    getLastMeasurements,
    getLastMeasurementsAllInDateRange,
    getLastMeasurementsAll,
    getLastMeasurementsInDateRange
};

function getLastMeasurementsAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(getApiOrigin() + `/api_auth/measurements`, requestOptions).then(handleResponse);
}

function getLastMeasurementsAllInDateRange(dateFrom, dateTo) {
    console.log(getApiOrigin() + `/api_auth/measurements?item_limit=60` + '&date_from=' + parseDate(dateFrom) + '&date_to=' + parseDate(dateTo));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(getApiOrigin() + `/api_auth/measurements?item_limit=100` + '&date_from=' + parseDate(dateFrom) + '&date_to=' + parseDate(dateTo), requestOptions)
          .then(handleResponse);
}

function getLastMeasurements(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(getApiOrigin() + `/api_auth/measurements?sensor_id=` + id + '&item_limit=30', requestOptions).then(handleResponse);
}

function getLastMeasurementsInDateRange(id, dateFrom, dateTo) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    if (dateFrom && dateTo) {
        return fetch(getApiOrigin() + `/api_auth/measurements?item_limit=150` + '&sensor_id=' + id + '&date_from=' + parseDate(dateFrom) + '&date_to=' + parseDate(dateTo), requestOptions)
            .then(handleResponse);
    } else if (dateFrom) {
        return fetch(getApiOrigin() + `/api_auth/measurements?item_limit=150` + '&sensor_id=' + id + '&date_from=' + parseDate(dateFrom), requestOptions)
            .then(handleResponse);
    } else {
        return fetch(getApiOrigin() + `/api_auth/measurements?item_limit=150` + '&sensor_id=' + id + '&date_to=' + parseDate(dateTo), requestOptions)
            .then(handleResponse);
    }
}

function parseDate(date) {
    let years   =   date.getFullYear();
    let months  =   date.getMonth() <= 9 ?      '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let days    =   date.getDate() <= 9 ?       '0' + date.getDate() :        date.getDate();
    let hours   =   date.getHours() <= 9 ?      '0' + date.getHours() :       date.getHours();
    let minutes =   date.getMinutes() <= 9 ?    '0' + date.getMinutes() :     date.getMinutes();
    return [years, '-', months, '-', days, 'T', hours, ':', minutes].join('');
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