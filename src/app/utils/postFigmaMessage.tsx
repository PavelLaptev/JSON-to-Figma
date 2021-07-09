export default function postFigmaMessage(data: any) {
    parent.postMessage(
        {
            pluginMessage: data,
        },
        '*'
    );
}
