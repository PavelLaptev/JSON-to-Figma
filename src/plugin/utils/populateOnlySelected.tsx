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
            let currentFills = item.fills;
            console.log(item.fills);
            item.fills = [
                ...currentFills,
                {type: 'SOLID', visible: true, opacity: 1, blendMode: 'NORMAL', color: {r: 0, g: 0, b: 0}},
            ];
        }
    });
}
