export default async function fetchJSONfromURL(
    url,
    callback,
    errorCallback = error => {
        console.error(error);
    }
) {
    const proxyServer = 'https://cors-anywhere.herokuapp.com';
    return await fetch(`${proxyServer}/${url}`)
        .then(response => response.json())
        .then(responseJson => {
            callback(responseJson);
        })
        .catch(error => {
            errorCallback(error);
        });
}
