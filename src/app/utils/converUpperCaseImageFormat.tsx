export default function converUpperCaseImageFormat(url) {
    if (url.match('JPG')) {
        return url.replace(/JPG/g, 'jpg');
    }
}
