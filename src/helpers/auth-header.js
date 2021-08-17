export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.authdata) {
        return { 
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + user.authdata 
        };
    } else {
        return {};
    }
}

export default authHeader();