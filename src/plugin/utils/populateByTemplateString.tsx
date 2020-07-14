import {skipSign} from '../data/skipSign';

export default function populateByTemplateString(selectedLayers, JSONobj, btnName) {
    let newItem = 0;

    const loopSelected = arr => {
        arr.map(item => {
            if (!item.name.includes(skipSign.symbol)) {
                if (item.type === 'TEXT' && item.characters.includes(`{${btnName}}`)) {
                    figma.loadFontAsync(item.fontName).then(() => {
                        item.characters = item.characters.replace(`{${btnName}}`, JSONobj[newItem][btnName].toString());
                        newItem = ++newItem;
                    });
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
