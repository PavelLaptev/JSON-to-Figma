export default function flattenObj(obj, path = '') {
    if (!(obj instanceof Object)) return {[path.replace(/\.$/g, '')]: obj};

    return Object.keys(obj).reduce((output, key) => {
        return obj instanceof Array
            ? {...output, ...flattenObj(obj[key], path + '[' + key + '].')}
            : {...output, ...flattenObj(obj[key], path + key + '.')};
    }, {});
}
