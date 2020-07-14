import {skipSign} from '../data/skipSign';

export default function populateByName(selectedLayers, JSONobj, btnName) {
    let newItem = 0;

    const loopSelected = arr => {
        arr.map(item => {
            if (!item.name.includes(skipSign.symbol)) {
                if (item.name.toUpperCase() === btnName.toUpperCase() && item.type === 'TEXT') {
                    figma.loadFontAsync(item.fontName).then(() => {
                        item.characters = JSONobj[newItem][btnName].toString();
                        newItem = ++newItem;
                    });
                }

                if (item.name.toUpperCase() === btnName.toUpperCase() && item.type !== 'TEXT') {
                    figma.ui.postMessage({
                        type: 'image-url',
                        url: JSONobj[newItem][btnName].toString(),
                        targetID: item.id,
                    });
                    newItem = ++newItem;
                }

                if (item.children) {
                    loopSelected(item.children);
                }
                return;
            }
        });
    };

    loopSelected(selectedLayers);
}
