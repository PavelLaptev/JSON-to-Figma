figma.showUI(__html__, {width: 320, height: 200});

figma.ui.onmessage = msg => {
    if (msg.type === 'copy-to-clipboard') {
        console.log(msg.link);
        figma.notify(msg.notifyText, {
            timeout: 60000,
        });
    }
};
