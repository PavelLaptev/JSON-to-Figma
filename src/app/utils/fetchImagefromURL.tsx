export default async function fetchImagefromURL(url, targetID) {
    // console.log(url);
    const proxyServer = 'https://cors-anywhere.herokuapp.com';
    fetch(`${proxyServer}/${url}`)
        .then(r => {
            if ((r.status + '')[0] != '2') throw Error(`HTTP ${r.status} ${r.statusText}`);
            return r.arrayBuffer();
        })
        .then(a =>
            parent.postMessage({pluginMessage: {type: 'imgData', data: new Uint8Array(a), targetID: targetID}}, '*')
        );
}
