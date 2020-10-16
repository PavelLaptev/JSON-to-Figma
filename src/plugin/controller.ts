import {radioArray, allMatches} from '../app/components/views/OperationsView/sections/Options/buttonsArray';
import {shuffleArray} from '../app/utils';

import {
    populateOnlySelected,
    populateByName,
    populateByTemplateString,
    figmaNotify,
    addSign,
    removeSign,
} from './utils';
import {pluginFrameSize} from './data/pluginFrameSize';
import {skipSign} from './data/skipSign';

// Show UI
figma.showUI(__html__, {width: pluginFrameSize.width, height: pluginFrameSize.height});

figma.ui.onmessage = msg => {
    // console.log(msg);
    //
    // CONDITIONAL VARIABLES FOR CHECKING
    //
    // Check if random button is on
    const isRandomJSON = msg => {
        return msg.selected.random ? shuffleArray(msg.obj) : msg.obj;
    };

    // Check if something selected
    const isSelectionLength = figma.currentPage.selection.length !== 0;

    // Check for selected populate option
    const isOptionTypeMatch = radioNum => {
        if (msg.type === radioArray[radioNum].id) {
            return true;
        }
    };

    // Check if `Populate all mathes` was clicked
    const isAllMatchesClicked = () => {
        if (msg.selected.btnName === allMatches.name) {
            return true;
        }
    };

    //
    // POPULATE FUNCTIONS
    //
    // By layer name
    if (isOptionTypeMatch(0)) {
        if (isSelectionLength) {
            if (isAllMatchesClicked()) {
                const buttonsArray = Object.keys(isRandomJSON(msg)[0]);
                buttonsArray.map(btnName => {
                    populateByName(figma.currentPage.selection, isRandomJSON(msg), btnName);
                });
            } else {
                populateByName(figma.currentPage.selection, isRandomJSON(msg), msg.selected.btnName);
            }
        } else if (!isSelectionLength && !isAllMatchesClicked()) {
            figmaNotify('error', `Select frames/groups with layers called "${msg.selected.btnName}"`, 3000);
        } else if (!isSelectionLength && isAllMatchesClicked()) {
            figmaNotify('error', `Select frames/groups to populate all matches`, 3000);
        }
    }

    // Selected layers only
    if (isOptionTypeMatch(1)) {
        if (isSelectionLength) {
            populateOnlySelected(figma.currentPage.selection, isRandomJSON(msg), msg.selected.btnName);
        } else {
            figmaNotify('error', 'Select text layers', 3000);
        }
    }

    // if we recived fetched images
    if (msg.type === 'imgData') {
        const target = figma.currentPage.findOne(n => n.id === msg.targetID);
        const imageHash = figma.createImage(msg.data).hash;
        console.log(imageHash);
        const currentFills = target['fills'];
        const newFill = {
            type: 'IMAGE',
            opacity: 1,
            blendMode: 'NORMAL',
            scaleMode: 'FILL',
            imageHash: imageHash,
        };
        target['fills'] = [...currentFills, ...[newFill]];
    }

    // String templates
    if (isOptionTypeMatch(2)) {
        if (isSelectionLength) {
            if (isAllMatchesClicked()) {
                const buttonsArray = Object.keys(isRandomJSON(msg)[0]);

                buttonsArray.map(btnName => {
                    populateByTemplateString(figma.currentPage.selection, isRandomJSON(msg), btnName);
                });
            } else {
                populateByTemplateString(figma.currentPage.selection, isRandomJSON(msg), msg.selected.btnName);
            }
        } else if (!isSelectionLength && !isAllMatchesClicked()) {
            figmaNotify('error', `Select frames/groups with string templates "${msg.selected.btnName}"`, 3000);
        } else if (!isSelectionLength && isAllMatchesClicked()) {
            figmaNotify('error', `Select frames/groups to populate all matches`, 3000);
        }
    }

    // "SKIP LAYERS" FUNCTIONS
    if (msg.type === 'add-skip-sign') {
        if (isSelectionLength) {
            addSign(figma.currentPage.selection, skipSign.name, skipSign.symbol);
        } else {
            figmaNotify('error', 'Select some layers before', 3000);
        }
    }

    if (msg.type === 'remove-skip-sign') {
        if (isSelectionLength) {
            removeSign(figma.currentPage.selection, skipSign.name, skipSign.symbol);
        } else {
            figmaNotify('error', 'Select some layers before', 3000);
        }
    }

    //
    // THE REST OF MESSAGES
    //
    // Show message
    if (msg.type === 'showMsg') {
        figma.notify(msg.notifyText, {
            timeout: 2000,
        });
    }

    // Change size
    if (msg.type === 'change-size' || msg.type === 'reset') {
        figma.ui.resize(pluginFrameSize.width, msg.frameHeight);
    }
};

figma.currentPage.setRelaunchData({open: ''});
