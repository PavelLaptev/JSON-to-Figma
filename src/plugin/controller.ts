import {radioArray, allMatches} from '../app/components/views/OperationsView/sections/Options/buttonsArray';
import {shuffleArray} from '../app/utils';

import {populateOnlySelected, populateByName, populateByTemplateString, figmaNotify} from './utils';
import {pluginFrameSize} from './data/pluginFrameSize';

// Show UI
figma.showUI(__html__, {width: pluginFrameSize.width, height: pluginFrameSize.height});

figma.ui.onmessage = msg => {
    //
    // CONDITIONAL VARIABLES FOR CHECKING
    //
    // Check if random button is on
    const isRandomJSON = msg => {
        return msg.selected.random ? shuffleArray(msg.obj) : msg.obj;
    };

    // Fetch Images
    const isFetchImages = msg => {
        return msg.selected.fetchImages ? console.log('yes') : console.log('no');
    };

    // Check for selected populate option
    const isOptionTypeMatch = radioNum => {
        if (msg.type === radioArray[radioNum].id) {
            return true;
        }
    };

    // CHeck if something selected
    const isSelectionLength = figma.currentPage.selection.length !== 0;

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
                    populateByName(figma.currentPage.selection, isRandomJSON(msg), msg.selected.fetchImages, btnName);
                });
            } else {
                populateByName(
                    figma.currentPage.selection,
                    isRandomJSON(msg),
                    msg.selected.fetchImages,
                    msg.selected.btnName
                );
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

    //
    // THE REST MESSAGES
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
