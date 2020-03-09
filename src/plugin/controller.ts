figma.showUI(__html__, {width: 320, height: 260});

figma.ui.onmessage = msg => {
    if (msg.type === 'copy-to-clipboard') {
        figma.notify(msg.notifyText, {
            timeout: 1500,
        });
    }
};

figma.currentPage.setRelaunchData({edit: 'sdfsdf', open: 'sdff'});
