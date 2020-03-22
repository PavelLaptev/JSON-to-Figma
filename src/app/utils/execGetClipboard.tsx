export default function execGetClipboard() {
    var pasteTarget = document.createElement('div');
    pasteTarget.contentEditable = 'true';
    var actElem = document.activeElement.appendChild(pasteTarget).parentNode;
    pasteTarget.focus();
    document.execCommand('Paste', null, null);
    var paste = pasteTarget.innerText;
    actElem.removeChild(pasteTarget);
    return paste;
}
