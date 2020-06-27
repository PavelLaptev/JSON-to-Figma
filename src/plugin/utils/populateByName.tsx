export default function populateByName(selectedLayers, JSONobj, isFetchImages, btnName) {
    let newItem = 0;

    const loopSelected = arr => {
        arr.map(item => {
            if (item.name.toUpperCase() === btnName.toUpperCase() && item.type === 'TEXT') {
                figma.loadFontAsync(item.fontName).then(() => {
                    item.characters = JSONobj[newItem][btnName].toString();
                    newItem = ++newItem;
                });
            }
            if (item.children) {
                loopSelected(item.children);
            }
        });
    };

    loopSelected(selectedLayers);
}
