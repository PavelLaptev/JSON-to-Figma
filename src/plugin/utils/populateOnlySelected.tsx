import {figmaNotify} from './';
import {isImageString} from './../../app/utils/';
import {skipSign} from '../../data/skipSign';

export default function populateOnlySelected(selectedLayers, obj, selectedItem) {
    selectedLayers.map((item, i) => {
        if (!item.name.includes(skipSign) && typeof obj[i] !== 'undefined') {
            if (item.type === 'TEXT') {
                try {
                    figma.loadFontAsync(item.fontName).then(() => {
                        item.characters = obj[i][selectedItem].toString();
                    });
                } catch (error) {
                    figmaNotify('error', 'Select only text layers or option "By layer name"', 1500);
                }
            } else {
                if (isImageString(obj[i][selectedItem].toString())) {
                    figma.ui.postMessage({type: 'image-url', url: obj[i][selectedItem].toString(), targetID: item.id});
                } else {
                    console.error('End of the JSON list');
                }
            }
            return;
        }
    });
}
