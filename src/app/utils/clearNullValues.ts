export default function clearNullValues(obj) {
    let jsonString = JSON.stringify(obj, (_, value) => {
        if (value !== null) return value;
    });

    return JSON.parse(jsonString);
}
