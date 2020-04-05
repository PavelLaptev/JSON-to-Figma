import Flattern from 'flattern';
import {isPlainObject} from './';

export default function groupFlattenedObj(obj) {
    if (Array.isArray(obj)) {
        let newObj = obj.map(item => {
            let flatObjItem = new Flattern(item).flatObject;
            return flatObjItem;
        });
        return newObj;
    } else if (isPlainObject(obj)) {
        let newObj = Object.entries(obj).map(item => {
            let flatObjItem = new Flattern(item).flatObject;
            return flatObjItem;
        });
        console.log(newObj);
        return newObj;
    }
}
