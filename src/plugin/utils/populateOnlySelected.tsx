import {figmaNotify} from './';

export default function populateOnlySelected(selectedLayers, obj, btnName) {
    selectedLayers.map((item, i) => {
        if (typeof obj[i] !== 'undefined' && item.type === 'TEXT') {
            try {
                figma.loadFontAsync(item.fontName).then(() => {
                    item.characters = obj[i][btnName].toString();
                });
            } catch (error) {
                figmaNotify('error', 'Select only text layers or option "By layer name"', 1500);
            }
        } else {
            figma.ui.postMessage({type: 'image-url', url: obj[i][btnName].toString(), targetID: item.id});
        }
    });
}
