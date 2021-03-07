import {figmaNotify} from './';
import {isImageString} from './../../app/utils/';
import {skipSign} from '../../sharableData/skipSign';

export default function populateOnlySelected(selectedLayers, obj, btnName) {
    const consoleErrorStyle = 'background: #f45; color: white; padding: 2px 4px; border-radius: 2px';

    selectedLayers.map((item, i) => {
        if (!item.name.includes(skipSign.symbol)) {
            if (typeof obj[i] !== 'undefined' && item.type === 'TEXT') {
                try {
                    figma.loadFontAsync(item.fontName).then(() => {
                        item.characters = obj[i][btnName].toString();
                    });
                } catch (error) {
                    figmaNotify('error', 'Select only text layers or option "By layer name"', 1500);
                }
            } else {
                if (obj.hasOwnProperty(i) && isImageString(obj[i][btnName].toString())) {
                    figma.ui.postMessage({type: 'image-url', url: obj[i][btnName].toString(), targetID: item.id});
                } else {
                    console.error('End of the JSON list', consoleErrorStyle);
                }
            }
            return;
        }
    });
}
