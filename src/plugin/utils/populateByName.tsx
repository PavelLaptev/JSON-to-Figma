import {skipSign} from '../../sharableData/skipSign';

export default function populateByName(selectedLayers, JSONobj, btnName) {
    const consoleErrorStyle = 'background: #f45; color: white; padding: 2px 4px; border-radius: 2px';
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
                    if (JSONobj.hasOwnProperty(newItem)) {
                        figma.ui.postMessage({
                            type: 'image-url',
                            url: JSONobj[newItem][btnName].toString(),
                            targetID: item.id,
                        });
                        newItem = ++newItem;
                    } else {
                        console.error('%cEnd of the JSON list', consoleErrorStyle);
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
