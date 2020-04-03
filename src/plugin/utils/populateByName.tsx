export default function populateByName(selectedLayers, JSONobj, btnName) {
    let newItem = 0;
    let arr = selectedLayers;

    const loopSelected = arr => {
        arr.map(item => {
            for (let keys in item) {
                if (item['name'] === btnName) {
                    if (keys === 'characters') {
                        figma.loadFontAsync(item.fontName).then(() => {
                            item.characters = JSONobj[newItem][btnName].toString();
                            newItem = ++newItem;
                        });
                    }
                }
                if (Array.isArray(item[keys])) {
                    loopSelected(item[keys]);
                }
            }
        });
    };

    loopSelected(arr);
}

// TO-DO
// Add comparasion of names ignoring case
