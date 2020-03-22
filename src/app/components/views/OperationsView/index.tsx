import * as React from 'react';
import ViewProvider from '../ViewContext';
import styles from './operationsView.module.scss';

const OperationsView = ({}) => {
    return (
        <ViewProvider.Consumer>
            {JSONobject => (
                <main className={`${styles.wrap}`}>
                    <h1>Hello, The Second Screen!</h1>
                    <code>{JSON.stringify(JSONobject)}</code>
                </main>
            )}
        </ViewProvider.Consumer>
    );
};

export default OperationsView;
