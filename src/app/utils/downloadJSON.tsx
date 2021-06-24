export default function downloadJSON(obj) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(
        new Blob([JSON.stringify(obj, null, 2)], {
            type: 'application/json',
        })
    );
    a.setAttribute('download', 'filltered-json-to-figma.json');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
