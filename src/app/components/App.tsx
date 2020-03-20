import React from 'react';
import '../styles/ui.scss';

import ViewProvider from './views/ViewContext';
import LanchView from './views/LaunchView';
import OperationsView from './views/OperationsView';

const App = ({}) => {
    return (
        <ViewProvider.Consumer>
            {isJSONloaded => (isJSONloaded ? <OperationsView /> : <LanchView />)}
        </ViewProvider.Consumer>
    );
};

export default App;
