export default function populateByName(selectedLayers, JSONobj, btnName) {
    let newItem = 0;

    // console.log(isFetchImages);

    const loopSelected = arr => {
        // console.log(arr);
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
