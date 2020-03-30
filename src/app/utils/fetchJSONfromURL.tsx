export default function fetchJSONfromURL(url) {
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        })
        .catch(error => {
            console.error(error);
        });
}
