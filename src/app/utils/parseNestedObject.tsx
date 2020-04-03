export default function parseNestedObject(obj) {
    // let fullObject = [];

    const checkForObjects = obj => {
        // let newObj = {};
        // console.log(obj);
        const keys = Object.keys(obj);
        // let newObj = {};

        Object.values(obj).filter((value, i) => {
            if (value.constructor === Object) {
                let keyName = keys[i];
                let newItem = {[keyName]: value};
                console.log(Object.keys(newItem));
                // newObj = {};
                // console.log(keyName);
                // delete newObj[keyName];

                checkForObjects(value);
                // newObj[`${keyName}-${Object.keys(value)}`] = Object.values(value);
                // console.log(Object.values(value)[i]);
                // console.log(Object.keys(value));
                return Object.values(value);
            }
        });

        // fullObject.push(newObj);
        // console.log(newObj);
    };

    obj.map(objItem => {
        checkForObjects(objItem);
    });

    // console.log(fullObject);

    return obj;
}
