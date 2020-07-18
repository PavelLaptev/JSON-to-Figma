export default function isLocalhost(url) {
    const consoleStyle = 'background: #222; color: #bada55; padding: 2px 4px; border-radius: 2px';
    const consoleErrorStyle = 'background: #f45; color: white; padding: 2px 4px; border-radius: 2px';

    if (url.includes('localhost') || url.includes('127.0.0.1')) {
        console.log('%cIt is a localhost link', consoleStyle);
        return true;
    } else if (url.includes('http')) {
        console.log('%cIt is a web link', consoleStyle);
        return false;
    } else {
        console.log('%cIt is not a link', consoleErrorStyle);
    }
}
