import {radioArray} from '../app/components/views/OperationsView/sections/Options/buttonsArray';
import {populateOnlySelected, populateByName, figmaNotify} from './utils';
import {shuffleArray} from '../app/utils';

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

    // Check if random button is on
    const isRandomJSON = msg => {
        return msg.selected.random ? shuffleArray(msg.resultObj) : msg.resultObj;
    };

    // By layer name
    if (msg.type === radioArray[0].id) {
        if (figma.currentPage.selection.length <= 0) {
            figmaNotify('error', `Select frames/groups with layers called "${msg.selected.btnName}"`, 3000);
        } else {
            populateByName(figma.currentPage.selection, isRandomJSON(msg), msg.selected.btnName);
        }
    }

    // Selected layers only
    if (msg.type === radioArray[1].id) {
        if (figma.currentPage.selection.length <= 0) {
            figmaNotify('error', 'Select text layers');
        } else {
            populateOnlySelected(figma.currentPage.selection, isRandomJSON(msg), msg.selected.btnName);
        }
    }

    // String templates
    if (msg.type === radioArray[2].id) {
        if (figma.currentPage.selection.length <= 0) {
            figmaNotify('error', `Select frames/groups with string templates "${msg.selected.btnName}"`, 3000);
        } else {
            console.log(msg.selected);
        }
    }
};

figma.currentPage.setRelaunchData({open: ''});
