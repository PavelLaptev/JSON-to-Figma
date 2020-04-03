import Flattern from 'flattern';

export default function groupFlattenedObj(obj) {
    let newObj = obj.map(item => {
        let flatObjItem = new Flattern(item).flatObject;
        return flatObjItem;
    });

    return newObj;
}
