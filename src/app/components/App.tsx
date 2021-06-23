import * as React from 'react';
import '../styles/ui.scss';

import {showMsg, execGetClipboard, groupFlattenedObj, fetchJSONfromURL} from '../utils';
import {ViewContext} from './contexts';
import {LaunchView, OperationsView} from './views';

import {pluginFrameSize} from '../../data/pluginFrameSize';
import {fetchImagefromURL} from '../utils';

const App = ({}) => {
    const [JSONobject, setJSONobject] = React.useState(null);

    // Add Msg Listener
    const MsgListener = e => {
        if (e.data.pluginMessage.type === 'image-url') {
            const imgURL = e.data.pluginMessage.url;
            fetchImagefromURL(imgURL, e.data.pluginMessage.targetID);
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
                loadOperationView(groupFlattenedObj(obj));
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
                let obj = groupFlattenedObj(responseJson);
                loadOperationView(obj);
            },
            error => {
                showErrorMsg(error, 'Something wrong with the URL or JSON file');
            }
        );
    }

    const onResetClickHandle = () => {
        console.clear();
        setJSONobject(null);

        const frameHeight = pluginFrameSize.height;
        parent.postMessage({pluginMessage: {type: 'reset', frameHeight}}, '*');
    };

    return (
        <ViewContext.Provider value={JSONobject}>
            {JSONobject !== null ? (
                <OperationsView onResetClick={onResetClickHandle} />
            ) : (
                <LaunchView urlOnClick={fetchUrlLink} fileOnChange={handleChangeButton} />
            )}
        </ViewContext.Provider>
    );
};

export default App;
