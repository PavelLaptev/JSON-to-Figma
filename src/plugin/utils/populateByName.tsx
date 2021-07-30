import {skipSign} from '../../data/skipSign';

export default function populateByName(selectedLayers, JSONobj, keyFromJSON) {
    let newItem = 0;
    const temp = keyFromJSON.split('.');
    const keyName = temp[0];
    const propToChange = temp[1] ?? null;

    console.log(JSON.stringify(JSONobj));

    const loopSelected = arr => {
        arr.map(node => {
            const hasSkipSign = node.name.includes(skipSign);
            const hasMatchingName = node.name.toUpperCase() === keyName.toUpperCase();
            if (!hasSkipSign && hasMatchingName) {
                const propValuesFromJSON = JSONobj[newItem];
                let newPropValue = propValuesFromJSON[keyFromJSON];
                console.log(
                    `${newItem}: The node named "${keyName}" should change prop "${propToChange}" to "${newPropValue}"`,
                    node
                );
                newItem = ++newItem;
                if (propToChange === 'characters' && node.type === 'TEXT') {
                    console.log('Changing value to ', newPropValue);
                    figma.loadFontAsync(node.fontName).then(() => {
                        if (typeof JSONobj[newItem] !== 'undefined') {
                            node.characters = newPropValue;
                        }
                    });
                } else {
                    try {
                        const currentValue = node[propToChange];
                        const oldValue = newPropValue;
                        try {
                            newPropValue = JSON.parse(newPropValue);
                            console.log(`From JSON, newvalue: ${JSON.stringify(newPropValue)}`);
                        } catch (e) {
                            // failed to parse newPropValue as JSON
                        }
                        newPropValue = newPropValue === undefined ? currentValue : newPropValue;
                        console.log(currentValue, typeof currentValue, '=> ', newPropValue);
                        node[propToChange] = newPropValue;
                    } catch (e) {
                        console.log(`Failed to set "${propToChange}"`);
                    }
                }
                if (node.type !== 'TEXT') {
                    if (JSONobj.hasOwnProperty(newItem)) {
                        figma.ui.postMessage({
                            type: 'image-url',
                            url: JSONobj[newItem][keyFromJSON].toString(),
                            targetID: node.id,
                        });
                    }
                }
            }
            if (node.children) {
                loopSelected(node.children);
            }
            return;
        });
    };
    loopSelected(selectedLayers);
}
