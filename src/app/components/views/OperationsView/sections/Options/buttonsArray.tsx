const radioGroupName = 'populate-mode';
const radioArray = [
    {
        id: 'only-selected',
        label: 'Selected layers only',
        captionText: 'Replaces text only for directly selected text layers.',
    },
    {
        id: 'by-layer-name',
        label: 'By layer name',
        captionText:
            'You can populate layers deeply nested in any group or frame. To do so, manually rename the layer you want to populate so that it matches the name in the JSON file.',
    },
    {
        id: 'string-templates',
        label: 'String templates',
        captionText:
            'Select frames or groups that contents text layers with string templates. Replaces only the contents of a string in {braces}.',
    },
];

export {radioGroupName, radioArray};
