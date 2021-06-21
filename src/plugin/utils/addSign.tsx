import {figmaNotify} from '.';

export default function addSign(selectedLayers, sign) {
    selectedLayers.map(item => {
        if (!item.name.includes(sign)) {
            item.name = `${item.name}${sign}`;
            figmaNotify('success', `the skip sign ${sign} was added`);
        } else {
            figmaNotify('warning', `the skip sign ${sign} already exists`);
        }
    });
}
