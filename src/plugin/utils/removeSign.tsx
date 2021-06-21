import {figmaNotify} from '.';

export default function removeSign(selectedLayers, sign) {
    selectedLayers.map(item => {
        const currentName = item.name;
        if (currentName.includes(sign)) {
            item.name = currentName.replace(sign, '');
            figmaNotify('success', `the skip sign ${sign} was removed`);
        }
    });
}
