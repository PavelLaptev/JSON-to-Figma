const isNumeric = input => !isNaN(input); // you may also check if the value is a nonzero positive integer
const isOrdered = (start, end) => parseInt(start) < parseInt(end);
const isRangeValid = range =>
    range.length == 2 && range.every(item => isNumeric(item)) && isOrdered(range[0], range[1]);
const isSingleValid = single => single.length == 1 && isNumeric(single);

export default function validateRangeValue(string) {
    const inputs = string.split(',').map(x => x.trim());

    for (var x of inputs) {
        if (!x) return false;
        if (x.charAt(0) === '0') return false;
        if (x.match(/([.!@#$%^&*()_=~`":|])/g)) return false;
        const pages = x.split('-');
        if (!isSingleValid(pages) && !isRangeValid(pages)) return false;
    }

    return true;
}
