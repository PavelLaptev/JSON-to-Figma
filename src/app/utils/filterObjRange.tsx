export default function filterObjRange(range, obj) {
    if (range === '') {
        return obj;
    } else {
        const rangeArray = range
            .replace(/\s/g, '')
            .split(',')
            .map(item => {
                return item.split('-').map(c => Number(c) - 1);
            })
            .filter(Boolean);

        const rangedObj = rangeArray
            .map(item => {
                if (item.length === 2) {
                    return obj.slice(item[0], item[1]);
                } else if (item.length === 1) {
                    return obj[item[0]];
                }
            })
            .filter(Boolean);

        return [].concat(...rangedObj);
    }
}
