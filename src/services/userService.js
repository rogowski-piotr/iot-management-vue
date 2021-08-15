// import config from 'config';
import authHeader from '../helpers/auth-header';

export const userService = {
    login,
    logout,
    getAll
};

// export default { login, getAll };

function login(name, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
    };

    return fetch(`http://localhost:8080/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(user);
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(name + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    console.log('logout')
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    console.log('get all')
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost:8080/api_auth/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}