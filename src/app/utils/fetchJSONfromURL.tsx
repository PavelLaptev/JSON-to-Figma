export default async function fetchJSONfromURL(
    url,
    callback,
    errorCallback = error => {
        console.error(error);
    }
) {
    return await fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            callback(responseJson);
        })
        .catch(error => {
            errorCallback(error);
        });
}
