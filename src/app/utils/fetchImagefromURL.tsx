import {proxyServer} from './proxyServer';

export default async function fetchImagefromURL(url, targetID) {
    // fetch images from URL bypassing CORS
    await fetch(`${proxyServer}${url}`)
        .then(r => {
            try {
                return r.arrayBuffer();
            } catch (error) {
                console.error(error);
            }
        })
        .then(a => {
            parent.postMessage({pluginMessage: {type: 'imgData', data: new Uint8Array(a), targetID: targetID}}, '*');
        });
}
