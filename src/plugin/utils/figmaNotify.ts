import {msgTypes} from '../../app/utils/msgTypes';

export default function figmaNotify(type: string, text: string, time: number = 1500) {
    figma.notify(`${msgTypes[type].icon} ${text}`, {
        timeout: time,
    });
}
