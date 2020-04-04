export default function populateByTemplateString(selectedLayers, JSONobj, btnName) {
    let newItem = 0;

    const loopSelected = arr => {
        arr.map(item => {
            if (item.type === 'TEXT' && item.characters.includes(`{${btnName}}`)) {
                console.log(item);
                figma.loadFontAsync(item.fontName).then(() => {
                    item.characters = item.characters.replace(`{${btnName}}`, JSONobj[newItem][btnName].toString());
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

// TO-DO
// Handle errors
