import {skipSign} from '../../data/skipSign';

export default function populateByName(selectedLayers, JSONobj, selectedItem) {
    let newItem = 0;

    const loopSelected = arr => {
        arr.map(item => {
            if (!item.name.includes(skipSign)) {
                if (item.name.toUpperCase() === selectedItem.toUpperCase() && item.type === 'TEXT') {
                    figma.loadFontAsync(item.fontName).then(() => {
                        if (typeof JSONobj[newItem] !== 'undefined') {
                            item.characters = JSONobj[newItem]?.[selectedItem].toString();
                            newItem = ++newItem;
                        }
                    });
                }

                if (item.name.toUpperCase() === selectedItem.toUpperCase() && item.type !== 'TEXT') {
                    if (JSONobj.hasOwnProperty(newItem)) {
                        figma.ui.postMessage({
                            type: 'image-url',
                            url: JSONobj[newItem][selectedItem].toString(),
                            targetID: item.id,
                        });
                        newItem = ++newItem;
                    }
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
