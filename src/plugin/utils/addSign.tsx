import {figmaNotify} from '.';

export default function addSign(selectedLayers, signName, sign) {
    selectedLayers.map(item => {
        item.name = `${item.name}${sign}`;
    });
    figmaNotify('success', `the ${signName} sign was added`);
}
