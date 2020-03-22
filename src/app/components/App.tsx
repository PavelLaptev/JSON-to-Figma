import React, {useState} from 'react';
import '../styles/ui.scss';

import {showMsg, execGetClipboard} from '../utils';
import ViewProvider from './views/ViewContext';
import LanchView from './views/LaunchView';
import OperationsView from './views/OperationsView';

const App = ({}) => {
    const [JSONobject, setJSONobject] = useState(null);

    // Helper function
    const showErrorMsg = (error, errorText) => {
        console.error(error);
        showMsg('error', errorText);
        setJSONobject(null);
    };

    // Show operation view on load
    const loadOperationView = result => {
        setJSONobject(result);
        console.log(result);

        let frameHeight = 700;
        parent.postMessage({pluginMessage: {type: 'change-size', frameHeight}}, '*');
    };

    // Hadle file input type
    const handleChangeButton = e => {
        let fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0]);

        fileReader.onload = () => {
            try {
                loadOperationView(JSON.parse(fileReader.result as string));
            } catch (error) {
                showErrorMsg(error, 'Something wrong with the file. Check the structure');
            }
        };
        e.target.value = null;
    };

    // Hadle copyFromClipboard
    const handleClickButton = e => {
        console.log(e);
        let clipboardLink = execGetClipboard();

        fetch(clipboardLink)
            .then(response => response.json())
            .then(responseJson => {
                loadOperationView(responseJson);
                // return responseJson;
            })
            .catch(error => {
                showErrorMsg(error, 'Something wrong with the URL or JSON file');
            });
    };

    return (
        <ViewProvider.Provider value={JSONobject}>
            {JSONobject !== null ? (
                <OperationsView />
            ) : (
                <LanchView urlOnClick={e => handleClickButton(e)} fileOnChange={e => handleChangeButton(e)} />
            )}
        </ViewProvider.Provider>
    );
};

export default App;
