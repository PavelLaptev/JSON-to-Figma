import {radioArray} from '../app/components/views/OperationsView/sections/Options/buttonsArray';

/// Show UI
const pluginInitialWidth = 330;
figma.showUI(__html__, {width: 330, height: 246});

figma.ui.onmessage = msg => {
    // Show message
    if (msg.type === 'showMsg') {
        figma.notify(msg.notifyText, {
            timeout: 2000,
        });
    }

    // Change size
    if (msg.type === 'change-size' || msg.type === 'reset') {
        figma.ui.resize(pluginInitialWidth, msg.frameHeight);
    }

    // Selected layers only
    if (msg.type === radioArray[0].id) {
        console.log(msg.selected);
    }

    // By layer name
    if (msg.type === radioArray[1].id) {
        console.log(msg.selected);
    }

    // String templates
    if (msg.type === radioArray[2].id) {
        console.log(msg.selected);
    }
};

figma.currentPage.setRelaunchData({open: ''});
