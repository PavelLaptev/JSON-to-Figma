export default function isPlainObject(input) {
    return input && !Array.isArray(input) && typeof input === 'object';
}
