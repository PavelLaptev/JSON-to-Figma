import React from 'react';

import ViewProvider from '../ViewContext';
import FileSection from './sections/FileSection';
import JSONItemsSection from './sections/JSONItemsSection';
import OptionsSection from './sections/OptionsSection';
import ExtraSection from './sections/ExtraSection';

import styles from './operationsView.module.scss';

const OperationsView = ({}) => {
    return (
        <ViewProvider.Consumer>
            {JSONobject => (
                <main className={styles.wrap}>
                    <FileSection obj={JSONobject} />
                    <JSONItemsSection obj={JSONobject} />
                    <OptionsSection />
                    <ExtraSection />
                </main>
            )}
        </ViewProvider.Consumer>
    );
};

export default OperationsView;
