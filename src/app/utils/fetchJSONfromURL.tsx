import {isLocalhost} from './';
import {proxyServer} from './proxyServer';

export default async function fetchJSONfromURL(
    url,
    callback,
    errorCallback = error => {
        console.error(error);
    }
) {
    const fetchURL = isLocalhost(url) ? url : `${proxyServer}/${url}`;
    return await fetch(fetchURL)
        .then(response => response.json())
        .then(responseJson => {
            callback(responseJson);
        })
        .catch(error => {
            errorCallback(error);
        });
}
