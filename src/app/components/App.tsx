import * as React from 'react';
import '../styles/ui.scss';

import {showMsg, execGetClipboard, groupFlattenedObj} from '../utils';
import {ViewContext} from './contexts';
import {LaunchView, OperationsView} from './views';

import {pluginFrameSize} from '../../plugin/data/pluginFrameSize';

const App = ({}) => {
    const [JSONobject, setJSONobject] = React.useState(null);

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
        e.target.value = null;
    };

    // Handle copy from Clipboard
    const handleClickButton = () => {
        let clipboardLink = execGetClipboard();

        let header = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data',
        });

        let sentData = {
            mode: 'cors',
            header: header,
        };

        fetch(clipboardLink, sentData as any)
            .then(response => response.json())
            .then(responseJson => {
                let obj = groupFlattenedObj(responseJson);
                loadOperationView(obj);
            })
            .catch(error => {
                showErrorMsg(error, 'Something wrong with the URL or JSON file');
            });
    };

    const onResetClickHandle = () => {
        setJSONobject(null);
        const frameHeight = pluginFrameSize.height;
        parent.postMessage({pluginMessage: {type: 'change-size', frameHeight}}, '*');
    };

    return (
        <ViewContext.Provider value={JSONobject}>
            {JSONobject !== null ? (
                <OperationsView onResetClick={onResetClickHandle} />
            ) : (
                <LaunchView urlOnClick={handleClickButton} fileOnChange={handleChangeButton} />
            )}
        </ViewContext.Provider>
    );
};

export default App;
