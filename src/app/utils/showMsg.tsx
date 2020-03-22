const msgTypes = {
    copy: {
        type: 'copy',
        icon: '✂️',
    },
    error: {
        type: 'error',
        icon: '❌',
    },
};

export default function showMsg(type: string, text: string) {
    parent.postMessage({pluginMessage: {type: 'showMsg', notifyText: `${msgTypes[type].icon} ${text}`}}, '*');
}
