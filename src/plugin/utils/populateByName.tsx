export default function populateByName(selectedLayers, JSONobj, btnName) {
    let newItem = 0;
    let arr = selectedLayers;

    const loopSelected = arr => {
        arr.map(item => {
            // console.log(item.type);
            console.log(item.name.toUpperCase());
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

    loopSelected(arr);
}

// TO-DO
// Add comparasion of names ignoring case
