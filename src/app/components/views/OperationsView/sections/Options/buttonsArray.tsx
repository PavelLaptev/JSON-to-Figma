const radioGroupName = 'populate-mode';
const radioArray = [
    {
        id: 'by-layer-name',
        label: 'By layer name',
        captionText:
            'Select layers, groups or frames with layers you want to populate. Script will compare layers names and JSON items names. Manually rename a layer you want to populate so that it matches the name in the JSON file.',
    },
    {
        id: 'only-selected',
        label: 'Selected layers only',
        captionText: 'Manualy select text layers. Replaces text only for manually selected text layers.',
    },
    {
        id: 'string-templates',
        label: 'String templates',
        captionText:
            'Select frames or groups that contents text layers with string templates. Replaces only the contents of a string in {braces}.',
    },
];

const allMatches = {
    id: 'populate-all-matches',
    name: 'Populate all matches',
};

export {radioGroupName, radioArray, allMatches};
