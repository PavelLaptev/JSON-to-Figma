import React, {useState} from 'react';
import '../styles/ui.scss';

import {showMsg} from '../utils';
import ViewProvider from './views/ViewContext';
import LanchView from './views/LaunchView';
import OperationsView from './views/OperationsView';

const App = ({}) => {
    const [JSONobject, setJSONobject] = useState(null);

    // Show operation view on load
    const loadOperationView = result => {
        setJSONobject(result);
        console.log(result);

        const frameHeight = 500;
        parent.postMessage({pluginMessage: {type: 'change-size', frameHeight}}, '*');
    };

    // Hadle file input type
    const handleChangeButton = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0]);

        fileReader.onload = () => {
            try {
                loadOperationView(JSON.parse(fileReader.result as string));
            } catch (error) {
                console.error(error);
                showMsg('error', 'Something wrong with the file. Check the structure');
                setJSONobject(null);
            }
        };
        e.target.value = null;
    };

    // Hadle copyFromClipboard
    const handleClickButton = e => {
        console.log(e);
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
