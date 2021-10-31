import { authHeader } from '../helpers/auth-header';
import { getApiOrigin } from '../helpers/api-origin';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getOne,
    getAllRoles,
    add,
    update,
    deleteOne,
    getCurrentUser,
    updatePassword,
    deleteAccount,
};

function login(name, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
    };

    return fetch(getApiOrigin() + `/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {
                user.authdata = window.btoa(name + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
}

function logout() {
    console.log('logout')
    localStorage.removeItem('user');
}

function register(payload) {
    console.log('register')
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    return fetch(getApiOrigin() + `/register`, requestOptions);
}

function getAll() {
    console.log('get all')
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(getApiOrigin() + `/api_auth/users`, requestOptions).then(handleResponse);
}

function getOne(id) {
    console.log('get one')
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(getApiOrigin() + `/api_auth/users/` + id, requestOptions).then(handleResponse);
}

function getAllRoles() {
    console.log('get all roles')
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(getApiOrigin() + `/api_auth/users/roles`, requestOptions).then(handleResponse);
}

function add(payload) {
    console.log('update')
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };
    return fetch(getApiOrigin() + `/api_auth/users`, requestOptions);
}

function update(id, payload) {
    console.log('update')
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };
    return fetch(getApiOrigin() + `/api_auth/users/` + id, requestOptions)
}

function deleteOne(id) {
    console.log('delete')
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return fetch(getApiOrigin() + `/api_auth/users/` + id, requestOptions);
}

function updatePassword(payload) {
    console.log('update')
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };
    return fetch(getApiOrigin() + `/api_auth/account/update-password/`, requestOptions)
}

function deleteAccount(payload) {
    console.log('Deleting Account')
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };
    return fetch(getApiOrigin() + `/api_auth/account/delete`, requestOptions)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }
            return Promise.reject(data, response.status);
        }
        return data;
    });
}