import {radioArray, allMatches} from '../app/components/views/OperationsView/sections/Options/buttonsArray';
import {shuffleArray} from '../app/utils';

import {populateOnlySelected, populateByName, populateByTemplateString, figmaNotify} from './utils';
import {pluginFrameSize} from './data/pluginFrameSize';

/// Show UI
figma.showUI(__html__, {width: pluginFrameSize.width, height: pluginFrameSize.height});

figma.ui.onmessage = msg => {
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

    // Check if random button is on
    const isRandomJSON = msg => {
        return msg.selected.random ? shuffleArray(msg.obj) : msg.obj;
    };

    //
    const populateAllMatch = msg => {
        console.log(msg);
    };

    // By layer name
    if (msg.type === radioArray[0].id) {
        if (figma.currentPage.selection.length !== 0) {
            if (msg.selected.btnName === allMatches.name) {
                populateAllMatch(msg);
            } else {
                populateByName(figma.currentPage.selection, isRandomJSON(msg), msg.selected.btnName);
            }
        } else {
            figmaNotify('error', `Select frames/groups with layers called "${msg.selected.btnName}"`, 3000);
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
            populateByTemplateString(figma.currentPage.selection, isRandomJSON(msg), msg.selected.btnName);
        }
    }
};

figma.currentPage.setRelaunchData({open: ''});
