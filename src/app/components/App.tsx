import '../styles/ui.scss';

import * as React from 'react';

import {LaunchView, OperationsView} from './views';
import {
    clearNullValues,
    execGetClipboard,
    fetchImagefromURL,
    fetchJSONfromURL,
    groupFlattenedObj,
    showMsg,
} from '../utils';

import {ViewContext} from './contexts';
import {pluginFrameSize} from '../../data/pluginFrameSize';

const App = ({}) => {
    const [JSONobject, setJSONobject] = React.useState(null);

    // Add Msg Listener
    const MsgListener = e => {
        if (e.data.pluginMessage.type === 'json-ready-to-save') {
            const {json} = e.data.pluginMessage;

            const a: HTMLAnchorElement = document.getElementById('link') as HTMLAnchorElement;
            a.href = URL.createObjectURL(
                new Blob([JSON.stringify(json, null, 2)], {
                    type: 'application/json',
                })
            );
            a.setAttribute('download', 'selection-properties.json');
            a.click();
        }

        if (e.data.pluginMessage.type === 'image-url') {
            const imgURL = e.data.pluginMessage.url;
            fetchImagefromURL(imgURL, e.data.pluginMessage.targetID);
        }

        if (e.data.pluginMessage.type === 'get-plugin-storage') {
            if (e.data.pluginMessage.data === '') {
                console.log('empty', e.data.pluginMessage);
            } else {
                console.log(e.data.pluginMessage.data);
            }
        }
    };

    React.useEffect(() => {
        window.addEventListener('message', MsgListener);
        return () => {
            window.removeEventListener('message', MsgListener);
        };
    });

    // Helper function
    const showErrorMsg = (error, errorText) => {
        console.error(error);
        showMsg('error', errorText);
        setJSONobject(null);
    };

    // Show operation view on load
    const loadOperationView = result => {
        setJSONobject(result);
    };

    // Handle file input type
    const handleChangeButton = e => {
        let fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0]);

        fileReader.onload = () => {
            try {
                let obj = JSON.parse(fileReader.result as string);
                let clearedFromNull = clearNullValues(obj);

                loadOperationView(groupFlattenedObj(clearedFromNull));
            } catch (error) {
                showErrorMsg(error, 'Something wrong with the file. Check the structure');
            }
        };
        e.target.value = '';
    };

    // Handle copy from Clipboard
    function fetchUrlLink() {
        let clipboardLink = execGetClipboard();

        fetchJSONfromURL(
            clipboardLink,
            responseJson => {
                let clearedFromNull = clearNullValues(responseJson);
                let obj = groupFlattenedObj(clearedFromNull);
                loadOperationView(obj);
            },
            error => {
                showErrorMsg(error, 'Something wrong with the URL or JSON file');
            }
        );
    }

    const handleReupoad = () => {
        console.clear();
        setJSONobject(null);

        const frameHeight = pluginFrameSize.height;
        parent.postMessage({pluginMessage: {type: 'reset', frameHeight}}, '*');
    };

    return (
        <ViewContext.Provider value={JSONobject}>
            {JSONobject !== null ? (
                <OperationsView onReuploadClick={handleReupoad} />
            ) : (
                <LaunchView urlOnClick={fetchUrlLink} fileOnChange={handleChangeButton} />
            )}
        </ViewContext.Provider>
    );
};

export default App;
