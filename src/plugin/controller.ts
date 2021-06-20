// import {populateByName, figmaNotify, addSign, removeSign} from './utils';
import {figmaNotify, shuffleArray, populateByName} from './utils';
import {pluginFrameSize} from './data/pluginFrameSize';
// import {skipSign} from './data/skipSign';

// Show UI
figma.showUI(__html__, {width: pluginFrameSize.width, height: pluginFrameSize.height});

figma.ui.onmessage = msg => {
    const isRandom = arr => {
        return msg.random ? shuffleArray(arr) : arr;
    };

    if (msg.type === 'populate-selected') {
        // Check if something selected
        let selectedArray = msg.selected;
        const isSelectionLength = figma.currentPage.selection.length !== 0;
        const selection = isRandom(figma.currentPage.selection);
        const obj = isRandom(msg.obj);

        // POPULATE
        if (!isSelectionLength) {
            figmaNotify('error', `Select frames/groups to populate matches`, 3000);
        } else {
            if (selectedArray.length > 0) {
                selectedArray.map(selectedItem => {
                    populateByName(selection, obj, selectedItem);
                });
            } else {
                figmaNotify('error', `Select keys to populate`, 3000);
            }
        }
    }

    // if we recived fetched images
    if (msg.type === 'imgData') {
        const target = figma.currentPage.findOne(n => n.id === msg.targetID);
        const imageHash = figma.createImage(msg.data).hash;

        const newFill = {
            type: 'IMAGE',
            opacity: 1,
            blendMode: 'NORMAL',
            scaleMode: 'FILL',
            imageHash: imageHash,
        };
        target['fills'] = [newFill];
    }

    // "SKIP LAYERS" FUNCTIONS
    // if (msg.type === 'add-skip-sign') {
    //     if (isSelectionLength) {
    //         addSign(figma.currentPage.selection, skipSign.name, skipSign.symbol);
    //     } else {
    //         figmaNotify('error', 'Select some layers before', 3000);
    //     }
    // }

    // if (msg.type === 'remove-skip-sign') {
    //     if (isSelectionLength) {
    //         removeSign(figma.currentPage.selection, skipSign.name, skipSign.symbol);
    //     } else {
    //         figmaNotify('error', 'Select some layers before', 3000);
    //     }
    // }

    // Change size
    if (msg.type === 'change-size' || msg.type === 'reset') {
        figma.ui.resize(pluginFrameSize.width, Math.round(msg.frameHeight));
    }
};

figma.currentPage.setRelaunchData({open: ''});
