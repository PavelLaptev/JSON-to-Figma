import flattenObj from './flattenObj';
import {isPlainObject} from './';

export default function groupFlattenedObj(obj) {
    if (Array.isArray(obj)) {
        let newObj = obj.map(item => {
            let flatObjItem = flattenObj(item);
            return flatObjItem;
        });
        return newObj;
    } else if (isPlainObject(obj)) {
        let newObj = Object.entries(obj).map(item => {
            let flatObjItem = flattenObj(item[1]);
            return flatObjItem;
        });
        return newObj;
    }
}
