import { authHeader } from '../helpers/auth-header';

export const userService = {
    login,
    logout,
    getAll,
    getOne,
    getAllRoles,
    update,
    deleteOne,
    getCurrentUser,
};

function login(name, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
    };

    // return fetch(`http://192.168.0.102:8080/login`, requestOptions)
    return fetch(`http://192.168.0.18:8080/login`, requestOptions)
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

function getAll() {
    console.log('get all')
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    // return fetch(`http://192.168.0.102:8080/api_auth/users`, requestOptions).then(handleResponse);
    return fetch(`http://192.168.0.18:8080/api_auth/users`, requestOptions).then(handleResponse);
}

function getOne(id) {
    console.log('get one')
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    // return fetch(`http://192.168.0.102:8080/api_auth/users/` + id, requestOptions).then(handleResponse);
    return fetch(`http://192.168.0.18:8080/api_auth/users/` + id, requestOptions).then(handleResponse);
}

function getAllRoles() {
    console.log('get all roles')
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    // return fetch(`http://192.168.0.102:8080/api_auth/users/roles`, requestOptions).then(handleResponse);
    return fetch(`http://192.168.0.18:8080/api_auth/users/roles`, requestOptions).then(handleResponse);
}

function update(id, payload) {
    console.log('update')
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };
    // return fetch(`http://192.168.0.102:8080/api_auth/users/` + id, requestOptions);
    return fetch(`http://192.168.0.18:8080/api_auth/users/` + id, requestOptions)
}

function deleteOne(id) {
    console.log('delete')
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    // return fetch(`http://192.168.0.102:8080/api_auth/users/` + id, requestOptions);
    return fetch(`http://192.168.0.18:8080/api_auth/users/` + id, requestOptions);
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