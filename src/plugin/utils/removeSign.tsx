import {figmaNotify} from '.';

export default function removeSign(selectedLayers, signName, sign) {
    selectedLayers.map(item => {
        const currentName = item.name;
        item.name = currentName.replace(sign, '');
    });
    figmaNotify('success', `the ${signName} sign was removed`);
}
