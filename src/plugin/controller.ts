/// Show UI
const pluginInitialWidth = 330;
figma.showUI(__html__, {width: 330, height: 246});

figma.ui.onmessage = msg => {
    if (msg.type === 'showMsg') {
        figma.notify(msg.notifyText, {
            timeout: 2000,
        });
    }

    if (msg.type === 'change-size' || msg.type === 'reset') {
        figma.ui.resize(pluginInitialWidth, msg.frameHeight);
    }
};

figma.currentPage.setRelaunchData({open: ''});
