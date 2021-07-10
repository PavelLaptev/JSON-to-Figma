import {figmaNotify, shuffleArray, populateByName, populateOnlySelected, addSign, removeSign} from './utils';
import {pluginFrameSize} from '../data/pluginFrameSize';
import {skipSign} from '../data/skipSign';

// SHOW UI
figma.showUI(__html__, {width: pluginFrameSize.width, height: pluginFrameSize.height});

// ON MESSAGE
figma.ui.onmessage = msg => {
    const isRandom = arr => {
        return msg.random ? shuffleArray(arr) : arr;
    };

    const isSelectionLength = figma.currentPage.selection.length !== 0;

    if (msg.type === 'populate') {
        // Check if something selected
        let selectedArray = msg.selected;
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

    if (msg.type === 'manual-populate') {
        if (msg.selected === null) {
            figmaNotify('error', 'Select keys to populate', 3000);
        }

        if (figma.currentPage.selection.length <= 0) {
            figmaNotify('error', 'Select layers to populate', 3000);
        }

        const selection = isRandom(figma.currentPage.selection);
        const obj = isRandom(msg.obj);

        populateOnlySelected(selection, obj, msg.selected);
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
    if (msg.type === 'add-skip-sign') {
        if (isSelectionLength) {
            addSign(figma.currentPage.selection, skipSign);
        } else {
            figmaNotify('error', 'Select some layers first', 3000);
        }
    }

    if (msg.type === 'remove-skip-sign') {
        if (isSelectionLength) {
            removeSign(figma.currentPage.selection, skipSign);
        } else {
            figmaNotify('error', 'Select some layers first', 3000);
        }
    }

    // CHANGE SIZE
    if (msg.type === 'change-size' || msg.type === 'reset') {
        figma.ui.resize(pluginFrameSize.width, Math.round(msg.frameHeight));
    }
    if (msg.type === 'manual-resize') {
        figma.ui.resize(Math.round(msg.size.width), Math.round(msg.size.height));
    }
};

figma.currentPage.setRelaunchData({open: ''});
