export default function compareStrings(string1, string2, _ignoreCase, _useLocale) {
    if (_ignoreCase) {
        if (_useLocale) {
            string1 = string1.toLocaleLowerCase();
            string2 = string2.toLocaleLowerCase();
        } else {
            string1 = string1.toLowerCase();
            string2 = string2.toLowerCase();
        }
    }

    return string1 === string2;
}
