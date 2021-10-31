export function getApiOrigin() {
    let origin = window.location.origin;

    switch(origin) {
        case "http://localhost":
            return 'http://192.168.0.18:8080';

        case "http://192.168.0.18":
            return 'http://192.168.0.18:8080';

        case "https://rogowski.codli.pl":
            return 'https://api.rogowski.codli.pl';
    }
}

export default getApiOrigin();